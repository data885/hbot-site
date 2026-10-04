#!/usr/bin/env python3
"""FFmpeg adapter: subpixel still-image motion and timeline-preserving dissolves.

Called by the existing film builders via FFMPEG=tools/render_smooth_video.py.
Original audio is copied so presenter sync, narration and captions keep their times.
"""
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
REAL_FFMPEG = os.environ.get('HBOT_FFMPEG')
if not REAL_FFMPEG:
    candidates = [shutil.which('ffmpeg'), str(Path.home() / 'Library/Caches/hbot-video-tools/ffmpeg')]
    for candidate in candidates:
        if candidate and Path(candidate).is_file():
            filters = subprocess.run([candidate, '-hide_banner', '-filters'], capture_output=True, text=True)
            if 'drawtext' in filters.stdout:
                REAL_FFMPEG = candidate
                break
    if not REAL_FFMPEG:
        raise RuntimeError('Install FFmpeg with drawtext, or set HBOT_FFMPEG to its executable path.')
FPS = 30
FADE = 0.4


def smooth_still(match):
    spec = match.group(0)
    size = re.search(r':s=(\d+)x(\d+)', spec)
    frames = int(re.search(r':d=(\d+)', spec).group(1))
    w, h = map(int, size.groups())
    # A constant zoom is the logo endcard: do not animate or change its size.
    if "z=1:" in spec:
        return spec
    limit = re.search(r'min\(zoom\+[\d.]+,([\d.]+)\)', spec)
    amount = min(float(limit.group(1)) - 1, 0.065) if limit else 0.05
    ax, ay = 0.5, 0.5
    anchor = re.search(r"x='iw\*([\d.]+)", spec)
    if anchor:
        ax = float(anchor.group(1))
    elif "x='iw-(iw/zoom)'" in spec:
        ax = 0.85
    anchor = re.search(r"y='ih\*([\d.]+)", spec)
    if anchor:
        ay = float(anchor.group(1))
    progress = f'(1-cos(PI*min(in/{frames - 1},1)))/2'
    gap = f'{amount:.6f}*{progress}'
    # perspective evaluates floating-point corner positions every frame. Unlike
    # zoompan/crop it never rounds the moving source rectangle to whole pixels.
    return (
        f'loop=loop=-1:size=1:start=0,trim=end_frame={frames},'
        f'setpts=N/({FPS}*TB),fps={FPS},scale={w*2}:{h*2}:flags=lanczos,'
        f'format=gbrp,perspective='
        f"x0='-W*({gap})*{ax}':y0='-H*({gap})*{ay}':"
        f"x1='W+W*({gap})*{1-ax}':y1='-H*({gap})*{ay}':"
        f"x2='-W*({gap})*{ax}':y2='H+H*({gap})*{1-ay}':"
        f"x3='W+W*({gap})*{1-ax}':y3='H+H*({gap})*{1-ay}':"
        f'sense=destination:eval=frame:interpolation=cubic,'
        f'scale={w}:{h}:flags=lanczos'
    )


def transform(graph, durations):
    # Keep the video graph; copy the original, already-mixed audio separately.
    graph = graph.split('[v];')[0] + '[v]'
    # The newer builders oversample zoompan to 4K. Our floating-point transform
    # already has its own 1440p working canvas, so avoid a redundant 4K upscale.
    graph = graph.replace('scale=4224:2376:force_original_aspect_ratio=increase,crop=3840:2160',
                          'scale=1408:792:force_original_aspect_ratio=increase,crop=1280:720')
    graph = graph.replace('scale=3840:2160,zoompan=', 'scale=1280:720,zoompan=')
    graph = re.sub(r"zoompan=z=(?:'[^']*'|[^:]+):(?:[^,;\[]|'[^']*')*?(?=,setsar|,pad)", smooth_still, graph)
    labels_match = re.search(r'((?:\[[\w]+\])+)' + r'concat=n=(\d+):v=1:a=0,format=yuv420p\[v\]', graph)
    if not labels_match:
        raise ValueError('Expected a final video concat before [v]')
    labels = re.findall(r'\[([\w]+)\]', labels_match.group(1))
    if len(labels) != len(durations):
        raise ValueError(f'{len(labels)} scenes but {len(durations)} durations')
    parts = []
    for i, (label, duration) in enumerate(zip(labels, durations)):
        start = FADE / 2 if i else 0
        stop = FADE / 2 if i < len(labels) - 1 else 0
        parts.append(
            f'[{label}]fps={FPS},setsar=1,settb=AVTB,'
            f'trim=duration={duration},setpts=PTS-STARTPTS,'
            f'tpad=start_mode=clone:start_duration={start}:stop_mode=clone:stop_duration={stop}[sm{i}]'
        )
    boundary = 0
    previous = 'sm0'
    for i in range(1, len(labels)):
        boundary += durations[i-1]
        dest = 'v' if i == len(labels)-1 else f'xf{i}'
        parts.append(f'[{previous}][sm{i}]xfade=transition=fade:duration={FADE}:offset={boundary-FADE/2:.6f}[{dest}]')
        previous = dest
    return graph[:labels_match.start()] + ';\n'.join(parts)


