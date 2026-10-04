#!/usr/bin/env python3
"""Rebuild the homepage film's still scenes while retaining its audio/timeline."""
import json
import os
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
REAL = ROOT / 'site/assets/img/models/real'
DUBAI = ROOT / 'video-production/dubai'
OUTPUT = ROOT / 'site/assets/video/hbot-chamber-tech.mp4'
BOLD = ROOT / 'site/assets/fonts/NotoSans-Bold.ttf'
REGULAR = ROOT / 'site/assets/fonts/NotoSans-Regular.ttf'


def label(text, y, size=30):
    return (f",drawtext=fontfile={BOLD}:text='{text}':fontcolor=white:fontsize={size}:"
            f'x=58:y={y}:box=1:boxcolor=0x061018@0.72:boxborderw=16')


def still(index, frames, title, technology, dest):
    return (f'[{index}:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,'
            'scale=1408:792:force_original_aspect_ratio=increase,crop=1280:720,'
            f"zoompan=z='min(zoom+0.00045,1.05)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
            f'd={frames}:s=1280x720:fps=30,setsar=1,format=yuv420p'
            + label(title, '58') + (label(technology, 'h-104', 27) if technology else '')
            + f'[{dest}]')


def main():
    subprocess.run(['python3', str(ROOT / 'tools/recover_model_film_sources.py')], check=True)
    # Original motion sources (presenter, manufacturing insert) are retained.
    graph = [
        '[0:v]trim=start=0:end=3.2,setpts=PTS-STARTPTS,fps=30,setsar=1,format=yuv420p[opening]',
        still(1, 144, 'DUBAI  ·  PRIVATE WELLNESS', '', 'dubai_bg'),
        '[0:v]trim=start=3.2:end=8,setpts=PTS-STARTPTS,crop=400:232:840:448,fps=30,setsar=1[pip]',
        '[dubai_bg][pip]overlay=x=840:y=448:shortest=1[pipscene]',
        '[0:v]trim=start=8:end=10.8,setpts=PTS-STARTPTS,fps=30,setsar=1,format=yuv420p[factory]',
        still(2, 120, 'TOKYO PLUS  ·  2-4 PERSON', 'CityOS  ·  CityAI  ·  CityGuard  ·  CityConnect', 'tokyo_blue'),
        still(3, 99, 'OSLO  ·  SINGLE LOUNGE', 'CityAI  ·  DATA-DRIVEN ASSISTANCE', 'oslo'),
        still(1, 176, 'DUBAI  ·  PRIVATE WELLNESS', 'CityGuard  ·  SMART MONITORING', 'dubai'),
        still(4, 176, 'TOKYO  ·  TWO PERSON', 'CityConnect  ·  CONNECTED MANAGEMENT', 'tokyo'),
        still(5, 176, 'TOKYO PLUS  ·  2-4 PERSON', 'CONFIGURATOR + AR  ·  VISUALIZE YOUR SPACE', 'tokyo_plus'),
        still(6, 176, 'MILANO  ·  FOUR PERSON', 'INTELLIGENT ENGINEERING  ·  CONNECTED CONFIDENCE', 'milano'),
        still(7, 59, 'GENEVA  ·  MULTIPLACE', 'INTELLIGENT ENGINEERING  ·  CONNECTED CONFIDENCE', 'geneva'),
        '[0:v]trim=start=44:end_frame=1321,setpts=PTS-STARTPTS,loop=loop=-1:size=1:start=0,'
        'trim=end_frame=188,setpts=N/(30*TB),fps=30,setsar=1,format=yuv420p,fade=t=out:st=5.77:d=0.5[end]',
        '[opening][pipscene][factory][tokyo_blue][oslo][dubai][tokyo][tokyo_plus][milano][geneva][end]'
        'concat=n=11:v=1:a=0,format=yuv420p[v]',
    ]
    args = ['-i', str(OUTPUT)]
    for source in [DUBAI / 'dubai-studio.jpeg', ROOT / 'video-production/models/tokyo-plus.webp',
                   REAL / 'oslo-real.webp', REAL / 'tokyo-real.webp',
                   ROOT / 'video-production/models/tokyo-plus.jpeg',
                   ROOT / 'video-production/motion-sources/milano-hero.png', REAL / 'geneva-real.webp']:
        args.extend(['-loop', '1', '-i', str(source)])
    durations = [3.2,4.8,2.8,4,3.3,5.85,5.85,5.85,5.85,59/30,188/30]
    subprocess.run([str(ROOT / 'tools/render_smooth_video.py'), *args,
                    '-filter_complex', ';\n'.join(graph), str(OUTPUT)], cwd=ROOT,
                   env={**os.environ, 'HBOT_SCENE_DURATIONS': json.dumps(durations)}, check=True)


if __name__ == '__main__':
    main()
