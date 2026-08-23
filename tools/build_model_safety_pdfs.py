#!/usr/bin/env python3
"""Build the Turkish model safety/usage technical information PDFs.

These documents are deliberately positioned as pre-sale technical information.
They do not replace the final, serial-number-specific IFU or conformity package.
"""

from __future__ import annotations

from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"
OUTPUT = SITE / "assets" / "docs" / "models"
OUTPUT.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = A4
NAVY = colors.HexColor("#102333")
NAVY_2 = colors.HexColor("#172f42")
TEAL = colors.HexColor("#0D8B92")
BLUE = colors.HexColor("#0A86D4")
ICE = colors.HexColor("#EAF6F7")
IVORY = colors.HexColor("#F7F5EF")
INK = colors.HexColor("#15212A")
MUTED = colors.HexColor("#5F6B73")
LINE = colors.HexColor("#D7E0E4")
WHITE = colors.white
AMBER = colors.HexColor("#D89B2B")


def register_fonts() -> tuple[str, str, str]:
    candidates = [
        (
            "/System/Library/Fonts/Supplemental/Arial.ttf",
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
            "/System/Library/Fonts/Supplemental/Arial Italic.ttf",
        ),
        (
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf",
        ),
    ]
    for regular, bold, italic in candidates:
        if Path(regular).exists() and Path(bold).exists():
            pdfmetrics.registerFont(TTFont("HBOT-Regular", regular))
            pdfmetrics.registerFont(TTFont("HBOT-Bold", bold))
            if Path(italic).exists():
                pdfmetrics.registerFont(TTFont("HBOT-Italic", italic))
            else:
                pdfmetrics.registerFont(TTFont("HBOT-Italic", regular))
            return "HBOT-Regular", "HBOT-Bold", "HBOT-Italic"
    return "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"


FONT, FONT_BOLD, FONT_ITALIC = register_fonts()


