"""Extracts TRANSLATIONS from site/assets/js/translations.js into real JSON,
using macOS's built-in JavaScript engine (osascript -l JavaScript) so we
never have to hand-parse JS object literals (unquoted keys, multi-line
strings, etc). Requires macOS.
"""
import json
import subprocess
import tempfile
import os

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRANSLATIONS_JS = os.path.join(REPO_ROOT, "site", "assets", "js", "translations.js")


def extract_translations():
    with open(TRANSLATIONS_JS, encoding="utf-8") as f:
        js_source = f.read()

    with tempfile.NamedTemporaryFile(mode="w", suffix=".js", delete=False, encoding="utf-8") as tf:
        tf.write(js_source)
        tf.write("\nJSON.stringify(TRANSLATIONS);\n")
        tmp_path = tf.name

    try:
        result = subprocess.run(
            ["osascript", "-l", "JavaScript", tmp_path],
            capture_output=True, text=True, check=True,
        )
    finally:
        os.unlink(tmp_path)

    return json.loads(result.stdout)


if __name__ == "__main__":
    data = extract_translations()
    print("Languages:", list(data.keys()))
    for lang, d in data.items():
        n_sections = len(d["contact"]["faq"]["sections"])
        n_items = sum(len(s["items"]) for s in d["contact"]["faq"]["sections"])
        n_posts = len(d["blog"]["posts"])
        print(f"  {lang}: {n_sections} FAQ sections, {n_items} FAQ items, {n_posts} blog posts")
