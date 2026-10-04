# Film motion repair — 2026-10-03 / 04

The eight MP4 assets used by the local site, Dubai V2 production master, and the
latest Dubai 34.5-second product cut have smooth still-image movement. The silent
version of the short cut uses the same repaired video stream.

`zoompan` previously rounded slowly moving crop coordinates to whole pixels.
Still scenes now use a floating-point affine transform (`perspective`) with cubic
interpolation, cosine easing and a 2560×1440 working image, reduced to 1280×720.
Titles are drawn after the motion transform and stay fixed. Scenes dissolve over
0.4 seconds. Padding keeps every transition centered on the original cut time;
the original audio is copied without shifting narration or captions.

Old versions are preserved locally in `video-production/motion-backups/2026-10-03/`.
Abandoned experimental edits are not referenced by the site and remain archived
as they were; this repair covers the delivered site assets and latest product cut.

The adapter renders one scene at a time before joining the finished 720p clips.
This avoids buffering multiple large still-image streams on a machine with limited
memory. It uses a system FFmpeg with `drawtext`, or the cached FFmpeg binary at
`~/Library/Caches/hbot-video-tools/ffmpeg`; `HBOT_FFMPEG` can override that path.

Rebuild in this checkout (existing movies supply the original audio):

```sh
bash tools/build_remaining_model_v2.sh
bash tools/build_geneva_v2.sh
python3 tools/build_dubai_smooth.py
python3 tools/build_brand_smooth.py
python3 tools/verify_smooth_videos.py
```

To rebuild selected models, set `HBOT_MODELS=tokyo,milano`, for example.
Removed original Milano film photos are recovered from Git into ignored production
sources; the current product-image/configurator assets are not changed.

Verification checks decoding, 30 fps constant frame rate, H.264 720p/YUV420,
original audio equality, duration and MP4 faststart. The result is written to
`audit/motion-fix/verification.json`. All 49 root/language pages use consistent
cache versions. Local browser playback was checked on the Oslo and Dubai pages.

An image-motion comparison on the Oslo hero (5.5–7.5 s, 384×384 crop) estimated
frame-to-frame displacement after removing its smooth trend. RMS residual dropped
from 0.828 px to 0.011 px. This is a local diagnostic for that crop, not a quality
score for all scenes. A side-by-side clip is in `audit/motion-fix/oslo-before-after.mp4`.

## Production release — 2026-10-04

The owner approved publishing this repair. The release is based on the current
remote `main` (`d9cc8a7f`), not on the stale local checkout. Recent menu,
configurator, pricing, model-photo, intro-film and content changes are retained.
The six model films use the current builders with the date-free text introduced
upstream. The homepage film keeps the upstream cleaned opening/manufacturing
inserts. No `SINCE 2007` overlay or deleted homepage badge is reintroduced.

All 49 root/language film references are bumped from v5 to v6; Dubai V2 is v2.
Original production MP4s are backed up locally before replacement. The unrelated
local cookie/legal commit and untracked experiments are not included in this
release. The release uses the existing Render auto-deploy on a normal, non-force
push to `main`.

## Homepage film colour revision — 2026-10-04

The Tokyo Plus shot around 13 seconds (10.8–14.8 s) uses the site's existing,
clean champagne/cream `tokyo-plus-real.webp`, replacing the blue production image.
The 4-second scene, fixed City Tech captions, subpixel zoom and centred dissolves
keep their timing. Clean presenter/manufacturing inserts come from the saved
pre-dissolve source to avoid compounding the previously rendered transitions;
the manufacturing tail stops before the old source's first blue frame.
Homepage film references are v7 in all seven root/language index pages.