MODELS = [
    {
        "slug": "oslo",
        "name": "OSLO",
        "position": "Tek Kişilik - Yatay Kullanım",
        "tagline": "Yatay konfor, kontrollü operasyon.",
        "overview": "Yatay pozisyonda kullanım ihtiyacı bulunan kişiler için geliştirilen, medikal ortopedik yataklı tek kişilik HBOT kabini.",
        "image": "oslo-real.webp",
        "specs": [
            ("Kapasite", "1 kişi - yatay pozisyon"),
            ("Basınç aralığı", "1.5-2.0 ATA"),
            ("Yatak", "Medikal ortopedik - 200 x 80 cm"),
            ("Ana gövde", "Havacılık sınıfı alüminyum"),
            ("Güvenlik", "Çift emniyet valfi"),
            ("Dış ölçüler", "240 x 110 x 120 cm"),
        ],
        "settings": "Klinik, hekim kontrollü wellness merkezi veya proje şartlarının sağlandığı özel kullanım alanı.",
        "users": "Yatay pozisyonun tercih edildiği tek kullanıcılı seanslar. Kullanım kararı ve protokol yetkili sağlık profesyoneli tarafından belirlenir.",
        "site_note": "Yatağın tam hareketi, kapı erişimi ve acil tahliye için çevresinde yeterli servis alanı bırakılmalıdır.",
    },
    {
        "slug": "dubai",
        "name": "DUBAI",
        "position": "Tek Kişilik - Oturarak Kullanım",
        "tagline": "Kişisel konfor ile bağlantılı teknolojinin buluşması.",
        "overview": "Kompakt yerleşim, dokunmatik kontrol ve kişiselleştirilebilir iç konfor seçenekleri sunan tek kişilik oturma kabini.",
        "image": "dubai-real.webp",
        "specs": [
            ("Kapasite", "1 kişi - oturma pozisyonu"),
            ("Basınç aralığı", "1.5-2.0 ATA"),
            ("Kontrol", "Dokunmatik ekran"),
            ("Ana gövde", "Havacılık sınıfı alüminyum"),
            ("Güvenlik", "Çift emniyet valfi"),
            ("Dış ölçüler", "120 x 110 x 180 cm"),
            ("Gürültü", "<60 dB - CitySilent"),
        ],
        "settings": "Özel kullanım alanı, klinik, yönetici alanı, otel/wellness süiti veya proje şartlarının sağlandığı profesyonel tesis.",
        "users": "Tek kullanıcılı oturma seansları. Premium sofa, TV ve multimedya seçenekleri teklif kapsamına göre yapılandırılır.",
        "site_note": "Kapı açılımı, havalandırma, elektrik beslemesi ve servis erişimi yerleşim planında teyit edilmelidir.",
    },
    {
        "slug": "tokyo",
        "name": "TOKYO",
        "position": "İki Kişilik - Oturarak Kullanım",
        "tagline": "Paylaşımlı kullanım için kontrollü ve ferah çözüm.",
        "overview": "İki kullanıcının aynı seansı paylaşabildiği, panoramik görüş ve çift kontrol mimarisi sunan oturma kabini.",
        "image": "tokyo-real.webp",
        "specs": [
            ("Kapasite", "2 kişi - oturma pozisyonu"),
            ("Basınç aralığı", "1.5-2.0 ATA"),
            ("Oksijen saflığı", "%93-95"),
            ("Güvenlik", "Acil durum valf sistemi"),
            ("Kontrol", "Çift kontrol sistemi"),
            ("Pencere", "Panoramik"),
        ],
        "settings": "Klinik, profesyonel wellness merkezi, spor performans tesisi veya proje şartlarının sağlandığı özel kullanım alanı.",
        "users": "İki kullanıcılı seanslar; eş/partner veya uygun klinik senaryoda kullanıcı-refakatçi yerleşimi. Her kullanıcının ayrı değerlendirilmesi gerekir.",
        "site_note": "İki kullanıcı için oturma, giriş-çıkış ve acil tahliye senaryosu saha kabulü sırasında birlikte doğrulanmalıdır.",
    },
    {
        "slug": "tokyo-plus",
        "name": "TOKYO PLUS",
        "position": "2-4 Kişilik - Kurumsal Kullanım",
        "tagline": "Kademeli kapasite, profesyonel işletim disiplini.",
        "overview": "Klinik, hastane ve profesyonel wellness işletmeleri için iki ila dört kişilik yapılandırılabilir çok kullanıcılı kabin.",
        "image": "tokyo-plus-real.webp",
        "specs": [
            ("Kapasite", "2-4 kişi - kademeli"),
            ("Basınç aralığı", "2.5-6.0 ATA*"),
            ("Oksijen saflığı", "%93-95"),
            ("Güvenlik", "Acil durum valf sistemi"),
            ("Kontrol", "Çift kontrol sistemi"),
            ("Kullanım", "Klinik / hastane / wellness"),
        ],
        "settings": "Yetkili klinik, hastane, hiperbarik merkez veya profesyonel wellness işletmesi.",
        "users": "Çok kullanıcılı kurumsal seanslar. Basınç sınıfı, kapasite ve kullanım amacı nihai mühendislik dosyasında doğrulanır.",
        "site_note": "Yüksek basınç seçeneği yalnız hedef ülke mevzuatı, klinik yönetişim ve model uygunluk dosyası onaylandıktan sonra ele alınır.",
    },
    {
        "slug": "milano",
        "name": "MILANO",
        "position": "Dört Kişilik - Geniş Kabin",
        "tagline": "Premium iç hacim, kurumsal kapasite.",
        "overview": "Geniş küp formu, dört kişilik oturma düzeni, kapitone iç yüzey ve bağımsız kontrol ünitesiyle profesyonel tesislere yönelik kabin.",
        "image": "milano-real.webp",
        "specs": [
            ("Kapasite", "4 kişi - oturma pozisyonu"),
            ("Basınç aralığı", "2.5-6.0 ATA*"),
            ("Oksijen saflığı", "%93-95"),
            ("İç mekan", "Kapitone yüzey - LED ambiyans"),
            ("Güvenlik", "Acil durum valf sistemi"),
            ("Kontrol", "Bağımsız kontrol ünitesi"),
        ],
        "settings": "Klinik, hastane, profesyonel wellness merkezi, spor performans merkezi ve yüksek hacimli kurumsal tesis.",
        "users": "Dört kullanıcılı planlı seanslar. Operatör eğitimi, kullanıcı kabul kriterleri ve acil durum görev dağılımı yazılı olmalıdır.",
        "site_note": "Kabin ağırlığı, zemin taşıma kapasitesi, erişim rotası, havalandırma ve teknik oda gereksinimleri proje öncesinde mühendislik hesabına alınır.",
    },
    {
        "slug": "geneva",
        "name": "GENEVA",
        "position": "6+ Kişilik - Hastane ve Tıbbi Merkez",
        "tagline": "Yüksek hacimli klinik işletim için modüler platform.",
        "overview": "Hastaneler ve tıbbi merkezler için geliştirilen, altı ve üzeri kullanıcı kapasitesine ve modüler genişleme yaklaşımına sahip büyük hacimli kabin.",
        "image": "geneva-real.webp",
        "specs": [
            ("Kapasite", "6+ kişi - oturma pozisyonu"),
            ("Basınç aralığı", "2.5-6.0 ATA*"),
            ("Oksijen saflığı", "%93-95"),
            ("Güvenlik", "Acil durum valf sistemi"),
            ("Yapı", "Hastane sınıfı"),
            ("Genişleme", "Modüler genişlemeye hazır"),
        ],
        "settings": "Hastane, tıbbi merkez ve yetkili hiperbarik tedavi tesisi.",
        "users": "Yüksek hacimli, çok kullanıcılı klinik seanslar. Klinik sorumluluk, operatör yetkinliği ve acil durum ekibi tesis prosedürleriyle tanımlanır.",
        "site_note": "Yerleşim, medikal gazlar, yangın senaryosu, tahliye, zemin taşıma kapasitesi ve tesis altyapısı disiplinler arası proje olarak onaylanmalıdır.",
    },
]


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("Title", parent=base["Title"], fontName=FONT_BOLD, fontSize=28, leading=32, textColor=WHITE, spaceAfter=4 * mm),
        "subtitle": ParagraphStyle("Subtitle", parent=base["Normal"], fontName=FONT, fontSize=12, leading=17, textColor=colors.HexColor("#D8E8EF")),
        "eyebrow": ParagraphStyle("Eyebrow", parent=base["Normal"], fontName=FONT_BOLD, fontSize=8.5, leading=11, textColor=TEAL, tracking=1.2, spaceAfter=3 * mm),
        "h1": ParagraphStyle("H1", parent=base["Heading1"], fontName=FONT_BOLD, fontSize=22, leading=27, textColor=NAVY, spaceBefore=2 * mm, spaceAfter=5 * mm),
        "h2": ParagraphStyle("H2", parent=base["Heading2"], fontName=FONT_BOLD, fontSize=15, leading=19, textColor=NAVY, spaceBefore=4 * mm, spaceAfter=3 * mm),
        "h3": ParagraphStyle("H3", parent=base["Heading3"], fontName=FONT_BOLD, fontSize=11.5, leading=15, textColor=TEAL, spaceAfter=2 * mm),
        "body": ParagraphStyle("Body", parent=base["BodyText"], fontName=FONT, fontSize=9.5, leading=14.5, textColor=INK, spaceAfter=3 * mm),
        "small": ParagraphStyle("Small", parent=base["BodyText"], fontName=FONT, fontSize=7.8, leading=11, textColor=MUTED),
        "note": ParagraphStyle("Note", parent=base["BodyText"], fontName=FONT, fontSize=8.5, leading=12.5, textColor=INK, leftIndent=4 * mm, rightIndent=4 * mm, spaceBefore=2 * mm, spaceAfter=3 * mm),
        "bullet": ParagraphStyle("Bullet", parent=base["BodyText"], fontName=FONT, fontSize=9.2, leading=13.5, textColor=INK, leftIndent=5 * mm, firstLineIndent=-3.5 * mm, bulletIndent=0, spaceAfter=2 * mm),
        "table_header": ParagraphStyle("TableHeader", parent=base["BodyText"], fontName=FONT_BOLD, fontSize=8, leading=10, textColor=WHITE),
        "table": ParagraphStyle("Table", parent=base["BodyText"], fontName=FONT, fontSize=8.5, leading=11.5, textColor=INK),
        "card_title": ParagraphStyle("CardTitle", parent=base["Heading3"], fontName=FONT_BOLD, fontSize=11, leading=14, textColor=NAVY, spaceAfter=1.5 * mm),
        "card": ParagraphStyle("Card", parent=base["BodyText"], fontName=FONT, fontSize=8.5, leading=12, textColor=INK),
        "contact": ParagraphStyle("Contact", parent=base["BodyText"], fontName=FONT_BOLD, fontSize=10, leading=16, textColor=WHITE),
    }


