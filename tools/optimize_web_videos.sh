#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FFMPEG="/private/tmp/hbot-video-tools/node_modules/ffmpeg-static/ffmpeg"
VIDEO_DIR="$ROOT/site/assets/video"
WORK_DIR="$(mktemp -d /private/tmp/hbot-web-video.XXXXXX)"

cleanup() {
  rm -rf "$WORK_DIR"
}
trap cleanup EXIT

if [[ ! -x "$FFMPEG" ]]; then
  echo "FFmpeg renderer is missing: $FFMPEG" >&2
  exit 1
fi

shopt -s nullglob
videos=("$VIDEO_DIR"/*.mp4)
if (( ${#videos[@]} == 0 )); then
  echo "No MP4 files found in $VIDEO_DIR" >&2
  exit 1
fi

for source in "${videos[@]}"; do
  name="$(basename "$source")"
  output="$WORK_DIR/$name"
  before="$(stat -f '%z' "$source")"

  echo "Optimizing $name"
  "$FFMPEG" -hide_banner -loglevel warning -y -i "$source" \
    -map 0:v:0 -map "0:a:0?" \
    -c:v libx264 -preset slow -crf 24 -maxrate 1200k -bufsize 2400k \
    -profile:v high -level 4.0 -pix_fmt yuv420p \
    -c:a aac -b:a 128k -movflags +faststart "$output"

  "$FFMPEG" -hide_banner -loglevel error -i "$output" -f null -
  after="$(stat -f '%z' "$output")"

  if (( after >= before )); then
    echo "Keeping original $name (optimized copy was not smaller)"
    continue
  fi

  mv "$output" "$source"
  printf 'Saved %s: %.2f MB -> %.2f MB\n' "$name" \
    "$(awk -v b="$before" 'BEGIN { print b/1048576 }')" \
    "$(awk -v b="$after" 'BEGIN { print b/1048576 }')"
done

echo "Web video optimization complete."
