#!/usr/bin/env python3
"""Install the shared GA4 tag in every deployable HTML page.

The site is static and has both generated language pages and standalone SEO
landing pages, so a single page template cannot guarantee site-wide coverage.
This installer is deliberately idempotent: run it again after creating pages
or regenerating language variants.
"""
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SITE_DIR = REPO_ROOT / "site"
MEASUREMENT_ID = "G-C4BP4KX9FC"
GOOGLE_ADS_ID = "AW-18410338370"
LEGACY_GOOGLE_ADS_ID = "AW-1841038370"

TAG = f'''<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id={MEASUREMENT_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', '{MEASUREMENT_ID}');
  gtag('config', '{GOOGLE_ADS_ID}');
</script>
'''


def install() -> None:
    updated = 0
    already_present = 0
    ads_destination_added = 0
    ads_config = f"gtag('config', '{GOOGLE_ADS_ID}');"
    legacy_ads_config = f"gtag('config', '{LEGACY_GOOGLE_ADS_ID}');"
    for page in sorted(SITE_DIR.rglob("*.html")):
        html = page.read_text(encoding="utf-8")
        if legacy_ads_config in html:
            html = html.replace(legacy_ads_config, ads_config)
            page.write_text(html, encoding="utf-8")
            ads_destination_added += 1
            continue
        if MEASUREMENT_ID in html and ads_config in html:
            already_present += 1
            continue
        if MEASUREMENT_ID in html:
            html = html.replace(
                f"  gtag('config', '{MEASUREMENT_ID}');",
                f"  gtag('config', '{MEASUREMENT_ID}');\n  {ads_config}",
                1,
            )
            page.write_text(html, encoding="utf-8")
            ads_destination_added += 1
            continue
        if "<head>" not in html:
            raise ValueError(f"Cannot install GA4 tag; <head> is missing: {page}")
        page.write_text(html.replace("<head>", "<head>\n" + TAG, 1), encoding="utf-8")
        updated += 1
    print(
        "Google tag installed: "
        f"{updated} new, {ads_destination_added} Ads destinations added, "
        f"{already_present} already current."
    )


if __name__ == "__main__":
    install()
