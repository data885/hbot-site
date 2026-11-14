"""Çözüm sayfalarını (kullanım alanına göre) üretir.

Kaynak: aşağıdaki LANGS sözlüğü (dil -> sayfa -> içerik). Üst/alt menü, mevcut
klinikler-icin-hiperbarik-oda.html şablonundan alınır ki site ile birebir aynı
kalsın. Sayfalar elle düzenlenmez — içerik burada değişir, betik yeniden çalışır:

    python3 tools/build_solutions.py

İddia disiplini: yalnız sitede zaten yayımlanmış ürün bilgileri (kapasite,
1,3–1,5 ATA, dış ölçüler, <60 dB, CityConnect, dahili yedek güç) kullanılır;
sağlık/tedavi vaadi yok. Ölçüsü doğrulanmamış modeller planlayıcıda kapalıdır.
"""
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent / "site"
BASE = "https://hbotchambertech.com"
IMG = "/assets/img/models/real/{}-real.webp?v=2"

# Sayfa kimliği -> dosya adı (tüm dillerde aynı ad; dil klasörü önüne eklenir)
FILES = {
    "hub": "cozumler.html",
    "home": "cozum-ev.html",
    "spa": "cozum-wellness-spa.html",
    "hotel": "cozum-otel.html",
    "gym": "cozum-spor-salonu.html",
}
SCENE = {"home": "home", "spa": "spa", "hotel": "hotel", "gym": "gym", "hub": "home"}
DEFAULT_MODEL = {"home": "solo-lounge", "spa": "solo", "hotel": "solo-lounge", "gym": "solo", "hub": "solo-lounge"}
MODEL_PAGE = {"oslo": "model-oslo.html", "dubai": "model-dubai.html", "tokyo": "model-tokyo.html",
              "tokyo-plus": "model-tokyo-plus.html", "milano": "model-milano.html", "geneva": "model-geneva.html"}
MODEL_NAME = {"oslo": "Oslo", "dubai": "Dubai", "tokyo": "Tokyo", "tokyo-plus": "Tokyo Plus",
              "milano": "Milano", "geneva": "Geneva"}

