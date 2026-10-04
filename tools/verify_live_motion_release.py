#!/usr/bin/env python3
"""Verify published film references and hash the served MP4s without saving media."""
from concurrent.futures import ThreadPoolExecutor
import hashlib
from pathlib import Path
import re
import subprocess
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://hbotchambertech.com'
PATTERN = r'/assets/video/([^"?]+\.mp4)\?v=(\d+)'


def check_page(item):
    page, expected = item
    relative = page.relative_to(ROOT / 'site').as_posix()
    with urlopen(Request(f'{BASE}/{relative}', headers={'Cache-Control': 'no-cache'}), timeout=30) as response:
        actual = set(re.findall(PATTERN, response.read().decode('utf-8')))
    assert actual == expected, f'Page has old film references: {relative}: {actual}'
    return relative


def check_video(item):
    name, version = item
    local = ROOT / 'site/assets/video' / name
    expected = subprocess.check_output(['shasum', '-a', '256', str(local)], text=True).split()[0]
    digest = hashlib.sha256()
    with urlopen(f'{BASE}/assets/video/{name}?v={version}', timeout=60) as response:
        assert response.headers.get('Content-Type', '').startswith('video/mp4'), name
        while chunk := response.read(262144):
            digest.update(chunk)
    assert digest.hexdigest() == expected, f'Video does not match release: {name}'
    return name


def main():
    pages = []
    versions = set()
    for page in (ROOT / 'site').rglob('*.html'):
        refs = set(re.findall(PATTERN, page.read_text()))
        if refs:
            pages.append((page, refs))
            versions.update(refs)
    with ThreadPoolExecutor(max_workers=6) as executor:
        checked = list(executor.map(check_page, pages))
    print(f'PASS {len(checked)} published language/model pages', flush=True)
    with ThreadPoolExecutor(max_workers=3) as executor:
        for name in executor.map(check_video, sorted(versions)):
            print(f'PASS published MP4 SHA-256: {name}', flush=True)
    print('PASS published release matches local verified assets', flush=True)


if __name__ == '__main__':
    main()
