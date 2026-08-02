#!/bin/bash
# Geçici önizleme sunucusu + headless Chrome ekran görüntüsü
# Kullanım: bash audit/preview_shot.sh <html_dosyasi> <cikti_png> <genislik> <yukseklik>
set -u
HTML="$1"; OUT="$2"; W="${3:-1100}"; H="${4:-860}"
cd "$(dirname "$0")/../site" || exit 1
pkill -f "http.server 8977" 2>/dev/null
python3 -m http.server 8977 >/dev/null 2>&1 &
SRV=$!
sleep 2
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-first-run \
  --window-size="$W,$H" --screenshot="$OUT" \
  --virtual-time-budget=8000 "http://localhost:8977/$HTML" >/dev/null 2>&1
kill $SRV 2>/dev/null
pkill -f "http.server 8977" 2>/dev/null
ls -la "$OUT"
