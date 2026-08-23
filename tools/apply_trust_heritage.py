#!/usr/bin/env python3
"""Idempotently add the trust centre, heritage story and sixth model copy."""
from pathlib import Path
import re

PATH = Path(__file__).resolve().parents[1] / "site/assets/js/translations.js"

LANGS = ["tr", "en", "ru", "ar", "es", "pt", "de"]

COPY = {
    "tr": {
        "nav": "Güvenlik & Uygunluk",
        "meta_title": "Güvenlik ve Uygunluk | HBOT Chamber Tech",
        "meta_desc": "Model ve hedef pazara göre ürün güvenliği, eğitim, bakım, kurulum ve uygunluk dokümanlarının şeffaf özeti.",
        "footer": "HBOT Chamber Tech yeni ve odaklı bir hiperbarik teknoloji markasıdır. Ekibinin yüksek mühendislik deneyimi 2007'ye, kurucularının ticari yolculuğu 1999'a uzanır.",
        "hero_subtitle": "HBOT Chamber Tech; yeni kurulmuş, hiperbarik teknolojiye odaklı bir markadır. 2007'ye uzanan yüksek mühendislik deneyimini bağlantılı yazılım, model bazlı güvenlik ve özenli tasarımla birleştirir.",
        "hero_trust": "İleri Mühendislik · Model Bazlı Güvenlik ve Uygunluk",
        "tech_text": "HBOT City Tech Serisi; CityConnect™, CityOS™, CityAI™, CitySync™ ve CityGuard™ bileşenlerini tek bir bağlantılı ürün mimarisinde bir araya getirir.",
        "models_subtitle": "Tek kişilik bireysel kullanımdan hastane ölçekli çoklu kabinlere kadar, ihtiyacınıza uygun altı farklı model.",
        "technology_intro": "HBOT City Tech platformu; CityConnect™, CityOS™, CityAI™, CitySync™ ve CityGuard™ bileşenlerini model ve doğrulanmış yazılım kapsamına göre birlikte çalışacak şekilde tasarlar. Özelliklerin kapsamı teklif ve teknik dosyada açıkça belirtilir.",
        "guard_subtitle": "Bağlantılı Durum ve Bakım Desteği",
        "why_items": [
            ("Bağlantılı Ürün Mimarisi", "CityConnect™, uygun konfigürasyonlarda kabin ve işletme verilerinin uzaktan izlenmesini destekler."),
            ("CityAI™ Karar Desteği", "CityAI™, yetkili operatörün yerine geçmeden operasyonel verileri anlamlandırmaya ve raporlamaya yardımcı olur."),
            ("Projeye Özel Entegrasyon", "CitySync™ arayüzleri, hastane ve işletme sistemleriyle entegrasyon kapsamına göre projelendirilir ve doğrulanır."),
            ("Bakım ve Servis Görünürlüğü", "CityGuard™, durum takibi, kayıtlı uyarılar ve planlı servis çalışmalarını destekler."),
        ],
        "heritage": '''heritage: {
      eyebrow: "KÖKLERİMİZ VE YENİ ODAĞIMIZ", title: "Yeni Bir Marka. Çeyrek Asrı Aşan Ticari Hafıza.",
      intro: "HBOT Chamber Tech yeni kurulmuş, odağı hiperbarik teknoloji olan bir markadır. Arkasındaki saha disiplini, ticari sorumluluk ve mühendislik birikimi ise yeni değildir.",
      steps: [
        { year: "1999", title: "Sahada Başlayan Ticari Yolculuk", desc: "Almita kurucularının ticari yolculuğu, katı atık yönetimi alanında gerçek saha problemlerine çözüm üretme sorumluluğuyla başladı." },
        { year: "2007", title: "Yüksek Mühendislik Birikimi", desc: "Bugün HBOT Chamber Tech'i geliştiren ekibin tasarım, üretim, otomasyon ve proje yönetimi deneyimi 2007'ye uzanıyor." },
        { year: "BUGÜN", title: "Hiperbarik Teknolojiye Odaklı Yeni Marka", desc: "Bu birikimi CityOS, CityGuard, CityConnect, CityAI, konfigüratör + AR ve model bazlı mühendislikle yeni nesil HBOT sistemlerine taşıyoruz." }
      ],
      proof_title: "Söylediğimizi proje dosyasında gösteriyoruz", proof_text: "Her projede ürün kapsamını, kurulum planını, eğitimi, bakımı ve hedef pazara göre uygunluk dokümanlarını yazılı olarak netleştiriyoruz.",
      partner_label: "GEÇİŞ DÖNEMİ KURUMSAL DESTEĞİ", partner_text: "HBOT Chamber Tech, marka yapılanmasının bu döneminde Almita Group'un ticari ve operasyonel ekosistemi tarafından desteklenmektedir."
    }''',
        "trust": '''trustSafety: {
      eyebrow: "GÜVENLİK VE UYGUNLUK", title: "Güveni Sloganla Değil, Dosyayla Kuruyoruz", subtitle: "Her modelin güvenlik, kullanım, eğitim, bakım ve hedef pazar uygunluğu ayrı değerlendirilir.",
      policy_title: "Güvenli kullanım yaklaşımımız", policy_intro: "Kurulum ve işletmede üretici talimatı, eğitimli operatör, hasta/kullanıcı izleme, yangın önleme, topraklama, temizlik ve periyodik bakım birlikte ele alınır.",
      policy_items: ["Üretici kullanım talimatına ve tanımlı kullanım amacına uyum", "Oksijen zengin ortamlar için yangın önleme ve malzeme kontrolü", "Topraklama, statik elektrik ve elektriksel güvenlik kontrolleri", "Yetkili personel eğitimi, kullanıcı izleme ve acil durum prosedürleri", "Temizlik, sarf malzemesi, bakım aralığı ve kayıtlı güvenlik kontrolleri"],
      docs_title: "Proje doküman paketi", docs_intro: "Aşağıdaki belgelerin kapsamı model, konfigürasyon, kullanım amacı ve hedef ülkeye göre teyit edilir.",
      docs: ["Ürün kimliği ve tanımlı kullanım amacı", "Model ve ülkeye özel uygunluk paketi", "Kullanım talimatı ve operatör eğitimi", "Bakım, temizlik ve servis planı", "Fabrika/kabul testleri, kurulum ve devreye alma", "Yangın güvenliği ve acil durum prosedürleri"],
      disclosure_title: "Düzenleyici açıklama", disclosure_text: "Mevzuat durumu, ürün sınıflandırması ve pazara sunulabilirlik model, konfigürasyon, kullanım amacı ve ülkeye göre değişir. HBOT Chamber Tech yalnız doğrulanmış model ve pazar kapsamı için uygunluk iddiasında bulunur; genel bir FDA onayı iddiası kullanmaz.",
      matrix_title: "Altı model, altı ayrı dosya", matrix_text: "Oslo, Dubai, Tokyo, Tokyo Plus, Milano ve Geneva için güncel teknik ve uygunluk paketini satış ekibimizden isteyin.",
      cta: "Model Dosyasını İste", updated: "Son gözden geçirme: Ağustos 2026"
    }''',
    },
    "en": {
        "nav": "Safety & Compliance", "meta_title": "Safety & Compliance | HBOT Chamber Tech", "meta_desc": "A transparent overview of model- and market-specific safety, training, maintenance, installation and compliance documentation.",
        "footer": "HBOT Chamber Tech is a newly established, focused hyperbaric technology brand. Its team's advanced engineering experience reaches back to 2007, and its founders' commercial journey to 1999.",
        "hero_subtitle": "HBOT Chamber Tech is a newly established brand focused on hyperbaric technology. It combines advanced engineering experience reaching back to 2007 with connected software, model-specific safety and considered design.",
        "hero_trust": "Advanced Engineering · Model-Specific Safety & Compliance",
        "tech_text": "The HBOT City Tech Series brings CityConnect™, CityOS™, CityAI™, CitySync™ and CityGuard™ together in one connected product architecture.",
        "models_subtitle": "Six models for individual, professional and hospital-scale requirements.",
        "technology_intro": "The HBOT City Tech platform is designed to bring CityConnect™, CityOS™, CityAI™, CitySync™ and CityGuard™ together according to the model and verified software scope. Included functionality is stated clearly in the proposal and technical file.",
        "guard_subtitle": "Connected Condition & Maintenance Support",
        "why_items": [
            ("Connected Product Architecture", "CityConnect™ supports remote visibility of chamber and operational data in compatible configurations."),
            ("CityAI™ Decision Support", "CityAI™ helps interpret and report operational data without replacing an authorized operator."),
            ("Project-Specific Integration", "CitySync™ interfaces are designed and verified to the agreed hospital or business-system integration scope."),
            ("Maintenance & Service Visibility", "CityGuard™ supports condition monitoring, recorded alerts and planned service work."),
        ],
        "heritage": '''heritage: {
      eyebrow: "OUR ROOTS, OUR NEW FOCUS", title: "A New Brand. More Than a Quarter-Century of Commercial Memory.",
      intro: "HBOT Chamber Tech is a newly established brand focused on hyperbaric technology. The field discipline, commercial responsibility and engineering knowledge behind it are not new.",
      steps: [
        { year: "1999", title: "A Commercial Journey Started in the Field", desc: "The founders of Almita began by solving real operational problems in solid-waste management." },
        { year: "2007", title: "Advanced Engineering Experience", desc: "The design, manufacturing, automation and project-management experience of the team behind HBOT Chamber Tech reaches back to 2007." },
        { year: "TODAY", title: "A New Brand Focused on Hyperbaric Technology", desc: "We bring that experience to next-generation HBOT systems through CityOS, CityGuard, CityConnect, CityAI, configurator + AR and model-specific engineering." }
      ],
      proof_title: "We document what we promise", proof_text: "For every project, we define product scope, installation, training, maintenance and target-market documentation in writing.",
      partner_label: "TRANSITION-PERIOD CORPORATE SUPPORT", partner_text: "During this stage of brand development, HBOT Chamber Tech is supported by Almita Group's commercial and operational ecosystem."
    }''',
        "trust": '''trustSafety: {
      eyebrow: "SAFETY & COMPLIANCE", title: "Trust Built with Documentation, Not Slogans", subtitle: "Safety, intended use, training, maintenance and target-market compliance are assessed separately for every model.",
      policy_title: "Our safe-use approach", policy_intro: "Installation and operation bring together manufacturer instructions, trained operators, monitoring, fire prevention, grounding, cleaning and scheduled maintenance.",
      policy_items: ["Follow the instructions for use and defined intended use", "Fire prevention and material control for oxygen-rich environments", "Grounding, static-electricity and electrical-safety checks", "Authorized staff training, monitoring and emergency procedures", "Cleaning, consumables, service intervals and recorded safety checks"],
      docs_title: "Project documentation package", docs_intro: "Scope is confirmed by model, configuration, intended use and destination market.",
      docs: ["Product identity and intended use", "Model- and country-specific compliance package", "Instructions for use and operator training", "Maintenance, cleaning and service plan", "Factory/acceptance tests, installation and commissioning", "Fire-safety and emergency procedures"],
      disclosure_title: "Regulatory disclosure", disclosure_text: "Regulatory status, classification and market availability vary by model, configuration, intended use and country. HBOT Chamber Tech makes compliance claims only for a verified model and market scope and does not make a blanket FDA-approval claim.",
      matrix_title: "Six models, six separate files", matrix_text: "Request the current technical and compliance package for Oslo, Dubai, Tokyo, Tokyo Plus, Milano and Geneva.",
      cta: "Request a Model File", updated: "Last reviewed: August 2026"
    }''',
    },
    "ar": {
        "nav": "السلامة والامتثال", "meta_title": "السلامة والامتثال | HBOT Chamber Tech", "meta_desc": "ملخص شفاف لوثائق السلامة والتدريب والصيانة والتركيب والامتثال الخاصة بكل طراز وسوق.",
        "footer": "HBOT Chamber Tech علامة جديدة ومتخصصة في تقنيات الأكسجين عالي الضغط. تمتد خبرة فريقها الهندسية إلى 2007، والمسيرة التجارية للمؤسسين إلى 1999.",
        "hero_subtitle": "HBOT Chamber Tech علامة حديثة التأسيس ومتخصصة في تقنيات الأكسجين عالي الضغط، تجمع خبرة هندسية تمتد إلى 2007 مع البرمجيات المتصلة والسلامة الخاصة بكل طراز والتصميم المدروس.",
        "hero_trust": "هندسة متقدمة · سلامة وامتثال خاصان بكل طراز",
        "tech_text": "تجمع سلسلة HBOT City Tech بين CityConnect™ وCityOS™ وCityAI™ وCitySync™ وCityGuard™ ضمن بنية منتج متصلة واحدة.",
        "models_subtitle": "ستة طرازات للاستخدام الفردي والمهني وعلى نطاق المستشفيات.",
        "technology_intro": "صُممت منصة HBOT City Tech للجمع بين CityConnect™ وCityOS™ وCityAI™ وCitySync™ وCityGuard™ وفق الطراز ونطاق البرنامج المتحقق منه، مع توضيح الوظائف في العرض والملف الفني.",
        "guard_subtitle": "دعم الحالة والصيانة المتصل",
        "why_items": [("بنية منتج متصلة", "يدعم CityConnect™ عرض بيانات الغرفة والتشغيل عن بُعد في التكوينات المتوافقة."), ("دعم القرار عبر CityAI™", "يساعد CityAI™ في فهم البيانات التشغيلية وإعداد التقارير دون أن يحل محل المشغل المعتمد."), ("تكامل خاص بالمشروع", "تُصمم واجهات CitySync™ وتُتحقق وفق نطاق التكامل المتفق عليه."), ("وضوح الصيانة والخدمة", "يدعم CityGuard™ مراقبة الحالة والتنبيهات المسجلة وأعمال الصيانة المخططة.")],
        "heritage": '''heritage: {
      eyebrow: "جذورنا وتركيزنا الجديد", title: "علامة جديدة. ذاكرة تجارية تتجاوز ربع قرن.", intro: "HBOT Chamber Tech علامة حديثة التأسيس ومتخصصة في تقنيات الأكسجين عالي الضغط، لكن الانضباط الميداني والخبرة الهندسية خلفها ليسا جديدين.",
      steps: [{ year: "1999", title: "بداية ميدانية", desc: "بدأ مؤسسو Almita رحلتهم التجارية بحل مشكلات تشغيلية حقيقية في إدارة النفايات الصلبة." }, { year: "2007", title: "خبرة هندسية متقدمة", desc: "تمتد خبرة فريق HBOT Chamber Tech في التصميم والتصنيع والأتمتة وإدارة المشاريع إلى عام 2007." }, { year: "اليوم", title: "تركيز جديد على تقنيات HBOT", desc: "ننقل هذه الخبرة إلى أنظمة HBOT عبر CityOS وCityGuard وCityConnect وCityAI والمكوّن + AR والهندسة الخاصة بكل طراز." }],
      proof_title: "نوثق ما نعد به", proof_text: "نحدد كتابياً نطاق المنتج والتركيب والتدريب والصيانة ووثائق السوق المستهدف لكل مشروع.", partner_label: "دعم مؤسسي في المرحلة الانتقالية", partner_text: "تحظى HBOT Chamber Tech حالياً بدعم المنظومة التجارية والتشغيلية لمجموعة Almita."
    }''',
        "trust": '''trustSafety: {
      eyebrow: "السلامة والامتثال", title: "الثقة تُبنى بالوثائق لا بالشعارات", subtitle: "تُقيّم السلامة والاستخدام والتدريب والصيانة والامتثال لكل طراز على حدة.",
      policy_title: "نهج الاستخدام الآمن", policy_intro: "يجمع التركيب والتشغيل بين تعليمات المصنّع والمشغل المدرّب والمراقبة ومنع الحريق والتأريض والتنظيف والصيانة.", policy_items: ["اتباع تعليمات الاستخدام والغرض المحدد", "منع الحريق وضبط المواد في البيئات الغنية بالأكسجين", "فحوص التأريض والكهرباء الساكنة والسلامة الكهربائية", "تدريب الموظفين والمراقبة وإجراءات الطوارئ", "التنظيف ومواعيد الخدمة وفحوص السلامة المسجلة"],
      docs_title: "حزمة وثائق المشروع", docs_intro: "يتم تأكيد النطاق حسب الطراز والتكوين والغرض والسوق.", docs: ["هوية المنتج والغرض المحدد", "حزمة امتثال خاصة بالطراز والدولة", "تعليمات الاستخدام وتدريب المشغل", "خطة الصيانة والتنظيف والخدمة", "اختبارات المصنع والقبول والتركيب والتشغيل", "إجراءات السلامة من الحريق والطوارئ"],
      disclosure_title: "إفصاح تنظيمي", disclosure_text: "تختلف الحالة التنظيمية والتصنيف وإتاحة السوق حسب الطراز والتكوين والغرض والدولة. لا تقدم HBOT Chamber Tech ادعاءً عاماً بموافقة FDA.", matrix_title: "ستة طرازات، ستة ملفات", matrix_text: "اطلب الحزمة الفنية والامتثال الحالية لطرازات Oslo وDubai وTokyo وTokyo Plus وMilano وGeneva.", cta: "اطلب ملف الطراز", updated: "آخر مراجعة: أغسطس 2026"
    }''',
    },
}

