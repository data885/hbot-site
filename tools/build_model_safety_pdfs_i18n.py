#!/usr/bin/env python3
"""Build localized HBOT model safety and technical information PDFs.

The localized files are pre-sale information documents. They deliberately do
not replace the serial-number-specific IFU, conformity package, installation
plan, operator training, or medical governance required for a delivered unit.
"""

from __future__ import annotations

import json
import shutil
import subprocess
from html import escape
from pathlib import Path

import arabic_reshaper
from bidi.algorithm import get_display
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
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
SITE_OUTPUT = SITE / "assets" / "docs" / "models"
OUTPUT = ROOT / "output" / "pdf" / "hbot-model-files"
SITE_OUTPUT.mkdir(parents=True, exist_ok=True)
OUTPUT.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = A4
NAVY = colors.HexColor("#102333")
NAVY_2 = colors.HexColor("#172F42")
TEAL = colors.HexColor("#0D8B92")
ICE = colors.HexColor("#EAF6F7")
IVORY = colors.HexColor("#F7F5EF")
INK = colors.HexColor("#15212A")
MUTED = colors.HexColor("#5F6B73")
LINE = colors.HexColor("#D7E0E4")
WHITE = colors.white
AMBER_BG = colors.HexColor("#FFF5DD")


def register_fonts() -> tuple[str, str, str]:
    candidates = [
        (
            "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
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
            pdfmetrics.registerFont(TTFont("HBOTI-Regular", regular))
            pdfmetrics.registerFont(TTFont("HBOTI-Bold", bold))
            pdfmetrics.registerFont(TTFont("HBOTI-Italic", italic if Path(italic).exists() else regular))
            return "HBOTI-Regular", "HBOTI-Bold", "HBOTI-Italic"
    return "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"


FONT, FONT_BOLD, FONT_ITALIC = register_fonts()

LANGS = ["en", "ar", "ru", "de", "es", "pt"]
MODELS = [
    ("oslo", "modelSoloLounge", "soloLounge", "oslo-real.webp"),
    ("dubai", "modelSolo", "solo", "dubai-real.webp"),
    ("tokyo", "modelDuo", "duo", "tokyo-real.webp"),
    ("tokyo-plus", "modelDuoPlus", "duoPlus", "tokyo-plus-real.webp"),
    ("milano", "modelQuadCube", "quadCube", "milano-real.webp"),
    ("geneva", "modelNexus", "nexus", "geneva-real.webp"),
]

LABELS = {
    "en": {
        "language": "English", "page": "Page", "header": "USE · SAFETY · TECHNICAL FILE",
        "footer": "HBOT Chamber Tech · Pre-sale technical information · Rev. 1.0",
        "cover_series": "HBOT CITY TECH MODEL FILE", "cover_scope": "Use · Safety · Installation · Maintenance · City Tech",
        "cover_note": "Pre-sale technical information · Rev. 1.0 · 23 August 2026",
        "status_label": "DOCUMENT STATUS", "status_title": "Pre-sale information for informed project planning",
        "status_notice": "This document supports product selection and project planning. It does not replace the final instructions for use, serial-number-specific technical file, conformity documents, installation plan or operator training. Where documents differ, the signed contract, final technical file and manufacturer instructions prevail.",
        "model_label": "01 · MODEL SNAPSHOT", "model_title": "Match the model to the intended operating context",
        "spec_col": "Technical item", "value_col": "Published model information", "clinical_note": "Published pressure and performance values are not a clinical protocol. Final values depend on configuration, intended use, destination market and the verified model file.",
        "safety_label": "02 · INSTALLATION AND SAFE USE", "safety_title": "Safety is designed into the site, team and process",
        "installation_title": "Site and installation planning", "workflow_title": "Safe session workflow",
        "installation": [
            "Confirm delivery route, doorway and lift dimensions, service clearances and emergency egress.",
            "Verify floor loading, anchoring and structural suitability with the responsible project professional.",
            "Provide protected electrical supply, grounding and local electrical-code verification.",
            "Document room ventilation, temperature, humidity and oxygen-enrichment risk controls.",
            "Approve fire prevention, prohibited-material, alarm, evacuation and emergency-response procedures before commissioning.",
        ],
        "workflow": [
            "Assign an authorised operator and confirm the intended use and required clinical governance.",
            "Complete identity, consent, current-health, contraindication and emergency-contact checks.",
            "Inspect the door, seal, valves, sensors, alarm, communication, ventilation and air/oxygen systems.",
            "Remove ignition sources, oils, unsuitable electronics, fabrics and all prohibited materials.",
            "Brief the user on pressure sensation, ear equalisation, communication and stop requests.",
            "Monitor the user and system continuously; follow only an authorised protocol.",
            "Equalise pressure safely, assess the user and complete the session record before release.",
        ],
        "maintenance_label": "03 · EMERGENCY, CLEANING AND MAINTENANCE", "maintenance_title": "Recorded checks keep safety sustainable",
        "maintenance_headers": ["Frequency", "Minimum control approach", "Record"],
        "maintenance": [
            ["Before each session", "Door/seal, communication, alarms, valves, sensors and work area", "Operator checklist"],
            ["After each session", "Approved surface cleaning, accessory management and chamber ventilation", "Cleaning record"],
            ["Daily", "Filter/line indicators, leak signs, system warnings and unusual sound or odour", "Daily technical check"],
            ["Scheduled interval", "Pressure system, relief valves, sensor calibration, electrical/grounding and gas systems", "Authorised service form"],
            ["Annual / regulatory", "Pressure-equipment, fire and facility checks according to country and model file", "Formal technical report"],
        ],
        "emergency": "If an alarm or abnormal condition occurs, prioritise user safety and end the session according to the facility procedure, final manufacturer instructions and model-specific training. Do not return the unit to service without authorised clearance.",
        "tech_label": "04 · CITY TECH AND DATA GOVERNANCE", "tech_title": "Connected features are delivered within a verified scope",
        "component": "Component", "purpose": "Purpose and scope", "roadmap": "Roadmap note",
        "docs_label": "05 · PROJECT DOCUMENTATION AND COMPLIANCE", "docs_title": "Close the purchase decision with a written document package",
        "regulatory": "Regulatory disclosure", "sources": "Official safety references", "contact": "MODEL FILE AND PROJECT DISCUSSION",
    },
    "ar": {
        "language": "العربية", "page": "صفحة", "header": "الاستخدام · السلامة · الملف الفني",
        "footer": "HBOT Chamber Tech · معلومات فنية قبل البيع · الإصدار 1.0",
        "cover_series": "ملف طراز HBOT CITY TECH", "cover_scope": "الاستخدام · السلامة · التركيب · الصيانة · City Tech",
        "cover_note": "معلومات فنية قبل البيع · الإصدار 1.0 · 23 أغسطس 2026",
        "status_label": "حالة الوثيقة", "status_title": "معلومات قبل البيع لتخطيط المشروع بوعي",
        "status_notice": "تدعم هذه الوثيقة اختيار المنتج وتخطيط المشروع، ولا تحل محل تعليمات الاستخدام النهائية أو الملف الفني المرتبط بالرقم التسلسلي أو وثائق المطابقة أو خطة التركيب أو تدريب المشغل. عند وجود اختلاف، تكون الأولوية للعقد الموقع والملف الفني النهائي وتعليمات المصنّع.",
        "model_label": "01 · ملخص الطراز", "model_title": "طابق الطراز مع سياق التشغيل المقصود",
        "spec_col": "البند الفني", "value_col": "معلومات الطراز المنشورة", "clinical_note": "قيم الضغط والأداء المنشورة ليست بروتوكولاً سريرياً. تعتمد القيم النهائية على التكوين والغرض والسوق المستهدف وملف الطراز المتحقق منه.",
        "safety_label": "02 · التركيب والاستخدام الآمن", "safety_title": "تُبنى السلامة في الموقع والفريق والإجراءات",
        "installation_title": "تخطيط الموقع والتركيب", "workflow_title": "مسار الجلسة الآمنة",
        "installation": [
            "تحقق من مسار التسليم وأبعاد الأبواب والمصاعد ومساحات الخدمة ومسار الإخلاء.",
            "تحقق من قدرة الأرضية والتثبيت والملاءمة الإنشائية مع المختص المسؤول.",
            "وفّر تغذية كهربائية محمية وتأريضاً وتحققاً من المتطلبات الكهربائية المحلية.",
            "وثّق التهوية ودرجة الحرارة والرطوبة وضوابط مخاطر زيادة الأكسجين.",
            "اعتمد إجراءات منع الحريق والمواد المحظورة والإنذار والإخلاء والطوارئ قبل التشغيل.",
        ],
        "workflow": [
            "عيّن مشغلاً معتمداً وتحقق من الغرض وحوكمة الاستخدام السريري المطلوبة.",
            "أكمل فحوص الهوية والموافقة والحالة الصحية والموانع واتصال الطوارئ.",
            "افحص الباب والحشية والصمامات والحساسات والإنذار والاتصال والتهوية وأنظمة الهواء والأكسجين.",
            "أزل مصادر الاشتعال والزيوت والإلكترونيات والمنسوجات غير المناسبة والمواد المحظورة.",
            "اشرح للمستخدم إحساس الضغط ومعادلة ضغط الأذن والاتصال وطلب الإيقاف.",
            "راقب المستخدم والنظام باستمرار واتبع بروتوكولاً معتمداً فقط.",
            "عادل الضغط بأمان وقيّم المستخدم وأكمل سجل الجلسة قبل المغادرة.",
        ],
        "maintenance_label": "03 · الطوارئ والتنظيف والصيانة", "maintenance_title": "الفحوص المسجلة تحافظ على السلامة",
        "maintenance_headers": ["التكرار", "الحد الأدنى من الفحص", "السجل"],
        "maintenance": [
            ["قبل كل جلسة", "الباب والحشية والاتصال والإنذارات والصمامات والحساسات ومنطقة العمل", "قائمة المشغل"],
            ["بعد كل جلسة", "تنظيف الأسطح المعتمد وإدارة الملحقات وتهوية الغرفة", "سجل التنظيف"],
            ["يومياً", "مؤشرات المرشح والخط والتسرب والتحذيرات والأصوات أو الروائح غير المعتادة", "فحص فني يومي"],
            ["حسب الجدول", "نظام الضغط وصمامات الأمان ومعايرة الحساسات والكهرباء والتأريض وأنظمة الغاز", "نموذج خدمة معتمد"],
            ["سنوياً / تنظيمياً", "فحوص معدات الضغط والحريق والمنشأة وفق الدولة وملف الطراز", "تقرير فني رسمي"],
        ],
        "emergency": "عند حدوث إنذار أو حالة غير طبيعية، تكون سلامة المستخدم أولاً وتُنهى الجلسة وفق إجراءات المنشأة وتعليمات المصنّع النهائية والتدريب الخاص بالطراز. لا يُعاد الجهاز للخدمة دون تصريح معتمد.",
        "tech_label": "04 · CITY TECH وحوكمة البيانات", "tech_title": "تُقدّم الميزات المتصلة ضمن نطاق متحقق منه",
        "component": "المكوّن", "purpose": "الغرض والنطاق", "roadmap": "ملاحظة خارطة الطريق",
        "docs_label": "05 · وثائق المشروع والامتثال", "docs_title": "أغلق قرار الشراء بحزمة وثائق مكتوبة",
        "regulatory": "الإفصاح التنظيمي", "sources": "مراجع السلامة الرسمية", "contact": "ملف الطراز ومناقشة المشروع",
    },
    "ru": {
        "language": "Русский", "page": "Страница", "header": "ЭКСПЛУАТАЦИЯ · БЕЗОПАСНОСТЬ · ТЕХНИЧЕСКИЙ ФАЙЛ",
        "footer": "HBOT Chamber Tech · Предпродажная техническая информация · Ред. 1.0",
        "cover_series": "ФАЙЛ МОДЕЛИ HBOT CITY TECH", "cover_scope": "Эксплуатация · Безопасность · Монтаж · Обслуживание · City Tech",
        "cover_note": "Предпродажная техническая информация · Ред. 1.0 · 23 августа 2026",
        "status_label": "СТАТУС ДОКУМЕНТА", "status_title": "Предпродажная информация для обоснованного планирования",
        "status_notice": "Документ помогает выбрать продукт и спланировать проект. Он не заменяет окончательную инструкцию по эксплуатации, технический файл по серийному номеру, документы соответствия, план монтажа или обучение оператора. При расхождении приоритет имеют подписанный договор, окончательный технический файл и инструкция производителя.",
        "model_label": "01 · ОБЗОР МОДЕЛИ", "model_title": "Соотнесите модель с предполагаемыми условиями эксплуатации",
        "spec_col": "Технический параметр", "value_col": "Опубликованные данные модели", "clinical_note": "Опубликованные значения давления и производительности не являются клиническим протоколом. Итоговые значения зависят от конфигурации, назначения, рынка и проверенного файла модели.",
        "safety_label": "02 · МОНТАЖ И БЕЗОПАСНАЯ ЭКСПЛУАТАЦИЯ", "safety_title": "Безопасность обеспечивается площадкой, командой и процессом",
        "installation_title": "Планирование площадки и монтажа", "workflow_title": "Безопасный ход сеанса",
        "installation": ["Проверьте маршрут доставки, размеры дверей и лифтов, сервисные зазоры и эвакуационный путь.", "Подтвердите несущую способность пола, крепление и конструктивную пригодность.", "Обеспечьте защищённое питание, заземление и проверку местных электрических требований.", "Документируйте вентиляцию, температуру, влажность и контроль риска обогащения кислородом.", "Утвердите меры пожарной безопасности, запрет материалов, сигнализацию, эвакуацию и аварийные процедуры до ввода."],
        "workflow": ["Назначьте уполномоченного оператора и подтвердите назначение и клиническое управление.", "Проверьте личность, согласие, состояние здоровья, противопоказания и аварийный контакт.", "Осмотрите дверь, уплотнение, клапаны, датчики, сигнализацию, связь, вентиляцию и газовые системы.", "Удалите источники воспламенения, масла, неподходящую электронику, ткани и запрещённые материалы.", "Проинструктируйте пользователя о давлении, выравнивании ушей, связи и остановке.", "Непрерывно контролируйте пользователя и систему; применяйте только утверждённый протокол.", "Безопасно выровняйте давление, оцените пользователя и завершите запись сеанса."],
        "maintenance_label": "03 · АВАРИЙНЫЕ ДЕЙСТВИЯ, ОЧИСТКА И ОБСЛУЖИВАНИЕ", "maintenance_title": "Документированные проверки поддерживают безопасность",
        "maintenance_headers": ["Периодичность", "Минимальный объём контроля", "Запись"],
        "maintenance": [["Перед сеансом", "Дверь/уплотнение, связь, сигнализация, клапаны, датчики и рабочая зона", "Лист оператора"], ["После сеанса", "Разрешённая очистка поверхностей, принадлежности и вентиляция", "Журнал очистки"], ["Ежедневно", "Индикаторы, признаки утечки, предупреждения, необычный звук или запах", "Ежедневный контроль"], ["По графику", "Система давления, клапаны, калибровка, электрика, заземление и газы", "Форма сервиса"], ["Ежегодно / по нормам", "Проверки оборудования под давлением, пожарной безопасности и объекта", "Технический отчёт"]],
        "emergency": "При тревоге или отклонении приоритетом является безопасность пользователя. Завершите сеанс по процедуре объекта, инструкции производителя и обучению для модели. Не возвращайте установку в работу без разрешения.",
        "tech_label": "04 · CITY TECH И УПРАВЛЕНИЕ ДАННЫМИ", "tech_title": "Подключённые функции поставляются в проверенном объёме",
        "component": "Компонент", "purpose": "Назначение и объём", "roadmap": "Примечание к дорожной карте",
        "docs_label": "05 · ДОКУМЕНТЫ ПРОЕКТА И СООТВЕТСТВИЕ", "docs_title": "Подтвердите решение письменным пакетом документов",
        "regulatory": "Нормативное раскрытие", "sources": "Официальные источники по безопасности", "contact": "ФАЙЛ МОДЕЛИ И ОБСУЖДЕНИЕ ПРОЕКТА",
    },
    "de": {
        "language": "Deutsch", "page": "Seite", "header": "NUTZUNG · SICHERHEIT · TECHNISCHE DATEI", "footer": "HBOT Chamber Tech · Technische Vorabinformation · Rev. 1.0",
        "cover_series": "HBOT CITY TECH MODELLDATEI", "cover_scope": "Nutzung · Sicherheit · Installation · Wartung · City Tech", "cover_note": "Technische Vorabinformation · Rev. 1.0 · 23. August 2026",
        "status_label": "DOKUMENTSTATUS", "status_title": "Vorabinformation für eine fundierte Projektplanung", "status_notice": "Dieses Dokument unterstützt Produktauswahl und Projektplanung. Es ersetzt nicht die endgültige Gebrauchsanweisung, die seriennummerbezogene technische Datei, Konformitätsunterlagen, den Installationsplan oder die Bedienerschulung. Bei Abweichungen gelten Vertrag, endgültige technische Datei und Herstelleranweisung.",
        "model_label": "01 · MODELLÜBERSICHT", "model_title": "Modell und vorgesehenen Betriebskontext zusammenführen", "spec_col": "Technischer Punkt", "value_col": "Veröffentlichte Modellinformation", "clinical_note": "Veröffentlichte Druck- und Leistungswerte sind kein klinisches Protokoll. Endwerte hängen von Konfiguration, Zweck, Zielmarkt und verifizierter Modelldatei ab.",
        "safety_label": "02 · INSTALLATION UND SICHERE NUTZUNG", "safety_title": "Sicherheit entsteht durch Standort, Team und Prozess", "installation_title": "Standort- und Installationsplanung", "workflow_title": "Sicherer Sitzungsablauf",
        "installation": ["Lieferweg, Tür-/Aufzugmaße, Serviceabstände und Fluchtweg prüfen.", "Bodenlast, Verankerung und Tragfähigkeit fachlich bestätigen.", "Geschützte Stromversorgung, Erdung und lokale Elektroprüfung bereitstellen.", "Lüftung, Temperatur, Feuchte und Sauerstoffanreicherungsrisiko dokumentieren.", "Brandschutz, Materialverbote, Alarm, Evakuierung und Notfallverfahren vor Inbetriebnahme freigeben."],
        "workflow": ["Autorisierten Bediener benennen und Zweck sowie klinische Verantwortung bestätigen.", "Identität, Einwilligung, Gesundheitszustand, Kontraindikationen und Notfallkontakt prüfen.", "Tür, Dichtung, Ventile, Sensoren, Alarm, Kommunikation, Lüftung und Gassysteme kontrollieren.", "Zündquellen, Öle, ungeeignete Elektronik, Textilien und verbotene Materialien entfernen.", "Druckgefühl, Druckausgleich, Kommunikation und Abbruchwunsch erklären.", "Nutzer und System kontinuierlich überwachen; nur autorisiertem Protokoll folgen.", "Druck sicher ausgleichen, Nutzer beurteilen und Sitzungsprotokoll abschließen."],
        "maintenance_label": "03 · NOTFALL, REINIGUNG UND WARTUNG", "maintenance_title": "Dokumentierte Prüfungen sichern den Betrieb", "maintenance_headers": ["Häufigkeit", "Mindestkontrolle", "Nachweis"],
        "maintenance": [["Vor jeder Sitzung", "Tür/Dichtung, Kommunikation, Alarm, Ventile, Sensoren und Arbeitsbereich", "Bedienercheckliste"], ["Nach jeder Sitzung", "Freigegebene Oberflächenreinigung, Zubehör und Belüftung", "Reinigungsnachweis"], ["Täglich", "Anzeigen, Leckanzeichen, Warnungen, ungewöhnliche Geräusche oder Gerüche", "Tageskontrolle"], ["Planmäßig", "Drucksystem, Sicherheitsventile, Kalibrierung, Elektrik/Erdung und Gas", "Serviceformular"], ["Jährlich / regulatorisch", "Druckgeräte-, Brand- und Standortprüfungen gemäß Land und Modell", "Technischer Bericht"]],
        "emergency": "Bei Alarm oder Abweichung hat Nutzersicherheit Vorrang. Sitzung nach Standortverfahren, Herstelleranweisung und Modellschulung beenden. Wiederinbetriebnahme nur nach autorisierter Freigabe.",
        "tech_label": "04 · CITY TECH UND DATEN-GOVERNANCE", "tech_title": "Vernetzte Funktionen im verifizierten Umfang", "component": "Komponente", "purpose": "Zweck und Umfang", "roadmap": "Roadmap-Hinweis",
        "docs_label": "05 · PROJEKTUNTERLAGEN UND KONFORMITÄT", "docs_title": "Kaufentscheidung mit schriftlichem Dokumentenpaket abschließen", "regulatory": "Regulatorischer Hinweis", "sources": "Offizielle Sicherheitsquellen", "contact": "MODELLDATEI UND PROJEKTGESPRÄCH",
    },
    "es": {
        "language": "Español", "page": "Página", "header": "USO · SEGURIDAD · EXPEDIENTE TÉCNICO", "footer": "HBOT Chamber Tech · Información técnica precomercial · Rev. 1.0",
        "cover_series": "EXPEDIENTE DE MODELO HBOT CITY TECH", "cover_scope": "Uso · Seguridad · Instalación · Mantenimiento · City Tech", "cover_note": "Información técnica precomercial · Rev. 1.0 · 23 de agosto de 2026",
        "status_label": "ESTADO DEL DOCUMENTO", "status_title": "Información previa para una planificación fundamentada", "status_notice": "Este documento apoya la selección del producto y la planificación. No sustituye las instrucciones finales de uso, el expediente por número de serie, la documentación de conformidad, el plan de instalación ni la formación. En caso de diferencia prevalecen el contrato, el expediente final y las instrucciones del fabricante.",
        "model_label": "01 · RESUMEN DEL MODELO", "model_title": "Relacione el modelo con su contexto de uso previsto", "spec_col": "Elemento técnico", "value_col": "Información publicada", "clinical_note": "Los valores publicados de presión y rendimiento no constituyen un protocolo clínico. Los valores finales dependen de la configuración, el uso previsto, el mercado y el expediente verificado.",
        "safety_label": "02 · INSTALACIÓN Y USO SEGURO", "safety_title": "La seguridad se integra en el lugar, el equipo y el proceso", "installation_title": "Planificación del lugar y la instalación", "workflow_title": "Flujo seguro de sesión",
        "installation": ["Verifique ruta de entrega, puertas, ascensores, espacios de servicio y evacuación.", "Confirme carga del suelo, anclaje y aptitud estructural.", "Disponga alimentación protegida, puesta a tierra y verificación eléctrica local.", "Documente ventilación, temperatura, humedad y control del enriquecimiento de oxígeno.", "Apruebe prevención de incendios, materiales prohibidos, alarma, evacuación y emergencias antes de la puesta en marcha."],
        "workflow": ["Asigne un operador autorizado y confirme el uso y la gobernanza clínica.", "Compruebe identidad, consentimiento, salud, contraindicaciones y contacto de emergencia.", "Inspeccione puerta, junta, válvulas, sensores, alarma, comunicación, ventilación y gases.", "Retire fuentes de ignición, aceites, electrónica, tejidos y materiales prohibidos.", "Explique presión, compensación de oídos, comunicación y solicitud de parada.", "Supervise continuamente al usuario y el sistema; siga solo un protocolo autorizado.", "Iguale la presión con seguridad, evalúe al usuario y complete el registro."],
        "maintenance_label": "03 · EMERGENCIA, LIMPIEZA Y MANTENIMIENTO", "maintenance_title": "Los controles registrados sostienen la seguridad", "maintenance_headers": ["Frecuencia", "Control mínimo", "Registro"],
        "maintenance": [["Antes de cada sesión", "Puerta/junta, comunicación, alarmas, válvulas, sensores y área", "Lista del operador"], ["Después de cada sesión", "Limpieza aprobada, gestión de accesorios y ventilación", "Registro de limpieza"], ["Diario", "Indicadores, fugas, avisos, ruidos u olores anómalos", "Control diario"], ["Programado", "Presión, válvulas, calibración, electricidad/tierra y gases", "Parte de servicio"], ["Anual / normativo", "Equipos a presión, incendio e instalación según país y modelo", "Informe técnico"]],
        "emergency": "Ante una alarma o anomalía, priorice al usuario y finalice la sesión según el procedimiento, las instrucciones del fabricante y la formación del modelo. No vuelva a usar el equipo sin autorización.",
        "tech_label": "04 · CITY TECH Y GOBERNANZA DE DATOS", "tech_title": "Funciones conectadas dentro de un alcance verificado", "component": "Componente", "purpose": "Finalidad y alcance", "roadmap": "Nota de hoja de ruta",
        "docs_label": "05 · DOCUMENTACIÓN Y CONFORMIDAD", "docs_title": "Cierre la decisión con un paquete documental escrito", "regulatory": "Declaración regulatoria", "sources": "Referencias oficiales de seguridad", "contact": "EXPEDIENTE DEL MODELO Y REUNIÓN DE PROYECTO",
    },
    "pt": {
        "language": "Português", "page": "Página", "header": "UTILIZAÇÃO · SEGURANÇA · DOSSIÊ TÉCNICO", "footer": "HBOT Chamber Tech · Informação técnica pré-venda · Rev. 1.0",
        "cover_series": "DOSSIÊ DO MODELO HBOT CITY TECH", "cover_scope": "Utilização · Segurança · Instalação · Manutenção · City Tech", "cover_note": "Informação técnica pré-venda · Rev. 1.0 · 23 de agosto de 2026",
        "status_label": "ESTADO DO DOCUMENTO", "status_title": "Informação pré-venda para planeamento fundamentado", "status_notice": "Este documento apoia a seleção e o planeamento. Não substitui as instruções finais, o dossier por número de série, os documentos de conformidade, o plano de instalação ou a formação. Em caso de divergência prevalecem o contrato, o dossier final e as instruções do fabricante.",
        "model_label": "01 · RESUMO DO MODELO", "model_title": "Associe o modelo ao contexto de operação previsto", "spec_col": "Item técnico", "value_col": "Informação publicada", "clinical_note": "Os valores publicados de pressão e desempenho não constituem protocolo clínico. Os valores finais dependem da configuração, finalidade, mercado e dossier verificado.",
        "safety_label": "02 · INSTALAÇÃO E UTILIZAÇÃO SEGURA", "safety_title": "A segurança integra local, equipa e processo", "installation_title": "Planeamento do local e instalação", "workflow_title": "Fluxo de sessão segura",
        "installation": ["Confirme rota de entrega, portas, elevadores, espaços de serviço e evacuação.", "Verifique carga do piso, fixação e adequação estrutural.", "Disponibilize alimentação protegida, ligação à terra e verificação elétrica local.", "Documente ventilação, temperatura, humidade e controlo do enriquecimento de oxigénio.", "Aprove prevenção de incêndio, materiais proibidos, alarme, evacuação e emergência antes do arranque."],
        "workflow": ["Designe operador autorizado e confirme finalidade e governação clínica.", "Verifique identidade, consentimento, saúde, contraindicações e contacto de emergência.", "Inspecione porta, vedação, válvulas, sensores, alarme, comunicação, ventilação e gases.", "Remova fontes de ignição, óleos, eletrónica, tecidos e materiais proibidos.", "Explique pressão, equalização dos ouvidos, comunicação e pedido de paragem.", "Monitorize continuamente utilizador e sistema; siga apenas protocolo autorizado.", "Equalize a pressão em segurança, avalie o utilizador e conclua o registo."],
        "maintenance_label": "03 · EMERGÊNCIA, LIMPEZA E MANUTENÇÃO", "maintenance_title": "Controlos registados sustentam a segurança", "maintenance_headers": ["Frequência", "Controlo mínimo", "Registo"],
        "maintenance": [["Antes da sessão", "Porta/vedação, comunicação, alarmes, válvulas, sensores e área", "Lista do operador"], ["Após a sessão", "Limpeza aprovada, acessórios e ventilação", "Registo de limpeza"], ["Diário", "Indicadores, fugas, avisos, ruídos ou odores anormais", "Controlo diário"], ["Programado", "Pressão, válvulas, calibração, eletricidade/terra e gases", "Ficha de serviço"], ["Anual / regulamentar", "Equipamentos sob pressão, incêndio e instalação conforme país e modelo", "Relatório técnico"]],
        "emergency": "Perante alarme ou anomalia, priorize o utilizador e termine a sessão segundo o procedimento, as instruções do fabricante e a formação do modelo. Não reutilize sem autorização.",
        "tech_label": "04 · CITY TECH E GOVERNAÇÃO DE DADOS", "tech_title": "Funcionalidades conectadas dentro de um âmbito verificado", "component": "Componente", "purpose": "Finalidade e âmbito", "roadmap": "Nota do roteiro",
        "docs_label": "05 · DOCUMENTAÇÃO E CONFORMIDADE", "docs_title": "Conclua a decisão com um pacote documental escrito", "regulatory": "Divulgação regulamentar", "sources": "Referências oficiais de segurança", "contact": "DOSSIÊ DO MODELO E REUNIÃO DE PROJETO",
    },
}

CONTENT = {
    "en": {
        "policy_intro": "Installation and operation combine manufacturer instructions, trained operators, user monitoring, fire prevention, grounding, cleaning and scheduled maintenance.",
        "policy_items": ["Follow the instructions for use and the defined intended use.", "Control fire and materials in oxygen-rich environments.", "Verify grounding, static electricity and electrical safety.", "Maintain authorised staff training, monitoring and emergency procedures.", "Record cleaning, consumables, service intervals and safety checks."],
        "tech": {"connect": "Connected visibility for authorised users; exact remote functions depend on the verified project scope.", "os": "The chamber control and software platform; enabled functions and version are stated in the proposal.", "ai": "Operational-data summaries and decision support; it does not diagnose or make autonomous clinical decisions.", "sync": "Data exchange with approved systems; interfaces, fields and tests are defined per project.", "guard": "Status, recorded alerts and maintenance support for authorised operations and service teams."},
        "roadmap_note": "Apple Health, Google Fit and Huawei Health integrations are roadmap items and are not presented as current standard features.",
        "docs_intro": "The scope of every document is confirmed by model, configuration, intended use and destination country.",
        "docs": ["Product identity and defined intended use", "Model- and country-specific compliance package", "Instructions for use and operator training", "Maintenance, cleaning and service plan", "Factory/site acceptance, installation and commissioning records", "Fire-safety and emergency procedures"],
        "disclosure": "Regulatory status, product classification and market availability vary by model, configuration, intended use and country. HBOT Chamber Tech makes compliance claims only for a verified model and market scope and does not use a blanket FDA-approval claim.",
    },
    "ar": {
        "policy_intro": "يجمع التركيب والتشغيل بين تعليمات المصنّع والمشغل المدرّب ومراقبة المستخدم ومنع الحريق والتأريض والتنظيف والصيانة المجدولة.",
        "policy_items": ["اتباع تعليمات الاستخدام والغرض المحدد.", "ضبط الحريق والمواد في البيئات الغنية بالأكسجين.", "التحقق من التأريض والكهرباء الساكنة والسلامة الكهربائية.", "الحفاظ على تدريب الموظفين والمراقبة وإجراءات الطوارئ.", "تسجيل التنظيف والمواد الاستهلاكية وفترات الخدمة وفحوص السلامة."],
        "tech": {"connect": "رؤية متصلة للمستخدمين المخولين؛ تعتمد الوظائف البعيدة على نطاق المشروع المتحقق منه.", "os": "منصة تحكم وبرمجيات الغرفة؛ تُذكر الوظائف المفعلة والإصدار في العرض.", "ai": "ملخصات للبيانات التشغيلية ودعم القرار؛ لا يشخّص ولا يتخذ قراراً سريرياً مستقلاً.", "sync": "تبادل البيانات مع الأنظمة المعتمدة؛ تُحدد الواجهات والحقول والاختبارات لكل مشروع.", "guard": "دعم الحالة والتنبيهات المسجلة والصيانة للعمليات وفرق الخدمة المخولة."},
        "roadmap_note": "تكاملات Apple Health وGoogle Fit وHuawei Health ضمن خارطة الطريق وليست ميزات قياسية حالية.",
        "docs_intro": "يتم تأكيد نطاق كل وثيقة حسب الطراز والتكوين والغرض ودولة الوجهة.",
        "docs": ["هوية المنتج والغرض المحدد", "حزمة امتثال خاصة بالطراز والدولة", "تعليمات الاستخدام وتدريب المشغل", "خطة الصيانة والتنظيف والخدمة", "سجلات قبول المصنع والموقع والتركيب والتشغيل", "إجراءات السلامة من الحريق والطوارئ"],
        "disclosure": "تختلف الحالة التنظيمية والتصنيف وإتاحة السوق حسب الطراز والتكوين والغرض والدولة. تقدم HBOT Chamber Tech ادعاءات المطابقة فقط ضمن نطاق طراز وسوق متحقق منه، ولا تستخدم ادعاءً عاماً بموافقة FDA.",
    },
    "ru": {
        "policy_intro": "Монтаж и эксплуатация объединяют инструкции производителя, обученного оператора, мониторинг пользователя, пожарную профилактику, заземление, очистку и плановое обслуживание.",
        "policy_items": ["Соблюдайте инструкцию и установленное назначение.", "Контролируйте пожарные риски и материалы в среде с кислородом.", "Проверяйте заземление, статическое электричество и электробезопасность.", "Поддерживайте обучение персонала, мониторинг и аварийные процедуры.", "Регистрируйте очистку, расходные материалы, сервис и проверки безопасности."],
        "tech": {"connect": "Подключённая видимость для уполномоченных пользователей; удалённые функции зависят от проверенного проекта.", "os": "Платформа управления камерой и ПО; активные функции и версия указываются в предложении.", "ai": "Сводка операционных данных и поддержка решений; не ставит диагноз и не принимает самостоятельных клинических решений.", "sync": "Обмен данными с утверждёнными системами; интерфейсы, поля и испытания определяются проектом.", "guard": "Поддержка состояния, зарегистрированных предупреждений и обслуживания для уполномоченных команд."},
        "roadmap_note": "Интеграции Apple Health, Google Fit и Huawei Health входят в дорожную карту и не являются текущими стандартными функциями.",
        "docs_intro": "Объём каждого документа подтверждается по модели, конфигурации, назначению и стране поставки.",
        "docs": ["Идентификация продукта и установленное назначение", "Пакет соответствия по модели и стране", "Инструкция по эксплуатации и обучение оператора", "План обслуживания, очистки и сервиса", "Записи заводской/площадочной приёмки, монтажа и ввода", "Процедуры пожарной безопасности и аварийных действий"],
        "disclosure": "Нормативный статус, классификация и доступность на рынке зависят от модели, конфигурации, назначения и страны. HBOT Chamber Tech заявляет соответствие только для проверенного объёма модели и рынка и не использует общее утверждение об одобрении FDA.",
    },
    "de": {
        "policy_intro": "Installation und Betrieb verbinden Herstelleranweisung, geschulte Bediener, Nutzerüberwachung, Brandvermeidung, Erdung, Reinigung und planmäßige Wartung.",
        "policy_items": ["Gebrauchsanweisung und festgelegten Zweck einhalten.", "Brand- und Materialrisiken in sauerstoffreichen Umgebungen kontrollieren.", "Erdung, statische Elektrizität und elektrische Sicherheit prüfen.", "Schulung, Überwachung und Notfallverfahren aufrechterhalten.", "Reinigung, Verbrauchsmaterial, Serviceintervalle und Prüfungen dokumentieren."],
        "tech": {"connect": "Vernetzte Transparenz für autorisierte Nutzer; Fernfunktionen hängen vom verifizierten Projektumfang ab.", "os": "Steuerungs- und Softwareplattform der Kammer; Funktionen und Version stehen im Angebot.", "ai": "Betriebsdaten-Zusammenfassung und Entscheidungshilfe; keine Diagnose oder autonome klinische Entscheidung.", "sync": "Datenaustausch mit freigegebenen Systemen; Schnittstellen, Felder und Tests werden projektbezogen definiert.", "guard": "Status-, Alarm- und Wartungsunterstützung für autorisierte Betriebs- und Serviceteams."},
        "roadmap_note": "Integrationen mit Apple Health, Google Fit und Huawei Health sind Roadmap-Punkte und keine aktuellen Standardfunktionen.",
        "docs_intro": "Der Umfang jedes Dokuments wird nach Modell, Konfiguration, Verwendungszweck und Zielland bestätigt.",
        "docs": ["Produktidentität und festgelegter Verwendungszweck", "Modell- und länderspezifisches Konformitätspaket", "Gebrauchsanweisung und Bedienerschulung", "Wartungs-, Reinigungs- und Serviceplan", "Werks-/Standortabnahme, Installation und Inbetriebnahme", "Brandschutz- und Notfallverfahren"],
        "disclosure": "Regulatorischer Status, Klassifizierung und Marktverfügbarkeit unterscheiden sich nach Modell, Konfiguration, Verwendungszweck und Land. HBOT Chamber Tech erhebt Konformitätsansprüche nur für verifizierte Modell- und Marktumfänge und verwendet keine pauschale FDA-Zulassungsbehauptung.",
    },
    "es": {
        "policy_intro": "La instalación y el uso combinan instrucciones del fabricante, operadores formados, vigilancia, prevención de incendios, puesta a tierra, limpieza y mantenimiento programado.",
        "policy_items": ["Cumplir las instrucciones y el uso previsto definido.", "Controlar incendios y materiales en entornos ricos en oxígeno.", "Verificar puesta a tierra, electricidad estática y seguridad eléctrica.", "Mantener formación, vigilancia y procedimientos de emergencia.", "Registrar limpieza, consumibles, intervalos de servicio y controles."],
        "tech": {"connect": "Visibilidad conectada para usuarios autorizados; las funciones remotas dependen del alcance verificado.", "os": "Plataforma de control y software de la cámara; la versión y funciones se indican en la oferta.", "ai": "Resumen de datos operativos y apoyo a decisiones; no diagnostica ni decide clínicamente de forma autónoma.", "sync": "Intercambio de datos con sistemas aprobados; interfaces, campos y pruebas se definen por proyecto.", "guard": "Apoyo de estado, alertas registradas y mantenimiento para equipos autorizados."},
        "roadmap_note": "Las integraciones con Apple Health, Google Fit y Huawei Health están en la hoja de ruta y no son funciones estándar actuales.",
        "docs_intro": "El alcance de cada documento se confirma según modelo, configuración, uso previsto y país de destino.",
        "docs": ["Identidad del producto y uso previsto", "Paquete de conformidad por modelo y país", "Instrucciones y formación del operador", "Plan de mantenimiento, limpieza y servicio", "Aceptación en fábrica/sitio, instalación y puesta en marcha", "Procedimientos de incendio y emergencia"],
        "disclosure": "El estado regulatorio, la clasificación y la disponibilidad varían según modelo, configuración, uso y país. HBOT Chamber Tech solo declara conformidad para alcances verificados y no utiliza una afirmación general de aprobación de la FDA.",
    },
    "pt": {
        "policy_intro": "A instalação e a operação combinam instruções do fabricante, operadores formados, monitorização, prevenção de incêndio, ligação à terra, limpeza e manutenção programada.",
        "policy_items": ["Cumprir as instruções e a finalidade definida.", "Controlar incêndio e materiais em ambientes ricos em oxigénio.", "Verificar ligação à terra, eletricidade estática e segurança elétrica.", "Manter formação, monitorização e procedimentos de emergência.", "Registar limpeza, consumíveis, intervalos de serviço e verificações."],
        "tech": {"connect": "Visibilidade conectada para utilizadores autorizados; funções remotas dependem do âmbito verificado.", "os": "Plataforma de controlo e software da câmara; versão e funções constam da proposta.", "ai": "Resumo de dados operacionais e apoio à decisão; não diagnostica nem decide clinicamente de forma autónoma.", "sync": "Troca de dados com sistemas aprovados; interfaces, campos e testes são definidos por projeto.", "guard": "Apoio de estado, alertas registados e manutenção para equipas autorizadas."},
        "roadmap_note": "As integrações Apple Health, Google Fit e Huawei Health estão no roteiro e não são funções padrão atuais.",
        "docs_intro": "O âmbito de cada documento é confirmado por modelo, configuração, finalidade e país de destino.",
        "docs": ["Identidade do produto e finalidade definida", "Pacote de conformidade por modelo e país", "Instruções e formação do operador", "Plano de manutenção, limpeza e serviço", "Aceitação em fábrica/local, instalação e arranque", "Procedimentos de incêndio e emergência"],
        "disclosure": "O estado regulamentar, a classificação e a disponibilidade variam por modelo, configuração, finalidade e país. A HBOT Chamber Tech declara conformidade apenas para âmbitos verificados e não utiliza uma afirmação geral de aprovação FDA.",
    },
}


def load_translations() -> dict:
    js_path = SITE / "assets" / "js" / "translations.js"
    node = (
        "const fs=require('fs'),vm=require('vm');"
        f"const code=fs.readFileSync({json.dumps(str(js_path))},'utf8');"
        "process.stdout.write(JSON.stringify(vm.runInNewContext(code+'\\nTRANSLATIONS')));"
    )
    result = subprocess.run(["node", "-e", node], check=True, capture_output=True, text=True)
    return json.loads(result.stdout)


TRANSLATIONS = load_translations()


def rtl(lang: str) -> bool:
    return lang == "ar"


def display_text(text: object, lang: str) -> str:
    value = str(text).replace("–", "-").replace("—", "-").replace("×", "x")
    if rtl(lang):
        value = get_display(arabic_reshaper.reshape(value))
    return value


def style_set(lang: str) -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    align = TA_RIGHT if rtl(lang) else TA_LEFT
    return {
        "title": ParagraphStyle("Title" + lang, parent=base["Title"], fontName=FONT_BOLD, fontSize=26, leading=31, textColor=WHITE, alignment=align),
        "cover_sub": ParagraphStyle("CoverSub" + lang, parent=base["Normal"], fontName=FONT, fontSize=11, leading=16, textColor=colors.HexColor("#D8E8EF"), alignment=align),
        "eyebrow": ParagraphStyle("Eyebrow" + lang, parent=base["Normal"], fontName=FONT_BOLD, fontSize=8.3, leading=11, textColor=TEAL, alignment=align, spaceAfter=2.5 * mm),
        "h1": ParagraphStyle("H1" + lang, parent=base["Heading1"], fontName=FONT_BOLD, fontSize=20, leading=25, textColor=NAVY, alignment=align, spaceAfter=4 * mm),
        "h2": ParagraphStyle("H2" + lang, parent=base["Heading2"], fontName=FONT_BOLD, fontSize=13, leading=17, textColor=NAVY, alignment=align, spaceBefore=3 * mm, spaceAfter=2 * mm),
        "body": ParagraphStyle("Body" + lang, parent=base["BodyText"], fontName=FONT, fontSize=9.2, leading=14, textColor=INK, alignment=align, spaceAfter=2.4 * mm),
        "small": ParagraphStyle("Small" + lang, parent=base["BodyText"], fontName=FONT, fontSize=7.7, leading=10.7, textColor=MUTED, alignment=align),
        "bullet": ParagraphStyle("Bullet" + lang, parent=base["BodyText"], fontName=FONT, fontSize=8.8, leading=13, textColor=INK, alignment=align, leftIndent=5 * mm if not rtl(lang) else 0, rightIndent=5 * mm if rtl(lang) else 0, spaceAfter=1.6 * mm),
        "table": ParagraphStyle("Table" + lang, parent=base["BodyText"], fontName=FONT, fontSize=8, leading=10.7, textColor=INK, alignment=align),
        "table_head": ParagraphStyle("TableHead" + lang, parent=base["BodyText"], fontName=FONT_BOLD, fontSize=7.8, leading=10.2, textColor=WHITE, alignment=align),
        "contact": ParagraphStyle("Contact" + lang, parent=base["BodyText"], fontName=FONT_BOLD, fontSize=9.5, leading=15, textColor=WHITE, alignment=align),
    }


def para(text: object, key: str, lang: str, styles: dict) -> Paragraph:
    return Paragraph(escape(display_text(text, lang)), styles[key])


def link_para(title: str, url: str, lang: str, styles: dict) -> Paragraph:
    label = escape(display_text(title, lang))
    return Paragraph(f'<link href="{escape(url)}" color="#0D8B92"><u>{label}</u></link>', styles["small"])


def notice(text: str, lang: str, styles: dict, background=ICE) -> Table:
    table = Table([[para(text, "body", lang, styles)]], colWidths=[170 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background), ("BOX", (0, 0), (-1, -1), 0.8, TEAL),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm), ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 3 * mm), ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
    ]))
    return table


