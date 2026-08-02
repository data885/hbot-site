/* HBOT Recolor Engine (v10) — canvas tabanlı, luminance-preserving gerçek yeniden boyama.
   CSS filter (sepia/hue-rotate) yaklaşımının yerine: her piksel HSL'e çevrilir,
   hedef rengin hue+saturation'ı uygulanır, ORİJİNAL lightness korunur → gövde
   gerçek boya gibi görünür, gölge/parlama doğal kalır.
   Koruma kuralları:
   - Pişmiş amber/altın LED şeritleri (hue 25-60°, yüksek sat, parlak) DEĞİŞMEZ.
   - Çok koyu pikseller (cam açıklıkları, derin gölgeler) değişmez.
   - Maske alfası feather olarak uygulanır (sert kenar yok).
   Bu dosya hem tarayıcıda (window.HBOTRecolor) hem Node testlerinde çalışır. */
(function (g) {
  "use strict";

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function hexToHsl(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
    if (!m) return null;
    const n = parseInt(m[1], 16);
    return rgbToHsl(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
  }

  function rgbToHsl(r, g2, b) {
    const max = Math.max(r, g2, b), min = Math.min(r, g2, b);
    const l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h;
    if (max === r) h = ((g2 - b) / d + (g2 < b ? 6 : 0)) / 6;
    else if (max === g2) h = ((b - r) / d + 2) / 6;
    else h = ((r - g2) / d + 4) / 6;
    return [h * 360, s, l];
  }

  function hslToRgb(h, s, l) {
    h = ((h % 360) + 360) % 360 / 360;
    if (s === 0) { const v = clamp01(l); return [v, v, v]; }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const f = (t) => {
      t = ((t % 1) + 1) % 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    return [clamp01(f(h + 1 / 3)), clamp01(f(h)), clamp01(f(h - 1 / 3))];
  }

  /* Korunan piksel: değişime uğramaz, orijinali kalır.
     - Amber/altın LED: hue 25-60°, sat > 0.35, lightness > 0.5 (kabinin pişmiş LED şeritleri)
     - Çok koyu: cam açıklıklar ve derin gölgeler (l < 0.10) */
  function isProtectedPixel(h, s, l) {
    if (l < 0.10) return true;
    if (h >= 25 && h <= 60 && s > 0.35 && l > 0.5) return true;
    return false;
  }

  /* Tek piksel boya dönüşümü (koruma ve feather bu fonksiyonda YOK — recolorPixel'da).
     paint: { h, s, l, metal }
     - paint modu: hedef h+s uygulanır; lightness, hedef rengin L'sine ÖLÇEKLENİR
       (k = targetL / 0.65 — aksi halde bordo gibi koyu renkler açık gövdede
       pembeye döner). En parlak highlight'lar kısmen korunur (metalik parlaklık).
     - metal modu (mat siyah/antrasit/grafit/siyah/gri): düşük saturation + aynı
       L ölçekleme (daha agresif, 0.62 tabanlı). */
  function applyPaint(r, g2, b, paint) {
    const hsl = rgbToHsl(r, g2, b);
    const l0 = hsl[2];
    let h, s, l;
    const hi = clamp01((l0 - 0.80) / 0.20); // highlight koruma faktörü
    if (paint.metal) {
      const k = paint.l / 0.62;
      l = clamp01(l0 * (k + (1 - k) * hi));
      s = 0.05;
      h = paint.h;
    } else {
      h = paint.h;
      const k = paint.l / 0.65;
      l = clamp01(l0 * (k + (1 - k) * hi));
      const hl = clamp01((l0 - 0.85) / 0.15);
      s = clamp01(paint.s) * (1 - 0.55 * hl);
    }
    return hslToRgb(h, s, l);
  }

  /* Tam piksel işlemi: koruma kontrolü + boya + alfa feather.
     r,g,b: 0..1 — alpha: 0..1 maske kapsama. Dönüş: [r,g,b] 0..1. */
  function recolorPixel(r, g2, b, alpha, paint) {
    if (alpha <= 0) return [r, g2, b];
    const hsl = rgbToHsl(r, g2, b);
    if (isProtectedPixel(hsl[0], hsl[1], hsl[2])) return [r, g2, b];
    const out = applyPaint(r, g2, b, paint);
    const a = clamp01(alpha);
    return [r + (out[0] - r) * a, g2 + (out[1] - g2) * a, b + (out[2] - b) * a];
  }

  /* ImageData piksel dizisini yerinde işler.
     px: Uint8ClampedArray (RGBA). passes: [{ data: Uint8ClampedArray (maske RGBA,
     alfa kanalı kapsama), paint }] — sırayla uygulanır (örn. önce gövde, sonra koltuk). */
  function recolorImageData(px, passes) {
    const n = px.length;
    for (let i = 0; i < n; i += 4) {
      let r = px[i] / 255, g2 = px[i + 1] / 255, b = px[i + 2] / 255;
      for (let p = 0; p < passes.length; p++) {
        const pass = passes[p];
        const a = pass.data[i + 3] / 255;
        if (a <= 0.01) continue;
        const out = recolorPixel(r, g2, b, a, pass.paint);
        r = out[0]; g2 = out[1]; b = out[2];
      }
      px[i] = Math.round(r * 255);
      px[i + 1] = Math.round(g2 * 255);
      px[i + 2] = Math.round(b * 255);
    }
  }

  g.HBOTRecolor = {
    hexToHsl, rgbToHsl, hslToRgb,
    isProtectedPixel, applyPaint, recolorPixel, recolorImageData
  };
})(typeof window !== "undefined" ? window : globalThis);