# Use concise English fallback for European language pages until a native review.
for lang in ("ru", "es", "pt", "de"):
    COPY[lang] = dict(COPY["en"])
    COPY[lang]["nav"] = {"ru": "Безопасность", "es": "Seguridad", "pt": "Segurança", "de": "Sicherheit"}[lang]

COPY["ru"].update(hero_subtitle="HBOT Chamber Tech — новый бренд гипербарических технологий, объединяющий инженерный опыт с 2007 года, подключённое ПО, безопасность по каждой модели и продуманный дизайн.", hero_trust="Передовая инженерия · Безопасность и соответствие каждой модели", tech_text="Серия HBOT City Tech объединяет CityConnect™, CityOS™, CityAI™, CitySync™ и CityGuard™ в единой подключённой архитектуре.", models_subtitle="Шесть моделей для индивидуальных, профессиональных и больничных задач.")
COPY["es"].update(hero_subtitle="HBOT Chamber Tech es una nueva marca especializada en tecnología hiperbárica que combina experiencia de ingeniería desde 2007 con software conectado, seguridad específica por modelo y diseño cuidado.", hero_trust="Ingeniería avanzada · Seguridad y conformidad por modelo", tech_text="La serie HBOT City Tech integra CityConnect™, CityOS™, CityAI™, CitySync™ y CityGuard™ en una arquitectura de producto conectada.", models_subtitle="Seis modelos para necesidades individuales, profesionales y hospitalarias.")
COPY["pt"].update(hero_subtitle="A HBOT Chamber Tech é uma nova marca focada em tecnologia hiperbárica, combinando experiência de engenharia desde 2007 com software conectado, segurança específica por modelo e design cuidadoso.", hero_trust="Engenharia avançada · Segurança e conformidade por modelo", tech_text="A série HBOT City Tech reúne CityConnect™, CityOS™, CityAI™, CitySync™ e CityGuard™ numa arquitetura de produto conectada.", models_subtitle="Seis modelos para necessidades individuais, profissionais e hospitalares.")
COPY["de"].update(hero_subtitle="HBOT Chamber Tech ist eine neue, auf Hyperbarik-Technologie spezialisierte Marke und verbindet Ingenieurserfahrung seit 2007 mit vernetzter Software, modellspezifischer Sicherheit und durchdachtem Design.", hero_trust="Fortschrittliche Technik · Modellspezifische Sicherheit und Konformität", tech_text="Die HBOT City Tech-Serie vereint CityConnect™, CityOS™, CityAI™, CitySync™ und CityGuard™ in einer vernetzten Produktarchitektur.", models_subtitle="Sechs Modelle für individuelle, professionelle und klinische Anforderungen.")


