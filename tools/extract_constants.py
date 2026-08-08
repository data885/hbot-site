"""Extracts specific `const NAME = {...};` / `const NAME = [...];` blocks from
main.js (brace-matched, order-independent) and evaluates them together via
macOS's JS engine to get real JSON — avoids hand-retyping large literals
like the SVG icon library and avoids evaluating the whole main.js (which
touches `document`/DOM and would fail outside a browser).
"""
import re
import subprocess
import tempfile
import os
import json

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAIN_JS = os.path.join(REPO_ROOT, "site", "assets", "js", "main.js")

WANTED = [
    "ICONS", "MODEL_ICON", "ADDON_ICON", "PILLAR_ICON", "MODEL_ORDER",
    "MODEL_KEY_MAP", "MODEL_PAGES", "MODEL_PRICING", "ADDON_PRICING",
    "STYLE_PRICING", "PRESSURE_RANGE", "SEAT_TIERS", "MODEL_CARD_IMG",
    "REAL_STAGE", "USAGE_MODELS",
]


def extract_block(source, name):
    m = re.search(r"const\s+" + re.escape(name) + r"\s*=\s*", source)
    if not m:
        raise ValueError(f"const {name} not found")
    start = m.end()
    opener = source[start]
    assert opener in "{[", f"{name}: expected {{ or [ after 'const {name} ='"
    closer = "}" if opener == "{" else "]"
    depth = 0
    i = start
    in_str = None
    while i < len(source):
        ch = source[i]
        if in_str:
            if ch == "\\":
                i += 2
                continue
            if ch == in_str:
                in_str = None
        elif ch in "\"'":
            in_str = ch
        elif ch == opener:
            depth += 1
        elif ch == closer:
            depth -= 1
            if depth == 0:
                return source[start:i + 1]
        i += 1
    raise ValueError(f"{name}: unterminated block")


def extract_constants():
    with open(MAIN_JS, encoding="utf-8") as f:
        source = f.read()

    js_lines = []
    for name in WANTED:
        block = extract_block(source, name)
        js_lines.append(f"const {name} = {block};")

    js_lines.append(
        "JSON.stringify({" + ", ".join(WANTED) + "});"
    )
    js_source = "\n".join(js_lines)

    with tempfile.NamedTemporaryFile(mode="w", suffix=".js", delete=False, encoding="utf-8") as tf:
        tf.write(js_source)
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
    data = extract_constants()
    for k in WANTED:
        v = data[k]
        if isinstance(v, dict):
            print(k, "-> dict with", len(v), "keys")
        elif isinstance(v, list):
            print(k, "-> list with", len(v), "items")
        else:
            print(k, "->", v)
