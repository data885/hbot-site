#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FFMPEG="/private/tmp/hbot-video-tools/node_modules/ffmpeg-static/ffmpeg"
FONT_BOLD="$ROOT/site/assets/fonts/NotoSans-Bold.ttf"
FONT_REGULAR="$ROOT/site/assets/fonts/NotoSans-Regular.ttf"
PRESENTER="$ROOT/video-production/presenter-opening-en.mp4"
NARRATION="$ROOT/video-production/geneva-v2/geneva-v2-model-film-en.mp3"
if [[ ! -f "$NARRATION" ]]; then
  NARRATION="$ROOT/video-production/model-films/geneva-model-film-en.mp3"
fi
REAL="$ROOT/site/assets/img/models/real"
CITY_SCREEN="$ROOT/video-production/geneva-v2/city-tech-screen-en.png"
CONFIG_SCREEN="$ROOT/video-production/geneva-v2/configurator-geneva-en.png"
LOGO="$ROOT/site/assets/img/logo-full.png"
FACTORY="/Users/murselalkan/Desktop/İHRACAT CRM/HBOT CHAMBER TECH/Hbot Chamber Tech video.mp4"
OUTPUT="$ROOT/site/assets/video/geneva-model-film-en.mp4"

for file in "$PRESENTER" "$NARRATION" "$REAL/geneva-real.webp" "$REAL/geneva-interior.webp" \
  "$REAL/nexus-bronz.webp" "$CITY_SCREEN" "$CONFIG_SCREEN" "$LOGO" "$FACTORY"; do
  [[ -f "$file" ]] || { echo "Missing source: $file" >&2; exit 1; }
done

