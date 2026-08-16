#!/usr/bin/env python3
"""Writes lightweight redirect-stub pages at the OLD model-apex-*.html URLs
(root + all 6 language subfolders) pointing at the new model-{city}.html
URLs, so old bookmarks/backlinks/search-index entries don't 404 after the
Apex-name URL rename. Uses an instant meta-refresh + canonical link, which
Google treats equivalently to a permanent redirect for ranking-signal
transfer purposes.

Also handles the older model-apex-quad.html -> model-milano.html alias
(TR root only; was never generated in the language subfolders).

Run any time OLD_TO_NEW below changes. Safe to re-run (fully regenerates
each stub from scratch every time).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_i18n_pages import ALL_LANGS, resolve_url, BASE_URL
from extract_translations import extract_translations

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE_DIR = os.path.join(REPO_ROOT, "site")

# old filename -> (new filename, meta key for a sensible <title>)
OLD_TO_NEW = {
    "model-apex-solo-lounge.html": ("model-oslo.html", "soloLounge"),
    "model-apex-solo.html": ("model-dubai.html", "solo"),
    "model-apex-duo.html": ("model-tokyo.html", "duo"),
    "model-apex-duo-plus.html": ("model-tokyo-plus.html", "duoPlus"),
    "model-apex-quad-cube.html": ("model-milano.html", "quadCube"),
    "model-apex-nexus.html": ("model-geneva.html", "nexus"),
}
# Even-older double-alias, TR root only (never existed under /en/ /ru/ etc).
LEGACY_ROOT_ONLY = {
    "model-apex-quad.html": ("model-milano.html", "quadCube"),
}

STUB_TEMPLATE = """<!doctype html>
<html lang="{lang}" dir="{dir_}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="refresh" content="0; url={relative_new}" />
<link rel="canonical" href="{canonical}" />
<title>{title}</title>
</head>
<body>
<p><a href="{relative_new}">{title}</a></p>
</body>
</html>
"""


def write_stub(lang, old_filename, new_filename, title):
    dir_ = "rtl" if lang == "ar" else "ltr"
    canonical = resolve_url(lang, new_filename)
    prefix = "" if lang == "tr" else f"{lang}/"
    out_dir = os.path.join(SITE_DIR, prefix) if prefix else SITE_DIR
    out_path = os.path.join(out_dir, old_filename)
    html = STUB_TEMPLATE.format(
        lang=lang, dir_=dir_, relative_new=new_filename,
        canonical=canonical, title=title,
    )
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    return out_path


def build():
    translations = extract_translations()
    count = 0
    for old_filename, (new_filename, meta_key) in OLD_TO_NEW.items():
        for lang in ALL_LANGS:
            title = translations[lang]["meta"][meta_key]["title"]
            path = write_stub(lang, old_filename, new_filename, title)
            count += 1
            print(f"stub: {os.path.relpath(path, SITE_DIR)} -> {new_filename}")
    for old_filename, (new_filename, meta_key) in LEGACY_ROOT_ONLY.items():
        title = translations["tr"]["meta"][meta_key]["title"]
        path = write_stub("tr", old_filename, new_filename, title)
        count += 1
        print(f"stub: {os.path.relpath(path, SITE_DIR)} -> {new_filename}")
    print(f"\n{count} legacy redirect stubs written.")


if __name__ == "__main__":
    build()
