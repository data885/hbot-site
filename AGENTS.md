# AGENTS.md — Yapay Zeka Asistanları İçin Çalışma Kuralları

Bu repoda birden fazla yapay zeka asistanı (Claude Code, ChatGPT vb.) ve repo sahibi
Mürsel birlikte çalışıyor. 2026-08-23'te iki asistan aynı anda `main.js`'i düzenlediği
için konfigüratörün gerçek renk fotoğrafı sistemi yanlışlıkla silindi ve canlı site
bozuldu. Bu dosya o tür çakışmaları önlemek için var. **Çalışmaya başlamadan önce oku.**

## Temel kurallar

1. **Başlamadan önce:** `git pull` yap ve son 5 commit mesajını oku (`git log --oneline -5`).
   Dokunacağın dosya son commitlerde geçiyorsa, üzerine yazmadan önce o commitin ne
   yaptığını anla.
2. **Bitirince:** işini küçük, açıklayıcı commitlerle hemen commit+push et. Uzun süre
   push edilmemiş yerel değişiklik bırakma — diğer asistan göremez ve ezer.
3. **Aynı anda tek asistan:** mümkünse repo üzerinde aynı anda yalnız bir asistan
   çalışsın. Mürsel iki asistanı paralel çalıştırıyorsa dosya alanları kesişmemeli.
4. **Deploy:** `main`'e push, Render üzerinden hbotchambertech.com'a otomatik deploy olur
   (`render.yaml`, yayın dizini `./site`). **Mürsel'in açık onayı olmadan push etme.**
5. **Cache-bust:** `site/assets/js/main.js`, `recolor.js`, `translations.js` veya
   `style.css`'i değiştirirsen, HTML'lerdeki `?v=NN` sürümünü tüm sayfalarda artır.
6. **Test:** yayına almadan önce `python3 -m http.server --directory site` ile yerelde
   konfigüratörü elden geçir (model + renk kombinasyonları).

## Alan sahipliği

- **Konfigüratör motoru** — `site/assets/js/main.js`, `site/assets/js/recolor.js`,
  `site/assets/css/style.css`: Claude Code'un alanı. Başka asistan dokunacaksa önce
  Mürsel'e sorup son commitleri okusun.
- İçerik/çeviri metinleri (`translations.js`), PDF-video üretimi (`tools/`,
  `video-production/`), blog ve statik sayfa içerikleri: serbest alan — yine kural 1-2
  geçerli.

## Konfigüratör değişmezleri (v13 — bozma!)

- **Gerçek ürün fotoğrafı her zaman önceliklidir.** `REAL_STAGE_BY_COLOR` haritasındaki
  model+renk kombinasyonları gerçek render gösterir; bu harita devre dışı bırakılamaz.
- **Canvas boyama yalnız fallback'tir:** fotoğrafı olmayan renklerde ve sadece
  `EXT_PAINTABLE_MODELS` içindeki açık-zeminli modellerde (şu an yalnız Dubai/solo)
  çalışır. Koyu baz fotoğraflı modellerde (Oslo, Tokyo) boya kötü görünür — açma.
- **`pearl-white` asla boyanmaz** (EXT_PAINT_MODE'da null): modelin ham baz fotoğrafı
  gösterilir.
- **Fotoğrafı da doğrulanmış boyası da olmayan renkler seçiciden gizlenir**
  (`colorWorksFor`). Kusurlu olduğu için bilinçli dışlanan görseller: `milan-teal`
  (hayalet görüntü), `duo-gece-laciverti` / `duo-bordo` / `duo-zumrut` (camsı render).
  Bu renkleri geri açmak için önce düzgün render üretilmeli.
- Geneva (nexus) İnci Beyazı'na kilitli ve sahnede yalnız iç görünüm gösterir.
- Model değişiminde geçersiz kalan renk otomatik `pearl-white`'a döner
  (`resetModelVisualState` + `colorWorksFor`) — bu davranışı kaldırma.
