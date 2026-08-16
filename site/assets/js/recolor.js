/* HBOT Recolor Engine (v11) — model-profili tabanlı "akıllı boya".
   v10'daki maske+tek kural yaklaşımının yerine: her görsel/model için piksel
   piksel "boyanma ağırlığı" (0..1) hesaplanır. Ağırlık, pikselin parlaklık (L) ve
   doygunluk (S) değerlerinden türetilir — böylece:
   - Gövde (açık, düşük-orta doygun) TAM boyanır,
   - Koltuk/iç mekân (koyu veya çok doygun) korunur,
   - Amber LED'ler (doygun) ve cam/ekran (koyu veya soğuk tonlu) korunur,
   - Arka plan (koyu, renksiz) korunur.
   Boya: hedef hue+sat uygulanır; lightness hedef L'ye %55 ölçeklenir (koyu renkler
   açık gövdede pembeye dönmez), en parlak yansımalar kısmen korunur (metalik his).
   Profiller:
   - "plain"     : Nexus medikal (beyaz gövde) — düşük sat pikseller boyanır.
   - "ledlit-duo": Duo premium (krem gövde + amber LED + açık kapı) — L-eşikli,
                   koltuk korumalı, soğuk ton (cam/ekran) korumalı.
   - "ledlit-qc" : Quad-Cube (beyaz gövde + mor/amber LED) — L-eşikli, cool kapalı.
   - "masked"    : Real fotoğraflar (Lounge ailesi, QC-2) — offline maske ile sınırlı.
   Eski maske-tabanlı API (interior/seat boyama) korunur. */
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

  function smoothstep(x, a, b) {
    const t = clamp01((x - a) / (b - a));
    return t * t * (3 - 2 * t);
  }

  /* ---- Model profilleri ----
     lLo/lHi   : boyanmaya başlama/tam boyanma L eşiği
     satLo/satHi : bu S bandında boyama %85 azalır (LED/doygun iç mekân koruması)
     cool      : soğuk ton (cam/ekran) katsayısı (1 = kapalı)
     seat      : [satMin, lMax] — koltuk koruması (çarpan 0.10) */
  const PROFILES = {
    "plain":      { lLo: 0.25, lHi: 0.35, satLo: 0.20, satHi: 0.32, cool: 1.0, seat: null },
    "ledlit-duo": { lLo: 0.30, lHi: 0.42, satLo: 0.45, satHi: 0.75, cool: 0.25, seat: [0.34, 0.55] },
    "ledlit-qc":  { lLo: 0.38, lHi: 0.46, satLo: 0.50, satHi: 0.80, cool: 1.0, seat: null },
    "masked":     { lLo: 0.25, lHi: 0.33, satLo: 0.45, satHi: 0.75, cool: 0.25, seat: null }
  };

  /* px: Uint8ClampedArray RGBA. profile: string. maskData: opsiyonel Uint8ClampedArray
     (maske RGBA — alfa kanalı ağırlıkla çarpılır, "masked" profili).
     Dönüş: Float32Array (piksel başına 0..1 boyanma ağırlığı). */
  function computeWeight(px, profile, maskData) {
    const p = PROFILES[profile] || PROFILES.plain;
    const n = px.length / 4;
    const w = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const j = i * 4;
      const hsl = rgbToHsl(px[j] / 255, px[j + 1] / 255, px[j + 2] / 255);
      const h = hsl[0], s = hsl[1], l = hsl[2];
      let wi = smoothstep(l, p.lLo, p.lHi) * (1 - 0.85 * smoothstep(s, p.satLo, p.satHi));
      if (wi > 0) {
        if (p.cool < 1 && h >= 170 && h <= 280 && s > 0.10) wi *= p.cool;
        if (p.seat && s > p.seat[0] && l < p.seat[1]) wi *= 0.10;
        if (maskData) wi *= maskData[j + 3] / 255;
      }
      w[i] = wi;
    }
    return w;
  }

  /* Boya dönüşümü: hedef h+s; lightness hedef L etrafında sıkıştırılmış varyasyon
     (açık kabinlarda pembeye kaçmayı önler); highlight korumalı.
     paint: { h, s, l, metal } — metal: mat metalik renkler (düşük sat). */
  function paintPixel(r, g2, b, paint) {
    const hsl = rgbToHsl(r, g2, b);
    const l0 = hsl[2];
    const hi = clamp01((l0 - 0.78) / 0.22);
    let h, s, l;
    if (paint.metal) {
      l = clamp01(paint.l + (l0 - 0.55) * 0.35 + 0.05 * hi);
      s = 0.05;
      h = paint.h;
    } else {
      h = paint.h;
      l = clamp01(paint.l + (l0 - 0.55) * 0.30 + 0.05 * hi);
      s = clamp01(paint.s) * (1 - 0.40 * hi);
    }
    return hslToRgb(h, s, l);
  }

  /* Ağırlıklı boyama: px yerinde değiştirilir. weight: Float32Array (computeWeight). */
  function applyWeightedPaint(px, weight, paint) {
    const n = px.length / 4;
    for (let i = 0; i < n; i++) {
      const wi = weight[i];
      if (wi <= 0.01) continue;
      const j = i * 4;
      const r = px[j] / 255, g2 = px[j + 1] / 255, b = px[j + 2] / 255;
      const out = paintPixel(r, g2, b, paint);
      px[j] = Math.round((r + (out[0] - r) * wi) * 255);
      px[j + 1] = Math.round((g2 + (out[1] - g2) * wi) * 255);
      px[j + 2] = Math.round((b + (out[2] - b) * wi) * 255);
    }
  }

  /* ---- v10 uyumluluk: maske-tabanlı boyama (interior + koltuk renkleri) ----
     Not: eskiden burada "amber LED koruması" için h 25-60/s>0.35/l>0.5 aralığı
     da korunuyordu — ama koltuk/döşemenin kendi doğal kahve/camel deri tonu
     TAM bu aralığa düşüyor, bu yüzden deri kendi highlight'larında rastgele
     boyanmamış lekeler kalıyordu (yamalı, amatör görünüm). Maske zaten hangi
     pikselin koltuk/duvar olduğunu tanımlıyor — ayrıca bir renk-bazlı filtreye
     gerek yok.
     Çok koyu pikseller (ekipman/monitör gövdesi gibi) TAMAMEN atlanmıyor artık —
     eski hard-skip (l<0.10 ise hiç boyama) kapitone dikiş oyuklarının/derin
     kırışıklıkların (bu fotoğraflarda genelde sıcak/kahverengi gölge, saf siyah
     değil) boyanmadan kalıp yeni renk dolgusunun içinde renkli benek gibi
     görünmesine yol açıyordu. Bunun yerine yumuşak bir koruma: en koyu piksel
     bile en az %30 oranında hedef rengine kayar (benek etkisini yok eder),
     l>=0.10'da tam boyama. */
  function protectionStrength(l) {
    return 1 - smoothstep(l, 0, 0.10);
  }

  function recolorPixel(r, g2, b, alpha, paint) {
    if (alpha <= 0) return [r, g2, b];
    const hsl = rgbToHsl(r, g2, b);
    const protect = protectionStrength(hsl[2]);
    alpha = alpha * (1 - protect * 0.7);
    const out = paintPixel(r, g2, b, paint);
    const a = clamp01(alpha);
    return [r + (out[0] - r) * a, g2 + (out[1] - g2) * a, b + (out[2] - b) * a];
  }

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
    computeWeight, applyWeightedPaint, paintPixel,
    protectionStrength, recolorPixel, recolorImageData
  };
})(typeof window !== "undefined" ? window : globalThis);