TR = {
    "home_crumb": "Ana Sayfa",
    "hub_crumb": "Çözümler",
    "cards": {
        "home": {"title": "Ev ve kişisel kullanım", "text": "Kendi programınıza göre, evinizde kişisel bir kabin. Kompakt tek kişilik modeller.", "img": "oslo", "models": "Oslo · Dubai"},
        "spa": {"title": "Wellness ve spa", "text": "Spa menünüze çift ya da grup seansı ekleyin; kabin adedini alanınıza göre planlayın.", "img": "milano", "models": "Tokyo · Milano · Dubai"},
        "hotel": {"title": "Oteller", "text": "Suit içinde ya da otel spa'sında misafirlere özel bir deneyim alanı.", "img": "tokyo", "models": "Oslo · Tokyo · Milano"},
        "gym": {"title": "Spor salonu ve performans", "text": "Kulüp, salon ve takım tesislerinde paylaşımlı kullanım için çok kişilik kabinler.", "img": "tokyo-plus", "models": "Tokyo Plus · Milano · Dubai"},
        "clinic": {"title": "Klinik ve hastane", "text": "Bireysel ve paylaşımlı tedavi odaları için proje planlaması.", "img": "geneva", "models": "Tokyo Plus · Geneva", "href": "klinikler-icin-hiperbarik-oda.html"},
    },
    "planner_eyebrow": "ODAMA SIĞAR MI?",
    "planner_title": "Kabini mekânınızda planlayın",
    "planner_text": "Ortamı ve modeli seçin, oda ölçülerinizi girin. Plan, kabini erişim payıyla birlikte yerleştirir ve nasıl sığdığını söyler. Birden fazla kabin için adedi artırın.",
    "steps_eyebrow": "SÜREÇ",
    "steps_title": "Keşiften ilk seansa, tek muhatap",
    "steps": [
        ("Keşif ve plan", "Kurulum alanı ölçülerini, fotoğrafları ve giriş güzergâhını birlikte değerlendiririz; uzaktan ya da yerinde."),
        ("Size özel üretim", "Model, dış renk ve iç döşemeyi konfigüratörde belirler, siparişte birlikte netleştiririz."),
        ("Kurulum ve devreye alma", "Kabini yerine kurar, testleri yapar ve kullanıma hazır teslim ederiz."),
        ("Eğitim ve destek", "Kullanım eğitimi verilir; CityConnect™ ile uzaktan izleme ve planlı servis devreye girer."),
    ],
    "cta_title": "Mekânınızı bize anlatın",
    "cta_text": "Oda ölçülerini, kullanım amacını ve beklenen kullanıcı sayısını iletin; uygun modeli ve yerleşimi birlikte belirleyelim.",
    "cta_btn": "Teklif İste",
    "cta_btn2": "Konfigüratöre Git",
    "models_eyebrow": "BU ALAN İÇİN MODELLER",
    "model_more": "Model detayları",
    "faq_eyebrow": "SIK SORULANLAR",
    "pages": {
        "hub": {
            "title": "Hiperbarik Kabin Çözümleri: Ev, Spa, Otel, Spor Salonu | HBOT Chamber Tech",
            "desc": "Kullanım alanınıza göre hiperbarik kabin: ev, wellness ve spa, otel, spor salonu ve klinik. Kabinin mekânınıza sığıp sığmadığını plan üzerinde görün.",
            "eyebrow": "ÇÖZÜMLER",
            "h1": "Her mekâna uygun bir hiperbarik kabin",
            "lead": "Evinizin bir odası, bir spa, otel suiti ya da spor salonu — alanınızı ve kullanım şeklinizi anlatın, uygun modeli ve yerleşimi birlikte planlayalım.",
            "grid_eyebrow": "KULLANIM ALANLARI",
            "grid_title": "Kabininizi nerede kullanacaksınız?",
        },
        "home": {
            "title": "Ev Tipi Hiperbarik Kabin | Evde Kişisel Kullanım | HBOT Chamber Tech",
            "desc": "Eviniz için tek kişilik hiperbarik kabin: Oslo (yatarak) ve Dubai (oturarak). Oda ölçünüzü girin, kabinin sığıp sığmadığını plan üzerinde görün.",
            "eyebrow": "ÇÖZÜMLER / EV VE KİŞİSEL KULLANIM",
            "h1": "Eviniz için kişisel bir hiperbarik kabin",
            "lead": "Üyelik, randevu ve yol yok. Seansınızı kendi programınıza göre, evinizin sessizliğinde planlayın.",
            "facts": [("1,3–1,5 ATA", "Çalışma basıncı"), ("<60 dB", "CitySilent™ ses seviyesi"), ("~1,3 m²", "Dubai taban alanı"), ("1 kişi", "Yatarak ya da oturarak")],
            "intro_title": "Evin en kişisel odası",
            "intro": [
                "Ev tipi bir kabin, seansı günlük rutinin bir parçası yapar: sabah güne başlamadan ya da akşam ev sessizleştiğinde.",
                "Oslo tek kişilik ve tamamen yatay kullanılır; 200×80 cm ortopedik yatağıyla uzun seanslarda rahat bir pozisyon sunar. Dubai oturarak kullanılan kompakt modeldir; 120×110 cm taban alanıyla bir oda köşesine yerleşebilir.",
            ],
            "features": [
                ("Yaşam alanına uyum", "Dış renk ve iç döşeme konfigüratörde seçilir; kabin bir tesise değil, evinize göre hazırlanır."),
                ("Kolay kullanım", "Dokunmatik ekran kontrolüyle seansı başlatmak, izlemek ve bitirmek basittir."),
                ("Bağlı ve izlenebilir", "CityConnect™ standarttır: uzaktan izleme, anlık uyarılar ve bulut yedekleme."),
                ("Mühendislikle güvenli", "Havacılık sınıfı alüminyum gövde, çift emniyet valfi ve dahili yedek güç kaynağı."),
            ],
            "models": ["oslo", "dubai"],
            "faq": [
                ("Evde ne kadar alana ihtiyacım var?", "Kabinin dış ölçüsü ve çevresindeki erişim payı belirleyicidir. Dubai 120×110 cm, Oslo 240×110 cm dış ölçüye sahiptir. Yukarıdaki planlayıcıda oda ölçünüzü girerek yaklaşık yerleşimi görebilirsiniz; kesin yerleşim keşifte netleşir."),
                ("Kabin kapımdan geçer mi?", "Giriş güzergâhı ve kapı genişliği keşifte kontrol edilir. Ölçüleri, fotoğrafları ve kat planını paylaşmanız değerlendirmeyi hızlandırır."),
                ("Çalışırken ne kadar ses çıkarır?", "Oslo ve Dubai'de ses seviyesi 60 dB'nin altındadır (CitySilent™)."),
                ("Elektrik kesilirse ne olur?", "Tüm modeller, elektrik kesintisine karşı dahili yedek güç kaynağıyla standart olarak gelir."),
                ("Ev için hangi model uygun?", "Yatarak kullanım isteniyorsa Oslo, daha küçük bir taban alanı ve oturarak kullanım isteniyorsa Dubai öne çıkar. İki kişilik kullanım için Tokyo değerlendirilebilir."),
            ],
        },
        "spa": {
            "title": "Spa ve Wellness Merkezleri için Hiperbarik Kabin | HBOT Chamber Tech",
            "desc": "Spa ve wellness merkezleri için tek, çift ve dört kişilik hiperbarik kabinler. Kaç kabinin alanınıza sığdığını plan üzerinde deneyin.",
            "eyebrow": "ÇÖZÜMLER / WELLNESS VE SPA",
            "h1": "Spa menünüze hiperbarik bir deneyim ekleyin",
            "lead": "Tek kişilik kabinden dört kişilik premium kabine kadar; seans yoğunluğunuza ve alanınıza göre ölçeklendirin.",
            "facts": [("1–4 kişi", "Kabin başına kapasite"), ("1,3–1,5 ATA", "Çalışma basıncı"), ("<60 dB", "Sessiz çalışma"), ("CityConnect™", "Uzaktan izleme")],
            "intro_title": "Misafiriniz için yeni bir ritüel",
            "intro": [
                "Wellness merkezlerinde kabin, masaj ve dinlenme alanlarının yanında ayrı bir deneyim olarak konumlanır. Çift kabinler (Tokyo) eşler ve arkadaşlar için, dört kişilik Milano grup seansları için uygundur.",
                "Kaç kabin gerektiği, günlük seans sayınıza ve alanınıza bağlıdır. Planlayıcıda kabin adedini artırarak aynı odaya kaç kabinin erişim payıyla sığdığını görebilirsiniz.",
            ],
            "features": [
                ("Ölçeklenebilir", "Tek kabinle başlayın, talep arttıkça aynı alana ya da yan odaya yeni kabin ekleyin."),
                ("Markanıza uygun", "Dış renk, iç döşeme ve aydınlatma, spa'nızın tasarım diline göre seçilir."),
                ("Operasyon kolaylığı", "Dokunmatik kontrol ve CityConnect™ ile seanslar izlenir, uyarılar anında görülür."),
                ("Sessiz ve kesintisiz", "<60 dB ses seviyesi ve dahili yedek güç kaynağı standarttır."),
            ],
            "models": ["tokyo", "milano", "dubai"],
            "faq": [
                ("Spa'm için kaç kabin gerekir?", "Günlük seans hedefinizi, seans süresini ve çalışma saatlerinizi paylaşın; kabin adedini ve yerleşimi birlikte hesaplayalım. Planlayıcı, alanınıza kaç kabinin sığdığını önceden görmenizi sağlar."),
                ("Çok kişilik kabin mi, birden fazla tek kişilik kabin mi?", "Grup ve çift seansları öne çıkıyorsa Tokyo veya Milano, kişiye özel programlar öne çıkıyorsa birden fazla Dubai daha esnektir. Karma kurulum da mümkündür."),
                ("Kabin spa'nın tasarımına uyar mı?", "Dış renk ve iç döşeme konfigüratörde seçilir; özel talepler siparişte birlikte belirlenir."),
            ],
        },
        "hotel": {
            "title": "Oteller için Hiperbarik Kabin | Wellness Suit ve Otel Spa | HBOT Chamber Tech",
            "desc": "Otel suitleri ve otel spa'ları için hiperbarik kabin. Kabinin odanıza nasıl yerleştiğini plan üzerinde görün, misafirlerinize özel bir deneyim sunun.",
            "eyebrow": "ÇÖZÜMLER / OTELLER",
            "h1": "Otelinizde misafirlere özel bir hiperbarik deneyim",
            "lead": "Bir wellness suitinin parçası olarak ya da otel spa'sında; kabin, misafir deneyiminizi farklılaştıran bir alan olur.",
            "facts": [("1–4 kişi", "Kabin başına kapasite"), ("<60 dB", "Sessiz çalışma"), ("Size özel", "Renk ve döşeme"), ("CityConnect™", "Uzaktan izleme")],
            "intro_title": "Suit içinde ya da spa'da",
            "intro": [
                "Wellness suitlerinde tek ya da çift kişilik kabin (Oslo, Tokyo) odanın bir parçası olarak tasarlanabilir. Otel spa'larında ise Milano gibi çok kişilik kabinler grup seanslarına imkân verir.",
                "Planlayıcıda otel odası ortamını seçerek kabinin yatak ve oturma alanıyla birlikte nasıl yerleştiğini görebilirsiniz.",
            ],
            "features": [
                ("İç mimariye uyum", "Dış renk ve iç döşeme otelinizin konseptine göre seçilir."),
                ("Misafir dostu kullanım", "Dokunmatik ekranla seans kolayca başlatılır; personel CityConnect™ ile uzaktan izler."),
                ("Sessiz çalışma", "<60 dB ses seviyesi, oda ve spa ortamının sakinliğini korur."),
                ("Kesintisiz hizmet", "Dahili yedek güç kaynağı standarttır; planlı servis programı sunulur."),
            ],
            "models": ["oslo", "tokyo", "milano"],
            "faq": [
                ("Kabin otel odasına sığar mı?", "Planlayıcıda oda ölçünüzü girerek yaklaşık yerleşimi görebilirsiniz. Kesin yerleşim, taşıma güzergâhı ve kapı geçişi keşifte teyit edilir."),
                ("Suit için hangi model uygun?", "Tek kişilik yatarak kullanım için Oslo, çiftler için Tokyo öne çıkar. Spa alanında grup seansları için Milano değerlendirilebilir."),
                ("Bakım ve servis nasıl işliyor?", "Kurulum, devreye alma, personel eğitimi ve bakım kapsamı proje planında belgelenir."),
            ],
        },
        "gym": {
            "title": "Spor Salonları ve Kulüpler için Hiperbarik Kabin | HBOT Chamber Tech",
            "desc": "Spor salonları, kulüpler ve takım tesisleri için tek ve çok kişilik hiperbarik kabinler. Salonunuza kaç kabin sığdığını plan üzerinde deneyin.",
            "eyebrow": "ÇÖZÜMLER / SPOR SALONU VE PERFORMANS",
            "h1": "Salonunuz ve takımınız için hiperbarik kabin",
            "lead": "Üyelerinize ya da sporcularınıza sunacağınız seans alanını, salonunuzun yerleşimine göre planlayın.",
            "facts": [("1–4 kişi", "Kabin başına kapasite"), ("1,3–1,5 ATA", "Çalışma basıncı"), ("CityConnect™", "Uzaktan izleme"), ("Yedek güç", "Standart")],
            "intro_title": "Yoğun kullanım için planlanmış",
            "intro": [
                "Kulüp ve salonlarda kabin, aynı anda birden fazla kişinin kullanabileceği şekilde planlanır. Tokyo Plus ve Milano paylaşımlı seanslar, Dubai ise kişiye özel seanslar için uygundur.",
                "Planlayıcıda spor salonu ortamını seçin, kabin adedini artırın ve koşu bantları ile ağırlık alanının yanında kaç kabinin erişim payıyla sığdığını görün.",
            ],
            "features": [
                ("Paylaşımlı kapasite", "Çok kişilik kabinlerle aynı seansta birden fazla kullanıcı."),
                ("Ölçeklenebilir kurulum", "Üye sayınız arttıkça yeni kabin ekleyin; yerleşimi baştan planlayın."),
                ("İzlenebilir operasyon", "CityConnect™ ile seanslar ve uyarılar uzaktan izlenir."),
                ("Dayanıklı yapı", "Havacılık sınıfı alüminyum gövde ve çift emniyet valfi."),
            ],
            "models": ["tokyo-plus", "milano", "dubai"],
            "faq": [
                ("Salonuma kaç kabin sığar?", "Planlayıcıda salon ölçünüzü girip kabin adedini artırarak görebilirsiniz. Kesin yerleşim ve teknik altyapı keşifte netleşir."),
                ("Takım tesisi için hangi model uygun?", "Aynı anda birden fazla sporcu için Tokyo Plus veya Milano, bireysel programlar için Dubai öne çıkar."),
                ("Sporcular neden hiperbarik kabine yöneliyor?", "Konuyu kaynaklarıyla ele aldığımız yazımızda okuyabilirsiniz: Sporcular neden hiperbarik odaya yöneliyor?"),
            ],
            "faq_link": ("sporcular-hiperbarik-oda.html", 2),
        },
    },
}

