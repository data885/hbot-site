#!/usr/bin/env python3
"""Generates language-subfolder static pages (site/en/, site/ru/, site/ar/,
site/es/, site/pt/, site/de/) from the Turkish root pages as templates,
baking in real translated text + pre-rendered content (FAQ, model grids,
blog posts, comparison tables, etc.) so each language gets its own
crawlable URL with real HTML — not an empty JS-only shell.

Run: python3 tools/build_i18n_pages.py
Re-run this any time assets/js/translations.js or the root *.html pages
change. Requires macOS (uses `osascript -l JavaScript` to safely evaluate
the JS translation/constants objects into real JSON).
"""
import os
import re
import sys
import json

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from extract_translations import extract_translations
from extract_constants import extract_constants
from renderers import Renderers, format_price_eur

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE_DIR = os.path.join(REPO_ROOT, "site")
BASE_URL = "https://hbotchambertech.com"

ROOT_PAGES = [
    "index.html", "teknoloji.html", "modeller.html", "hbot-nedir.html",
    "blog.html", "konfigurator.html", "iletisim.html", "guvenlik-uygunluk.html",
    "distributorluk.html",
    "model-oslo.html", "model-dubai.html", "model-tokyo.html",
    "model-tokyo-plus.html", "model-milano.html", "model-geneva.html",
]
NON_TR_LANGS = ["en", "ru", "ar", "es", "pt", "de"]
ALL_LANGS = ["tr"] + NON_TR_LANGS
DIR_MAP = {"ar": "rtl"}  # everything else ltr (translations.js also carries `dir`, used as source of truth)

PAGE_META_KEY = {
    "home": "home", "technology": "technology", "models-overview": "models",
    "model-solo-lounge": "soloLounge", "model-solo": "solo", "model-duo": "duo", "model-duo-plus": "duoPlus",
    "model-quad": "quad", "model-quad-cube": "quadCube", "model-nexus": "nexus",
    "hbot-info": "hbotInfo", "trust-safety": "trustSafety", "blog": "blog", "configurator": "configurator", "contact": "contact", "distributor": "distributor",
}


def get_by_path(d, path):
    cur = d
    for part in path.split("."):
        if isinstance(cur, dict):
            if part not in cur:
                return None
            cur = cur[part]
        elif isinstance(cur, list) and part.isdigit():
            index = int(part)
            if index >= len(cur):
                return None
            cur = cur[index]
        else:
            return None
    return cur


def resolve_url(lang, filename):
    prefix = "" if lang == "tr" else f"{lang}/"
    if filename == "index.html":
        return f"{BASE_URL}/{prefix}" if prefix else f"{BASE_URL}/"
    return f"{BASE_URL}/{prefix}{filename}"


# ---------------- data-i18n text substitution ----------------
TAG_I18N_RE = re.compile(
    r'<([a-zA-Z0-9]+)((?:\s+[^<>]*?)?)\sdata-i18n="([\w.]+)"((?:\s+[^<>]*?)?)>(.*?)</\1>',
    re.DOTALL,
)


def apply_data_i18n(html, dict_):
    def repl(m):
        tag, pre_attrs, path, post_attrs, _old_content = m.groups()
        value = get_by_path(dict_, path)
        if value is None:
            return m.group(0)
        is_html = "data-i18n-html" in pre_attrs or "data-i18n-html" in post_attrs
        new_content = str(value).replace("\n", "<br>") if is_html else str(value)
        return f'<{tag}{pre_attrs} data-i18n="{path}"{post_attrs}>{new_content}</{tag}>'

    prev = None
    # run repeatedly: nested/adjacent matches on the same pass can shift offsets
    while prev != html:
        prev = html
        html = TAG_I18N_RE.sub(repl, html, count=0)
    return html


def apply_data_i18n_placeholder(html, dict_):
    def repl(m):
        path = m.group(1)
        value = get_by_path(dict_, path)
        if value is None:
            return m.group(0)
        return f'data-i18n-placeholder="{path}" placeholder="{str(value)}"'

    return re.sub(
        r'data-i18n-placeholder="([\w.]+)"(?:\s+placeholder="[^"]*")?',
        repl, html,
    )