def data_table(rows: list[list[object]], widths: list, lang: str, styles: dict) -> Table:
    data = []
    for row_index, row in enumerate(rows):
        data.append([para(cell, "table_head" if row_index == 0 else "table", lang, styles) for cell in row])
    table = Table(data, colWidths=widths, hAlign="RIGHT" if rtl(lang) else "LEFT", repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY), ("GRID", (0, 0), (-1, -1), 0.45, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, IVORY]),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm), ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 2.3 * mm), ("BOTTOMPADDING", (0, 0), (-1, -1), 2.3 * mm),
    ]))
    return table


def header_footer(canvas, doc, lang: str, labels: dict):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, PAGE_H - 14 * mm, PAGE_W, 14 * mm, fill=1, stroke=0)
    logo = SITE / "assets" / "img" / "logo-header.png"
    if logo.exists():
        canvas.drawImage(str(logo), 18 * mm, PAGE_H - 11.3 * mm, width=35 * mm, height=7 * mm, preserveAspectRatio=True, mask="auto")
    canvas.setFont(FONT_BOLD, 7)
    canvas.setFillColor(colors.HexColor("#CDE9EC"))
    canvas.drawRightString(PAGE_W - 18 * mm, PAGE_H - 8.8 * mm, display_text(labels["header"], lang))
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 13 * mm, PAGE_W - 18 * mm, 13 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT, 6.8)
    canvas.drawString(18 * mm, 8.8 * mm, display_text(labels["footer"], lang))
    canvas.drawRightString(PAGE_W - 18 * mm, 8.8 * mm, display_text(f'{labels["page"]} {doc.page}', lang))
    canvas.restoreState()


