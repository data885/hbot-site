#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FFMPEG="/private/tmp/hbot-video-tools/node_modules/ffmpeg-static/ffmpeg"
PRESENTER="$ROOT/video-production/presenter-opening-en.mp4"
LOGO="$ROOT/site/assets/img/logo-full.png"
FONT_BOLD="$ROOT/site/assets/fonts/NotoSans-Bold.ttf"
FONT_REGULAR="$ROOT/site/assets/fonts/NotoSans-Regular.ttf"

if [[ ! -x "$FFMPEG" ]]; then
  echo "FFmpeg renderer is missing: $FFMPEG" >&2
  exit 1
fi

build_film() {
  local slug="$1"
  local model="$2"
  local promise="$3"
  local scene_two="$4"
  local capacity="$5"
  local image_one="$6"
  local image_two="$7"
  local image_three="$8"
  local image_four="$9"
  local image_five="${10}"
  local narration="$ROOT/video-production/model-films/${slug}-model-film-en.mp3"
  local output="$ROOT/site/assets/video/${slug}-model-film-en.mp4"

  local filter
  filter="[0:v]trim=duration=8,setpts=PTS-STARTPTS,scale=1280:720,setsar=1,fps=30,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='HBOT CHAMBER TECH  ·  SINCE 2007':fontcolor=white:fontsize=24:x=48:y=h-58:box=1:boxcolor=0x061018@0.58:boxborderw=11[presenter];
[1:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1408:792:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.00040,1.05)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='${model}':fontcolor=white:fontsize=54:x=58:y=54:box=1:boxcolor=0x061018@0.70:boxborderw=17,drawtext=fontfile=${FONT_REGULAR}:text='${promise}':fontcolor=white:fontsize=25:x=60:y=145:box=1:boxcolor=0x061018@0.56:boxborderw=12[s1];
[2:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1408:792:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.00045,1.055)':x='iw-(iw/zoom)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='${scene_two}':fontcolor=white:fontsize=31:x=54:y=h-118:box=1:boxcolor=0x061018@0.72:boxborderw=15[s2];
[3:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1408:792:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.00042,1.052)':x='iw*0.54-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='${capacity}':fontcolor=white:fontsize=31:x=54:y=54:box=1:boxcolor=0x061018@0.72:boxborderw=15,drawtext=fontfile=${FONT_REGULAR}:text='ENGINEERED COMFORT · DISTINCTIVE FINISHES':fontcolor=white:fontsize=23:x=56:y=124:box=1:boxcolor=0x061018@0.56:boxborderw=11[s3];
[4:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1408:792:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.00045,1.055)':x='iw*0.59-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='CONFIGURATOR + AUGMENTED REALITY':fontcolor=white:fontsize=29:x=54:y=h-118:box=1:boxcolor=0x061018@0.72:boxborderw=15,drawtext=fontfile=${FONT_REGULAR}:text='VISUALISE BEFORE INSTALLATION':fontcolor=white:fontsize=23:x=56:y=h-53:box=1:boxcolor=0x061018@0.56:boxborderw=11[s4];
[5:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=1408:792:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.00040,1.05)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=30,setsar=1,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='CityOS · CityAI · CityGuard · CityConnect · CitySync':fontcolor=white:fontsize=27:x=(w-text_w)/2:y=h-118:box=1:boxcolor=0x061018@0.74:boxborderw=15,drawtext=fontfile=${FONT_REGULAR}:text='INTELLIGENT CONTROL · MONITORING · MOBILE ACCESS':fontcolor=white:fontsize=22:x=(w-text_w)/2:y=h-53:box=1:boxcolor=0x061018@0.58:boxborderw=11[s5];
[6:v]trim=start_frame=0:end_frame=1,setpts=PTS-STARTPTS,scale=720:-1,pad=1280:720:(ow-iw)/2:105:color=0x020817,tpad=stop_mode=clone:stop_duration=2.2,fps=30,trim=duration=2.2,setsar=1,format=yuv420p,drawtext=fontfile=${FONT_BOLD}:text='HBOT CHAMBER TECH':fontcolor=white:fontsize=35:x=(w-text_w)/2:y=420,drawtext=fontfile=${FONT_REGULAR}:text='INTELLIGENT ENGINEERING. CONNECTED CONFIDENCE.':fontcolor=white:fontsize=27:x=(w-text_w)/2:y=490,drawtext=fontfile=${FONT_BOLD}:text='www.hbotchambertech.com':fontcolor=0x2bbfe8:fontsize=28:x=(w-text_w)/2:y=565,fade=t=out:st=1.7:d=0.5[end];
[presenter][s1][s2][s3][s4][s5][end]concat=n=7:v=1:a=0,format=yuv420p[v];
[0:a]atrim=start=0:end=8,asetpts=PTS-STARTPTS,aresample=48000,volume=1.0[presenter_audio];
[7:a]asetpts=PTS-STARTPTS,adelay=8000|8000,aresample=48000,volume=1.08[narration];
[presenter_audio][narration]amix=inputs=2:duration=longest:dropout_transition=0,alimiter=limit=0.95,apad=pad_dur=4,atrim=duration=30.2[a]"

  echo "Rendering ${model}..."
  "$FFMPEG" -hide_banner -loglevel warning -y \
    -i "$PRESENTER" \
    -loop 1 -i "$image_one" \
    -loop 1 -i "$image_two" \
    -loop 1 -i "$image_three" \
    -loop 1 -i "$image_four" \
    -loop 1 -i "$image_five" \
    -loop 1 -i "$LOGO" \
    -i "$narration" \
    -filter_complex "$filter" \
    -map "[v]" -map "[a]" \
    -c:v libx264 -preset medium -crf 20 -profile:v high -level 4.1 \
    -c:a aac -b:a 192k -movflags +faststart -shortest "$output"
}