S = styles()


def p(text: str, style: str = "body") -> Paragraph:
    return Paragraph(text, S[style])


def bullet(text: str) -> Paragraph:
    return Paragraph(f"•&nbsp;&nbsp;{text}", S["bullet"])


def section_label(text: str) -> list:
    return [p(text.upper(), "eyebrow")]


def rule_table(rows, widths=None, header=True):
    data = []
    for row in rows:
        data.append([p(str(cell), "table_header" if header and len(data) == 0 else "table") for cell in row])
    table = Table(data, colWidths=widths, hAlign="LEFT", repeatRows=1 if header else 0)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY if header else ICE),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE if header else INK),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 2.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5 * mm),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, IVORY]),
    ]))
    return table


def card(title: str, text: str, width=82 * mm):
    t = Table([[p(title, "card_title")], [p(text, "card")]], colWidths=[width])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), IVORY),
        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
    ]))
    return t


def notice(text: str, color=ICE):
    t = Table([[p(text, "note")]], colWidths=[170 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), color),
        ("BOX", (0, 0), (-1, -1), 0.8, TEAL),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 2 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
    ]))
    return t


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, PAGE_H - 14 * mm, PAGE_W, 14 * mm, fill=1, stroke=0)
    logo = SITE / "assets" / "img" / "logo-header.png"
    if logo.exists():
        canvas.drawImage(str(logo), 18 * mm, PAGE_H - 11.3 * mm, width=35 * mm, height=7 * mm, preserveAspectRatio=True, mask="auto", anchor="w")
    canvas.setFont(FONT_BOLD, 7.4)
    canvas.setFillColor(colors.HexColor("#CDE9EC"))
    canvas.drawRightString(PAGE_W - 18 * mm, PAGE_H - 8.8 * mm, "KULLANIM · GÜVENLİK · TEKNİK DOSYA")
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 13 * mm, PAGE_W - 18 * mm, 13 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT, 7)
    canvas.drawString(18 * mm, 8.8 * mm, "HBOT Chamber Tech · Ön teknik bilgilendirme · Rev. 1.0")
    canvas.drawRightString(PAGE_W - 18 * mm, 8.8 * mm, f"Sayfa {doc.page}")
    canvas.restoreState()


