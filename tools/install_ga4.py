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

TAG = f'''<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id={MEASUREMENT_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', '{MEASUREMENT_ID}');
</script>
'''


def install() -> None:
    updated = 0
    already_present = 0
    for page in sorted(SITE_DIR.rglob("*.html")):
        html = page.read_text(encoding="utf-8")
        if MEASUREMENT_ID in html:
            already_present += 1
            continue
        if "<head>" not in html:
            raise ValueError(f"Cannot install GA4 tag; <head> is missing: {page}")
        page.write_text(html.replace("<head>", "<head>\n" + TAG, 1), encoding="utf-8")
        updated += 1
    print(f"GA4 tag installed: {updated} updated, {already_present} already present.")


if __name__ == "__main__":
    install()