CONTENT = pathlib.Path(__file__).resolve().parent / "solutions_content"
LANG_ORDER = ["tr", "en", "ru", "ar", "es", "pt", "de"]
# Klinik kartı: yalnız TR'de klinik sayfası, EN'de ayrı İngilizce sayfa var; ötekiler Geneva'ya gider
CLINIC_HREF = {"tr": "klinikler-icin-hiperbarik-oda.html", "en": "hyperbaric-chamber-for-clinics.html"}


def load_langs():
    langs = {"tr": TR}
    for lang in LANG_ORDER[1:]:
        f = CONTENT / f"{lang}.json"
        if f.exists():
            langs[lang] = json.loads(f.read_text())
    for lang, t in langs.items():
        t["cards"]["clinic"]["href"] = CLINIC_HREF.get(lang, "model-geneva.html")
    return langs


LANGS = load_langs()


def esc(s):
    return html.escape(s, quote=True)


def page_url(lang, key):
    return f"{BASE}/{FILES[key]}" if lang == "tr" else f"{BASE}/{lang}/{FILES[key]}"


def template(lang):
    """Aynı dildeki guvenlik-uygunluk.html: üst menü, dil seçici, alt bilgi ve
    <head> ortak parçaları (gtag, ikonlar, stil, Organization) buradan alınır."""
    src = ((ROOT if lang == "tr" else ROOT / lang) / "guvenlik-uygunluk.html").read_text()
    head_start = src.index("<head>") + len("<head>")
    head_end = src.index("</head>")
    drop = re.compile(r'^\s*(<title>|<meta name="description"|<meta name="robots"|<meta property="og:|<meta name="twitter:|<link rel="canonical"|<link rel="alternate" hreflang)')
    lines = src[head_start:head_end].split("\n")
    at = next(i for i, l in enumerate(lines) if "<title>" in l)
    kept_before = [l for l in lines[:at] if not drop.match(l)]
    kept_after = [l for l in lines[at:] if not drop.match(l)]
    body_open = re.search(r"<body[^>]*>", src)
    header = src[body_open.end(): src.index("<main>")]
    footer = src[src.index("</main>") + len("</main>"):]
    return src[:head_start], "\n".join(kept_before), "\n".join(kept_after), header, footer