def cover(canvas, doc, lang: str, labels: dict, model_name: str, tagline: str, image_name: str):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(NAVY_2)
    canvas.circle(PAGE_W - 5 * mm, PAGE_H - 8 * mm, 60 * mm, fill=1, stroke=0)
    canvas.setFillColor(TEAL)
    canvas.rect(0, PAGE_H - 7 * mm, PAGE_W, 7 * mm, fill=1, stroke=0)
    logo = SITE / "assets" / "img" / "logo-header.png"
    if logo.exists():
        canvas.drawImage(str(logo), 20 * mm, PAGE_H - 30 * mm, width=54 * mm, height=13 * mm, preserveAspectRatio=True, mask="auto")
    image_path = SITE / "assets" / "img" / "models" / "real" / image_name
    if image_path.exists():
        canvas.drawImage(str(image_path), 20 * mm, 74 * mm, width=170 * mm, height=105 * mm, preserveAspectRatio=True, mask="auto", anchor="c")
        canvas.setFillColor(colors.Color(0.04, 0.10, 0.14, alpha=0.18))
        canvas.rect(20 * mm, 74 * mm, 170 * mm, 105 * mm, fill=1, stroke=0)
    x = PAGE_W - 20 * mm if rtl(lang) else 20 * mm
    draw = canvas.drawRightString if rtl(lang) else canvas.drawString
    canvas.setFillColor(colors.HexColor("#74E1E4")); canvas.setFont(FONT_BOLD, 8.5); draw(x, 63 * mm, display_text(labels["cover_series"], lang))
    canvas.setFillColor(WHITE); canvas.setFont(FONT_BOLD, 29); draw(x, 48 * mm, model_name.upper())
    canvas.setFillColor(colors.HexColor("#D8E8EF")); canvas.setFont(FONT, 10.5); draw(x, 38 * mm, display_text(tagline, lang))
    canvas.setFillColor(WHITE); canvas.setFont(FONT_BOLD, 9); draw(x, 27 * mm, display_text(labels["cover_scope"], lang))
    canvas.setFillColor(colors.HexColor("#A8BEC9")); canvas.setFont(FONT, 7.3); draw(x, 17 * mm, display_text(labels["cover_note"], lang))
    canvas.restoreState()


