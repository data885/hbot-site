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

LASTMOD = "2026-08-25"

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
    "guvenlik-uygunluk.html": "0.8",
}
CHANGEFREQ = {
    "index.html": "weekly", "modeller.html": "weekly", "konfigurator.html": "weekly",
    "blog.html": "weekly",
}

# English-language commercial landing pages that are intentionally outside
# the shared 7-language page set. They have self-referencing canonicals and
# should remain discoverable whenever the shared sitemap is regenerated.
EXTRA_URLS = [
    ("https://hbotchambertech.com/hiperbarik-oksijen-odasi-cozumleri.html", "2026-09-04", "weekly", "0.8"),
    ("https://hbotchambertech.com/en/hyperbaric-chamber-solutions.html", "2026-08-25", "weekly", "0.9"),
    ("https://hbotchambertech.com/en/multiplace-hyperbaric-chamber.html", "2026-08-25", "weekly", "0.8"),
    ("https://hbotchambertech.com/en/hyperbaric-chamber-for-clinics.html", "2026-08-25", "weekly", "0.8"),
]

# Sitemap'e girmeyen yardimci sayfalar: yasal metinler, hata sayfasi, ic araclar.
SITEMAP_EXCLUDE = {
    "404.html", "gizlilik-politikasi.html", "kullanim-sartlari.html",
    "ar-view.html", "tint_preview.html",
}


def discover_extra_pages():
    """ROOT_PAGES disinda kalan gercek sayfalari otomatik bulur.

    Blog yazilari ve SEO acilis sayfalari ROOT_PAGES'te degil; elle
    EXTRA_URLS'e eklenmedikleri surece sitemap'ten dusuyorlardi — 2026-09'da
    13 yazi x 7 dil bu yuzden disarida kalmisti. Artik dosya sisteminden
    kesfediliyorlar, yeni yazi eklenince sitemap kendiliginden kapsiyor."""
    elde = {u[0] for u in EXTRA_URLS}
    bulunan = []
    for lang in ALL_LANGS:
        klasor = SITE_DIR if lang == "tr" else os.path.join(SITE_DIR, lang)
        if not os.path.isdir(klasor):
            continue
        for ad in sorted(os.listdir(klasor)):
            if not ad.endswith(".html") or ad in ROOT_PAGES or ad in SITEMAP_EXCLUDE:
                continue
            loc = BASE_URL + ("/" if lang == "tr" else f"/{lang}/") + ad
            if loc in elde:
                continue
            bulunan.append((loc, LASTMOD, "monthly", "0.6"))
    return bulunan


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
    for loc, lastmod, changefreq, priority in list(EXTRA_URLS) + discover_extra_pages():
        lines.append("  <url>")
        lines.append(f"    <loc>{loc}</loc>")
        lines.append(f"    <lastmod>{lastmod}</lastmod>")
        lines.append(f"    <changefreq>{changefreq}</changefreq>")
        lines.append(f"    <priority>{priority}</priority>")
        lines.append("  </url>")
    lines.append("</urlset>")
    lines.append("")

    out_path = os.path.join(SITE_DIR, "sitemap.xml")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    n_urls = len("\n".join(lines).split("<loc>")) - 1
    print(f"sitemap.xml written with {n_urls} URLs "
          f"({len(ROOT_PAGES)} shared pages x {len(ALL_LANGS)} languages "
          f"+ {len(EXTRA_URLS) + len(discover_extra_pages())} standalone).")


if __name__ == "__main__":
    build_sitemap()