def main():
    args = sys.argv[1:]
    if '-filter_complex' not in args:
        return subprocess.call([REAL_FFMPEG, *args])
    output = Path(args[-1]).resolve()
    durations = json.loads(os.environ['HBOT_SCENE_DURATIONS'])
    backup_root = ROOT / 'video-production' / 'motion-backups' / '2026-10-03'
    backup_root.mkdir(parents=True, exist_ok=True)
    backup = backup_root / output.name
    if not backup.exists():
        if not output.exists():
            raise FileNotFoundError(f'Original audio missing: {output}')
        shutil.copy2(output, backup)
    index = args.index('-filter_complex')
    graph = transform(args[index + 1], durations)
    (backup_root / (output.stem + '.smooth.filter')).write_text(graph)
    # Inputs are retained because their original video indices are referenced.
    inputs = args[args.index('-i')-0:index]
    if args[args.index('-i')-2:args.index('-i')] == ['-loop', '1']:
        inputs = ['-loop', '1', *inputs]
    pending = output.with_name(output.stem + '.smooth-pending.mp4')
    sources = [inputs[i+1] for i, value in enumerate(inputs) if value == '-i']
    chains = [part.strip() for part in graph.split(';') if part.strip()]
    producers = {}
    dependencies = {}
    for n, chain in enumerate(chains):
        head = re.match(r'((?:\[[^\]]+\])+)', chain).group(1)
        dependencies[n] = re.findall(r'\[([^\]]+)\]', head)
        for dest in re.findall(r'\[([^\]]+)\]', chain[len(head):]):
            producers[dest] = n

    def collect(label, selected):
        if re.match(r'\d+:[va]', label):
            return
        n = producers[label]
        if n in selected:
            return
        selected.add(n)
        for dependency in dependencies[n]:
            collect(dependency, selected)

    # Render one scene at a time. A single large graph can queue multiple 1440p
    # image streams and exhaust RAM on an 8 GB Mac. Only finished 720p scenes
    # enter the transition graph.
    with tempfile.TemporaryDirectory(prefix='hbot-smooth-') as work:
        clip_inputs = []
        for i, duration in enumerate(durations):
            selected = set()
            collect(f'sm{i}', selected)
            scene_graph = ';'.join(chains[n] for n in sorted(selected))
            used = sorted(set(int(n) for n in re.findall(r'\[(\d+):[va]\]', scene_graph)))
            mapping = {old: new for new, old in enumerate(used)}
            scene_graph = re.sub(r'\[(\d+):([va])\]', lambda m: f'[{mapping[int(m.group(1))]}:{m.group(2)}]', scene_graph)
            scene_inputs = []
            for source_index in used:
                scene_inputs.extend(['-threads', '1', '-i', sources[source_index]])
            clip = Path(work) / f'scene-{i}.mkv'
            subprocess.run([REAL_FFMPEG, '-hide_banner', '-loglevel', 'error', '-y',
                            *scene_inputs, '-filter_complex_threads', '2', '-filter_complex', scene_graph,
                            '-map', f'[sm{i}]', '-an', '-c:v', 'libx264', '-preset', 'ultrafast',
                            '-crf', '18', '-threads', '2', '-pix_fmt', 'yuv420p', '-r', str(FPS), str(clip)], check=True)
            clip_inputs.extend(['-threads', '1', '-i', str(clip)])
            print(f'{output.name}: scene {i+1}/{len(durations)} ready', flush=True)
        joins = [f'[{i}:v]settb=AVTB,setpts=PTS-STARTPTS[sm{i}]' for i in range(len(durations))]
        joins.extend(chain for chain in chains if 'xfade=' in chain)
        command = [REAL_FFMPEG, '-hide_banner', '-loglevel', 'error', '-y',
                   *clip_inputs, '-i', str(backup), '-filter_complex_threads', '2',
                   '-filter_complex', ';'.join(joins), '-map', '[v]', '-map', f'{len(durations)}:a:0?',
                   '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-threads', '2', '-pix_fmt', 'yuv420p',
                   '-profile:v', 'high', '-level:v', '4.0', '-r', str(FPS),
                   '-c:a', 'copy', '-movflags', '+faststart', '-t', str(sum(durations)), str(pending)]
        subprocess.run(command, check=True)
    subprocess.run([REAL_FFMPEG, '-v', 'error', '-i', str(pending), '-f', 'null', '-'], check=True)
    os.replace(pending, output)
    print(f'Smooth render ready: {output}', flush=True)
    return 0


if __name__ == '__main__':
    sys.exit(main())