def lang_segments(text):
    starts = []
    for lang in LANGS:
        m = re.search(rf"^  {lang}: \{{", text, re.M)
        if not m:
            raise RuntimeError(f"Language block not found: {lang}")
        starts.append((m.start(), lang))
    starts.sort()
    for i, (start, lang) in enumerate(starts):
        end = starts[i + 1][0] if i + 1 < len(starts) else text.rfind("\n};")
        yield start, end, lang


def update_segment(seg, lang):
    c = COPY[lang]
    if "trustSafety: {" not in seg:
        seg = seg.replace("\n    technology: {", f"\n    {c['heritage']},\n    {c['trust']},\n    technology: {{", 1)

    if "trustSafety: { title:" not in seg.split("common:", 1)[0]:
        pattern = r'(      contact: \{ title: .*? \}\n)(    \},\n    common:)'
        replacement = rf'\1,\n      trustSafety: {{ title: "{c["meta_title"]}", desc: "{c["meta_desc"]}" }}\n\2'
        seg, count = re.subn(pattern, replacement, seg, count=1)
        if count != 1:
            raise RuntimeError(f"Could not add meta in {lang}")

    nav_match = re.search(r'      nav: \{([^\n]+)\},', seg)
    if nav_match and "trustSafety" not in nav_match.group(1):
        old = nav_match.group(0)
        new = old[:-2] + f', trustSafety: "{c["nav"]}" }},'
        seg = seg.replace(old, new, 1)

    menu_match = re.search(r'(      models_menu: \{.*?\n        duo: "Tokyo",\n)(.*?      \},)', seg, re.S)
    if menu_match and "duoPlus:" not in menu_match.group(0):
        seg = seg[:menu_match.end(1)] + '        duoPlus: "Tokyo Plus",\n' + seg[menu_match.end(1):]

    short_match = re.search(r'(    modelShort: \{.*?\n      duo: \{[^\n]+\},\n)(.*?\n    \},)', seg, re.S)
    if short_match and "duoPlus:" not in short_match.group(0):
        line = '      duoPlus: { title: "Tokyo Plus", tagline: "2–4 People · Institutional", desc: "A configurable multi-user chamber for clinics, hospitals and professional facilities." },\n'
        seg = seg[:short_match.end(1)] + line + seg[short_match.end(1):]

    seg = seg.replace('{ value: "5",', '{ value: "6",', 1)
    seg = re.sub(r'(about_text: ")[^"]*(")', rf'\1{c["footer"]}\2', seg, count=1)
    seg = re.sub(r'(    home: \{.*?hero: \{.*?subtitle: ")[^"]*(")', rf'\1{c["hero_subtitle"]}\2', seg, count=1, flags=re.S)
    seg = re.sub(r'(    home: \{.*?hero: \{.*?trust_line: ")[^"]*(")', rf'\1{c["hero_trust"]}\2', seg, count=1, flags=re.S)
    seg = re.sub(r'(    home: \{.*?tech_teaser: \{.*?text: ")[^"]*(")', rf'\1{c["tech_text"]}\2', seg, count=1, flags=re.S)
    seg = re.sub(r'(    home: \{.*?models_teaser: \{.*?subtitle: ")[^"]*(")', rf'\1{c["models_subtitle"]}\2', seg, count=1, flags=re.S)
    seg = re.sub(r'(    technology: \{.*?\n      intro: ")[^"]*(")', rf'\1{c.get("technology_intro", COPY["en"]["technology_intro"])}\2', seg, count=1, flags=re.S)
    items = c.get("why_items", COPY["en"]["why_items"])
    why_match = re.search(r'(      why: \{.*?items: \[\n)(.*?)(\n        \]\n      \})', seg, re.S)
    if why_match:
        lines = "\n".join(f'          {{ title: "{title}", desc: "{desc}" }}{"," if i < 3 else ""}' for i, (title, desc) in enumerate(items))
        seg = seg[:why_match.start(2)] + lines + seg[why_match.end(2):]
    # Technology detail page: keep AI and interoperability claims support-oriented.
    seg = re.sub(r'(        connect: \{.*?\n          desc: ")[^"]*(")', rf'\1{c["tech_text"]}\2', seg, count=1, flags=re.S)
    safe_ai = {"tr": "Operasyonel verileri analiz ederek yetkili operatöre görünürlük ve raporlama desteği sağlar; klinik kararın veya operatörün yerine geçmez.", "en": "Analyzes operational data to support authorized operators with visibility and reporting; it does not replace clinical judgment or the operator.", "ar": "يحلل البيانات التشغيلية لدعم المشغل المعتمد بالرؤية والتقارير، ولا يحل محل الحكم السريري أو المشغل."}.get(lang, "Analyzes operational data to support authorized operators with visibility and reporting; it does not replace clinical judgment or the operator.")
    seg = re.sub(r'(        ai: \{.*?\n          desc: ")[^"]*(")', rf'\1{safe_ai}\2', seg, count=1, flags=re.S)
    safe_sync = {"tr": "Hastane veya işletme sistemleriyle veri alışverişi, onaylanan proje kapsamı ve doğrulanan arayüzlere göre planlanır.", "en": "Data exchange with hospital or business systems is planned to the approved project scope and verified interfaces.", "ar": "يُخطط تبادل البيانات مع أنظمة المستشفى أو الأعمال وفق نطاق المشروع والواجهات التي تم التحقق منها."}.get(lang, "Data exchange with hospital or business systems is planned to the approved project scope and verified interfaces.")
    seg = re.sub(r'(        sync: \{.*?\n          desc: ")[^"]*(")', rf'\1{safe_sync}\2', seg, count=1, flags=re.S)
    safe_guard = {"tr": "Durum takibi, kayıtlı uyarılar ve planlı servis çalışmalarını destekleyen bağlantılı bakım katmanı.", "en": "A connected maintenance layer supporting condition visibility, recorded alerts and planned service work.", "ar": "طبقة صيانة متصلة تدعم رؤية الحالة والتنبيهات المسجلة وأعمال الخدمة المخططة."}.get(lang, "A connected maintenance layer supporting condition visibility, recorded alerts and planned service work.")
    seg = re.sub(r'(        guard: \{.*?\n          desc: ")[^"]*(")', rf'\1{safe_guard}\2', seg, count=1, flags=re.S)
    seg = re.sub(r'(        guard: \{.*?\n          subtitle: ")[^"]*(")', rf'\1{c.get("guard_subtitle", COPY["en"]["guard_subtitle"])}\2', seg, count=1, flags=re.S)

    feature_copy = {
        "tr": {
            "ai": ["Operasyonel verilerin gösterimi ve özetlenmesi", "Yetkili operatör için karar desteği; otomatik klinik karar vermez", "Seans ve sistem kayıtlarının raporlanmasına destek", "Özellik kapsamı model ve doğrulanmış yazılım sürümüne göre teyit edilir"],
            "sync": ["Projeye özel veri arayüzü planlaması", "Entegrasyon kapsamı ve veri alanlarının yazılı tanımı", "Devreye alma öncesi arayüz ve veri akışı doğrulaması"],
            "guard": ["Sistem durumunun ve kayıtlı uyarıların görünürlüğü", "Kullanım saatine dayalı bakım ve sarf planlaması", "Yetkili teknik ekip için servis geçmişi"],
        },
        "en": {
            "ai": ["Operational-data visibility and summaries", "Decision support for authorized operators; no autonomous clinical decisions", "Support for session and system reporting", "Scope confirmed by model and verified software release"],
            "sync": ["Project-specific data-interface planning", "Written definition of integration scope and data fields", "Interface and data-flow verification before commissioning"],
            "guard": ["Visibility of system condition and recorded alerts", "Usage-hour-based maintenance and consumables planning", "Service history for authorized technical teams"],
        },
        "ar": {
            "ai": ["عرض البيانات التشغيلية وتلخيصها", "دعم قرار للمشغل المعتمد دون قرارات سريرية مستقلة", "دعم تقارير الجلسات والنظام", "تأكيد النطاق حسب الطراز وإصدار البرنامج المتحقق منه"],
            "sync": ["تخطيط واجهة بيانات خاصة بالمشروع", "تحديد مكتوب لنطاق التكامل وحقول البيانات", "التحقق من الواجهة وتدفق البيانات قبل التشغيل"],
            "guard": ["عرض حالة النظام والتنبيهات المسجلة", "تخطيط الصيانة والمواد حسب ساعات الاستخدام", "سجل خدمة للفرق الفنية المعتمدة"],
        },
    }.get(lang)
    if feature_copy is None:
        feature_copy = {"ai": COPY["en"].get("ai_features", ["Operational-data visibility and summaries", "Decision support for authorized operators; no autonomous clinical decisions", "Support for session and system reporting", "Scope confirmed by model and verified software release"]), "sync": ["Project-specific data-interface planning", "Written definition of integration scope and data fields", "Interface and data-flow verification before commissioning"], "guard": ["Visibility of system condition and recorded alerts", "Usage-hour-based maintenance and consumables planning", "Service history for authorized technical teams"]}

    for pillar in ("ai", "sync", "guard"):
        block = re.search(rf'(        {pillar}: \{{.*?          features: \[\n)(.*?)(\n          \]\n        \}})', seg, re.S)
        if block:
            lines = "\n".join(f'            "{item}"{"," if i < len(feature_copy[pillar]) - 1 else ""}' for i, item in enumerate(feature_copy[pillar]))
            seg = seg[:block.start(2)] + lines + seg[block.end(2):]

    included_safe = {
        "tr": {"ai": "Operasyonel veri görünürlüğü ve raporlama için karar desteği; yetkili operatörün yerine geçmez.", "sync": "Entegrasyon kapsamı projeye göre tanımlanır ve devreye alma öncesinde doğrulanır.", "guard": "Durum takibi, kayıtlı uyarılar ve planlı servis çalışmalarını destekler."},
        "en": {"ai": "Decision support for operational visibility and reporting; it does not replace an authorized operator.", "sync": "Integration scope is defined per project and verified before commissioning.", "guard": "Supports condition visibility, recorded alerts and planned service work."},
        "ar": {"ai": "دعم قرار للرؤية التشغيلية والتقارير ولا يحل محل المشغل المعتمد.", "sync": "يُحدد نطاق التكامل لكل مشروع ويُتحقق منه قبل التشغيل.", "guard": "يدعم رؤية الحالة والتنبيهات المسجلة وأعمال الخدمة المخططة."},
    }.get(lang, {"ai": "Decision support for operational visibility and reporting; it does not replace an authorized operator.", "sync": "Integration scope is defined per project and verified before commissioning.", "guard": "Supports condition visibility, recorded alerts and planned service work."})
    for icon in ("ai", "sync", "guard"):
        seg = re.sub(rf'(\{{ icon: "{icon}", title: "[^"]+", desc: ")[^"]*(" \}})', rf'\1{included_safe[icon]}\2', seg, count=1)
    return seg


def main():
    text = PATH.read_text(encoding="utf-8")
    chunks = []
    cursor = 0
    for start, end, lang in lang_segments(text):
        chunks.append(text[cursor:start])
        chunks.append(update_segment(text[start:end], lang))
        cursor = end
    chunks.append(text[cursor:])
    PATH.write_text("".join(chunks), encoding="utf-8")
    print("Updated translations with trust, heritage and six-model content")


if __name__ == "__main__":
    main()
