#!/usr/bin/env python3
"""CSS filter zincirlerini SVG feColorMatrix esdegerleriyle birebir uygulayip
maske uzerinden baza bindiren onizleme uretici (Chrome'suz kalibrasyon).
Matrisler sRGB uzayinda uygulanir — CSS filter spec ile ayni."""
import sys
from pathlib import Path
import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(sys.executable).parent.parent.parent))
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

SITE = Path(__file__).resolve().parent.parent / "site"
MODELS = SITE / "assets" / "img" / "models"

I3 = np.eye(3)
LUM = np.array([0.2126, 0.7152, 0.0722])

def m_grayscale(a):
    L = np.tile(LUM, (3, 1))
    return (1 - a) * I3 + a * L

SEPIA = np.array([[0.393, 0.769, 0.189],
                  [0.349, 0.686, 0.168],
                  [0.272, 0.534, 0.131]])

def m_sepia(a):
    return (1 - a) * I3 + a * SEPIA

def m_saturate(s):
    return np.array([
        [0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s],
        [0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s],
        [0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s]])

def m_brightness(b):
    return b * I3

def m_hue_rotate(deg):
    r = np.radians(deg)
    c, s = np.cos(r), np.sin(r)
    return np.array([
        [0.213 + c * 0.787 - s * 0.213, 0.715 - c * 0.715 - s * 0.715, 0.072 - c * 0.072 + s * 0.928],
        [0.213 - c * 0.213 + s * 0.143, 0.715 + c * 0.285 + s * 0.140, 0.072 - c * 0.072 - s * 0.283],
        [0.213 - c * 0.213 - s * 0.787, 0.715 - c * 0.715 + s * 0.715, 0.072 + c * 0.928 + s * 0.072]])

def apply_chain(rgb, steps):
    """steps: (matrix, offset) listesi — soldan saga uygulanir."""
    out = rgb
    for M, off in steps:
        out = out @ M.T + off
    return np.clip(out, 0.0, 1.0)

def chain_grays_dark(gray, bri, con=None):
    steps = [(m_grayscale(gray), 0), (m_brightness(bri), 0)]
    if con:
        steps.append((con * I3, 0.5 - 0.5 * con))
    return steps

def chain_color(gray, hue, sat, bri):
    return [(m_grayscale(gray), 0), (m_sepia(1), 0), (m_hue_rotate(hue), 0),
            (m_saturate(sat), 0), (m_brightness(bri), 0)]

def chain_warm(gray, sep, sat, bri, hue=None):
    steps = [(m_grayscale(gray), 0), (m_sepia(sep), 0), (m_saturate(sat), 0), (m_brightness(bri), 0)]
    if hue is not None:
        steps.insert(2, (m_hue_rotate(hue), 0))
    return steps

def render(img_name, mask_name, steps, out_size=340):
    base = Image.open(MODELS / f"{img_name}.webp").convert("RGB")
    mask = Image.open(MODELS / f"{mask_name}.png").convert("RGBA")
    if mask.size != base.size:
        mask = mask.resize(base.size, Image.LANCZOS)
    b = np.asarray(base, dtype=np.float64) / 255.0
    a = np.asarray(mask, dtype=np.float64)[:, :, 3:4] / 255.0
    if steps is None:
        return b
    f = apply_chain(b, steps)
    return b * (1 - a) + f * a

BORDO = chain_color(0.8, -50, 3.2, 0.45)
LACIVERT = chain_color(0.8, 190, 3.0, 0.5)
ZUMRUT = chain_color(0.8, 100, 2.6, 0.5)
BRONZ = chain_color(0.8, -22, 2.4, 0.5)
KONYAK = chain_color(0.6, -15, 2.0, 0.7)
SAMPANYA = chain_warm(0.4, 0.7, 2.0, 1.0)
KUM_BEJI = chain_warm(0.5, 0.6, 1.6, 0.95)
KREM = chain_warm(0.4, 0.4, 1.3, 1.05)
MAT_SIYAH = chain_grays_dark(0.8, 0.32, 1.1)
ANTRASIT = chain_grays_dark(0.8, 0.5, 1.05)
GRAFIT = chain_grays_dark(0.8, 0.7)

CASES = [
    ("IC orijinal (cream/null)", "real/apex-nexus-ic", "masks/int-nexus", None),
    ("IC Kum Beji", "real/apex-nexus-ic", "masks/int-nexus", KUM_BEJI),
    ("IC Konyak", "real/apex-nexus-ic", "masks/int-nexus", KONYAK),
    ("IC Antrasit", "real/apex-nexus-ic", "masks/int-nexus", ANTRASIT),
    ("IC Bordo", "real/apex-nexus-ic", "masks/int-nexus", BORDO),
    ("IC Lacivert", "real/apex-nexus-ic", "masks/int-nexus", LACIVERT),
    ("KOLTUK Konyak", "real/apex-nexus-ic", "masks/seat-nexus", KONYAK),
    ("KOLTUK Krem", "real/apex-nexus-ic", "masks/seat-nexus", KREM),
    ("KOLTUK Siyah", "real/apex-nexus-ic", "masks/seat-nexus", MAT_SIYAH),
    ("KOLTUK Lacivert", "real/apex-nexus-ic", "masks/seat-nexus", LACIVERT),
    ("KOLTUK Bordo", "real/apex-nexus-ic", "masks/seat-nexus", BORDO),
    ("KOLTUK Gri", "real/apex-nexus-ic", "masks/seat-nexus", GRAFIT),
    ("DIS Bronz (duo/amber baz)", "spin/duo/frame-00", "masks/spin-duo", BRONZ),
    ("DIS Bronz (nexus)", "spin/nexus/frame-00", "masks/spin-nexus", BRONZ),
    ("DIS Sampanya (duo)", "spin/duo/frame-00", "masks/spin-duo", SAMPANYA),
]

out_path = Path(__file__).resolve().parent / "tint_v9_int1.png"
cols = 3
rows = (len(CASES) + cols - 1) // cols
fig, axes = plt.subplots(rows, cols, figsize=(11, 3.6 * rows), facecolor="#1c2430")
for i, ax in enumerate(axes.flat):
    ax.set_facecolor("#0d1319")
    ax.axis("off")
    if i >= len(CASES):
        continue
    label, img, mask, steps = CASES[i]
    ax.imshow(render(img, mask, steps))
    ax.set_title(label, color="white", fontsize=9, loc="left")
fig.tight_layout(pad=0.6)
fig.savefig(out_path, dpi=100, facecolor=fig.get_facecolor(), bbox_inches="tight")
print("OK", out_path)
