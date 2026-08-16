#!/usr/bin/env python3
"""Regenerates site/sitemap.xml with all 7 language variants of every real
page, each entry carrying xhtml:link hreflang alternates (Google's
recommended supplementary signal alongside the on-page <link rel=alternate>
tags)."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_i18n_pages import ROOT_PAGES, ALL_LANGS, resolve_url, BASE_URL

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE_DIR = os.path.join(REPO_ROOT, "site")

LASTMOD = "2026-08-12"

PRIORITY = {
    "index.html": "1.0",
    "modeller.html": "0.9",
    "konfigurator.html": "0.9",
    "model-oslo.html": "0.8",
    "model-dubai.html": "0.8",
    "model-tokyo.html": "0.8",
    "model-tokyo-plus.html": "0.7",
    "model-milano.html": "0.8",
    "model-geneva.html": "0.8",
    "teknoloji.html": "0.7",
    "hbot-nedir.html": "0.7",
    "blog.html": "0.6",
    "iletisim.html": "0.6",
}
CHANGEFREQ = {
    "index.html": "weekly", "modeller.html": "weekly", "konfigurator.html": "weekly",
    "blog.html": "weekly",
}


def build_sitemap():
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
        'xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ]
    for filename in ROOT_PAGES:
        priority = PRIORITY.get(filename, "0.7")
        changefreq = CHANGEFREQ.get(filename, "monthly")
        for lang in ALL_LANGS:
            loc = resolve_url(lang, filename)
            lines.append("  <url>")
            lines.append(f"    <loc>{loc}</loc>")
            for hl in ALL_LANGS:
                lines.append(
                    f'    <xhtml:link rel="alternate" hreflang="{hl}" href="{resolve_url(hl, filename)}" />'
                )
            lines.append(
                f'    <xhtml:link rel="alternate" hreflang="x-default" href="{resolve_url("tr", filename)}" />'
            )
            lines.append(f"    <lastmod>{LASTMOD}</lastmod>")
            lines.append(f"    <changefreq>{changefreq}</changefreq>")
            lines.append(f"    <priority>{priority}</priority>")
            lines.append("  </url>")
    lines.append("</urlset>")
    lines.append("")

    out_path = os.path.join(SITE_DIR, "sitemap.xml")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    n_urls = len(ROOT_PAGES) * len(ALL_LANGS)
    print(f"sitemap.xml written with {n_urls} URLs ({len(ROOT_PAGES)} pages x {len(ALL_LANGS)} languages).")


if __name__ == "__main__":
    build_sitemap()
