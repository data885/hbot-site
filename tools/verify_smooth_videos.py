#!/usr/bin/env python3
"""Check delivery format, constant frame rate, audio, duration and faststart."""
import json
from pathlib import Path
import struct
import subprocess

ROOT = Path(__file__).resolve().parents[1]
BACKUPS = ROOT / 'video-production/motion-backups/2026-10-03'


def probe(path):
    return json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams',
                                               '-show_format', '-of', 'json', str(path)]))


def audio_hash(path, common_duration=None):
    args = ['ffmpeg', '-v', 'error', '-i', str(path)]
    if common_duration:
        args.extend(['-t', str(common_duration)])
    return subprocess.check_output([*args, '-map', '0:a:0', '-c:a', 'copy', '-f', 'hash', '-'], text=True).strip()


def faststart(path):
    boxes = []
    with path.open('rb') as stream:
        while header := stream.read(8):
            size, kind = struct.unpack('>I4s', header)
            if size == 1:
                size = struct.unpack('>Q', stream.read(8))[0]
                header_size = 16
            else:
                header_size = 8
            boxes.append(kind)
            if not size:
                break
            stream.seek(size - header_size, 1)
    return b'moov' in boxes and b'mdat' in boxes and boxes.index(b'moov') < boxes.index(b'mdat')


def main():
    files = sorted((ROOT / 'site/assets/video').glob('*.mp4'))
    files.append(ROOT / 'video-production/dubai/dubai-tech-cut-en-ar-35s.mp4')
    report = []
    for path in files:
        data = probe(path)
        video = next(stream for stream in data['streams'] if stream['codec_type'] == 'video')
        original = BACKUPS / path.name
        old = probe(original)
        assert video['codec_name'] == 'h264' and video['pix_fmt'] == 'yuv420p', path
        assert video['r_frame_rate'] == video['avg_frame_rate'] == '30/1', path
        assert (video['width'], video['height']) == (1280, 720), path
        assert abs(float(data['format']['duration']) - float(old['format']['duration'])) < 0.1, path
        assert faststart(path), path
        # The short cut loses at most one frame at its tail; compare its common part.
        common_duration = 34 if path.name == 'dubai-tech-cut-en-ar-35s.mp4' else None
        assert audio_hash(path, common_duration) == audio_hash(original, common_duration), f'Audio changed: {path}'
        decoded = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-f', 'null', '-'],
                                 capture_output=True, text=True)
        assert decoded.returncode == 0 and not decoded.stderr, decoded.stderr
        report.append({'file': str(path.relative_to(ROOT)), 'duration': data['format']['duration'],
                       'size_mb': round(path.stat().st_size/1048576, 2), 'fps': 30,
                       'audio_unchanged': True, 'faststart': True, 'decode_errors': 0})
        print(f'PASS {path.name}', flush=True)
    # Each generated language page must reference the same cache version.
    import re
    versions = {}
    pages = set()
    for page in (ROOT / 'site').rglob('*.html'):
        for name, version in re.findall(r'/assets/video/([^"?]+\.mp4)\?v=(\d+)', page.read_text()):
            versions.setdefault(name, set()).add(version)
            pages.add(str(page.relative_to(ROOT)))
    assert len(versions) == 8 and all(len(v) == 1 for v in versions.values()), versions
    out = ROOT / 'audit/motion-fix/verification.json'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({'videos': report, 'language_pages': len(pages),
                               'cache_versions': {k: list(v)[0] for k,v in versions.items()}}, indent=2))
    print(f'PASS {len(files)} videos; {len(pages)} pages use consistent versions')


if __name__ == '__main__':
    main()
