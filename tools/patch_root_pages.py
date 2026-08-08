#!/usr/bin/env python3
"""Small, additive edits to the 13 Turkish root pages (site/*.html) — the
live, already-proven pages. Does NOT touch their rendering mechanism
(still 100% client-side JS, unchanged). Only adds:
  - hreflang alternate links (7 langs + x-default) in <head>
  - asset paths -> root-relative (/assets/...) so they resolve identically
    whether the visitor is at root or in a /xx/ subfolder
  - lang-switch <button> -> real <a href="/xx/page.html"> links
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_i18n_pages import ROOT_PAGES, ALL_LANGS, resolve_url, BASE_URL

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE_DIR = os.path.join(REPO_ROOT, "site")

# model-apex-quad.html is a legacy redirect page; 404.html is noindex —
# both still get the asset-path + lang-switch-link fix for consistency
# (needed so assets resolve correctly even when reached via a /xx/ path),
# but no hreflang block (canonical/robots already handle those correctly).
ALL_ROOT_FILES = ROOT_PAGES + ["model-apex-quad.html", "404.html"]
NO_HREFLANG = {"model-apex-quad.html", "404.html"}


def add_hreflang(html, filename):
    if 'rel="alternate" hreflang' in html:
        return html  # already patched, don't duplicate on re-run
    lines = []
    for hl in ALL_LANGS:
        lines.append(f'<link rel="alternate" hreflang="{hl}" href="{resolve_url(hl, filename)}" />')
    lines.append(f'<link rel="alternate" hreflang="x-default" href="{resolve_url("tr", filename)}" />')
    block = "\n".join(lines) + "\n"
    marker = '<meta name="theme-color" content="#0a0f14" />\n'
    if marker not in html:
        return html
    return html.replace(marker, marker + block, 1)


def fix_asset_paths(html):
    # catches href="assets/..., src="assets/..., data-bg="assets/... and
    # inline style="background-image:url('assets/...')" alike
    return re.sub(r'([\'"])assets/', r'\1/assets/', html)


def fix_lang_switch(html, filename):
    def repl(m):
        code = m.group(1)
        label = m.group(2)
        href = resolve_url(code, filename).replace(BASE_URL, "")
        active = ' class="is-active"' if code == "tr" else ""
        return f'<a href="{href}"{active} data-lang="{code}">{label}</a>'

    return re.sub(r'<button type="button" data-lang="(\w+)">([^<]*)</button>', repl, html)


def patch():
    count = 0
    for filename in ALL_ROOT_FILES:
        path = os.path.join(SITE_DIR, filename)
        with open(path, encoding="utf-8") as f:
            html = f.read()
        original = html
        if filename not in NO_HREFLANG:
            html = add_hreflang(html, filename)
        html = fix_asset_paths(html)
        html = fix_lang_switch(html, filename)
        if html != original:
            with open(path, "w", encoding="utf-8") as f:
                f.write(html)
            count += 1
            print(f"patched: {filename}")
        else:
            print(f"no change: {filename}")
    print(f"\n{count} root files patched.")


if __name__ == "__main__":
    patch()