def page_templates(lang: str, labels: dict, model_name: str, tagline: str, image_name: str):
    cover_frame = Frame(0, 0, PAGE_W, PAGE_H, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    content_frame = Frame(18 * mm, 18 * mm, PAGE_W - 36 * mm, PAGE_H - 36 * mm, leftPadding=0, rightPadding=0, topPadding=3 * mm, bottomPadding=2 * mm)
    return [
        PageTemplate(id="cover", frames=[cover_frame], onPage=lambda c, d: cover(c, d, lang, labels, model_name, tagline, image_name)),
        PageTemplate(id="content", frames=[content_frame], onPage=lambda c, d: header_footer(c, d, lang, labels)),
    ]


def bullet_list(items: list[str], lang: str, styles: dict) -> list[Paragraph]:
    symbol = "◂" if rtl(lang) else "•"
    return [para(f"{symbol}  {item}", "bullet", lang, styles) for item in items]


def story_for(lang: str, labels: dict, model_data: dict, trust: dict, technology: dict, styles: dict) -> list:
    content = CONTENT[lang]
    story = [NextPageTemplate("content"), PageBreak()]
    story += [para(labels["status_label"], "eyebrow", lang, styles), para(labels["status_title"], "h1", lang, styles), notice(labels["status_notice"], lang, styles)]
    story += [Spacer(1, 4 * mm), para(labels["model_label"], "eyebrow", lang, styles), para(labels["model_title"], "h1", lang, styles)]
    story += [para(model_data["tagline"], "h2", lang, styles), para(model_data["overview_text"], "body", lang, styles)]
    specs = [[labels["spec_col"], labels["value_col"]]] + [[s["label"], s["value"]] for s in model_data["specs"]]
    story += [data_table(specs, [58 * mm, 112 * mm], lang, styles), Spacer(1, 3 * mm), notice(labels["clinical_note"], lang, styles, AMBER_BG), PageBreak()]

    story += [para(labels["safety_label"], "eyebrow", lang, styles), para(labels["safety_title"], "h1", lang, styles), para(content["policy_intro"], "body", lang, styles)]
    story += bullet_list(content["policy_items"], lang, styles)
    story += [para(labels["installation_title"], "h2", lang, styles)] + bullet_list(labels["installation"], lang, styles)
    story += [PageBreak(), para(labels["workflow_title"], "eyebrow", lang, styles), para(labels["workflow_title"], "h1", lang, styles)]
    flow_rows = [["#", labels["workflow_title"]]] + [[str(i + 1), item] for i, item in enumerate(labels["workflow"])]
    story += [data_table(flow_rows, [14 * mm, 156 * mm], lang, styles), Spacer(1, 4 * mm), notice(labels["emergency"], lang, styles, colors.HexColor("#FFF0E7")), PageBreak()]

    story += [para(labels["maintenance_label"], "eyebrow", lang, styles), para(labels["maintenance_title"], "h1", lang, styles)]
    story += [data_table([labels["maintenance_headers"]] + labels["maintenance"], [34 * mm, 91 * mm, 45 * mm], lang, styles), Spacer(1, 5 * mm)]
    story += [para(labels["safety_title"], "h2", lang, styles)] + bullet_list(content["policy_items"], lang, styles)
    story += [PageBreak(), para(labels["tech_label"], "eyebrow", lang, styles), para(labels["tech_title"], "h1", lang, styles)]
    tech_rows = [[labels["component"], labels["purpose"]]]
    for key in ["connect", "os", "ai", "sync", "guard"]:
        item = technology["pillars"][key]
        tech_rows.append([item["title"], content["tech"][key]])
    story += [data_table(tech_rows, [36 * mm, 134 * mm], lang, styles), Spacer(1, 4 * mm), para(labels["roadmap"], "h2", lang, styles), notice(content["roadmap_note"], lang, styles, AMBER_BG), PageBreak()]

    story += [para(labels["docs_label"], "eyebrow", lang, styles), para(labels["docs_title"], "h1", lang, styles), para(content["docs_intro"], "body", lang, styles)]
    story += bullet_list(content["docs"], lang, styles)
    story += [para(labels["regulatory"], "h2", lang, styles), notice(content["disclosure"], lang, styles), para(labels["sources"], "h2", lang, styles)]
    story += [
        link_para("U.S. FDA - Follow Instructions for Safe Use of Hyperbaric Oxygen Therapy Devices", "https://www.fda.gov/medical-devices/letters-health-care-providers/follow-instructions-safe-use-hyperbaric-oxygen-therapy-devices-letter-health-care-providers", lang, styles),
        Spacer(1, 2 * mm),
        link_para("Undersea & Hyperbaric Medical Society - Accepted HBOT Indications", "https://www.uhms.org/resources/featured-resources/hbo-indications.html", lang, styles),
        Spacer(1, 5 * mm),
    ]
    contact = Table([[para(labels["contact"], "table_head", lang, styles)], [para("sales@hbotchambertech.com\nwww.hbotchambertech.com\nTuzla · Istanbul · Türkiye", "contact", lang, styles)]], colWidths=[170 * mm])
    contact.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), TEAL), ("BACKGROUND", (0, 1), (-1, 1), NAVY), ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm), ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm), ("TOPPADDING", (0, 0), (-1, -1), 4 * mm), ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm)]))
    story.append(contact)
    return story


def build_one(lang: str, slug: str, model_key: str, image_name: str) -> Path:
    labels = LABELS[lang]
    t = TRANSLATIONS[lang]
    model_data = t[model_key]
    model_name = model_data["title"]
    filename = f"hbot-{slug}-usage-safety-technical-file-{lang}.pdf"
    output_path = OUTPUT / filename
    styles = style_set(lang)
    doc = BaseDocTemplate(
        str(output_path), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=18 * mm, bottomMargin=18 * mm,
        title=f"{model_name} - {labels['header']}", author="HBOT Chamber Tech", subject=labels["status_title"],
    )
    doc.addPageTemplates(page_templates(lang, labels, model_name, model_data["tagline"], image_name))
    doc.build(story_for(lang, labels, model_data, t["trustSafety"], t["technology"], styles))
    shutil.copy2(output_path, SITE_OUTPUT / filename)
    return output_path


if __name__ == "__main__":
    built = []
    for lang in LANGS:
        for slug, model_key, _, image_name in MODELS:
            built.append(build_one(lang, slug, model_key, image_name))
    for path in built:
        print(path)
