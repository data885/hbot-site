# i18n build tools

Generates the language-subfolder pages (`site/en/`, `site/ru/`, `site/ar/`,
`site/es/`, `site/pt/`, `site/de/`) from the Turkish root pages, baking in
real translated + pre-rendered content (FAQ, model grids, blog posts,
comparison tables, etc.) instead of leaving it to client-side JS — so each
language gets its own crawlable URL with real HTML for SEO/hreflang.

Turkish root pages (`site/*.html`) keep rendering client-side exactly like
before; the build only adds hreflang tags, root-relative asset paths, and
real `<a href>` language-switch links to them.

## When to re-run

Any time `site/assets/js/translations.js` changes (new/edited copy in any
language) **or** the structure of a root `site/*.html` template changes
(new section, new render container, new page), re-run:

```bash
python3 tools/build_i18n_pages.py   # regenerates all 72 language pages
python3 tools/patch_root_pages.py   # re-applies hreflang/asset-path/lang-link edits to the 13 TR root pages (safe to re-run, idempotent)
python3 tools/build_sitemap.py      # regenerates sitemap.xml with all 84 URLs + hreflang
```

Then bump the `?v=NN` cache-busting query param on `main.js`/`translations.js`/
`style.css` across all HTML files (root + generated) before deploying, e.g.:

```bash
find site -name "*.html" ! -name "tint_preview.html" -exec sed -i '' -E \
  's/main\.js\?v=[0-9]+/main.js?v=NN/g; s/translations\.js\?v=[0-9]+/translations.js?v=NN/g; s/style\.css\?v=[0-9]+/style.css?v=NN/g' {} +
```

## Requirements

- macOS (uses `osascript -l JavaScript` to safely evaluate the JS
  translations/constants objects into real JSON — no Node.js needed, and
  avoids hand-parsing JS object literals).
- Python 3, standard library only.

## Files

- `extract_translations.py` — evaluates `translations.js` via macOS's JS
  engine, returns the full 7-language dict as JSON.
- `extract_constants.py` — same trick for the specific `main.js` constants
  the renderers need (ICONS, MODEL_ORDER, MODEL_PRICING, etc.) without
  evaluating the whole file (which touches `document`/DOM).
- `renderers.py` — Python port of `main.js`'s `renderXxx(dict)` functions.
  **Keep in sync by hand**: if a render function's markup changes in
  `main.js`, update the matching function here.
- `build_i18n_pages.py` — main orchestrator; also defines `ROOT_PAGES`,
  `ALL_LANGS`, `resolve_url()` reused by the other scripts.
- `patch_root_pages.py` — the small, additive edit pass for the TR root
  pages (does not touch their JS-driven rendering).
- `build_sitemap.py` — regenerates `site/sitemap.xml`.

## Known scope limits (intentional)

- `konfigurator.html` only gets its static text baked in; the interactive
  pricing tool itself (model/pressure/addon/color pickers, summary,
  pricing) stays 100% client-JS-driven, same as it must be for an
  interactive tool. Not a gap — a deliberate scope boundary.
- `model-apex-quad.html` (legacy redirect to `model-apex-quad-cube.html`)
  and `404.html` are excluded from language-subfolder generation and from
  hreflang (they already have their own canonical/`noindex` handling).
