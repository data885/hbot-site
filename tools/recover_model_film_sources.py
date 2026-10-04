#!/usr/bin/env python3
"""Recover original Milano film stills without restoring removed site assets."""
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'video-production/motion-sources'
SOURCES = {
    'milano-hero.png': 'milan-cream.webp',
    'milano-interior.png': 'milano-interior.webp',
    'milano-bronze.png': 'milan-bronz.webp',
}


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    for name, source in SOURCES.items():
        output = DEST / name
        if output.exists():
            continue
        historic = subprocess.Popen(['git', 'show', f'e4a1dbbd^:site/assets/img/models/real/{source}'],
                                    cwd=ROOT, stdout=subprocess.PIPE)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'pipe:0', '-frames:v', '1', str(output)],
                       stdin=historic.stdout, check=True)
        historic.stdout.close()
        if historic.wait():
            raise RuntimeError(f'Historical source missing: {source}')


if __name__ == '__main__':
    main()