def cover(canvas, doc, model):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(NAVY_2)
    canvas.circle(PAGE_W - 5 * mm, PAGE_H - 8 * mm, 60 * mm, fill=1, stroke=0)
    canvas.setFillColor(TEAL)
    canvas.rect(0, PAGE_H - 7 * mm, PAGE_W, 7 * mm, fill=1, stroke=0)
    logo = SITE / "assets" / "img" / "logo-header.png"
    if logo.exists():
        canvas.drawImage(str(logo), 20 * mm, PAGE_H - 30 * mm, width=54 * mm, height=13 * mm, preserveAspectRatio=True, mask="auto", anchor="w")

    image_path = SITE / "assets" / "img" / "models" / "real" / model["image"]
    if image_path.exists():
        canvas.drawImage(str(image_path), 20 * mm, 74 * mm, width=170 * mm, height=105 * mm, preserveAspectRatio=True, mask="auto", anchor="c")
        canvas.setFillColor(colors.Color(0.04, 0.10, 0.14, alpha=0.22))
        canvas.rect(20 * mm, 74 * mm, 170 * mm, 105 * mm, fill=1, stroke=0)

    canvas.setFillColor(colors.HexColor("#74E1E4"))
    canvas.setFont(FONT_BOLD, 9)
    canvas.drawString(20 * mm, 63 * mm, "HBOT CITY TECH MODEL DOSYASI")
    canvas.setFillColor(WHITE)
    canvas.setFont(FONT_BOLD, 30)
    canvas.drawString(20 * mm, 48 * mm, model["name"])
    canvas.setFont(FONT, 12)
    canvas.setFillColor(colors.HexColor("#D8E8EF"))
    canvas.drawString(20 * mm, 38 * mm, model["position"])
    canvas.setFont(FONT_BOLD, 10)
    canvas.setFillColor(WHITE)
    canvas.drawString(20 * mm, 27 * mm, "Kullanım · Güvenlik · Kurulum · Bakım · City Tech")
    canvas.setFont(FONT, 7.5)
    canvas.setFillColor(colors.HexColor("#A8BEC9"))
    canvas.drawString(20 * mm, 17 * mm, "Ön teknik bilgilendirme · Rev. 1.0 · 23 Ağustos 2026")
    canvas.restoreState()


