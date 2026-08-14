#!/usr/bin/env python3
"""Bakes real Turkish content into the ROOT site/*.html pages themselves —
not just the /en/ /ru/ /ar/ /es/ /pt/ /de/ subfolders. Without this, a
crawler that can't or doesn't run main.js sees near-empty pages: the FAQ,
model grids, spec tables, blog list, technology pillars etc. are all
JS-rendered into containers that are literally empty in the raw HTML.

This is purely additive for real visitors: main.js's render functions
overwrite these same containers unconditionally on page load, so a
JS-enabled browser sees identical behavior before and after. Root <head>
(title/meta/canonical/hreflang/JSON-LD) is left untouched — it's already
correct for tr and isn't part of this script's job.

Run: python3 tools/bake_root_pages.py
Re-run any time assets/js/translations.js or the root *.html pages change.
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from extract_translations import extract_translations
from extract_constants import extract_constants
from renderers import Renderers
from build_i18n_pages import (
    ROOT_PAGES, SITE_DIR,
    apply_data_i18n, apply_data_i18n_placeholder,
    render_page_containers,
)


def build():
    translations = extract_translations()
    constants = extract_constants()
    r = Renderers(constants)
    dict_ = translations["tr"]

    stats = {"written": 0}
    for filename in ROOT_PAGES:
        path = os.path.join(SITE_DIR, filename)
        with open(path, encoding="utf-8") as f:
            html = f.read()

        page_match = re.search(r'data-page="([\w-]+)"', html)
        page = page_match.group(1) if page_match else "home"
        model_match = re.search(r'data-model="([\w-]+)"', html)
        model_key = model_match.group(1) if model_match else None

        html = apply_data_i18n(html, dict_)
        html = apply_data_i18n_placeholder(html, dict_)
        html = render_page_containers(html, page, dict_, r, model_key)

        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        stats["written"] += 1

    print(f"Baked real TR content into {stats['written']} root pages.")


if __name__ == "__main__":
    build()
