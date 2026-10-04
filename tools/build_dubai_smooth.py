#!/usr/bin/env python3
"""Re-render the Dubai V2 and the latest product cut from their still sources."""
import json
import os
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
DUBAI = ROOT / 'video-production/dubai'
ADAPTER = ROOT / 'tools/render_smooth_video.py'


def render(graph, output, durations):
    inputs = [
        DUBAI / 'dubai-downtown-bluehour.png',
        DUBAI / 'dubai-presenter-en.mp4',
        DUBAI / 'dubai-lifestyle.jpeg',
        DUBAI / 'dubai-midnight-navy.png',
        DUBAI / 'dubai-emerald-ivory.png',
        DUBAI / 'dubai-interior-detail.png',
        DUBAI / 'dubai-studio.jpeg',
        ROOT / 'site/assets/img/logo-full.png',
    ]
    args = []
    for index, source in enumerate(inputs):
        if index != 1:
            args.extend(['-loop', '1'])
        args.extend(['-i', str(source)])
    subprocess.run([str(ADAPTER), *args, '-filter_complex', graph, str(output)],
                   cwd=ROOT, env={**os.environ, 'HBOT_SCENE_DURATIONS': json.dumps(durations)}, check=True)


def main():
    graph = (DUBAI / 'dubai-film-v2-filter.txt').read_text()
    durations = [4, 8, *([232/30] * 5), 4.4]
    output = ROOT / 'site/assets/video/dubai-model-film-v2-en.web.mp4'
    render(graph, output, durations)
    backup = ROOT / 'video-production/motion-backups/2026-10-03/dubai-model-film-v2-production-original.mp4'
    if not backup.exists():
        shutil.copy2(DUBAI / 'dubai-model-film-v2-en.mp4', backup)
    shutil.copy2(output, DUBAI / 'dubai-model-film-v2-en.mp4')
    # Keep the approved short product sequence. Every scene is freshly rendered
    # from a still instead of trimming the old, jittery encoded film.
    short = graph.split('[downtown][presenter]')[0]
    short += '[downtown][lifestyle][midnight][emerald][studio][hero][end]concat=n=7:v=1:a=0,format=yuv420p[v]'
    short = short.replace('d=120:s=1280x720', 'd=75:s=1280x720')
    short = short.replace('d=232:s=1280x720', 'd=165:s=1280x720')
    short = short.replace('d=132:s=760x179', 'd=135:s=760x179')
    # Presenter label is unused in this product-only cut.
    short = '\n'.join(line for line in short.splitlines() if not line.startswith('[1:v]'))
    short = short.replace('st=3.9:d=0.5[end]', 'st=4.0:d=0.5[end]')
    render(short, DUBAI / 'dubai-tech-cut-en-ar-35s.mp4', [2.5, 5.5, 5.5, 5.5, 5.5, 5.5, 4.5])
    silent = DUBAI / 'dubai-tech-cut-en-ar-35s-silent.mp4'
    silent_backup = ROOT / 'video-production/motion-backups/2026-10-03' / silent.name
    if silent.exists() and not silent_backup.exists():
        shutil.copy2(silent, silent_backup)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(DUBAI / 'dubai-tech-cut-en-ar-35s.mp4'),
                    '-an', '-c:v', 'copy', '-movflags', '+faststart', str(silent)], check=True)


if __name__ == '__main__':
    main()