filter="[0:v]trim=duration=5,setpts=PTS-STARTPTS,scale=1280:720,setsar=1,fps=30,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='HBOT CHAMBER TECH  ·  SINCE 2007':fontcolor=white:fontsize=24:x=48:y=h-58:box=1:boxcolor=0x061018@0.58:boxborderw=11[presenter];
[1:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1408:792:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.00045,1.055)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,vignette=PI/5,drawtext=fontfile=${FONT_BOLD}:text='GENEVA':fontcolor=white:fontsize=52:x=54:y=52:box=1:boxcolor=0x061018@0.72:boxborderw=17,drawtext=fontfile=${FONT_REGULAR}:text='DEVELOPED FOR HOSPITALS AND MEDICAL CENTRES':fontcolor=white:fontsize=25:x=56:y=143:box=1:boxcolor=0x061018@0.58:boxborderw=12[hero_bg];
[0:v]trim=start=5:end=8,setpts=PTS-STARTPTS,scale=304:171,pad=310:177:3:3:color=white,fps=30,format=yuv420p[pip];
[hero_bg][pip]overlay=x=main_w-overlay_w-42:y=main_h-overlay_h-38:eof_action=pass:shortest=0[hero];
[2:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1408:792:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.00040,1.05)':x='iw*0.58-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,vignette=PI/5,drawtext=fontfile=${FONT_BOLD}:text='SIX OR MORE PEOPLE  ·  MODULAR CAPACITY':fontcolor=white:fontsize=31:x=54:y=h-106:box=1:boxcolor=0x061018@0.74:boxborderw=15[interior];
[3:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1280:720,zoompan=z='min(zoom+0.00025,1.03)':x='iw/2-(iw/zoom/2)':y='ih*0.44-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,drawbox=x=0:y=0:w=1280:h=720:color=0x02101c@0.12:t=fill,drawtext=fontfile=${FONT_BOLD}:text='CityOS · CityAI':fontcolor=white:fontsize=35:x=54:y=h-112:box=1:boxcolor=0x061018@0.76:boxborderw=15,drawtext=fontfile=${FONT_REGULAR}:text='COORDINATED EXPERIENCE · INFORMED OPERATION':fontcolor=white:fontsize=22:x=56:y=h-48:box=1:boxcolor=0x061018@0.58:boxborderw=10[city];
[4:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1408:792:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.00042,1.052)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,vignette=PI/5,drawtext=fontfile=${FONT_BOLD}:text='CityGuard · CityConnect · CitySync':fontcolor=white:fontsize=30:x=(w-text_w)/2:y=h-108:box=1:boxcolor=0x061018@0.74:boxborderw=15,drawtext=fontfile=${FONT_REGULAR}:text='MONITORING · CONNECTED TEAMS · CONNECTED DATA':fontcolor=white:fontsize=22:x=(w-text_w)/2:y=h-46:box=1:boxcolor=0x061018@0.58:boxborderw=10[connected];
[5:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1280:720,zoompan=z='min(zoom+0.00025,1.03)':x='iw*0.56-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='CONFIGURATOR + AR ROADMAP':fontcolor=white:fontsize=31:x=54:y=54:box=1:boxcolor=0x061018@0.74:boxborderw=15,drawtext=fontfile=${FONT_REGULAR}:text='PLAN CAPACITY · FINISHES · PLACEMENT':fontcolor=white:fontsize=23:x=56:y=124:box=1:boxcolor=0x061018@0.58:boxborderw=11[config];
[8:v]split=4[fv0][fv1][fv2][fv3];
[fv0]trim=start=0:end=1.25,setpts=2*(PTS-STARTPTS),fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p[f0];
[fv1]trim=start=3:end=5.5,setpts=PTS-STARTPTS,fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p[f1];
[fv2]trim=start=9:end=11.5,setpts=PTS-STARTPTS,fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p[f2];
[fv3]trim=start=15:end=17.5,setpts=PTS-STARTPTS,fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p[f3];
[f0][f1][f2][f3]concat=n=4:v=1:a=0,drawtext=fontfile=${FONT_BOLD}:text='ENGINEERING & MANUFACTURING  ·  SINCE 2007':fontcolor=white:fontsize=30:x=54:y=h-104:box=1:boxcolor=0x061018@0.74:boxborderw=15[factory];
[6:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=720:-1,pad=1280:720:(ow-iw)/2:92:color=0x020817,tpad=stop_mode=clone:stop_duration=5,fps=30,trim=duration=5,setsar=1,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='HBOT CHAMBER TECH':fontcolor=white:fontsize=35:x=(w-text_w)/2:y=410,drawtext=fontfile=${FONT_REGULAR}:text='INTELLIGENT ENGINEERING. CONNECTED CONFIDENCE.':fontcolor=white:fontsize=27:x=(w-text_w)/2:y=478,drawtext=fontfile=${FONT_BOLD}:text='www.hbotchambertech.com':fontcolor=0x2bbfe8:fontsize=28:x=(w-text_w)/2:y=558,fade=t=out:st=4.5:d=0.5[end];
[presenter][hero][interior][city][connected][config][factory][end]concat=n=8:v=1:a=0,format=yuv420p[v];
[0:a]atrim=start=0:end=5,asetpts=PTS-STARTPTS,aresample=48000,volume=1.0[presenter_audio];
[7:a]asetpts=PTS-STARTPTS,adelay=5000|5000,aresample=48000,volume=1.08[narration];
[8:a]asplit=4[fa0][fa1][fa2][fa3];
[fa0]atrim=start=0:end=1.25,asetpts=PTS-STARTPTS,atempo=0.5[aa0];
[fa1]atrim=start=3:end=5.5,asetpts=PTS-STARTPTS[aa1];
[fa2]atrim=start=9:end=11.5,asetpts=PTS-STARTPTS[aa2];
[fa3]atrim=start=15:end=17.5,asetpts=PTS-STARTPTS[aa3];
[aa0][aa1][aa2][aa3]concat=n=4:v=0:a=1,volume=0.54,afade=t=in:st=0:d=0.35,afade=t=out:st=9.4:d=0.6,adelay=25000|25000[factory_audio];
[presenter_audio][narration][factory_audio]amix=inputs=3:duration=longest:dropout_transition=0,loudnorm=I=-16:LRA=7:TP=-1.5,alimiter=limit=0.95,apad=pad_dur=6,atrim=duration=40[a]"

"$FFMPEG" -hide_banner -loglevel warning -y \
  -i "$PRESENTER" \
  -loop 1 -i "$REAL/geneva-real.webp" \
  -loop 1 -i "$REAL/geneva-interior.webp" \
  -loop 1 -i "$CITY_SCREEN" \
  -loop 1 -i "$REAL/nexus-bronz.webp" \
  -loop 1 -i "$CONFIG_SCREEN" \
  -loop 1 -i "$LOGO" \
  -i "$NARRATION" \
  -i "$FACTORY" \
  -filter_complex "$filter" \
  -map "[v]" -map "[a]" \
  -c:v libx264 -preset medium -crf 19 -profile:v high -level 4.1 \
  -c:a aac -ar 48000 -b:a 192k -movflags +faststart -t 40 "$OUTPUT"

echo "Geneva V2 rendered: $OUTPUT"