# ---------------- container fill (JS render functions ported to Python) ----------------
def fill_container(html, container_id, inner_html):
    """Replace the contents of <tag id="container_id" ...>...</tag> (empty or not).
    Depth-aware: a naive non-greedy regex up to the first </tag> is wrong
    whenever the container's own children reuse the same tag name (e.g. a
    <div id="faq-list"> full of nested <div class="faq-item">) — it would
    match the FIRST child's closing tag instead of the container's own,
    truncating the write and leaving stale content trailing after it on
    every re-run against already-filled output. Track nesting depth instead."""
    open_re = re.compile(r'<([a-zA-Z0-9]+)\b[^<>]*\bid="' + re.escape(container_id) + r'"[^<>]*>')
    m = open_re.search(html)
    if not m:
        return html
    tag = m.group(1)
    start = m.end()
    tag_re = re.compile(r'<(/?)' + re.escape(tag) + r'\b[^<>]*?(/?)>')
    depth = 1
    end = None
    for tm in tag_re.finditer(html, start):
        if tm.group(2) == "/":  # self-closing, e.g. <div ... />
            continue
        if tm.group(1) == "/":
            depth -= 1
            if depth == 0:
                end = tm.start()
                break
        else:
            depth += 1
    if end is None:
        return html
    return html[:start] + inner_html + html[end:]


def fill_all_models_menu(html, r, dict_):
    """[data-models-menu] appears twice per page (header nav dropdown panel,
    footer models list) — nav one gets image thumbs, footer gets icon+label."""
    pattern = re.compile(
        r'(<(ul|div)\b[^<>]*\bdata-models-menu\b[^<>]*>)(.*?)(</\2>)', re.DOTALL,
    )

    def repl(m):
        opening = m.group(1)
        is_nav_panel = 'class="nav-dropdown-panel"' in opening
        return opening + r.models_menu(dict_, is_nav_panel) + m.group(4)

    return pattern.sub(repl, html)


def render_page_containers(html, page, dict_, r, model_key=None):
    html = fill_all_models_menu(html, r, dict_)
    html = fill_container(html, "stats-grid", r.stats(dict_))
    html = fill_container(html, "models-grid", r.models_grid(dict_))
    html = fill_container(html, "styles-grid", r.styles_teaser(dict_))
    html = fill_container(html, "why-grid", r.why_grid(dict_))
    html = fill_container(html, "celebs-grid", r.celebs_grid(dict_))
    html = fill_container(html, "market-grid", r.target_markets(dict_))
    html = fill_container(html, "indications-teaser-grid", r.series_grid(dict_))
    html = fill_container(html, "indications-grid", r.indications_grid(dict_))
    html = fill_container(html, "pillars-list", r.pillars(dict_))
    html = fill_container(html, "extra-badges", r.extra_badges(dict_))
    head, body = r.comparison_table(dict_)
    html = fill_container(html, "compare-table-head", head)
    html = fill_container(html, "compare-table-body", body)
    html = fill_container(html, "roadmap-grid", r.roadmap(dict_))
    html = fill_container(html, "cert-grid", r.certifications(dict_))
    html = fill_container(html, "model-compare-grid", r.model_compare_table(dict_))
    html = fill_container(html, "included-grid", r.included_grid(dict_))
    html = fill_container(html, "blog-post-list", r.blog_posts(dict_))
    html = fill_container(html, "faq-list", r.faq(dict_))
    if model_key:
        html = fill_container(html, "spec-list", r.specs(dict_, model_key))
        html = fill_container(html, "model-crosslinks", r.model_crosslinks(dict_, model_key))
        html = fill_container(html, "model-faq-list", r.model_faq(dict_, model_key))
    return html