def head(lang, key, page, t):
    url = page_url(lang, key)
    home = BASE + "/" if lang == "tr" else f"{BASE}/{lang}/"
    img = f"{BASE}{IMG.format(t['cards'].get(key, {}).get('img', 'milano'))}"
    crumbs = [{"@type": "ListItem", "position": 1, "name": t["home_crumb"], "item": home}]
    if key != "hub":
        crumbs.append({"@type": "ListItem", "position": 2, "name": t["hub_crumb"], "item": page_url(lang, "hub")})
    crumbs.append({"@type": "ListItem", "position": len(crumbs) + 1, "name": page["h1"], "item": url})
    ld_faq = ""
    if page.get("faq"):
        ld_faq = '\n  <script type="application/ld+json">\n  ' + json.dumps({
            "@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in page["faq"]]
        }, ensure_ascii=False) + "\n  </script>"
    alternates = "\n".join(f'  <link rel="alternate" hreflang="{l}" href="{page_url(l, key)}" />' for l in LANG_ORDER if l in LANGS)
    meta = f"""  <title>{esc(page['title'])}</title>
  <meta name="description" content="{esc(page['desc'])}" />
  <meta name="robots" content="index,follow" />
  <link rel="canonical" href="{url}" />
{alternates}
  <link rel="alternate" hreflang="x-default" href="{page_url("tr", key)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="HBOT Chamber Tech" />
  <meta property="og:title" content="{esc(page['title'])}" />
  <meta property="og:description" content="{esc(page['desc'])}" />
  <meta property="og:url" content="{url}" />
  <meta property="og:image" content="{img}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{esc(page['title'])}" />
  <meta name="twitter:description" content="{esc(page['desc'])}" />
  <meta name="twitter:image" content="{img}" />
"""
    crumbs_ld = json.dumps({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": crumbs}, ensure_ascii=False)
    return meta, crumbs_ld, ld_faq


def card(href, img, title, text, models, alt=""):
    p = f"<p>{esc(text)}</p>" if text else ""
    return f"""          <a class="solution-card" href="{href}">
            <img src="{IMG.format(img)}" alt="{esc(alt)}" loading="lazy" width="640" height="400" />
            <div class="solution-card-body"><h3>{esc(title)}</h3>{p}<span class="solution-card-models">{esc(models)}</span></div>
          </a>"""


def planner(key, t, alt=False):
    return f"""    <section class="section{' section--alt' if alt else ''}" id="odama-sigar-mi">
      <div class="container">
        <div class="section-head"><span class="eyebrow">{esc(t['planner_eyebrow'])}</span><h2>{esc(t['planner_title'])}</h2><p>{esc(t['planner_text'])}</p></div>
        <div data-room-fit data-scene="{SCENE[key]}" data-model="{DEFAULT_MODEL[key]}"></div>
      </div>
    </section>"""


def steps(t):
    items = "\n".join(f"          <li><h3>{esc(a)}</h3><p>{esc(b)}</p></li>" for a, b in t["steps"])
    return f"""    <section class="section section--alt">
      <div class="container">
        <div class="section-head"><span class="eyebrow">{esc(t['steps_eyebrow'])}</span><h2>{esc(t['steps_title'])}</h2></div>
        <ol class="step-list">
{items}
        </ol>
      </div>
    </section>"""


def cta(t):
    return f"""    <section class="section">
      <div class="container" style="text-align:center;max-width:760px;">
        <h2>{esc(t['cta_title'])}</h2>
        <p style="margin-top:12px;">{esc(t['cta_text'])}</p>
        <div class="hero-actions" style="justify-content:center;margin-top:24px;">
          <a class="btn btn-primary" href="iletisim.html#contact-form">{esc(t['cta_btn'])}</a>
          <a class="btn btn-outline-dark" href="konfigurator.html">{esc(t['cta_btn2'])}</a>
        </div>
      </div>
    </section>"""


def page_header(key, page, t):
    crumb = f'<a href="index.html">{esc(t["home_crumb"])}</a><span aria-hidden="true">/</span>'
    if key != "hub":
        crumb += f'<a href="{FILES["hub"]}">{esc(t["hub_crumb"])}</a><span aria-hidden="true">/</span><span class="current">{esc(t["cards"][key]["title"])}</span>'
    else:
        crumb += f'<span class="current">{esc(t["hub_crumb"])}</span>'
    return f"""    <section class="page-header">
      <div class="container">
        <div class="breadcrumb">{crumb}</div>
        <span class="eyebrow">{esc(page['eyebrow'])}</span>
        <h1>{esc(page['h1'])}</h1>
        <p>{esc(page['lead'])}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#odama-sigar-mi">{esc(t['planner_title'])}</a>
          <a class="btn btn-outline" href="iletisim.html#contact-form">{esc(t['cta_btn'])}</a>
        </div>
      </div>
    </section>"""


def detail(key, page, t):
    facts = "".join(f'<div class="spec-row"><span class="spec-label">{esc(b)}</span><span class="spec-value">{esc(a)}</span></div>' for a, b in page["facts"])
    intro = "".join(f"<p>{esc(p)}</p>" for p in page["intro"])
    feats = "\n".join(f'          <article class="value-card"><h3>{esc(a)}</h3><p>{esc(b)}</p></article>' for a, b in page["features"])
    models = "\n".join(card(MODEL_PAGE[m], m, MODEL_NAME[m], "", t["model_more"] + " →", MODEL_NAME[m]) for m in page["models"])
    link = page.get("faq_link")
    faq_items = []
    for i, (q, a) in enumerate(page["faq"]):
        ans = f'<a href="{link[0]}">{esc(a)}</a>' if link and link[1] == i else esc(a)
        faq_items.append(f'          <div class="faq-item"><h3>{esc(q)}</h3><div class="faq-answer"><p>{ans}</p></div></div>')
    faq_html = "\n".join(faq_items)
    return f"""    <section class="section">
      <div class="container overview-split">
        <div class="overview-text">
          <h2>{esc(page['intro_title'])}</h2>
          {intro}
        </div>
        <div class="spec-panel">
          <div class="spec-list">{facts}</div>
        </div>
      </div>
    </section>

{planner(key, t, alt=True)}

    <section class="section">
      <div class="container">
        <div class="value-grid value-grid--2">
{feats}
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head"><span class="eyebrow">{esc(t['models_eyebrow'])}</span></div>
        <div class="solution-grid">
{models}
        </div>
      </div>
    </section>

{steps(t)}

    <section class="section">
      <div class="container" style="max-width:820px;">
        <div class="section-head"><span class="eyebrow">{esc(t['faq_eyebrow'])}</span></div>
        <div class="faq-list">
{faq_html}
        </div>
      </div>
    </section>

{cta(t)}"""


def hub(page, t):
    cards = "\n".join(card(c.get("href", FILES.get(k, "")), c["img"], c["title"], c["text"], c["models"]) for k, c in t["cards"].items())
    return f"""    <section class="section">
      <div class="container">
        <div class="section-head"><span class="eyebrow">{esc(page['grid_eyebrow'])}</span><h2>{esc(page['grid_title'])}</h2></div>
        <div class="solution-grid solution-grid--5">
{cards}
        </div>
      </div>
    </section>

{planner('hub', t, alt=True)}

{steps(t)}

{cta(t)}"""


def build(lang, t):
    head_open, pre, post, header, footer = template(lang)
    out_dir = ROOT if lang == "tr" else ROOT / lang
    post = re.sub(r'<script type="application/ld\+json">\s*\{"@context":\s*"https://schema.org",\s*"@type":\s*"BreadcrumbList".*?</script>\n?', "", post, flags=re.S)
    for key, page in t["pages"].items():
        meta, crumbs, ld_faq = head(lang, key, page, t)
        body = hub(page, t) if key == "hub" else detail(key, page, t)
        # dil seçici bu sayfanın kendi dil karşılıklarına gitsin
        hdr = re.sub(r'href="(/(?:[a-z]{2}/)?)guvenlik-uygunluk\.html"(?=[^>]*data-lang=)', lambda mm: f'href="{mm.group(1)}{FILES[key]}"', header)
        doc = (head_open + pre.rstrip() + "\n" + meta + post.strip("\n") +
               f'\n  <script type="application/ld+json">\n  {crumbs}\n  </script>{ld_faq}\n'
               '  <link rel="stylesheet" href="/assets/css/room-fit.css?v=3" />\n</head>\n'
               f'<body data-page="solutions">{hdr}<main>\n{page_header(key, page, t)}\n\n{body}\n</main>{footer}')
        doc = doc.replace("</body>", '  <script src="/assets/js/room-fit.js?v=4"></script>\n</body>', 1)
        (out_dir / FILES[key]).write_text(doc)
        print("yazıldı:", (out_dir / FILES[key]).relative_to(ROOT.parent))


if __name__ == "__main__":
    for lang, t in LANGS.items():
        build(lang, t)