def page_templates(model):
    cover_frame = Frame(0, 0, PAGE_W, PAGE_H, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    frame = Frame(18 * mm, 18 * mm, PAGE_W - 36 * mm, PAGE_H - 36 * mm, leftPadding=0, rightPadding=0, topPadding=3 * mm, bottomPadding=2 * mm)
    return [
        PageTemplate(id="cover", frames=[cover_frame], onPage=lambda canvas, doc: cover(canvas, doc, model)),
        PageTemplate(id="content", frames=[frame], onPage=header_footer),
    ]


def build_story(model):
    story = []
    story += section_label("Belge statüsü")
    story.append(p(f"{model['name']} - Kullanım, Güvenlik ve Teknik Bilgilendirme", "h1"))
    story.append(p(model["overview"]))
    story.append(notice("<b>Önemli:</b> Bu dosya satış ve proje öncesi bilgilendirme içindir. Nihai kullanım talimatının, seri numarasına özel teknik dosyanın, uygunluk belgelerinin, kurulum planının ve operatör eğitiminin yerine geçmez. Çelişki halinde imzalı sözleşme, nihai teknik dosya ve üretici kullanım talimatı esas alınır."))
    story.append(Spacer(1, 3 * mm))
    meta = [
        ["Belge", "Değer"],
        ["Model", model["name"]],
        ["Doküman türü", "Ön teknik bilgilendirme"],
        ["Revizyon", "1.0 - 23.08.2026"],
        ["Dil", "Türkçe"],
        ["Üretici/marka", "HBOT Chamber Tech"],
        ["Hedef", "Güvenli ürün seçimi, yerleşim ve işletim planlaması"],
    ]
    story.append(rule_table(meta, [50 * mm, 120 * mm]))
    story.append(PageBreak())

    story += section_label("01 · Model özeti")
    story.append(p(f"{model['name']} ile doğru kullanım senaryosunu eşleştirin", "h1"))
    story.append(p(model["tagline"], "h2"))
    story.append(p(model["overview"]))
    story.append(Spacer(1, 2 * mm))
    spec_rows = [["Teknik başlık", "Yayınlanan model bilgisi"]] + model["specs"]
    story.append(rule_table(spec_rows, [58 * mm, 112 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(notice("* Basınç, oksijen üretimi ve diğer performans değerleri; seçilen konfigürasyon, kullanım amacı, hedef ülke ve doğrulanmış model teknik dosyasına göre kesinleştirilir. Yayınlanan değer tek başına klinik protokol önerisi değildir.", colors.HexColor("#FFF5DD")))
    story.append(p("Uygun kullanım ortamı", "h2"))
    story.append(p(model["settings"]))
    story.append(p("Kullanıcı ve seans yaklaşımı", "h2"))
    story.append(p(model["users"]))
    story.append(PageBreak())

    story += section_label("02 · Kurulum ve kabul")
    story.append(p("Saha hazır olmadan kurulum başlamaz", "h1"))
    story.append(p("Nihai yerleşim, yalnız ürün ölçüsüne göre değil; güvenli erişim, tahliye, havalandırma, elektrik, yangın senaryosu ve servis gereksinimleri birlikte değerlendirilerek hazırlanır."))
    story.append(p("Modele özel saha notu", "h2"))
    story.append(notice(model["site_note"]))
    for title, text in [
        ("Yerleşim ve erişim", "Teslimat rotası, kapı/asansör ölçüleri, servis boşlukları, operatör görüşü ve acil tahliye rotası projede işaretlenir."),
        ("Yapısal yeterlilik", "Zemin taşıma kapasitesi, sabitleme yöntemi ve gerektiğinde statik değerlendirme tesis sorumlusu ile doğrulanır."),
        ("Elektrik ve topraklama", "Ayrı ve korumalı enerji hattı, uygun topraklama ve yerel elektrik mevzuatı yetkili uzman tarafından teyit edilir."),
        ("Havalandırma ve çevre", "Oda sıcaklığı, nem, hava değişimi ve oksijen zenginleşmesi riskine karşı havalandırma yaklaşımı belgelenir."),
        ("Yangın ve acil durum", "Tesis yangın planı, yasaklı malzeme politikası, söndürme yaklaşımı, alarm ve tahliye sorumluları devreye alma öncesinde tanımlanır."),
        ("Kabul testleri", "Fabrika kabul, saha kabul, kaçak/basınç, sensör, alarm, valf, iletişim, yazılım ve acil durdurma kontrolleri kayıt altına alınır."),
    ]:
        story.append(KeepTogether([p(title, "h3"), p(text)]))
    story.append(PageBreak())

    story += section_label("03 · Güvenli kullanım akışı")
    story.append(p("Her seans aynı disiplinle hazırlanır", "h1"))
    flow = [
        ["Aşama", "Kontrol noktaları"],
        ["1 · Yetkilendirme", "Yetkili operatör atanır; kullanım amacı ve hekim değerlendirmesi doğrulanır."],
        ["2 · Kullanıcı kabulü", "Kimlik, onam, güncel sağlık durumu, kontrendikasyon/ilaç değerlendirmesi ve acil iletişim kaydı kontrol edilir."],
        ["3 · Kabin kontrolü", "Kapı, conta, valf, sensör, alarm, iletişim, havalandırma, oksijen/hava sistemi ve çalışma alanı incelenir."],
        ["4 · Yasaklı materyal", "Ateş kaynağı, elektronik cihaz, yağ/grease, uygunsuz tekstil ve üretici talimatında yasaklanan tüm malzemeler kabin dışında bırakılır."],
        ["5 · Brifing", "Basınç değişimi hissi, kulak eşitleme, iletişim, durdurma talebi ve acil durum davranışı kullanıcıya anlatılır."],
        ["6 · Seans", "Protokol yetkili sağlık profesyonelinin talimatına göre uygulanır; operatör kullanıcıyı ve sistem değerlerini kesintisiz izler."],
        ["7 · Çıkış", "Basınç güvenli şekilde eşitlenmeden kapı açılmaz; kullanıcı değerlendirilir ve seans kaydı tamamlanır."],
    ]
    story.append(rule_table(flow, [33 * mm, 137 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(notice("Bu belge basınç, süre veya oksijen dozajı önermez. Klinik protokol yalnız yetkili hekim/sağlık profesyoneli tarafından, kullanım amacı ve yerel mevzuata göre belirlenir."))
    story.append(PageBreak())

    story += section_label("04 · Güvenlik ve acil durum")
    story.append(p("Önce önleme, sonra kontrollü müdahale", "h1"))
    safety = [
        ("Yangın önleme", "Kabin ve çevresinde sigara, açık alev, kıvılcım, uygunsuz elektrikli cihaz, yağ ve yanıcı ürün bulundurulmaz. Yalnız üretici tarafından izin verilen tekstil ve aksesuarlar kullanılır."),
        ("Kullanıcı izleme", "Operatör, görüntü/iletişim ve sistem göstergeleri üzerinden kullanıcıyı seans boyunca izler. Olağan dışı belirti veya talep gecikmeden değerlendirilir."),
        ("Basınç kontrolü", "Basınçlandırma ve dekompresyon yalnız eğitimli operatör tarafından yapılır. Kapı ve kilit mekanizmasına basınç varken müdahale edilmez."),
        ("Alarm veya arıza", "Alarm, valf, sensör, oksijen, havalandırma, iletişim veya güç sisteminde hata görülürse seans tesis prosedürüne göre güvenli şekilde sonlandırılır; yetkili servis onayı olmadan yeniden kullanım yapılmaz."),
        ("Tıbbi acil durum", "Tesisin önceden yazılı acil durum planı uygulanır. Güvenli dekompresyon, kullanıcı tahliyesi ve tıbbi müdahale görevleri eğitimlerde tatbik edilir."),
        ("Kayıt ve inceleme", "Her olay, alarm, yarıda kesilen seans ve servis müdahalesi tarih/saat, kullanıcı, operatör ve alınan aksiyonla kaydedilir."),
    ]
    for title, text in safety:
        story.append(KeepTogether([p(title, "h2"), p(text)]))
    story.append(notice("Acil durumda öncelik kullanıcı güvenliğidir. Tesis prosedürü, nihai üretici talimatı ve eğitimde gösterilen model özel adımlar esas alınır.", colors.HexColor("#FFF0E7")))
    story.append(PageBreak())

    story += section_label("05 · Temizlik, bakım ve kayıt")
    story.append(p("Bakımı yapılan sistem, güveni sürdürülebilir kılar", "h1"))
    maintenance = [
        ["Sıklık", "Asgari kontrol yaklaşımı", "Kayıt"],
        ["Her seans öncesi", "Görsel durum, kapı/conta, iletişim, alarm, valf, sensör ve çalışma alanı", "Operatör kontrol listesi"],
        ["Her seans sonrası", "Üretici onaylı ürünle temas yüzeyleri, maske/aksesuar yönetimi, kabin havalandırması", "Temizlik kaydı"],
        ["Günlük", "Filtre/hat göstergeleri, kaçak belirtisi, sistem uyarıları, olağan dışı ses/koku", "Günlük teknik kontrol"],
        ["Planlı periyot", "Basınç sistemi, emniyet valfleri, sensör kalibrasyonu, elektrik/topraklama, oksijen/hava üretimi", "Yetkili servis formu"],
        ["Yıllık / mevzuat", "Basınçlı ekipman, yangın ve tesis kontrolleri; ülke ve model dosyasına göre", "Resmi/teknik rapor"],
    ]
    story.append(rule_table(maintenance, [34 * mm, 91 * mm, 45 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(p("Temizlik ilkeleri", "h2"))
    for item in [
        "Yalnız nihai kullanım talimatında onaylanan temizlik ve dezenfeksiyon ürünleri kullanılır.",
        "Yüzeye zarar verebilecek solvent, yağlı ürün veya yanıcı kalıntı oluşturan kimyasal kullanılmaz.",
        "Tek kullanımlık ve tekrar kullanılabilir sarflar birbirinden ayrılır; maske ve tekstil politikası tesisçe yazılılaştırılır.",
        "Temizlik sonrasında kabin tamamen kurutulur, havalandırılır ve tekrar kullanıma operatör tarafından açılır.",
    ]:
        story.append(bullet(item))
    story.append(p("Yetkisiz müdahale yapılmaz", "h2"))
    story.append(p("Güvenlik kritik parçalar, yazılım, sensör, valf, basınç hattı ve elektrik sistemi yalnız yetkilendirilmiş teknik personel tarafından açılır veya değiştirilir. Parça ve işlem izlenebilirliği korunur."))
    story.append(PageBreak())

    story += section_label("06 · City Tech ve veri yönetişimi")
    story.append(p("Bağlantılı özellikler, doğrulanmış kapsamla sunulur", "h1"))
    tech_rows = [
        ["Bileşen", "Amaç", "Kapsam notu"],
        ["CityOS", "Kabin kontrol ve yazılım platformu", "Sürüm ve etkin fonksiyonlar model teklifinde yazılır."],
        ["CityGuard", "Durum, uyarı ve bakım desteği", "Klinik karar vermez; operatör ve güvenlik prosedürünün yerine geçmez."],
        ["CityConnect", "Yetkili kullanıcı için bağlantı ve uzaktan görünürlük", "Erişim, ağ ve ülke veri kuralları proje bazında planlanır."],
        ["CityAI", "Operasyonel veri özeti ve karar desteği", "Otomatik klinik karar veya tıbbi teşhis sağlamaz."],
        ["CitySync", "Onaylı sistemlerle veri alışverişi", "Arayüz, veri alanları ve entegrasyon testi sözleşmede tanımlanır."],
        ["Konfigüratör + AR", "Model ve yerleşim ön görselleştirmesi", "AR görünümü mühendislik yerleşim onayı değildir."],
    ]
    story.append(rule_table(tech_rows, [31 * mm, 58 * mm, 81 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(notice("Apple Health, Google Fit ve Huawei Health entegrasyonları yol haritasındadır; mevcut standart özellik olarak sunulmaz."))
    story.append(p("Veri güvenliği soruları", "h2"))
    for item in [
        "Hangi verinin toplandığı, nerede saklandığı ve kimlerin erişebildiği proje dosyasında tanımlanmalıdır.",
        "Kullanıcı rolleri, güçlü kimlik doğrulama, kayıt/log politikası ve yetki kaldırma süreci devreye alma öncesi test edilmelidir.",
        "Kişisel sağlık verisi işleniyorsa hedef ülkenin veri koruma mevzuatı ve kurum politikası uygulanmalıdır.",
        "Uzaktan erişim, yalnız yetkili onay ve kayıtlı servis süreciyle açılmalıdır.",
    ]:
        story.append(bullet(item))
    story.append(PageBreak())

    story += section_label("07 · Teslim edilecek proje dosyası")
    story.append(p("Satın alma kararını belge paketiyle kapatın", "h1"))
    docs = [
        ["Belge / kayıt", "Teklif", "Sipariş", "Devreye alma"],
        ["Model ve konfigürasyon özeti", "Mevcut", "Mevcut", "Mevcut"],
        ["Hedef ülke uygunluk kapsamı", "Ön teyit", "Nihai kapsam", "Teslim"],
        ["Teknik veri sayfası ve yerleşim", "Taslak", "Onaylı", "As-built"],
        ["Kullanım ve bakım talimatı", "Özet", "Plan", "Nihai"],
        ["Fabrika/saha kabul testleri", "Plan", "Protokol", "İmzalı kayıt"],
        ["Operatör eğitimi", "Kapsam", "Takvim", "Katılım/yeterlilik kaydı"],
        ["Garanti ve servis planı", "Teklif", "Sözleşme", "Başlangıç kaydı"],
        ["Yazılım ve veri kapsamı", "Özet", "Onaylı kapsam", "Test/tutanak"],
    ]
    story.append(rule_table(docs, [72 * mm, 31 * mm, 31 * mm, 36 * mm]))
    story.append(Spacer(1, 5 * mm))
    story.append(p("Resmi güvenlik referansı", "h2"))
    story.append(p("U.S. FDA - Follow Instructions for Safe Use of Hyperbaric Oxygen Therapy Devices: https://www.fda.gov/medical-devices/letters-health-care-providers/follow-instructions-safe-use-hyperbaric-oxygen-therapy-devices-letter-health-care-providers", "small"))
    story.append(Spacer(1, 3 * mm))
    story.append(notice("HBOT Chamber Tech genel bir FDA onayı iddiası kullanmaz. Düzenleyici durum, ürün sınıflandırması ve pazara sunulabilirlik model, konfigürasyon, kullanım amacı ve hedef ülkeye göre yazılı olarak doğrulanır."))
    story.append(Spacer(1, 5 * mm))
    contact = Table([
        [p("MODEL DOSYASI VE PROJE GÖRÜŞMESİ", "table_header")],
        [p("sales@hbotchambertech.com<br/>www.hbotchambertech.com<br/>Tuzla · İstanbul · Türkiye", "contact")],
    ], colWidths=[170 * mm])
    contact.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), TEAL),
        ("BACKGROUND", (0, 1), (-1, 1), NAVY),
        ("TEXTCOLOR", (0, 1), (-1, 1), WHITE),
        ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
    ]))
    story.append(contact)
    return story


def build_pdf(model):
    out = OUTPUT / f"hbot-{model['slug']}-kullanim-guvenlik-teknik-dosya-tr.pdf"
    doc = BaseDocTemplate(
        str(out),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title=f"{model['name']} - Kullanım, Güvenlik ve Teknik Dosya",
        author="HBOT Chamber Tech",
        subject="Model kullanım, güvenlik, kurulum ve bakım ön teknik bilgilendirmesi",
    )
    doc.addPageTemplates(page_templates(model))
    story = [NextPageTemplate("content"), PageBreak()] + build_story(model)
    doc.build(story)
    return out


if __name__ == "__main__":
    for item in MODELS:
        path = build_pdf(item)
        print(path)