# ---------------- head rebuild (title/meta/canonical/hreflang/JSON-LD) ----------------
def rebuild_head(html, lang, filename, meta_entry, dict_):
    title = meta_entry["title"] if meta_entry else "HBOT Chamber Tech"
    desc = meta_entry["desc"] if meta_entry else ""
    page_url = resolve_url(lang, filename)
    dir_ = dict_.get("dir", "ltr")

    html = re.sub(r'<html lang="[^"]*" dir="[^"]*">', f'<html lang="{lang}" dir="{dir_}">', html, count=1)
    html = re.sub(r'<title>[^<]*</title>', f'<title>{title}</title>', html, count=1)
    html = re.sub(r'(<meta name="description" content=")[^"]*(" />)', rf'\g<1>{desc}\g<2>', html, count=1)
    html = re.sub(r'(<meta property="og:title" content=")[^"]*(" />)', rf'\g<1>{title}\g<2>', html, count=1)
    html = re.sub(r'(<meta property="og:description" content=")[^"]*(" />)', rf'\g<1>{desc}\g<2>', html, count=1)
    html = re.sub(r'(<meta property="og:url" content=")[^"]*(" />)', rf'\g<1>{page_url}\g<2>', html, count=1)
    html = re.sub(r'(<link rel="canonical" href=")[^"]*(" />)', rf'\g<1>{page_url}\g<2>', html, count=1)
    html = re.sub(r'(<meta name="twitter:title" content=")[^"]*(" />)', rf'\g<1>{title}\g<2>', html, count=1)
    html = re.sub(r'(<meta name="twitter:description" content=")[^"]*(" />)', rf'\g<1>{desc}\g<2>', html, count=1)

    # hreflang alternates (7 langs + x-default -> tr)
    # Strip any hreflang block already present (the root TR template carries
    # its own correct 8-tag set) before inserting ours, or re-running this
    # against a template that already has hreflang tags doubles them.
    html = re.sub(r'<link rel="alternate" hreflang="[^"]*" href="[^"]*" />\n?', '', html)
    hreflang_lines = []
    for hl in ALL_LANGS:
        hreflang_lines.append(f'<link rel="alternate" hreflang="{hl}" href="{resolve_url(hl, filename)}" />')
    hreflang_lines.append(f'<link rel="alternate" hreflang="x-default" href="{resolve_url("tr", filename)}" />')
    hreflang_block = "\n".join(hreflang_lines) + "\n"
    html = html.replace('<meta name="theme-color" content="#0a0f14" />\n',
                         '<meta name="theme-color" content="#0a0f14" />\n' + hreflang_block, 1)

    # asset paths -> root-relative (works from any /xx/ subfolder or the root)
    # catches href/src, data-bg="assets/..., and inline style url('assets/...') alike
    html = re.sub(r'([\'"])assets/', r'\1/assets/', html)

    # JSON-LD: Organization description + Product name/description (inLanguage added)
    def org_json_repl(m):
        obj = json.loads(m.group(1))
        obj["inLanguage"] = lang
        if dict_.get("common", {}).get("footer", {}).get("about_text"):
            obj["description"] = dict_["common"]["footer"]["about_text"]
        return '<script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False) + '\n</script>'

    def product_json_repl(m):
        obj = json.loads(m.group(1))
        obj["inLanguage"] = lang
        obj["url"] = page_url
        if "offers" in obj:
            obj["offers"]["url"] = page_url
        if desc:
            obj["description"] = desc
        return '<script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False) + '\n</script>'

    ld_blocks = list(re.finditer(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', html, re.DOTALL))
    for m in reversed(ld_blocks):
        obj_preview = m.group(1)
        replacement = org_json_repl(m) if '"@type":"Organization"' in obj_preview else product_json_repl(m)
        html = html[:m.start()] + replacement + html[m.end():]

    return html


def fix_lang_switch_links(html, lang, filename):
    """Turn every lang-switch item — whether it's still the original
    <button type="button" data-lang="xx">XX</button> OR an already-converted
    <a ... data-lang="xx">XX</a> from a previous build run — into a fresh
    <a href="/xx/filename"> pointing at the sibling-language version of THIS
    SAME page, with is-active recomputed for the page actually being built.
    Matching already-converted anchors too makes this idempotent: re-running
    the generator against root templates that patch_root_pages.py already
    touched won't freeze in stale hrefs/active-state from whatever language
    the templates happened to be in."""
    def repl(m):
        code = m.group(1)
        label = m.group(2)
        href = resolve_url(code, filename).replace(BASE_URL, "")
        active = ' class="is-active"' if code == lang else ""
        return f'<a href="{href}"{active} data-lang="{code}">{label}</a>'

    html = re.sub(
        r'<(?:button[^>]*|a[^>]*)\bdata-lang="(\w+)"[^>]*>([^<]*)</(?:button|a)>',
        repl, html,
    )
    return re.sub(
        r'(<span class="lang-compact-current">)[^<]*(</span>)',
        rf'\g<1>{lang.upper()}\g<2>',
        html,
        count=1,
    )


def build():
    translations = extract_translations()
    constants = extract_constants()
    r = Renderers(constants)

    stats = {"written": 0}

    for filename in ROOT_PAGES:
        src_path = os.path.join(SITE_DIR, filename)
        with open(src_path, encoding="utf-8") as f:
            template = f.read()

        page_match = re.search(r'data-page="([\w-]+)"', template)
        page = page_match.group(1) if page_match else "home"
        model_match = re.search(r'data-model="([\w-]+)"', template)
        model_key = model_match.group(1) if model_match else None
        meta_key = PAGE_META_KEY.get(page, "home")

        for lang in NON_TR_LANGS:
            dict_ = translations[lang]
            meta_entry = dict_.get("meta", {}).get(meta_key)

            html = template
            html = apply_data_i18n(html, dict_)
            html = apply_data_i18n_placeholder(html, dict_)
            html = render_page_containers(html, page, dict_, r, model_key)
            html = rebuild_head(html, lang, filename, meta_entry, dict_)
            html = fix_lang_switch_links(html, lang, filename)

            out_dir = os.path.join(SITE_DIR, lang)
            os.makedirs(out_dir, exist_ok=True)
            out_path = os.path.join(out_dir, filename)
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(html)
            stats["written"] += 1

    print(f"Generated {stats['written']} pages across {len(NON_TR_LANGS)} languages ({len(ROOT_PAGES)} page types each).")


if __name__ == "__main__":
    build()