REAL="$ROOT/site/assets/img/models/real"
MODELS="$ROOT/video-production/models"

build_film "oslo" "OSLO" "PRIVATE HORIZONTAL COMFORT" "DESIGNED FOR PERSONAL WELLNESS" "ONE-PERSON HORIZONTAL CHAMBER" \
  "$REAL/apex-lounge-real.webp" "$REAL/lounge-antrasit.webp" "$REAL/lounge-bronz.webp" "$REAL/lounge-sampanya.webp" "$REAL/apex-lounge-ic.webp"

build_film "tokyo" "TOKYO" "A COMFORTABLE SHARED EXPERIENCE" "DESIGNED FOR TWO" "TWO-PERSON SEATED CHAMBER" \
  "$REAL/apex-duo-real.webp" "$REAL/duo-antrasit.webp" "$REAL/duo-bronz.webp" "$REAL/duo-sampanya.webp" "$REAL/duo-interior.webp"

build_film "tokyo-plus" "TOKYO PLUS" "SCALABLE FOR PROFESSIONAL SETTINGS" "CLINICS · HOSPITALS · WELLNESS CENTRES" "TWO TO FOUR SEATS" \
  "$MODELS/tokyo-plus.jpeg" "$MODELS/tokyo-plus.webp" "$REAL/duo-antrasit.webp" "$REAL/duo-gece-laciverti.webp" "$REAL/duo-interior.webp"

build_film "milano" "MILANO" "SPACIOUS PREMIUM WELLNESS" "DESIGNED FOR PROFESSIONAL CENTRES" "FOUR-PERSON INTERIOR" \
  "$REAL/milan-cream.webp" "$REAL/milan-antrasit.webp" "$REAL/milan-bronz.webp" "$REAL/milan-sage.webp" "$REAL/apex-quad-cube-ic.webp"

build_film "geneva" "GENEVA" "DEVELOPED FOR HOSPITALS AND MEDICAL CENTRES" "MODULAR CLINICAL WORKFLOW" "SIX OR MORE PEOPLE" \
  "$REAL/apex-nexus.webp" "$REAL/nexus-antrasit.webp" "$REAL/nexus-bronz.webp" "$REAL/nexus-sampanya.webp" "$REAL/apex-nexus-ic.webp"

echo "All model films rendered."
