#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FFMPEG="/private/tmp/hbot-video-tools/node_modules/ffmpeg-static/ffmpeg"
FONT_BOLD="$ROOT/site/assets/fonts/NotoSans-Bold.ttf"
FONT_REGULAR="$ROOT/site/assets/fonts/NotoSans-Regular.ttf"
PRESENTER="$ROOT/video-production/presenter-opening-en.mp4"
CITY_SCREEN="$ROOT/video-production/geneva-v2/city-tech-screen-en.png"
LOGO="$ROOT/site/assets/img/logo-full.png"
FACTORY="/Users/murselalkan/Desktop/İHRACAT CRM/HBOT CHAMBER TECH/Hbot Chamber Tech video.mp4"

build_model() {
  local slug="$1" model="$2" promise="$3" capacity="$4"
  local hero="$5" interior="$6" connected="$7" config="$8" narration="$9" narration_speed="${10}"
  local output="$ROOT/site/assets/video/${slug}-model-film-en.mp4"

  for file in "$PRESENTER" "$CITY_SCREEN" "$LOGO" "$FACTORY" "$hero" "$interior" "$connected" "$config" "$narration"; do
    [[ -f "$file" ]] || { echo "Missing source: $file" >&2; exit 1; }
  done

  local filter
  filter="[0:v]trim=duration=5,setpts=PTS-STARTPTS,scale=1280:720,setsar=1,fps=30,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='HBOT CHAMBER TECH  ·  SINCE 2007':fontcolor=white:fontsize=24:x=48:y=h-58:box=1:boxcolor=0x061018@0.58:boxborderw=11[presenter];
[1:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1408:792:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.00045,1.055)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,vignette=PI/5,drawtext=fontfile=${FONT_BOLD}:text='${model}':fontcolor=white:fontsize=52:x=54:y=52:box=1:boxcolor=0x061018@0.72:boxborderw=17,drawtext=fontfile=${FONT_REGULAR}:text='${promise}':fontcolor=white:fontsize=25:x=56:y=143:box=1:boxcolor=0x061018@0.58:boxborderw=12[hero_bg];
[0:v]trim=start=5:end=8,setpts=PTS-STARTPTS,scale=304:171,pad=310:177:3:3:color=white,fps=30,format=yuv420p[pip];
[hero_bg][pip]overlay=x=main_w-overlay_w-42:y=main_h-overlay_h-38:eof_action=pass:shortest=0[hero_scene];
[2:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1408:792:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.00040,1.05)':x='iw*0.58-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,vignette=PI/5,drawtext=fontfile=${FONT_BOLD}:text='${capacity}':fontcolor=white:fontsize=31:x=54:y=h-106:box=1:boxcolor=0x061018@0.74:boxborderw=15[interior_scene];
[3:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1280:720,zoompan=z='min(zoom+0.00025,1.03)':x='iw/2-(iw/zoom/2)':y='ih*0.44-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,drawbox=x=0:y=0:w=1280:h=720:color=0x02101c@0.12:t=fill,drawtext=fontfile=${FONT_BOLD}:text='CityOS · CityAI':fontcolor=white:fontsize=35:x=54:y=h-112:box=1:boxcolor=0x061018@0.76:boxborderw=15,drawtext=fontfile=${FONT_REGULAR}:text='COORDINATED EXPERIENCE · INFORMED OPERATION':fontcolor=white:fontsize=22:x=56:y=h-48:box=1:boxcolor=0x061018@0.58:boxborderw=10[city];
[4:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1408:792:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.00042,1.052)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,vignette=PI/5,drawtext=fontfile=${FONT_BOLD}:text='CityGuard · CityConnect · CitySync':fontcolor=white:fontsize=30:x=(w-text_w)/2:y=h-108:box=1:boxcolor=0x061018@0.74:boxborderw=15,drawtext=fontfile=${FONT_REGULAR}:text='MONITORING · CONNECTED TEAMS · CONNECTED DATA':fontcolor=white:fontsize=22:x=(w-text_w)/2:y=h-46:box=1:boxcolor=0x061018@0.58:boxborderw=10[connected_scene];
[5:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1280:720,zoompan=z='min(zoom+0.00025,1.03)':x='iw*0.56-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='CONFIGURATOR + AR ROADMAP':fontcolor=white:fontsize=31:x=54:y=54:box=1:boxcolor=0x061018@0.74:boxborderw=15,drawtext=fontfile=${FONT_REGULAR}:text='PLAN CAPACITY · FINISHES · PLACEMENT':fontcolor=white:fontsize=23:x=56:y=124:box=1:boxcolor=0x061018@0.58:boxborderw=11[config_scene];
[8:v]trim=start=0:end=10,setpts=PTS-STARTPTS,fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='ENGINEERING & MANUFACTURING  ·  SINCE 2007':fontcolor=white:fontsize=30:x=54:y=h-104:box=1:boxcolor=0x061018@0.74:boxborderw=15[factory];
[6:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=720:-1,pad=1280:720:(ow-iw)/2:92:color=0x020817,tpad=stop_mode=clone:stop_duration=5,fps=30,trim=duration=5,setsar=1,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='HBOT CHAMBER TECH':fontcolor=white:fontsize=35:x=(w-text_w)/2:y=410,drawtext=fontfile=${FONT_REGULAR}:text='INTELLIGENT ENGINEERING. CONNECTED CONFIDENCE.':fontcolor=white:fontsize=27:x=(w-text_w)/2:y=478,drawtext=fontfile=${FONT_BOLD}:text='www.hbotchambertech.com':fontcolor=0x2bbfe8:fontsize=28:x=(w-text_w)/2:y=558,fade=t=out:st=4.5:d=0.5[end];
[presenter][hero_scene][interior_scene][city][connected_scene][config_scene][factory][end]concat=n=8:v=1:a=0,format=yuv420p[v];
[0:a]atrim=start=0:end=5,asetpts=PTS-STARTPTS,aresample=48000,volume=1.0[presenter_audio];
[7:a]asetpts=PTS-STARTPTS,atempo=${narration_speed},adelay=5000|5000,aresample=48000,volume=1.08[narration_audio];
[8:a]atrim=start=0:end=10,asetpts=PTS-STARTPTS,volume=0.30,afade=t=in:st=0:d=0.35,afade=t=out:st=9.4:d=0.6,adelay=25000|25000[factory_audio];
[presenter_audio][narration_audio][factory_audio]amix=inputs=3:duration=longest:dropout_transition=0,loudnorm=I=-16:LRA=7:TP=-1.5,alimiter=limit=0.95,apad=pad_dur=6,atrim=duration=40[a]"

  echo "Rendering ${model} V2..."
  "$FFMPEG" -hide_banner -loglevel warning -y \
    -i "$PRESENTER" -loop 1 -i "$hero" -loop 1 -i "$interior" \
    -loop 1 -i "$CITY_SCREEN" -loop 1 -i "$connected" -loop 1 -i "$config" \
    -loop 1 -i "$LOGO" -i "$narration" -i "$FACTORY" \
    -filter_complex "$filter" -map "[v]" -map "[a]" \
    -c:v libx264 -preset medium -crf 19 -profile:v high -level 4.1 \
    -c:a aac -ar 48000 -b:a 192k -movflags +faststart -t 40 "$output"
}

REAL="$ROOT/site/assets/img/models/real"
V2="$ROOT/video-production/model-films-v2"
MODELS="$ROOT/video-production/models"

build_model "oslo" "OSLO" "PRIVATE HORIZONTAL COMFORT" "ONE-PERSON LOUNGE · PERSONAL WELLNESS" \
  "$REAL/apex-lounge-real.webp" "$REAL/apex-lounge-ic.webp" "$REAL/lounge-bronz.webp" \
  "$V2/oslo-config-en.png" "$ROOT/video-production/model-films/oslo-model-film-en.mp3" "1.0"

build_model "tokyo" "TOKYO" "A COMFORTABLE SHARED EXPERIENCE" "TWO-PERSON SEATED CHAMBER" \
  "$REAL/apex-duo-real.webp" "$REAL/duo-interior.webp" "$REAL/duo-bronz.webp" \
  "$V2/tokyo-config-en.png" "$ROOT/video-production/model-films/tokyo-model-film-en.mp3" "1.0"

build_model "tokyo-plus" "TOKYO PLUS" "SCALABLE FOR PROFESSIONAL SETTINGS" "TWO TO FOUR SEATS · CLINICS · WELLNESS CENTRES" \
  "$MODELS/tokyo-plus.jpeg" "$REAL/duo-interior.webp" "$MODELS/tokyo-plus.webp" \
  "$V2/tokyo-plus-config-en.png" "$ROOT/video-production/model-films/tokyo-plus-model-film-en.mp3" "1.0"

build_model "milano" "MILANO" "PREMIUM MULTI-PERSON WELLNESS" "FOUR-PERSON INTERIOR · PROFESSIONAL CENTRES" \
  "$REAL/milan-cream.webp" "$REAL/apex-quad-cube-ic.webp" "$REAL/milan-bronz.webp" \
  "$V2/milano-config-en.png" "$ROOT/video-production/model-films/milano-model-film-en.mp3" "1.0"

build_model "dubai" "DUBAI" "PRIVATE WELLNESS, DESIGNED AROUND YOU" "PREMIUM SOFA · TV · PERSONALISED FINISHES" \
  "$ROOT/video-production/dubai/dubai-studio.jpeg" "$ROOT/video-production/dubai/dubai-interior-detail.png" "$ROOT/video-production/dubai/dubai-midnight-navy.png" \
  "$V2/dubai-config-en.png" "$ROOT/video-production/dubai/dubai-film-v2-en.mp3" "1.15"

echo "All remaining V2 model films rendered."
