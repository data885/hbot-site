const TRANSLATIONS = {
  tr: {
    dir: "ltr",
    meta: {
      home: { title: "HBOT Chamber Tech | Apex Serisi Hiperbarik Oksijen Odaları", desc: "IoT bağlantılı, yapay zeka destekli hiperbarik oksijen odaları. Apex Serisi ile zirvede nefes alın." },
      technology: { title: "Teknoloji | HBOT Chamber Tech", desc: "ApexConnect, ApexOS, ApexAI, ApexSync ve ApexGuard — Apex Serisi'nin bağlı, akıllı teknoloji platformu." },
      models: { title: "Modeller | HBOT Chamber Tech", desc: "Apex Solo Lounge, Apex Solo, Apex Duo, Apex Quad, Apex Quad-Cube ve Apex Nexus — altı farklı hiperbarik oksijen odası modeli." },
      soloLounge: { title: "Apex Solo Lounge | HBOT Chamber Tech", desc: "Yatay pozisyonda tedavi için tasarlanmış tek kişilik hiperbarik oksijen odası." },
      solo: { title: "Apex Solo | HBOT Chamber Tech", desc: "Bireysel kullanım için kompakt, tam donanımlı hiperbarik oksijen odası." },
      duo: { title: "Apex Duo | HBOT Chamber Tech", desc: "İki kişilik paylaşımlı hiperbarik oksijen tedavisi kabini." },
      quad: { title: "Apex Quad | HBOT Chamber Tech", desc: "Klinikler için dört kişilik hiperbarik oksijen odası." },
      quadCube: { title: "Apex Quad-Cube | HBOT Chamber Tech", desc: "Dört kişilik, geniş iç hacimli küp tasarım hiperbarik oksijen odası." },
      nexus: { title: "Apex Nexus | HBOT Chamber Tech", desc: "Hastane sınıfı, altı ve üzeri kişilik büyük kapasiteli hiperbarik oksijen odası." },
      hbotInfo: { title: "HBOT Nedir? | HBOT Chamber Tech", desc: "Hiperbarik oksijen tedavisi (HBOT) nedir, ne için kullanılır ve hangi durumlarda uygulanır." },
      configurator: { title: "Konfigüratör | HBOT Chamber Tech", desc: "Kendi Apex kabininizi yapılandırın: model, basınç seviyesi ve ek özellikler seçerek anında fiyat tahmini alın." },
      blog: { title: "Blog | HBOT Chamber Tech", desc: "Hiperbarik oksijen tedavisi hakkında güncel araştırmalar, haberler ve gelişmeler." },
      contact: { title: "İletişim | HBOT Chamber Tech", desc: "HBOT Chamber Tech ile iletişime geçin: adres, telefon, e-posta ve iletişim formu." }
    },
    common: {
      brand: "HBOT Chamber Tech",
      home_label: "Ana Sayfa",
      notfound: { title: "Sayfa Bulunamadı", desc: "Aradığınız sayfa taşınmış veya kaldırılmış olabilir.", button: "Ana Sayfaya Dön" },
      whatsapp_message: "Merhaba, HBOT Chamber Tech hakkında bilgi almak istiyorum.",
      thanks: "Bizi tercih ettiğiniz için teşekkür ederiz.",
      sticky_cta: "Ücretsiz Teklif Al",
      nav: { home: "Ana Sayfa", technology: "Teknoloji", models: "Modeller", hbotInfo: "HBOT Nedir?", blog: "Blog", configurator: "Konfigüratör", contact: "İletişim" },
      models_menu: {
        soloLounge: "Apex Solo Lounge",
        solo: "Apex Solo",
        duo: "Apex Duo",
        quad: "Apex Quad",
        quadCube: "Apex Quad-Cube",
        nexus: "Apex Nexus",
        all_link: "Tüm Modeller"
      },
      footer: {
        about_text: "HBOT Chamber Tech; IoT bağlantılı, yapay zeka destekli hiperbarik oksijen odaları üreten öncü bir markadır.",
        models_title: "Modeller",
        company_title: "Kurumsal",
        contact_title: "İletişim",
        rights: "Tüm hakları saklıdır.",
        membership_note: "Almita Group iştirakidir."
      },
      cta_banner: {
        title: "Size Uygun Apex Modelini Birlikte Bulalım",
        subtitle: "Modeli, basınç seviyesini ve ek özellikleri seçin — anında fiyat tahmini alın.",
        button: "Konfigüratörü Başlat"
      },
      view_all: "Tümünü Gör",
      learn_more: "Detaylı Bilgi",
      back_to_models: "Tüm Modellere Dön",
      included_badge: "Standart Dahil",
      configure_this: "Bu Modeli Yapılandır"
    },
    modelPage: {
      overview_title: "Genel Bakış",
      specs_title: "Teknik Özellikler",
      included_title: "Apex Teknoloji Ekosistemi",
      other_models: "Diğer Modellerimiz"
    },
    home: {
      hero: {
        eyebrow: "APEX SERİSİ",
        title: "Zirvede\nNefes Alın",
        subtitle: "HBOT Chamber Tech; IoT bağlantılı, yapay zeka destekli hiperbarik oksijen odaları üreten öncü bir üreticidir. Yenilik, güvenlik ve tasarım mükemmelliğine odaklanarak en yüksek medikal ve ticari standartları karşılayan kabinler üretiyoruz.",
        cta_primary: "Modelleri İncele",
        cta_secondary: "Konfigüratörü Başlat",
        trust_line: "İleri Mühendislik · Medikal Sınıf Güvenlik Standartları"
      },
      stats: [
        { value: "5", label: "Apex Modeli" },
        { value: "94%", label: "Oksijen Saflığı" },
        { value: "<55dB", label: "ApexSilent™ Gürültü Seviyesi" },
        { value: "7/24", label: "Uzaktan İzleme" }
      ],
      tech_teaser: {
        eyebrow: "TEKNOLOJİ PLATFORMU",
        title: "Kabin İçinde Akıllı Bir Ekosistem",
        text: "Apex Serisi; ApexConnect™, ApexOS™, ApexAI™, ApexSync™ ve ApexGuard™ teknolojileriyle, sektörde ilk ve tek standart IoT çekirdek modülüne sahiptir.",
        cta: "Teknolojiyi Keşfedin"
      },
      models_teaser: {
        eyebrow: "APEX SERİSİ",
        title: "Modellerimiz",
        subtitle: "Tek kişilik bireysel kullanımdan hastane ölçekli çoklu kabinlere kadar, ihtiyacınıza uygun altı farklı tasarım.",
        cta_all: "Tüm Modelleri İncele"
      },
      why: {
        eyebrow: "NEDEN HBOT CHAMBER TECH",
        title: "Piyasadaki Tek Bağlantılı Kabin",
        items: [
          { title: "Sektörde İlk IoT Çekirdeği", desc: "ApexConnect™ ile tüm kabinler 7/24 buluta bağlı, uzaktan izlenebilir." },
          { title: "Yapay Zeka Destekli Tedavi", desc: "ApexAI™, hasta verilerine göre basıncı ve oksijen akışını dinamik olarak optimize eder." },
          { title: "Hastane Sistemleriyle Entegrasyon", desc: "ApexSync™; HL7 FHIR ve DICOM uyumlu, hastane bilgi sistemlerine doğrudan bağlanır." },
          { title: "Arıza Olmadan Önce Haber Verir", desc: "ApexGuard™, öngörücü bakım teknolojisiyle servis çağrısını beklemeden uyarır." }
        ]
      },
      celebs: {
        eyebrow: "KİMLER KULLANIYOR?",
        title: "Dünyanın En İyileri Hiperbarik Oksijeni Seçiyor",
        subtitle: "Toparlanma, performans ve uzun yaşam için HBOT kullandığı haberlerde yer alan isimler — biz o kabinleri üretiyoruz.",
        source_label: "Kaynak",
        disclaimer: "Bu bölümdeki isimler, haber kaynaklarında HBOT kullandığı bildirilen kişilerdir; HBOT Chamber Tech marka elçisi veya müşterisi değildir.",
        items: [
          { name: "Cristiano Ronaldo", role: "Futbolcu", text: "Kas sakatlığının tedavisi için evinde kendi hiperbarik cihazıyla HBOT yaptığı haberlerde yer aldı.", source: "https://www.thesun.co.uk/sport/17203745/cristiano-ronaldo-exclusive-hi-tech-oxygen-chamber/" },
          { name: "LeBron James", role: "Basketbolcu", text: "Netflix 'Starting 5' belgeselinde 60-90 dakikalık HBOT seansı yaparken görüntülendi.", source: "https://medium.com/@chloepaltrow/hbot-helps-lebron-james-earn-victory-for-cavs-at-the-eastern-conference-finals-1285ba769396" },
          { name: "Novak Djokovic", role: "Tenisçi", text: "Zirvede kalmak için HBOT kullandığı spor basınında aktarıldı.", source: "https://honestsport.substack.com/p/exclusive-novak-djokovics-lasting" },
          { name: "Justin Bieber", role: "Şarkıcı", text: "Hiperbarik kabinde uyuduğu ve tedavisinin parçası yaptığı haberleştirildi.", source: "https://www.dailymail.com/tvshowbiz/article-7965575/Justin-Bieber-sleeps-hyperbaric-chamber-relies-IV-infusions-years-drug-use.html" },
          { name: "Tiger Woods", role: "Golfçü", text: "2010'dan beri HBOT kullandığı ve evinde kabin bulundurduğu bildirildi.", source: "https://x.com/TigerWoods/status/1907051252585746470" },
          { name: "Michael Phelps", role: "Yüzücü", text: "Hiperbarik kabinde uyuduğu haberleştirilen olimpiyat efsanesi.", source: "https://www.espn.com/olympics/swimming/story/_/id/7556022/michael-phelps-using-hyperbaric-chamber-aid-recovery" },
          { name: "Madonna", role: "Şarkıcı", text: "Oksijen bazlı bakım ve terapileri rutininin parçası yaptığı moda basınında yazıldı.", source: "https://www.nytimes.com/2006/04/06/fashion/thursdaystyles/does-the-quickfix-oxygen-facial-really-work.html" },
          { name: "Kendall Jenner", role: "Model", text: "Wellness odasında hiperbarik kabin bulundurduğu Vogue'da yer aldı.", source: "https://www.vogue.com/article/what-kendall-jenner-keeps-in-her-wellness-room" },
          { name: "Tom Brady", role: "NFL Oyuncusu", text: "Toparlanma rutininde HBOT kullandığı spor basınında aktarıldı.", source: "https://thesportsrush.com/nfl-news-troy-aikman-and-tom-brady-use-the-same-scientific-practice-for-their-recovery-enhancement/" }
        ]
      },
      indications_teaser: {
        eyebrow: "KULLANIM ALANLARI",
        title: "HBOT Hangi Durumlarda Kullanılır?",
        text: "Yara iyileşmesinden ani işitme kaybına, dekompresyon hastalığından karbon monoksit zehirlenmesine kadar geniş bir tedavi yelpazesinde destekleyici olarak kullanılır.",
        cta: "Tüm Kullanım Alanlarını Gör"
      },
      styles_teaser: {
        eyebrow: "TASARIM SEÇENEKLERİ",
        title: "Kabin Stilinizi Seçin",
        subtitle: "Her Apex modeli, mekanınıza ve tercihinize uygun farklı tasarım seçenekleriyle sunulur.",
        items: [
          { icon: "glass", title: "Panoramik Camlı Seri", desc: "Geniş cam yüzeyli tasarım; ferahlık hissi ve dışarıyla görsel bağlantı isteyen kullanıcılar için." },
          { icon: "solid", title: "Standart Kapalı Tasarım", desc: "Sade, kapalı gövde tasarımı; mahremiyet ve klinik sadelik önceliğiyle tercih edilir." },
          { icon: "premium", title: "Premium Seri", desc: "Üst düzey iç döşeme, gelişmiş aydınlatma ve özel detaylarla donatılmış en üst segment tasarım.", badge: "Premium" }
        ],
        note: "Cam tipi ve kabin stili tercihinizi, teklif talebinizde bize iletebilirsiniz."
      }
    },
    technology: {
      header: { eyebrow: "TEKNOLOJİ PLATFORMU", title: "Apex Teknoloji Ekosistemi", subtitle: "Sıradan bir kontrol paneli değil — sürekli gelişen, bağlı ve akıllı bir sistem." },
      intro: "Tüm Apex modelleri; ApexConnect™, ApexOS™, ApexAI™, ApexSync™ ve ApexGuard™ teknolojilerini standart olarak içerir. Bu beş platform birlikte çalışarak kabini basit bir tedavi cihazından akıllı, bağlı ve öngörücü bir sisteme dönüştürür.",
      pillars: {
        connect: {
          title: "ApexConnect™",
          subtitle: "Sürekli Bağlantı, Kesintisiz Güvenlik",
          desc: "Endüstride ilk ve tek standart IoT çekirdek modülü. Tüm Apex modelleri, sürekli internet bağlantısı üzerinden HBOT Chamber Tech Cloud'a bağlıdır.",
          features: [
            "Gerçek zamanlı uzaktan izleme: basınç, oksijen seviyesi, sıcaklık ve nem verileri canlı izlenir",
            "Çoklu cihaz yönetimi: birden fazla kabini tek bir dashboard'dan yönetin",
            "Otomatik arıza bildirimi: basınç valfinde sapma olduğunda servis ekibine otomatik talep açılır",
            "Anlık uyarılar: kritik parametrelerde SMS ve e-posta bildirimi"
          ]
        },
        os: {
          title: "ApexOS™",
          subtitle: "Kabin İçinde Akıllı Bir Beyin",
          desc: "Android tabanlı, dokunmatik ekranlı ve sürekli gelişen bir işletim sistemi.",
          features: [
            "Sürekli yazılım güncellemesi (OTA): yeni protokoller ve güvenlik güncellemeleri otomatik indirilir",
            "50+ hazır tedavi protokolü: yanık, diyabetik ayak, sporcu iyileşmesi, anti-aging, post-COVID rehabilitasyonu",
            "Çoklu dil desteği: yazılım güncellemesiyle yeni diller eklenir",
            "Kullanıcı profilleri: her hasta için ayrı profil, geçmiş seanslar otomatik yüklenir"
          ]
        },
        ai: {
          title: "ApexAI™",
          subtitle: "Yapay Zeka Destekli Tedavi Optimizasyonu",
          desc: "Kabin içindeki sensörler ve hasta verileri, makine öğrenimi algoritmalarıyla analiz edilir.",
          features: [
            "Dinamik basınç ayarı: rahatsızlık belirtisinde basınç mikro adımlarla ayarlanarak konfor korunur",
            "Oksijen verimlilik optimizasyonu: nefes ritmine göre oksijen akışı ayarlanır, tüketim %30 azalır",
            "Seans öneri motoru: protokol tamamlandığında doktor onayına rapor hazırlanır",
            "Klostrofobi algılama: aşırı hareketlilik algılandığında aydınlatma ve iletişim sistemi devreye girer"
          ]
        },
        sync: {
          title: "ApexSync™",
          subtitle: "Hastane Bilgi Sistemleriyle Tek Tık Entegrasyon",
          desc: "HL7 FHIR ve DICOM uyumlu. Seans bitince veriler otomatik hasta dosyasına düşer.",
          features: [
            "Epic, Cerner, Medistat, Logo ve yerel hastane bilgi sistemlerine doğrudan bağlantı",
            "Otomatik raporlama: her seans sonunda doktorun ekranına rapor gelir",
            "Fatura entegrasyonu: oksijen miktarı ve seans süresi otomatik muhasebe modülüne aktarılır"
          ]
        },
        guard: {
          title: "ApexGuard™",
          subtitle: "Öngörücü Güvenlik ve Bakım",
          desc: "Sadece arıza olduğunda uyarmak değil, arıza olmadan önce tahmin etmek.",
          features: [
            "Tahmine dayalı bakım: kompresör motorunun titreşim deseni değiştiğinde sistem uyarı verir",
            "Dijital güvenlik günlüğü: her basınç değişimi şifreli olarak bulutta loglanır",
            "Otomatik dezenfeksiyon logu: UV-C veya ozon dezenfeksiyonu yapıldığında otomatik kayıt tutulur"
          ]
        }
      },
      extra: {
        silent: { title: "ApexSilent™", desc: "55 desibelin altında çalışma gürültüsü." },
        care: { title: "ApexCare™", desc: "Servis çağrısı beklemeden uzaktan teşhis ve çözüm." }
      },
      comparison: {
        title: "Neden HBOT Chamber Tech?",
        subtitle: "Apex Serisi'ni piyasadaki diğer kabinlerle karşılaştırın.",
        col_feature: "Özellik",
        col_competitor: "Piyasadaki Rakipler",
        col_apex: "HBOT Chamber Tech Apex Serisi",
        rows: [
          { feature: "İnternet Bağlantısı", competitor: "Yok veya opsiyonel", apex: "ApexConnect™ — Standart, 7/24" },
          { feature: "OTA Yazılım Güncellemesi", competitor: "Yok, sabit firmware", apex: "ApexOS™ — Sürekli güncellenir" },
          { feature: "Uzaktan İzleme", competitor: "Sınırlı veya yok", apex: "ApexConnect™ — Canlı dashboard" },
          { feature: "Yapay Zeka Desteği", competitor: "Yok", apex: "ApexAI™ — Dinamik protokol" },
          { feature: "EMR/HBS Entegrasyonu", competitor: "Manuel veya yok", apex: "ApexSync™ — HL7/DICOM otomatik" },
          { feature: "Tahmine Dayalı Bakım", competitor: "Yok, reaktif bakım", apex: "ApexGuard™ — Arıza öncesi uyarı" },
          { feature: "Otomatik Raporlama", competitor: "Yok", apex: "ApexSync™ — Seans bitince rapor" },
          { feature: "Uzaktan Teşhis", competitor: "Yok, servis çağrısı gerekir", apex: "ApexCare™ — Uzaktan çözüm" },
          { feature: "Gürültü Seviyesi", competitor: "60–70 dB", apex: "ApexSilent™ — <55 dB" },
          { feature: "Dijital Güvenlik Günlüğü", competitor: "Yok", apex: "ApexGuard™ — Şifreli bulut kayıt" }
        ]
      },
      roadmap: {
        eyebrow: "YOL HARİTASI",
        title: "Sırada Ne Var?",
        subtitle: "ApexConnect™ platformu üzerinde geliştirilmekte olan, henüz mevcut Apex modellerinde standart olmayan özellikler.",
        badge: "Geliştiriliyor",
        items: [
          { icon: "mobileApp", title: "ApexConnect Mobil İzleme Uygulaması", desc: "Klinik personelinin kabin basıncı, oksijen seviyesi ve sistem durumunu telefondan takip edebileceği bir izleme uygulaması." },
          { icon: "healthSync", title: "Sağlık Uygulaması Senkronizasyonu", desc: "Seans süresi ve geçmiş verilerinin Apple Health, Huawei Health ve Google Fit ile senkronize edilmesi." },
          { icon: "screen", title: "Sabit Monte İmmersif Ekran Deneyimi", desc: "Seans sırasında rahatlatıcı görsel içerik sunan, kabine sabit monte edilmiş geniş ekran deneyimi." }
        ],
        disclaimer: "Bu özellikler geliştirme aşamasındadır ve gelecekteki modellerde sunulması planlanmaktadır; mevcut Apex modellerinde standart değildir. Kabin basıncı ve oksijen seviyesi her zaman yetkili bir operatör tarafından kontrol edilir."
      }
    },
    modelsOverview: {
      header: { eyebrow: "APEX SERİSİ", title: "Modellerimiz", subtitle: "Tek kişilik bireysel kullanımdan hastane ölçekli çoklu kabinlere kadar altı farklı tasarım." },
      intro: "Her Apex modeli; ApexConnect™, ApexOS™, ApexAI™, ApexSync™ ve ApexGuard™ teknolojilerini standart olarak içerir. Aralarındaki fark; kapasite, pozisyon ve basınç aralığıdır.",
      compareTable: {
        title: "Modelleri Karşılaştırın",
        subtitle: "Hangi Apex modelinin size uygun olduğuna hızlıca karar verin.",
        col_capacity: "Kapasite",
        col_position: "Pozisyon",
        col_pressure: "Basınç Aralığı",
        col_price: "Başlangıç Fiyatı",
        col_noise: "Gürültü Seviyesi",
        action_label: "Yapılandır"
      }
    },
    modelShort: {
      soloLounge: { title: "Apex Solo Lounge", tagline: "1 Kişi · Yatay Pozisyon", desc: "Yatay pozisyonda tedavi ihtiyacı olan kullanıcılar için özel olarak geliştirilmiş, tam donanımlı kabin." },
      solo: { title: "Apex Solo", tagline: "1 Kişi · Oturma Pozisyonu", desc: "Bireysel hiperbarik oksijen tedavisi için tasarlanmış kompakt, şık ve tam donanımlı kabin." },
      duo: { title: "Apex Duo", tagline: "2 Kişi · Oturma Pozisyonu", desc: "Çift koltuklu, panoramik camlı kabin — eşler, partnerler veya hasta-refakatçi kullanımı için." },
      quad: { title: "Apex Quad", tagline: "4 Kişi · Oturma Pozisyonu", desc: "Klinikler ve ticari wellness merkezleri için entegre kontrol panelli, orta ölçekli çok koltuklu kabin." },
      quadCube: { title: "Apex Quad-Cube", tagline: "4 Kişi · Geniş Kabin", desc: "Geniş iç hacimli küp tasarımıyla dört kişilik premium kabin — kapitone deri iç mekân ve LED aydınlatma." },
      nexus: { title: "Apex Nexus", tagline: "6+ Kişi · Oturma Pozisyonu", desc: "Sağlık kurumları için hastane sınıfı, büyük kapasiteli, modüler genişlemeye hazır kabin." }
    },
    includedItems: [
      { icon: "connect", title: "ApexConnect™ Dahil", desc: "İnternet bağlantısı standart. Uzaktan izleme, anlık uyarılar ve bulut yedekleme." },
      { icon: "os", title: "ApexOS™ Güncelleme", desc: "Cihazınız her ay yeni özellikler kazanır. OTA güncellemeleriyle protokoller güncel kalır." },
      { icon: "ai", title: "ApexAI™ Optimizasyon", desc: "Hasta verilerini analiz eden yapay zeka, seansları dinamik olarak ayarlar." },
      { icon: "sync", title: "ApexSync™ Entegrasyon", desc: "Hastane bilgi sistemleriyle tek tık entegrasyon. Otomatik raporlama." },
      { icon: "guard", title: "ApexGuard™ Güvenlik", desc: "Arıza olmadan önce haber veren tahmine dayalı bakım teknolojisi." }
    ],
    modelSoloLounge: {
      breadcrumb: "Apex Solo Lounge", eyebrow: "APEX SOLO LOUNGE", title: "Apex Solo Lounge",
      tagline: "Yatayda Mükemmellik. Uzanın, rahatlayın, iyileşin.",
      overview_text: "Yatay pozisyonda tedavi ihtiyacı olan kullanıcılar için özel olarak geliştirilmiştir. Medikal ortopedik yatağı ve havacılık sınıfı alüminyum gövdesiyle, uzun seanslarda maksimum konfor sağlar.",
      specs: [
        { label: "Kapasite", value: "1 kişi (yatay pozisyon)" },
        { label: "Basınç Aralığı", value: "1.5 – 2.5 ATA" },
        { label: "Yatak", value: "Medikal ortopedik, 200×80 cm" },
        { label: "Malzeme", value: "Havacılık sınıfı alüminyum" },
        { label: "Güvenlik", value: "Çift emniyet valfi" },
        { label: "Dış Ölçüler", value: "240×110×120 cm" },
        { label: "Gürültü Seviyesi", value: "<55 dB (ApexSilent™)" }
      ]
    },
    modelSolo: {
      breadcrumb: "Apex Solo", eyebrow: "APEX SOLO", title: "Apex Solo",
      tagline: "Kişisel Sağlığınızın Zirvesi. Yalnızca siz ve oksijen.",
      overview_text: "Bireysel hiperbarik oksijen tedavisi için tasarlanmış kompakt, şık ve tam donanımlı kabin. Dokunmatik ekran kontrolüyle ev veya klinik kullanımı için idealdir.",
      specs: [
        { label: "Kapasite", value: "1 kişi (oturma)" },
        { label: "Basınç Aralığı", value: "1.5 – 2.5 ATA" },
        { label: "Kontrol", value: "Dokunmatik ekran" },
        { label: "Malzeme", value: "Havacılık sınıfı alüminyum" },
        { label: "Güvenlik", value: "Çift emniyet valfi" },
        { label: "Dış Ölçüler", value: "120×110×180 cm" },
        { label: "Gürültü Seviyesi", value: "<55 dB (ApexSilent™)" }
      ]
    },
    modelDuo: {
      breadcrumb: "Apex Duo", eyebrow: "APEX DUO", title: "Apex Duo",
      tagline: "Birlikte İyileşin. İki kişilik paylaşımlı tedavi deneyimi.",
      overview_text: "Çift koltuklu hiperbarik kabin, paylaşımlı tedavi seansları sunar. Eşler, partnerler veya hasta-refakatçi kullanımı için tasarlanmıştır.",
      specs: [
        { label: "Kapasite", value: "2 kişi (oturma)" },
        { label: "Basınç Aralığı", value: "1.5 – 2.5 ATA" },
        { label: "Oksijen Saflığı", value: "%93–95" },
        { label: "Güvenlik", value: "Acil durum valf sistemi" },
        { label: "Kontrol", value: "Çift kontrol sistemi" },
        { label: "Pencere", value: "Panoramik" }
      ]
    },
    modelQuad: {
      breadcrumb: "Apex Quad", eyebrow: "APEX QUAD", title: "Apex Quad",
      tagline: "Klinikler ve wellness merkezleri için orta ölçekli çözüm.",
      overview_text: "Entegre kontrol panelli, orta ölçekli çok koltuklu kabin. Klinikler ve ticari wellness merkezleri için inşa edilmiştir.",
      specs: [
        { label: "Kapasite", value: "4 kişi (oturma)" },
        { label: "Basınç Aralığı", value: "1.5 – 2.5 ATA" },
        { label: "Oksijen Saflığı", value: "%93–95" },
        { label: "Güvenlik", value: "Acil durum valf sistemi" },
        { label: "İzleme", value: "Çoklu kullanıcı izleme" },
        { label: "Kontrol", value: "Harici kontrol paneli" }
      ]
    },
    modelQuadCube: {
      breadcrumb: "Apex Quad-Cube", eyebrow: "APEX QUAD-CUBE", title: "Apex Quad-Cube",
      tagline: "Geniş küp tasarımında dört kişilik premium deneyim.",
      overview_text: "Küp formundaki geniş iç hacmiyle dört kişilik premium kabin. Kapitone deri iç mekânı, LED ambiyans aydınlatması ve bağımsız kontrol ünitesiyle klinik ve wellness merkezlerine konforlu çok kişilik tedavi sunar.",
      specs: [
        { label: "Kapasite", value: "4 kişi (oturma)" },
        { label: "Basınç Aralığı", value: "1.5 – 2.5 ATA" },
        { label: "Oksijen Saflığı", value: "%93–95" },
        { label: "İç Mekân", value: "Kapitone deri, LED ambiyans" },
        { label: "Güvenlik", value: "Acil durum valf sistemi" },
        { label: "Kontrol", value: "Bağımsız kontrol ünitesi" }
      ]
    },
    modelNexus: {
      breadcrumb: "Apex Nexus", eyebrow: "APEX NEXUS", title: "Apex Nexus",
      tagline: "Hastane sınıfı, büyük kapasiteli çözüm.",
      overview_text: "Sağlık kurumları için hastane sınıfı, büyük kapasiteli kabin. Modüler tasarımı ve gelişmiş izleme sistemleriyle en yoğun tedavi merkezlerinin ihtiyacını karşılar.",
      specs: [
        { label: "Kapasite", value: "6+ kişi (oturma)" },
        { label: "Basınç Aralığı", value: "3.0 – 6.0 ATA" },
        { label: "Oksijen Saflığı", value: "%93–95" },
        { label: "Güvenlik", value: "Acil durum valf sistemi" },
        { label: "Yapı", value: "Hastane sınıfı" },
        { label: "Genişleme", value: "Modüler genişlemeye hazır" }
      ]
    },
    hbotInfo: {
      header: { eyebrow: "BİLGİ MERKEZİ", title: "HBOT Nedir?", subtitle: "Hiperbarik oksijen tedavisi hakkında bilmeniz gerekenler." },
      whatIsHboc: { title: "Hiperbarik Oksijen Odası (HBOC) Nedir?", text: "Hiperbarik oksijen odaları, kişilerin normal atmosfer basıncından daha yüksek basınçta saf oksijen solumasını sağlayan, özel olarak tasarlanmış basınçlı kabinlerdir. Bu kabinler, iyileşmeyi hızlandıran ve genel sağlığı destekleyen, tıbbi olarak tanınmış bir tedavi olan Hiperbarik Oksijen Tedavisi (HBOT) için kullanılır." },
      whyNeeded: { title: "HBOC Ne İçin Kullanılır?", text: "HBOC kabinleri, hastaların %94 saf oksijen soluduğu kontrollü, basınçlı bir ortam sağlayarak daha hızlı iyileşme ve gelişmiş hücresel yenilenme sunar. Bu kabinler; sağlık kuruluşlarına, wellness merkezlerine, spor kliniklerine ve bireysel kullanıcılara hizmet verir." },
      whatIsHbot: {
        title: "Hiperbarik Oksijen Tedavisi (HBOT) Nedir?",
        text1: "HBOT; hastaların normal atmosfer basıncından daha yüksek seviyelerde, basınçlı bir kabin içinde saf oksijen soluduğu tıbbi bir tedavidir. Bu süreç yara iyileşmesini hızlandırır, iltihabı azaltır ve doku yenilenmesini destekler.",
        text2: "Hastalar bu kabinler içinde nefes alır, bu da akciğerlerin oksijeni daha verimli toplamasına ve emmesine yardımcı olur. HBOT ayrıca ani işitme ve görme kaybı, kemik enfeksiyonları ve diyabetik ayak ülserlerinin tedavisinde de kullanılır. Tedavi türüne bağlı olarak hastalar oturarak veya uzanarak tedavi olabilir."
      },
      indications: {
        title: "HBOT Hangi Durumlarda Kullanılır?",
        subtitle: "Hiperbarik oksijen tedavisi, geniş bir tıbbi durum yelpazesinde destekleyici tedavi olarak kullanılır.",
        items: [
          { icon: "antiaging", label: "Cilt Gençleştirme (Anti-Aging)" },
          { icon: "jetlag", label: "Jetlag Toparlanması (Seyahat Yorgunluğu)" },
          { icon: "wound", label: "Yara İyileşmesi (Diyabetik & Diyabetik Olmayan)" },
          { icon: "eye", label: "Ani Görme Kaybı" },
          { icon: "decompression", label: "Dekompresyon Hastalığı" },
          { icon: "embolism", label: "Hava veya Gaz Embolisi" },
          { icon: "poisoning", label: "Karbon Monoksit & Yakıt Zehirlenmesi" },
          { icon: "ear", label: "Ani İşitme Kaybı" },
          { icon: "bone", label: "Osteonekroz" },
          { icon: "burn", label: "Termal Yanıklar" },
          { icon: "gangrene", label: "Gazlı Kangren" },
          { icon: "blood", label: "Aşırı Kan Kaybı" },
          { icon: "brain", label: "Anoksik Ensefalopati" },
          { icon: "smoke", label: "Akut Duman Zehirlenmesi" }
        ]
      },
      disclaimer: "Bu bilgiler genel bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. Tedavi kararları mutlaka bir sağlık profesyoneli tarafından değerlendirilmelidir."
    },
    configurator: {
      header: { eyebrow: "KONFİGÜRATÖR", title: "Kendi Apex Kabininizi Tasarlayın", subtitle: "Modeli, basınç seviyesini ve ek özellikleri seçin — anında fiyat tahmini alın." },
      step1_title: "2. Model Seçin",
      style_step_title: "1. Kabin Stili",
      style_step_note: "Kabin tasarımınızı seçin; cam yüzey oranı ve iç donanım seviyesine göre fiyat değişir.",
      color_step_title: "3. Renk Seçin",
      color_step_note: "Standart renk paletimizden ücretsiz seçim yapın.",
      interior_step_title: "4. İç Renk",
      interior_step_note: "Standart iç mekân renkleri fiyata dâhildir.",
      seat_color_step_title: "5. Koltuk Rengi",
      seat_color_step_note: "Koltuk döşeme rengi fiyata dâhildir; seçiminiz özet ve teklif formuna eklenir.",
      step2_title: "6. Basınç Seviyesi",
      step3_title: "7. Ek Özellikler",
      step4_title: "8. Teklif İsteyin",
      models: [
        { id: "solo-lounge", name: "Apex Solo Lounge", tagline: "1 Kişi · Yatay Pozisyon" },
        { id: "solo", name: "Apex Solo", tagline: "1 Kişi · Oturma Pozisyonu" },
        { id: "duo", name: "Apex Duo", tagline: "2 Kişi · Oturma Pozisyonu" },
        { id: "quad", name: "Apex Quad", tagline: "4 Kişi · Oturma Pozisyonu" },
        { id: "quad-cube", name: "Apex Quad-Cube", tagline: "4 Kişi · Geniş Kabin" },
        { id: "nexus", name: "Apex Nexus", tagline: "6+ Kişi · Oturma Pozisyonu" }
      ],
      colors: [
        { id: "pearl-white", name: "İnci Beyazı", hex: "#F2F1EC" },
        { id: "mat-siyah", name: "Mat Siyah", hex: "#16181A" },
        { id: "antrasit", name: "Antrasit", hex: "#3A3D42" },
        { id: "gece-laciverti", name: "Gece Laciverti", hex: "#1B2A4A" },
        { id: "bordo", name: "Bordo", hex: "#6B2737" },
        { id: "sampanya", name: "Şampanya Altın", hex: "#C9A876" },
        { id: "grafit", name: "Grafit Gri", hex: "#3A3F44" },
        { id: "bronz", name: "Bronz", hex: "#A5754A" },
        { id: "zumrut", name: "Zümrüt Yeşili", hex: "#1F6F54" }
      ],
      interior_colors: [
        { id: "cream", name: "Krem", hex: "#E8DCC8" },
        { id: "anthracite", name: "Antrasit", hex: "#3A3D42" },
        { id: "burgundy", name: "Bordo", hex: "#6B2737" },
        { id: "navy", name: "Lacivert", hex: "#1B2A4A" },
        { id: "konyak", name: "Konyak", hex: "#8A5A2B" },
        { id: "kum-beji", name: "Kum Beji", hex: "#D9C7A7" }
      ],
      seat_colors: [
        { id: "konyak", name: "Konyak", hex: "#8A5A2B" },
        { id: "siyah", name: "Siyah", hex: "#16181A" },
        { id: "lacivert", name: "Lacivert", hex: "#1B2A4A" },
        { id: "krem", name: "Krem", hex: "#E8DCC8" },
        { id: "bordo", name: "Bordo", hex: "#6B2737" },
        { id: "gri", name: "Gri", hex: "#6B6F75" }
      ],
      styles: [
        { id: "solid", icon: "solid", name: "Standart Kapalı Tasarım", desc: "Sade, kapalı gövde tasarımı; mahremiyet ve klinik sadelik önceliğiyle tercih edilir." },
        { id: "glass", icon: "glass", name: "Panoramik Camlı Seri", desc: "Geniş cam yüzeyli tasarım; ferahlık hissi ve dışarıyla görsel bağlantı isteyen kullanıcılar için." },
        { id: "premium", icon: "premium", name: "Premium Seri", desc: "Üst düzey iç döşeme, gelişmiş aydınlatma ve özel detaylarla donatılmış en üst segment tasarım.", badge: "Premium" }
      ],
      addons: [
        { id: "massage", name: "Masajlı Koltuk", desc: "Seans sırasında rahatlatıcı masaj fonksiyonlu koltuk sistemi." },
        { id: "leather", name: "Premium Deri Döşeme", desc: "El işçiliği premium deri iç döşeme yükseltmesi." },
        { id: "entertainment", name: "Eğlence & Multimedya Sistemi", desc: "Dahili ekran, ses sistemi ve içerik kütüphanesi." },
        { id: "finish", name: "Özel Renk & Kaplama", desc: "Kurumsal kimliğinize özel dış kaplama rengi seçimi." },
        { id: "uvc", name: "Gelişmiş UV-C Dezenfeksiyon Ünitesi", desc: "Seanslar arası hızlı ve otomatik UV-C dezenfeksiyonu." },
        { id: "backup-o2", name: "Yedek Oksijen Konsantratörü", desc: "Kesintisiz tedavi için ikinci bir oksijen kaynağı." },
        { id: "warranty", name: "Genişletilmiş Garanti (3 Yıl)", desc: "Standart garantiye ek 2 yıl daha kapsamlı koruma." },
        { id: "install", name: "Öncelikli Kurulum & Eğitim Paketi", desc: "Hızlandırılmış kurulum ve kapsamlı personel eğitimi." },
        { id: "playstation", name: "PlayStation 5 Oyun Konsolu", desc: "Uzun tedavi seanslarında eğlence için kabin içi ekran ve ses sistemine entegre PlayStation 5 konsolu." }
      ],
      pressure_note: "Basınç aralığı seçilen modele göre değişir.",
      pressure_nexus_only: "Sadece Nexus",
      pressure_auto_note: "3.0 ve 6.0 ATA yalnızca Apex Nexus modelinde sunulur — basınç seviyesi 2.5 ATA'ya ayarlandı.",
      pressure_auto_note_up: "Apex Nexus medical kabindir ve yalnızca yüksek basınç sunar — basınç seviyesi 3.0 ATA'ya ayarlandı.",
      seat_step_title: "Koltuk Sayısı",
      seat_step_note: "Apex Nexus modelinde, ihtiyacınıza göre koltuk sayısını 6'dan başlayarak artırabilirsiniz.",
      seats_label: "Koltuk",
      currency_label: "Para Birimi",
      summary: {
        title: "Yapılandırma Özeti",
        model_label: "Model",
        seats_label: "Koltuk Sayısı",
        style_label: "Kabin Stili",
        color_label: "Renk",
        interior_color_label: "İç Renk",
        seat_color_label: "Koltuk Rengi",
        seat_type_label: "Koltuk Tipi",
        seat_standard: "Standart",
        seat_massage: "Masajlı",
        pressure_label: "Basınç Seviyesi",
        addons_label: "Ek Özellikler",
        none_selected: "Seçilmedi",
        base_price_label: "Baz Fiyat",
        total_label: "Tahmini Toplam",
        disclaimer: "Fiyatlar yaklaşık ve bilgilendirme amaçlıdır. Kesin teklif için formu doldurun.",
        cta: "Bu Yapılandırmayla Teklif İste",
        print_button: "Yazdır / PDF Olarak Kaydet",
        share_button: "Yapılandırma Linkini Kopyala",
        share_copied: "Link kopyalandı!",
        discount_label: "İndirim",
        ref_badge: "Referans indirimi uygulandı",
        refer_button: "Arkadaşına Öner",
        refer_copied: "Öneri linki kopyalandı!",
        email_button: "Teklifi E-postayla Gönder",
        pdf_title: "Yapılandırma Teklifi",
        pdf_quote_no: "Teklif No",
        pdf_date: "Tarih",
        pdf_customer_section: "MÜŞTERİ BİLGİLERİ",
        pdf_configuration_section: "YAPILANDIRMA DETAYLARI"
      },
      stage: {
        view_exterior: "Dış Görünüm",
        view_interior: "İç Görünüm",
        spin_hint: "↔ Döndürmek için sürükle"
      },
      quote_form: {
        title: "Teklif İsteyin",
        name: "Ad Soyad",
        email: "E-posta",
        phone: "Telefon",
        company: "Kurum / Klinik Adı (opsiyonel)",
        message: "Ek Notlar",
        submit: "Teklif Talebini Gönder",
        sending: "Gönderiliyor...",
        success: "Teşekkürler! Yapılandırmanız ve talebiniz alındı, en kısa sürede size dönüş yapacağız.",
        error: "Bir şeyler ters gitti. Lütfen tekrar deneyin ya da bizi doğrudan arayın."
      }
    },
    blog: {
      header: { eyebrow: "BLOG", title: "Araştırmalar & Haberler", subtitle: "Hiperbarik oksijen tedavisi alanındaki güncel bilimsel gelişmeler ve haberler." },
      source_label: "Kaynak:",
      min_read: "dk okuma",
      disclaimer: "Bu yazılar, halka açık bilimsel yayın ve haber kaynaklarından derlenen özet bilgilerdir; tıbbi tavsiye niteliği taşımaz. Tedavi kararları için mutlaka bir sağlık profesyoneline danışın.",
      posts: [
        {
          date: "2026",
          tag: "Kurucu Notu",
          icon: "care",
          title: "Neden Kendim de Hiperbarik Oksijen Kullanıyorum",
          paragraphs: [
            "Almita Group çatısı altında altı farklı sektörü bir arada yürütüyoruz; yoğun bir tempo ve sürekli seyahat kaçınılmaz oluyor. HBOT Chamber Tech'i kurarken üretmeye başlamadan önce kendi kabinlerimizi düzenli olarak kullanmayı tercih ettim — bir ürünü, arkasında durmadan önce bizzat denemek gerektiğine inanıyorum.",
            "Seanslar sonrasında kendimi daha dinç ve odaklanmış hissettiğimi söyleyebilirim; bu tamamen kişisel bir gözlem ve herkes için aynı sonucu vaat etmiyorum. Hiperbarik oksijen tedavisi bir tıbbi tedavi yerine geçmez; kullanım kararlarınızı mutlaka bir sağlık profesyoneliyle değerlendirin."
          ],
          source_name: "Almita Group – Kurucu Notu",
          source_url: "https://almitagroup.com",
          author: "Mürsel Alkan"
        },
        {
          date: "2026",
          tag: "Longevity",
          icon: "antiaging",
          title: "HBOT ve Longevity: 2026'da Uzun Yaşam Trendi",
          paragraphs: [
            "Bryan Johnson gibi teknoloji girişimcilerinin kişisel 'genç kalma' protokolleriyle ana akım gündeme taşınan longevity (uzun ve sağlıklı yaşam) akımı, hiperbarik oksijen tedavisine olan ilgiyi de artırdı. Bu ilginin bilimsel dayanaklarından biri, 2020 yılında Aging dergisinde yayımlanan ve 64 yaş üzeri 35 sağlıklı yetişkinin 60 seanslık bir HBOT programına katıldığı klinik çalışma oldu.",
            "Araştırmada, bağışıklık hücrelerinin telomer uzunluklarında %20'nin üzerinde — B hücrelerinde %37'ye varan — artış, yaşlanmış (senescent) bağışıklık hücrelerinin oranında ise %37'ye varan azalma gözlemlendi. Çalışmanın kontrol grubunun olmaması ve örneklem büyüklüğünün sınırlı olması nedeniyle sonuçlar 'umut verici ama ön bulgu' olarak değerlendiriliyor; araştırmacılar optimal protokollerin belirlenmesi için daha kapsamlı çalışmalara ihtiyaç olduğunu vurguluyor."
          ],
          source_name: "PMC – HBOT Increases Telomere Length and Decreases Immunosenescence (Aging, 2020)",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7746357/"
        },
        {
          date: "2026",
          tag: "Spor",
          icon: "healthSync",
          title: "Elit Sporcular Neden Hiperbarik Oksijen Kullanıyor?",
          paragraphs: [
            "Cristiano Ronaldo, LeBron James, Novak Djokovic ve Floyd Mayweather gibi dünyaca ünlü sporcular, basına yansıyan haberlerde toparlanma rutinlerinin bir parçası olarak hiperbarik kabin kullanımlarıyla anılıyor. Bu ilginin arkasında, spor hekimliği literatüründe HBOT'un ödem ve iltihabı azaltma, doku onarımını destekleme ve sporcunun antrenmana daha hızlı dönmesine katkı sağlama potansiyeline dair bulgular yatıyor.",
            "Derlemelerde aktarılan çalışmalar arasında, Nagano Kış Olimpiyatları'nda 7 sporcunun 1.3 ATA'da kısa seanslarla daha hızlı toparlandığı gözlemi, profesyonel futbolcularda sakatlık nedeniyle kaybedilen günlerde %55 azalma bildiren erken bir klinik rapor ve ayak bileği burkulmalarında kontrol grubuna kıyasla yaklaşık %30 daha hızlı dönüş öneren bir üniversite çalışması bulunuyor. Yazarlar, mevcut kanıtların büyük ölçüde küçük örneklemli çalışmalara dayandığını ve kesin sonuçlar için randomize kontrollü araştırmalar gerektiğini özellikle not ediyor."
          ],
          source_name: "PMC – The Role of Hyperbaric Oxygen Therapy in Sports Medicine (derleme)",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3382683/"
        },
        {
          date: "2026",
          tag: "Rehber",
          icon: "oneSeat",
          title: "Ev Tipi Hiperbarik Kabin Seçim Rehberi",
          paragraphs: [
            "Ev veya özel kullanım için hiperbarik kabin seçerken ilk soru kapasite: tek kişilik (monoplace) kabinler kompakt yerleşim sunarken, çok kişilik (multiplace) kabinler aile veya küçük grupların aynı anda kullanımına olanak tanır ve refakatçi eşliğinde kullanım kolaylığı sağlar. Uluslararası hiperbarik tıp otoritesi UHMS, basınçlı kabinlerin onaylı ve düzenli denetlenen ekipman olmasını, operatörlerin ise özel eğitim almış olmasını şart koşuyor.",
            "Basınç seviyesi ikinci kritik başlık: klinik protokoller genellikle 2.0-2.4 ATA aralığında uygulanırken, ev tipi sistemlerde 1.3-2.0 ATA aralığı yaygın; kullanım amacınıza uygun seviyeyi mutlaka bir sağlık profesyoneliyle değerlendirin. Üçüncü başlık ise güvenlik ve konfor: oksijen ortamında yangın güvenliği kuralları, acil durum tahliyesi, gürültü seviyesi, iç aydınlatma ve iletişim sistemi gibi detaylar günlük kullanım deneyimini doğrudan etkiler; satın alma öncesi bakım ve garanti koşullarını da yazılı olarak teyit edin."
          ],
          source_name: "StatPearls (NCBI) – Hyperbaric Oxygen Therapy",
          source_url: "https://www.ncbi.nlm.nih.gov/books/NBK459172/"
        },
        {
          date: "2026",
          tag: "Araştırma",
          icon: "wound",
          title: "Kronik Yaralarda Hiperbarik Oksijenin Rolü Güçleniyor",
          paragraphs: [
            "Cerrahi ve kronik yara bakımı alanındaki güncel derlemeler, hiperbarik oksijen tedavisinin (HBOT) doku oksijenlenmesini artırarak iyileşme sürecini desteklediğini gösteriyor. Diyabetik ayak yaraları, venöz bacak ülserleri, yanıklar ve radyasyona bağlı doku hasarlarında HBOT'un yara kapanma oranlarını iyileştirdiği ve enfeksiyon riskini azalttığı bildiriliyor.",
            "2025 yılında yayınlanan bir çalışma, negatif basınçlı yara terapisiyle (NPWT) birlikte uygulanan HBOT'un, tek başına NPWT'ye kıyasla iyileşme hızını belirgin şekilde artırdığını ortaya koydu. Rekonstrüktif cerrahide ise HBOT'un doku ve greft sağkalımını desteklediği, yeni damar oluşumunu teşvik ettiği aktarılıyor."
          ],
          source_name: "PMC – Hyperbaric Oxygen Therapy in Surgical Wound Healing and Tissue Salvage",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13109970/"
        },
        {
          date: "2026",
          tag: "Spor Sağlığı",
          icon: "burn",
          title: "Sporcular Neden Hiperbarik Odaya Yöneliyor?",
          paragraphs: [
            "Tenis, yüzme, basketbol ve golf gibi farklı dallardan pek çok elit sporcu, toparlanma sürecinin bir parçası olarak hiperbarik oksijen tedavisini tercih ediyor. Spor hekimliği alanındaki araştırmalar, HBOT'un iyileşmeyi hızlandırabildiğini, iltihabı azaltabildiğini ve sporcuların antrenmana daha kısa sürede dönebilmesine katkı sağlayabildiğini gösteriyor.",
            "Bazı çalışmalarda HBOT uygulanan sporcularda kas ağrısı ve yorgunluğun daha düşük seviyelerde seyrettiği, toparlanma sürelerinin ise yaklaşık %30'a varan oranda kısaldığı bildirildi. Alan hâlâ daha büyük ve kontrollü klinik çalışmalara ihtiyaç duysa da, sonuçlar sporcu sağlığı için umut verici."
          ],
          source_name: "Turkish Journal of Sports Medicine",
          source_url: "https://journalofsportsmedicine.org/full-text/746/eng"
        },
        {
          date: "2026",
          tag: "Klinik Kanıt",
          icon: "wound",
          title: "Diyabetik Ayak Ülserlerinde Meta-Analiz: Ampütasyon Riski Azalıyor",
          paragraphs: [
            "768 katılımcıyı kapsayan 14 çalışmanın meta-analizi, hiperbarik oksijen tedavisinin diyabetik ayak ülserlerinin tam iyileşmesinde ve majör ampütasyon riskinin azaltılmasında istatistiksel olarak anlamlı fayda sağladığını ortaya koydu.",
            "2024 yılında yayınlanan güncel bir sistematik derleme de benzer sonuçlara ulaştı: incelenen çalışmaların büyük çoğunluğunda HBOT ile birlikte majör ampütasyon oranlarının azaldığı, yara iyileşme oranlarının arttığı ve ülser boyutu ile derinliğinin küçüldüğü gözlemlendi."
          ],
          source_name: "PMC – Efficacy of HBOT for Diabetic Foot Ulcer",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7838311/"
        },
        {
          date: "2026",
          tag: "Klinik Kanıt",
          icon: "ear",
          title: "Ani İşitme Kaybında Hiperbarik Oksijen: Erken Müdahale Önemli",
          paragraphs: [
            "Ani sensörinöral işitme kaybı yaşayan hastalarda hiperbarik oksijen tedavisi, iç kulaktaki oksijen basıncını artırarak mikrosirkülasyonu iyileştirmeyi ve iltihabı azaltmayı hedefliyor. Çalışmalar, tedaviye erken başlanan hastalarda, özellikle kortikosteroid tedavisiyle birlikte uygulandığında, daha olumlu sonuçlar alınabildiğini gösteriyor.",
            "Araştırma sonuçları tedavinin etkinliği konusunda tam bir fikir birliği sunmasa da, bazı çalışmalarda hastaların yarısından fazlasında işitmede iyileşme gözlemlendi. Uzmanlar, standartlaştırılmış basınç ve süre protokollerinin belirlenmesi için daha fazla klinik çalışmaya ihtiyaç olduğunu vurguluyor."
          ],
          source_name: "JAMA Otolaryngology–Head & Neck Surgery",
          source_url: "https://jamanetwork.com/journals/jamaotolaryngology/fullarticle/2785483"
        },
        {
          date: "2026",
          tag: "Teknoloji",
          icon: "connect",
          title: "Sağlıkta Bağlantılı Cihazlar Çağı: Uzaktan İzleme Hızla Büyüyor",
          paragraphs: [
            "2026 itibarıyla küresel sağlıkta IoT pazarının 86 milyar doları aştığı tahmin ediliyor. Hastane merkezli bakımdan eve dayalı bakıma geçiş hız kazanırken, ABD'de 350'den fazla hastane artık IoT destekli 'evde hastane' programları yürütüyor.",
            "Araştırmalar, IoT tabanlı uzaktan hasta izleme sistemlerinin hastane geri yatış oranlarını %50'ye varan oranda azaltabildiğini gösteriyor. HBOT Chamber Tech'in ApexConnect™ platformu da tam olarak bu küresel eğilimin bir parçası: kabinleri buluta bağlayarak gerçek zamanlı izleme ve öngörücü bakım imkânı sunuyor."
          ],
          source_name: "IoT Business News",
          source_url: "https://iotbusinessnews.com/2026/04/14/connected-healthcare-iot-remote-monitoring-medical-devices-and-data-challenges/"
        },
        {
          date: "2026",
          tag: "Klinik",
          icon: "guard",
          title: "Çok Kişilik Kabinlerde Basınç Yönetimi: Klinik İşletim Protokolleri",
          paragraphs: [
            "Çok kişilik (multiplace) hiperbarik kabinler, aynı anda birden fazla hastanın tedavi edilebilmesi ve kabin içinde sağlık personelinin refakat edebilmesi sayesinde hastane ve klinik ortamlarının standart tercihi konumunda. Uluslararası hiperbarik tıp otoritesi UHMS'in yayımladığı işletim kılavuzları; basınç artış ve azaltış hızlarının hasta konforu ve kulak barotravması riskine göre ayarlanmasını, her seansın sertifikalı bir operatör gözetiminde yürütülmesini ve acil tahliye senaryolarının düzenli olarak tatbik edilmesini öneriyor.",
            "Klinik pratikte basınç protokolü tedavi endikasyonuna göre belirleniyor: yaygın protokoller 2.0–2.4 ATA aralığında uygulanırken, bazı özel endikasyonlarda daha yüksek basınçlar gerekebiliyor. Uzmanlar, hangi basınç seviyesinin uygun olduğunun mutlaka hiperbarik tıp uzmanı bir hekim tarafından değerlendirilmesi gerektiğini vurguluyor; kabin donanımının ise hedef basınç aralığını güvenle karşılayacak şekilde sertifikalandırılmış olması bekleniyor."
          ],
          source_name: "UHMS – Undersea & Hyperbaric Medical Society",
          source_url: "https://www.uhms.org"
        },
        {
          date: "2026",
          tag: "Spor",
          icon: "healthSync",
          title: "Spor Kulüplerinde Sezon Hazırlığı: Hiperbarik Destek Programları",
          paragraphs: [
            "Profesyonel spor kulüplerinin performans ve sağlık ekipleri, yoğun maç ve antrenman dönemlerinde toparlanma sürecini desteklemek için giderek daha fazla hiperbarik oksijen uygulamalarına yöneliyor. Spor hekimliği literatüründe yayımlanan derlemeler, HBOT'un yumuşak doku yaralanmaları sonrası ödem ve iltihabın azaltılmasına katkı sağlayabileceğini ve sporcunun antrenmana dönüş süresini kısaltma potansiyeli taşıdığını aktarıyor.",
            "Kulüp ortamında dikkat edilen başlıkların başında planlama geliyor: seansların antrenman ve maç takvimine entegre edilmesi, oyuncu bazlı yük takibiyle birlikte değerlendirilmesi ve uygulamanın kulüp hekimi gözetiminde yürütülmesi öneriliyor. Araştırmacılar, mevcut kanıtların önemli bölümünün küçük örneklemli çalışmalara dayandığını ve standart protokoller için daha geniş kontrollü çalışmalara ihtiyaç olduğunu da özellikle not ediyor."
          ],
          source_name: "Frontiers in Physiology – Sport and Exercise",
          source_url: "https://www.frontiersin.org/journals/physiology"
        },
        {
          date: "2026",
          tag: "Wellness",
          icon: "premium",
          title: "Lüks Otellerde Yeni Trend: Hiperbarik Wellness Suitleri",
          paragraphs: [
            "Küresel wellness ekonomisine dair sektör raporları, sağlıklı yaşam turizminin en hızlı büyüyen segmentlerden biri olduğunu gösteriyor. Bu eğilimin bir yansıması olarak lüks otel ve resort'lar; spa ve fitness alanlarının ötesine geçerek hiperbarik oksijen kabini, kriyoterapi ve kırmızı ışık terapisi gibi ileri toparlanma teknolojilerini misafir deneyimine eklemeye başladı.",
            "Sektör gözlemcileri, hiperbarik ünitelerin özellikle 'uzun yaşam' ve 'performans' temalı premium paketlerde öne çıktığını belirtiyor. Otel işletmeleri için kritik başlıklar ise güvenlik standartlarına uyum, eğitimli personel istihdamı ve kullanım öncesi sağlık değerlendirmesi süreçlerinin doğru kurgulanması olarak sıralanıyor; misafirlere yönelik uygulamaların tıbbi tedavi değil, genel iyilik hali desteği kapsamında sunulması gerektiği vurgulanıyor."
          ],
          source_name: "Global Wellness Institute",
          source_url: "https://globalwellnessinstitute.org"
        },
        {
          date: "2026",
          tag: "Güvenlik",
          icon: "care",
          title: "3.0 ATA ve Üzeri Basınç: Tıbbi Sınıf Hiperbarik Güvenlik Standartları",
          paragraphs: [
            "3.0 ATA ve üzeri basınç seviyeleri, hiperbarik tıbbın yalnızca sıkı denetlenen klinik ortamlarda uyguladığı bir alan. Bu seviyelerde çalışan kabinlerin basınçlı kap mevzuatına uygun üretilmesi, yangın güvenliği açısından NFPA 99 gibi uluslararası standartların hiperbarik hükümlerini karşılaması ve düzenli periyodik denetimden geçmesi gerekiyor. Oksijen açısından zenginleşmiş ortamda yangın riski yönetimi, bu sınıftaki sistemlerin tasarımında en kritik başlık olarak öne çıkıyor.",
            "Güvenlik zincirinin diğer halkaları ise insan faktörü: sertifikalı hiperbarik operatörü, seans öncesi hasta değerlendirmesi, acil durum tahliye planı ve tıbbi gözetim. Uzman kuruluşlar, yüksek basınç sınıfındaki tedavilerin yalnızca bu altyapıya sahip sağlık kurumlarında uygulanmasını öneriyor; satın alma kararı veren kurumların üreticiden basınç sertifikaları, test raporları ve eğitim programlarını yazılı olarak talep etmesi tavsiye ediliyor."
          ],
          source_name: "NFPA – National Fire Protection Association",
          source_url: "https://www.nfpa.org"
        }
      ]
    },
    contact: {
      header: { eyebrow: "İLETİŞİM", title: "Bize Ulaşın", subtitle: "Sorularınız ve teklif talepleriniz için formu doldurun." },
      address_label: "Adres",
      address_value: "Postane Mh. Rauf Orbay Cd. Kemal Sunal Sk. No: 29, Tuzla / İstanbul",
      phone_label: "Telefon",
      phone_value: "0850 888 1679",
      email_label: "E-posta",
      email_value: "info@hbotchambertech.com",
      hours_label: "Çalışma Saatleri",
      hours_value: "Pazartesi – Cuma, 09:00 – 18:00",
      form_title: "Mesaj Gönderin",
      form_name: "Ad Soyad",
      form_email: "E-posta",
      form_message: "Mesajınız",
      form_submit: "Gönder",
      form_sending: "Gönderiliyor...",
      form_success: "Teşekkürler! Mesajınız alındı, en kısa sürede dönüş yapacağız.",
      form_error: "Bir şeyler ters gitti. Lütfen tekrar deneyin ya da bizi doğrudan arayın.",
      map_note: "Tuzla, İstanbul",
      faq: {
        eyebrow: "SIKÇA SORULAN SORULAR",
        title: "Merak Edilenler",
        subtitle: "Sipariş, ödeme ve kurulum süreciyle ilgili en sık sorulan sorular.",
        items: [
          { q: "Ödeme koşulları nasıldır?", a: "Standart koşulumuzda siparişlerde %50 peşinat alınır, kalan %50 bakiye ise ürün teslimata hazır hale geldiğinde tahsil edilir." },
          { q: "Başka ödeme seçenekleri sunuyor musunuz?", a: "Evet. Standart %50 peşinat / %50 teslimat koşulunun yanı sıra: kurumsal kredi kartı ile taksitli ödeme (yurt içi ve yurt dışı siparişler için de geçerlidir), belirli bir peşinat ile finansal kiralama (leasing), ve büyük siparişler için 3 aşamalı ödeme planı (sipariş onayı / üretim tamamlanma / teslimat) seçeneklerini sunuyoruz. Size en uygun seçeneği belirlemek için lütfen bizimle iletişime geçin." },
          { q: "Sipariş sonrası ürün ne zaman hazır olur?", a: "Siparişinizin onaylanmasından itibaren ürününüz en az 6 hafta içinde teslimata hazır hale gelir. Bu süreye nakliye/lojistik süresi dahil değildir; lojistik süresi konumunuza göre ayrıca hesaplanır." },
          { q: "Kurulum ve nakliye ücrete dahil mi?", a: "Hayır. Kurulum ve lojistik maliyetleri konum, bina erişimi ve mesafeye göre değişir. Bu nedenle size özel bir kurulum ve lojistik teklifi hazırlıyoruz — lütfen iletişim formu üzerinden bizimle iletişime geçin." },
          { q: "Fiyata neler dahildir?", a: "Tüm Apex modelleri; ApexConnect™, ApexOS™, ApexAI™, ApexSync™ ve ApexGuard™ teknoloji platformlarını standart olarak içerir. Ek özellikler ve kabin stili seçimleri konfigüratörde ayrı olarak fiyatlandırılır." },
          { q: "Teklif nasıl alabilirim?", a: "Konfigüratör sayfamızdan modelinizi, kabin stilinizi, renginizi ve ek özelliklerinizi seçerek anında fiyat tahmini alabilir, ardından teklif formunu doldurarak bizden dönüş isteyebilirsiniz." },
          { q: "Kabin rengini ve stilini özelleştirebilir miyim?", a: "Evet. 12 farklı renk seçeneği arasından ücretsiz seçim yapabilir; Standart Kapalı, Panoramik Camlı veya Premium kabin stillerinden birini tercih edebilirsiniz." }
        ]
      }
    }
  },

  en: {
    dir: "ltr",
    meta: {
      home: { title: "HBOT Chamber Tech | Apex Series Hyperbaric Oxygen Chambers", desc: "IoT-connected, AI-powered hyperbaric oxygen chambers. Breathe at the summit with the Apex Series." },
      technology: { title: "Technology | HBOT Chamber Tech", desc: "ApexConnect, ApexOS, ApexAI, ApexSync and ApexGuard — the connected, intelligent technology platform of the Apex Series." },
      models: { title: "Models | HBOT Chamber Tech", desc: "Apex Solo Lounge, Apex Solo, Apex Duo, Apex Quad, Apex Quad-Cube and Apex Nexus — six hyperbaric oxygen chamber models." },
      soloLounge: { title: "Apex Solo Lounge | HBOT Chamber Tech", desc: "A single-person hyperbaric oxygen chamber designed for treatment in a lying position." },
      solo: { title: "Apex Solo | HBOT Chamber Tech", desc: "A compact, fully equipped hyperbaric oxygen chamber for individual use." },
      duo: { title: "Apex Duo | HBOT Chamber Tech", desc: "A two-person shared hyperbaric oxygen therapy chamber." },
      quad: { title: "Apex Quad | HBOT Chamber Tech", desc: "A four-person hyperbaric oxygen chamber for clinics." },
      quadCube: { title: "Apex Quad-Cube | HBOT Chamber Tech", desc: "A four-person, spacious cube-design hyperbaric oxygen chamber." },
      nexus: { title: "Apex Nexus | HBOT Chamber Tech", desc: "A hospital-grade, large-capacity hyperbaric oxygen chamber for six or more people." },
      hbotInfo: { title: "What Is HBOT? | HBOT Chamber Tech", desc: "What is hyperbaric oxygen therapy (HBOT), what is it used for, and in which conditions is it applied." },
      blog: { title: "Blog | HBOT Chamber Tech", desc: "Recent research, news and developments on hyperbaric oxygen therapy." },
      configurator: { title: "Configurator | HBOT Chamber Tech", desc: "Configure your own Apex chamber: choose a model, pressure level and add-ons to get an instant price estimate." },
      contact: { title: "Contact | HBOT Chamber Tech", desc: "Get in touch with HBOT Chamber Tech: address, phone, email and contact form." }
    },
    common: {
      brand: "HBOT Chamber Tech",
      home_label: "Home",
      notfound: { title: "Page Not Found", desc: "The page you are looking for may have been moved or removed.", button: "Back to Home" },
      whatsapp_message: "Hello, I'd like to learn more about HBOT Chamber Tech.",
      thanks: "Thank you for choosing us.",
      sticky_cta: "Get a Free Quote",
      nav: { home: "Home", technology: "Technology", models: "Models", hbotInfo: "What Is HBOT?", blog: "Blog", configurator: "Configurator", contact: "Contact" },
      models_menu: {
        soloLounge: "Apex Solo Lounge",
        solo: "Apex Solo",
        duo: "Apex Duo",
        quad: "Apex Quad",
        quadCube: "Apex Quad-Cube",
        nexus: "Apex Nexus",
        all_link: "All Models"
      },
      footer: {
        about_text: "HBOT Chamber Tech is a leading manufacturer of IoT-connected, AI-powered hyperbaric oxygen chambers.",
        models_title: "Models",
        company_title: "Company",
        contact_title: "Contact",
        rights: "All rights reserved.",
        membership_note: "is a member of Almita Group."
      },
      cta_banner: {
        title: "Let's Find Your Ideal Apex Model Together",
        subtitle: "Choose the model, pressure level and add-ons — get an instant price estimate.",
        button: "Start the Configurator"
      },
      view_all: "View All",
      learn_more: "Learn More",
      back_to_models: "Back to All Models",
      included_badge: "Standard Included",
      configure_this: "Configure This Model"
    },
    modelPage: {
      overview_title: "Overview",
      specs_title: "Technical Specifications",
      included_title: "Apex Technology Ecosystem",
      other_models: "Our Other Models"
    },
    home: {
      hero: {
        eyebrow: "APEX SERIES",
        title: "Breathe at\nthe Summit",
        subtitle: "HBOT Chamber Tech is a leading manufacturer of Hyperbaric Oxygen Chambers, dedicated to delivering premium, cutting-edge solutions for health and wellness. With a focus on innovation, safety and design excellence, we produce chambers that meet the highest medical and commercial standards.",
        cta_primary: "Explore Models",
        cta_secondary: "Start the Configurator",
        trust_line: "Advanced Engineering · Medical-Grade Safety Standards"
      },
      stats: [
        { value: "5", label: "Apex Models" },
        { value: "94%", label: "Oxygen Purity" },
        { value: "<55dB", label: "ApexSilent™ Noise Level" },
        { value: "24/7", label: "Remote Monitoring" }
      ],
      tech_teaser: {
        eyebrow: "TECHNOLOGY PLATFORM",
        title: "An Intelligent Ecosystem Inside the Chamber",
        text: "The Apex Series features the industry's first and only standard IoT core module, built on ApexConnect™, ApexOS™, ApexAI™, ApexSync™ and ApexGuard™.",
        cta: "Explore the Technology"
      },
      models_teaser: {
        eyebrow: "APEX SERIES",
        title: "Our Models",
        subtitle: "From individual single-person use to hospital-scale multi-seat chambers — six designs to fit your needs.",
        cta_all: "Explore All Models"
      },
      why: {
        eyebrow: "WHY HBOT CHAMBER TECH",
        title: "The Only Connected Chamber on the Market",
        items: [
          { title: "The Industry's First IoT Core", desc: "With ApexConnect™, every chamber is connected to the cloud 24/7 and can be monitored remotely." },
          { title: "AI-Powered Treatment", desc: "ApexAI™ dynamically optimizes pressure and oxygen flow based on patient data." },
          { title: "Hospital System Integration", desc: "ApexSync™ is HL7 FHIR and DICOM compliant, connecting directly to hospital information systems." },
          { title: "Warns Before Failure Happens", desc: "ApexGuard™ alerts you through predictive maintenance, without waiting for a service call." }
        ]
      },
      celebs: {
        eyebrow: "WHO USES IT?",
        title: "The World's Best Choose Hyperbaric Oxygen",
        subtitle: "Names reported in the press to use HBOT for recovery, performance and longevity — and we build those chambers.",
        source_label: "Source",
        disclaimer: "The individuals listed here have been reported by news sources to use HBOT; they are not brand ambassadors or customers of HBOT Chamber Tech.",
        items: [
          { name: "Cristiano Ronaldo", role: "Footballer", text: "Featured in reports for doing HBOT at home with his own hyperbaric device to treat a muscle injury.", source: "https://www.thesun.co.uk/sport/17203745/cristiano-ronaldo-exclusive-hi-tech-oxygen-chamber/" },
          { name: "LeBron James", role: "Basketball player", text: "Filmed doing a 60-90 minute HBOT session in the Netflix series 'Starting 5'.", source: "https://medium.com/@chloepaltrow/hbot-helps-lebron-james-earn-victory-for-cavs-at-the-eastern-conference-finals-1285ba769396" },
          { name: "Novak Djokovic", role: "Tennis player", text: "Covered in sports media as using HBOT to stay at the top of his game.", source: "https://honestsport.substack.com/p/exclusive-novak-djokovics-lasting" },
          { name: "Justin Bieber", role: "Singer", text: "Reported to sleep in a hyperbaric chamber as part of his health regimen.", source: "https://www.dailymail.com/tvshowbiz/article-7965575/Justin-Bieber-sleeps-hyperbaric-chamber-relies-IV-infusions-years-drug-use.html" },
          { name: "Tiger Woods", role: "Golfer", text: "Reported to have used HBOT since 2010 and to keep a chamber at home.", source: "https://x.com/TigerWoods/status/1907051252585746470" },
          { name: "Michael Phelps", role: "Swimmer", text: "The Olympic legend reported to sleep in a hyperbaric chamber.", source: "https://www.espn.com/olympics/swimming/story/_/id/7556022/michael-phelps-using-hyperbaric-chamber-aid-recovery" },
          { name: "Madonna", role: "Singer", text: "Fashion press covered her use of oxygen-based treatments as part of her beauty regimen.", source: "https://www.nytimes.com/2006/04/06/fashion/thursdaystyles/does-the-quickfix-oxygen-facial-really-work.html" },
          { name: "Kendall Jenner", role: "Model", text: "Featured in Vogue for keeping a hyperbaric chamber in her wellness room.", source: "https://www.vogue.com/article/what-kendall-jenner-keeps-in-her-wellness-room" },
          { name: "Tom Brady", role: "NFL player", text: "Reported in sports media to use HBOT as part of his recovery routine.", source: "https://thesportsrush.com/nfl-news-troy-aikman-and-tom-brady-use-the-same-scientific-practice-for-their-recovery-enhancement/" }
        ]
      },
      indications_teaser: {
        eyebrow: "USE CASES",
        title: "When Is HBOT Used?",
        text: "Used as a supportive treatment across a wide range of conditions — from wound healing to sudden hearing loss, decompression sickness to carbon monoxide poisoning.",
        cta: "See All Use Cases"
      },
      styles_teaser: {
        eyebrow: "DESIGN OPTIONS",
        title: "Choose Your Chamber Style",
        subtitle: "Every Apex model is available in different design options to suit your space and preference.",
        items: [
          { icon: "glass", title: "Panoramic Glass Series", desc: "A wide-glass design for users who want an open feel and visual connection to the outside." },
          { icon: "solid", title: "Standard Enclosed Design", desc: "A clean, enclosed body design preferred for privacy and clinical simplicity." },
          { icon: "premium", title: "Premium Series", desc: "Top-tier interior upholstery, advanced lighting and bespoke details for the highest-end design.", badge: "Premium" }
        ],
        note: "You can share your glass type and chamber style preference with us in your quote request."
      }
    },
    technology: {
      header: { eyebrow: "TECHNOLOGY PLATFORM", title: "The Apex Technology Ecosystem", subtitle: "Not just a control panel — a continuously evolving, connected and intelligent system." },
      intro: "Every Apex model includes ApexConnect™, ApexOS™, ApexAI™, ApexSync™ and ApexGuard™ as standard. Together, these five platforms turn the chamber from a simple treatment device into an intelligent, connected and predictive system.",
      pillars: {
        connect: {
          title: "ApexConnect™",
          subtitle: "Continuous Connectivity, Uninterrupted Security",
          desc: "The industry's first and only standard IoT core module. Every Apex model stays connected to the HBOT Chamber Tech Cloud via a continuous internet connection.",
          features: [
            "Real-time remote monitoring: your technician watches pressure, oxygen level, temperature and humidity data live",
            "Multi-device management: manage multiple chambers from a single dashboard",
            "Automatic fault notification: a service ticket opens automatically when a pressure valve deviates",
            "Instant alerts: SMS and email notifications for critical parameters"
          ]
        },
        os: {
          title: "ApexOS™",
          subtitle: "An Intelligent Brain Inside the Chamber",
          desc: "An Android-based, touchscreen-controlled operating system that keeps evolving.",
          features: [
            "Continuous software updates (OTA): new protocols and security updates download automatically",
            "50+ ready-made treatment protocols: burns, diabetic foot, athletic recovery, anti-aging, post-COVID rehabilitation",
            "Multi-language support: new languages are added with software updates",
            "User profiles: a separate profile for each patient, with past sessions loaded automatically"
          ]
        },
        ai: {
          title: "ApexAI™",
          subtitle: "AI-Powered Treatment Optimization",
          desc: "Sensors inside the chamber and patient data are analyzed with machine learning algorithms.",
          features: [
            "Dynamic pressure adjustment: if signs of discomfort appear, pressure is fine-tuned in micro-steps to preserve comfort",
            "Oxygen efficiency optimization: oxygen flow adjusts to breathing rhythm, cutting waste by 30%",
            "Session recommendation engine: a report is prepared for physician approval once a protocol is complete",
            "Claustrophobia detection: excessive movement triggers the lighting and communication system automatically"
          ]
        },
        sync: {
          title: "ApexSync™",
          subtitle: "One-Click Integration With Hospital Information Systems",
          desc: "HL7 FHIR and DICOM compliant. Data lands in the patient's file automatically once a session ends.",
          features: [
            "Direct connection to Epic, Cerner, Medistat, Logo and local HIS systems",
            "Automatic reporting: a report reaches the physician's screen at the end of every session",
            "Billing integration: oxygen volume and session duration are pushed automatically to the accounting module"
          ]
        },
        guard: {
          title: "ApexGuard™",
          subtitle: "Predictive Security and Maintenance",
          desc: "Not just warning when something fails — predicting it before it happens.",
          features: [
            "Predictive maintenance: the system warns you when the compressor motor's vibration pattern changes",
            "Digital security log: every pressure change is logged to the cloud in encrypted form",
            "Automatic disinfection log: UV-C or ozone disinfection is recorded automatically when performed"
          ]
        }
      },
      extra: {
        silent: { title: "ApexSilent™", desc: "Operating noise below 55 decibels." },
        care: { title: "ApexCare™", desc: "Remote diagnosis and resolution without waiting for a service call." }
      },
      comparison: {
        title: "Why HBOT Chamber Tech?",
        subtitle: "Compare the Apex Series with other chambers on the market.",
        col_feature: "Feature",
        col_competitor: "Market Competitors",
        col_apex: "HBOT Chamber Tech Apex Series",
        rows: [
          { feature: "Internet Connectivity", competitor: "None or optional", apex: "ApexConnect™ — Standard, 24/7" },
          { feature: "OTA Software Updates", competitor: "None, fixed firmware", apex: "ApexOS™ — Continuously updated" },
          { feature: "Remote Monitoring", competitor: "Limited or none", apex: "ApexConnect™ — Live dashboard" },
          { feature: "AI Support", competitor: "None", apex: "ApexAI™ — Dynamic protocol" },
          { feature: "EMR/HIS Integration", competitor: "Manual or none", apex: "ApexSync™ — Automatic HL7/DICOM" },
          { feature: "Predictive Maintenance", competitor: "None, reactive maintenance", apex: "ApexGuard™ — Pre-failure warning" },
          { feature: "Automatic Reporting", competitor: "None", apex: "ApexSync™ — Report at session end" },
          { feature: "Remote Diagnosis", competitor: "None, service call required", apex: "ApexCare™ — Remote resolution" },
          { feature: "Noise Level", competitor: "60–70 dB", apex: "ApexSilent™ — <55 dB" },
          { feature: "Digital Security Log", competitor: "None", apex: "ApexGuard™ — Encrypted cloud log" }
        ]
      },
      roadmap: {
        eyebrow: "ROADMAP",
        title: "What's Next?",
        subtitle: "Features being developed on the ApexConnect™ platform that are not yet standard on current Apex models.",
        badge: "In Development",
        items: [
          { icon: "mobileApp", title: "ApexConnect Mobile Monitoring App", desc: "A monitoring app that lets clinical staff track chamber pressure, oxygen level and system status from a phone." },
          { icon: "healthSync", title: "Health App Synchronization", desc: "Syncing session duration and history with Apple Health, Huawei Health and Google Fit." },
          { icon: "screen", title: "Fixed-Mounted Immersive Display Experience", desc: "A large, chamber-mounted display offering calming visual content during sessions." }
        ],
        disclaimer: "These features are under development and planned for future models; they are not standard on current Apex models. Chamber pressure and oxygen levels are always controlled by a qualified operator."
      }
    },
    modelsOverview: {
      header: { eyebrow: "APEX SERIES", title: "Our Models", subtitle: "From individual single-person use to hospital-scale multi-seat chambers — six designs." },
      intro: "Every Apex model includes ApexConnect™, ApexOS™, ApexAI™, ApexSync™ and ApexGuard™ as standard. What differs between them is capacity, position and pressure range.",
      compareTable: {
        title: "Compare Models",
        subtitle: "Quickly decide which Apex model is right for you.",
        col_capacity: "Capacity",
        col_position: "Position",
        col_pressure: "Pressure Range",
        col_price: "Starting Price",
        col_noise: "Noise Level",
        action_label: "Configure"
      }
    },
    modelShort: {
      soloLounge: { title: "Apex Solo Lounge", tagline: "1 Person · Lying Position", desc: "A fully equipped chamber developed specifically for users who need treatment in a lying position." },
      solo: { title: "Apex Solo", tagline: "1 Person · Sitting Position", desc: "A compact, elegant, fully equipped chamber designed for individual hyperbaric oxygen therapy." },
      duo: { title: "Apex Duo", tagline: "2 People · Sitting Position", desc: "A dual-seat, panoramic-window chamber — for couples, partners, or patient-companion use." },
      quad: { title: "Apex Quad", tagline: "4 People · Sitting Position", desc: "A mid-scale, multi-seat chamber with an integrated control panel, built for clinics and commercial wellness centers." },
      quadCube: { title: "Apex Quad-Cube", tagline: "4 People · Spacious Cabin", desc: "A four-person premium cabin with a spacious cube-design interior — quilted leather upholstery and LED ambient lighting." },
      nexus: { title: "Apex Nexus", tagline: "6+ People · Sitting Position", desc: "A hospital-grade, large-capacity chamber with modular expansion, built for medical institutions." }
    },
    includedItems: [
      { icon: "connect", title: "ApexConnect™ Included", desc: "Internet connectivity as standard. Remote monitoring, instant alerts and cloud backup." },
      { icon: "os", title: "ApexOS™ Updates", desc: "Your device gains new features every month. OTA updates keep protocols current." },
      { icon: "ai", title: "ApexAI™ Optimization", desc: "AI that analyzes patient data adjusts sessions dynamically." },
      { icon: "sync", title: "ApexSync™ Integration", desc: "One-click integration with hospital information systems. Automatic reporting." },
      { icon: "guard", title: "ApexGuard™ Security", desc: "Predictive maintenance technology that warns you before a failure occurs." }
    ],
    modelSoloLounge: {
      breadcrumb: "Apex Solo Lounge", eyebrow: "APEX SOLO LOUNGE", title: "Apex Solo Lounge",
      tagline: "Excellence in a Lying Position. Lie back, relax, heal.",
      overview_text: "Developed specifically for users who need treatment in a lying position. Its medical orthopedic bed and aviation-grade aluminum body provide maximum comfort during long sessions.",
      specs: [
        { label: "Capacity", value: "1 person (lying position)" },
        { label: "Pressure Range", value: "1.5 – 2.5 ATA" },
        { label: "Bed", value: "Medical orthopedic, 200×80 cm" },
        { label: "Material", value: "Aviation-grade aluminum" },
        { label: "Safety", value: "Dual safety valve" },
        { label: "Exterior Dimensions", value: "240×110×120 cm" },
        { label: "Noise Level", value: "<55 dB (ApexSilent™)" }
      ]
    },
    modelSolo: {
      breadcrumb: "Apex Solo", eyebrow: "APEX SOLO", title: "Apex Solo",
      tagline: "The Summit of Your Personal Health. Just you and oxygen.",
      overview_text: "A compact, elegant, fully equipped chamber designed for individual hyperbaric oxygen therapy. With touchscreen control, it's ideal for home or clinic use.",
      specs: [
        { label: "Capacity", value: "1 person (sitting)" },
        { label: "Pressure Range", value: "1.5 – 2.5 ATA" },
        { label: "Control", value: "Touchscreen" },
        { label: "Material", value: "Aviation-grade aluminum" },
        { label: "Safety", value: "Dual safety valve" },
        { label: "Exterior Dimensions", value: "120×110×180 cm" },
        { label: "Noise Level", value: "<55 dB (ApexSilent™)" }
      ]
    },
    modelDuo: {
      breadcrumb: "Apex Duo", eyebrow: "APEX DUO", title: "Apex Duo",
      tagline: "Heal Together. A shared two-person treatment experience.",
      overview_text: "A dual-seat hyperbaric chamber offering shared therapy sessions. Designed for couples, partners, or patient-companion use.",
      specs: [
        { label: "Capacity", value: "2 people (sitting)" },
        { label: "Pressure Range", value: "1.5 – 2.5 ATA" },
        { label: "Oxygen Purity", value: "93–95%" },
        { label: "Safety", value: "Emergency valve system" },
        { label: "Control", value: "Dual control system" },
        { label: "Window", value: "Panoramic" }
      ]
    },
    modelQuad: {
      breadcrumb: "Apex Quad", eyebrow: "APEX QUAD", title: "Apex Quad",
      tagline: "A mid-scale solution for clinics and wellness centers.",
      overview_text: "A mid-scale, multi-seat chamber with an integrated control panel. Built for clinics and commercial wellness facilities.",
      specs: [
        { label: "Capacity", value: "4 people (sitting)" },
        { label: "Pressure Range", value: "1.5 – 2.5 ATA" },
        { label: "Oxygen Purity", value: "93–95%" },
        { label: "Safety", value: "Emergency valve system" },
        { label: "Monitoring", value: "Multi-user monitoring" },
        { label: "Control", value: "External control panel" }
      ]
    },
    modelQuadCube: {
      breadcrumb: "Apex Quad-Cube", eyebrow: "APEX QUAD-CUBE", title: "Apex Quad-Cube",
      tagline: "A premium four-person experience in a spacious cube design.",
      overview_text: "A four-person premium cabin with a spacious cube-form interior. With quilted leather upholstery, LED ambient lighting, and an independent control unit, it delivers comfortable multi-person therapy for clinics and wellness centers.",
      specs: [
        { label: "Capacity", value: "4 people (sitting)" },
        { label: "Pressure Range", value: "1.5 – 2.5 ATA" },
        { label: "Oxygen Purity", value: "93–95%" },
        { label: "Interior", value: "Quilted leather, LED ambient" },
        { label: "Safety", value: "Emergency valve system" },
        { label: "Control", value: "Independent control unit" }
      ]
    },
    modelNexus: {
      breadcrumb: "Apex Nexus", eyebrow: "APEX NEXUS", title: "Apex Nexus",
      tagline: "A hospital-grade, large-capacity solution.",
      overview_text: "A hospital-grade, large-capacity chamber for medical institutions. Its modular design and advanced monitoring systems meet the needs of the busiest treatment centers.",
      specs: [
        { label: "Capacity", value: "6+ people (sitting)" },
        { label: "Pressure Range", value: "3.0 – 6.0 ATA" },
        { label: "Oxygen Purity", value: "93–95%" },
        { label: "Safety", value: "Emergency valve system" },
        { label: "Build", value: "Hospital-grade" },
        { label: "Expansion", value: "Modular expansion ready" }
      ]
    },
    hbotInfo: {
      header: { eyebrow: "INFORMATION CENTER", title: "What Is HBOT?", subtitle: "What you need to know about hyperbaric oxygen therapy." },
      whatIsHboc: { title: "What Is a Hyperbaric Oxygen Chamber (HBOC)?", text: "Hyperbaric Oxygen Chambers are specially designed, pressurized cabins that allow individuals to breathe pure oxygen at higher-than-normal atmospheric pressure. These chambers are used for Hyperbaric Oxygen Therapy (HBOT), a medically recognized treatment that accelerates healing and promotes overall wellness." },
      whyNeeded: { title: "What Is an HBOC Needed For?", text: "HBOC chambers provide a controlled, pressurized environment where patients breathe 94% pure oxygen, enabling faster recovery and enhanced cellular regeneration. These chambers serve medical facilities, wellness centers, sports clinics, and private users worldwide." },
      whatIsHbot: {
        title: "What Is Hyperbaric Oxygen Therapy (HBOT)?",
        text1: "HBOT is a medical treatment where patients breathe pure oxygen inside a pressurized chamber at levels higher than normal atmospheric pressure. This process accelerates wound healing, reduces inflammation, and promotes tissue regeneration.",
        text2: "Patients breathe inside these chambers, which helps the lungs collect and absorb oxygen more efficiently. HBOT is also used in treating patients experiencing sudden hearing and vision loss, bone infections, and diabetic foot ulcers. Depending on the treatment type, patients can either sit or lie down during the procedure."
      },
      indications: {
        title: "In Which Situations Can HBOT Be Used?",
        subtitle: "Hyperbaric oxygen therapy is used as a supportive treatment across a wide range of medical conditions.",
        items: [
          { icon: "antiaging", label: "Skin Rejuvenation (Anti-Aging)" },
          { icon: "jetlag", label: "Jet Lag Recovery (Travel Fatigue)" },
          { icon: "wound", label: "Wound Healing (Diabetic & Non-Diabetic)" },
          { icon: "eye", label: "Sudden Loss of Vision" },
          { icon: "decompression", label: "Decompression Sickness" },
          { icon: "embolism", label: "Air or Gas Embolism" },
          { icon: "poisoning", label: "Carbon Monoxide & Fuel Poisoning" },
          { icon: "ear", label: "Sudden Hearing Loss" },
          { icon: "bone", label: "Osteonecrosis" },
          { icon: "burn", label: "Thermal Burns" },
          { icon: "gangrene", label: "Gas Gangrene" },
          { icon: "blood", label: "Excessive Blood Loss" },
          { icon: "brain", label: "Anoxic Encephalopathy" },
          { icon: "smoke", label: "Acute Smoke Poisoning" }
        ]
      },
      disclaimer: "This information is for general guidance only and does not constitute medical advice. Treatment decisions must always be evaluated by a healthcare professional."
    },
    configurator: {
      header: { eyebrow: "CONFIGURATOR", title: "Design Your Own Apex Chamber", subtitle: "Choose the model, pressure level and add-ons — get an instant price estimate." },
      step1_title: "2. Choose a Model",
      style_step_title: "1. Chamber Style",
      style_step_note: "Choose your chamber's design; pricing varies with glass surface area and interior finish level.",
      color_step_title: "3. Choose a Color",
      color_step_note: "Free selection from our standard color palette.",
      interior_step_title: "4. Interior Color",
      interior_step_note: "Standard interior colors are included in the price.",
      seat_color_step_title: "5. Seat Color",
      seat_color_step_note: "Seat upholstery color is included in the price; your choice is added to the summary and quote form.",
      step2_title: "6. Pressure Level",
      step3_title: "7. Add-Ons",
      step4_title: "8. Request a Quote",
      models: [
        { id: "solo-lounge", name: "Apex Solo Lounge", tagline: "1 Person · Lying Position" },
        { id: "solo", name: "Apex Solo", tagline: "1 Person · Sitting Position" },
        { id: "duo", name: "Apex Duo", tagline: "2 People · Sitting Position" },
        { id: "quad", name: "Apex Quad", tagline: "4 People · Sitting Position" },
        { id: "quad-cube", name: "Apex Quad-Cube", tagline: "4 People · Spacious Cabin" },
        { id: "nexus", name: "Apex Nexus", tagline: "6+ People · Sitting Position" }
      ],
      colors: [
        { id: "pearl-white", name: "Pearl White", hex: "#F2F1EC" },
        { id: "mat-siyah", name: "Matte Black", hex: "#16181A" },
        { id: "antrasit", name: "Anthracite", hex: "#3A3D42" },
        { id: "gece-laciverti", name: "Midnight Navy", hex: "#1B2A4A" },
        { id: "bordo", name: "Burgundy", hex: "#6B2737" },
        { id: "sampanya", name: "Champagne Gold", hex: "#C9A876" },
        { id: "grafit", name: "Graphite Gray", hex: "#3A3F44" },
        { id: "bronz", name: "Bronze", hex: "#A5754A" },
        { id: "zumrut", name: "Emerald Green", hex: "#1F6F54" }
      ],
      interior_colors: [
        { id: "cream", name: "Cream", hex: "#E8DCC8" },
        { id: "anthracite", name: "Anthracite", hex: "#3A3D42" },
        { id: "burgundy", name: "Burgundy", hex: "#6B2737" },
        { id: "navy", name: "Navy Blue", hex: "#1B2A4A" },
        { id: "konyak", name: "Cognac", hex: "#8A5A2B" },
        { id: "kum-beji", name: "Sand Beige", hex: "#D9C7A7" }
      ],
      seat_colors: [
        { id: "konyak", name: "Cognac", hex: "#8A5A2B" },
        { id: "siyah", name: "Black", hex: "#16181A" },
        { id: "lacivert", name: "Navy Blue", hex: "#1B2A4A" },
        { id: "krem", name: "Cream", hex: "#E8DCC8" },
        { id: "bordo", name: "Burgundy", hex: "#6B2737" },
        { id: "gri", name: "Gray", hex: "#6B6F75" }
      ],
      styles: [
        { id: "solid", icon: "solid", name: "Standard Enclosed Design", desc: "A clean, enclosed shell design preferred for privacy and clinical simplicity." },
        { id: "glass", icon: "glass", name: "Panoramic Glass Series", desc: "Wide glass-surface design for an open feel and visual connection with the outside." },
        { id: "premium", icon: "premium", name: "Premium Series", desc: "Top-tier interior finish, advanced lighting, and custom detailing in our flagship design.", badge: "Premium" }
      ],
      addons: [
        { id: "massage", name: "Massage Seat", desc: "A soothing massage-function seat system during sessions." },
        { id: "leather", name: "Premium Leather Upholstery", desc: "A hand-crafted premium leather interior upgrade." },
        { id: "entertainment", name: "Entertainment & Multimedia System", desc: "Built-in screen, sound system and content library." },
        { id: "finish", name: "Custom Color & Finish", desc: "A custom exterior finish color to match your brand identity." },
        { id: "uvc", name: "Advanced UV-C Disinfection Unit", desc: "Fast, automatic UV-C disinfection between sessions." },
        { id: "backup-o2", name: "Backup Oxygen Concentrator", desc: "A secondary oxygen source for uninterrupted treatment." },
        { id: "warranty", name: "Extended Warranty (3 Years)", desc: "2 additional years of comprehensive coverage beyond the standard warranty." },
        { id: "install", name: "Priority Installation & Training Package", desc: "Expedited installation and comprehensive staff training." },
        { id: "playstation", name: "PlayStation 5 Gaming Console", desc: "A PlayStation 5 console integrated with the in-chamber screen and sound system for entertainment during longer sessions." }
      ],
      pressure_note: "The pressure range depends on the model you select.",
      pressure_nexus_only: "Nexus only",
      pressure_auto_note: "3.0 and 6.0 ATA are available on the Apex Nexus only — pressure level has been reset to 2.5 ATA.",
      pressure_auto_note_up: "The Apex Nexus is a medical chamber offering high pressure only — pressure level has been set to 3.0 ATA.",
      seat_step_title: "Seat Count",
      seat_step_note: "For the Apex Nexus, you can increase the seat count starting from 6 to match your needs.",
      seats_label: "Seats",
      currency_label: "Currency",
      summary: {
        title: "Configuration Summary",
        model_label: "Model",
        seats_label: "Seat Count",
        style_label: "Chamber Style",
        color_label: "Color",
        interior_color_label: "Interior Color",
        seat_color_label: "Seat Color",
        seat_type_label: "Seat Type",
        seat_standard: "Standard",
        seat_massage: "Massage",
        pressure_label: "Pressure Level",
        addons_label: "Add-Ons",
        none_selected: "None selected",
        base_price_label: "Base Price",
        total_label: "Estimated Total",
        disclaimer: "Prices are approximate and for informational purposes. Please fill out the form for an exact quote.",
        cta: "Request a Quote With This Configuration",
        print_button: "Print / Save as PDF",
        share_button: "Copy Configuration Link",
        share_copied: "Link copied!",
        discount_label: "Discount",
        ref_badge: "Referral discount applied",
        refer_button: "Refer a Friend",
        refer_copied: "Referral link copied!",
        email_button: "Send Quote via Email",
        pdf_title: "Configuration Quote",
        pdf_quote_no: "Quote No",
        pdf_date: "Date",
        pdf_customer_section: "CUSTOMER INFORMATION",
        pdf_configuration_section: "CONFIGURATION DETAILS"
      },
      stage: {
        view_exterior: "Exterior View",
        view_interior: "Interior View",
        spin_hint: "↔ Drag to rotate 360°"
      },
      quote_form: {
        title: "Request a Quote",
        name: "Full Name",
        email: "Email",
        phone: "Phone",
        company: "Facility / Clinic Name (optional)",
        message: "Additional Notes",
        submit: "Send Quote Request",
        sending: "Sending...",
        success: "Thank you! Your configuration and request have been received — we'll get back to you shortly.",
        error: "Something went wrong. Please try again or call us directly."
      }
    },
    blog: {
      header: { eyebrow: "BLOG", title: "Research & News", subtitle: "Recent scientific developments and news in hyperbaric oxygen therapy." },
      source_label: "Source:",
      min_read: "min read",
      disclaimer: "These posts are summaries compiled from publicly available scientific publications and news sources; they do not constitute medical advice. Always consult a healthcare professional for treatment decisions.",
      posts: [
        {
          date: "2026",
          tag: "Founder's Note",
          icon: "care",
          title: "Why I Use Hyperbaric Oxygen Myself",
          paragraphs: [
            "Under the Almita Group umbrella we run six different sectors side by side, and a demanding schedule with constant travel comes with the territory. Before we started manufacturing HBOT Chamber Tech chambers, I chose to use our own units regularly — I believe you should try a product yourself before standing behind it.",
            "I can say that after sessions I generally feel more energized and focused; this is a personal observation, not a promise of the same result for everyone. Hyperbaric oxygen therapy is not a substitute for medical treatment; always discuss your own use with a healthcare professional."
          ],
          source_name: "Almita Group — Founder's Note",
          source_url: "https://almitagroup.com",
          author: "Mürsel Alkan"
        },
        {
          date: "2026",
          tag: "Longevity",
          icon: "antiaging",
          title: "HBOT and Longevity: The Healthy-Aging Trend of 2026",
          paragraphs: [
            "The longevity movement — brought into the mainstream by tech entrepreneurs like Bryan Johnson and their personal 'age-reversal' protocols — has also boosted interest in hyperbaric oxygen therapy. One of its scientific anchors is a clinical study published in the journal Aging in 2020, in which 35 healthy adults aged 64 and over completed a 60-session HBOT program.",
            "The study reported telomere lengthening of more than 20% in immune cells — up to 37% in B cells — along with a reduction of up to 37% in senescent immune cells. Because the trial had no control group and a limited sample size, the results are considered 'promising but preliminary'; the researchers stress that larger studies are needed to define optimal protocols."
          ],
          source_name: "PMC – HBOT Increases Telomere Length and Decreases Immunosenescence (Aging, 2020)",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7746357/"
        },
        {
          date: "2026",
          tag: "Sports",
          icon: "healthSync",
          title: "Why Do Elite Athletes Use Hyperbaric Oxygen?",
          paragraphs: [
            "World-famous athletes such as Cristiano Ronaldo, LeBron James, Novak Djokovic and Floyd Mayweather have been featured in press reports for using hyperbaric chambers as part of their recovery routines. Behind this interest are sports-medicine findings suggesting that HBOT may reduce edema and inflammation, support tissue repair and help athletes return to training sooner.",
            "Studies cited in reviews include an observation from the Nagano Winter Olympics where 7 athletes recovered faster with short sessions at 1.3 ATA, an early clinical report of a 55% reduction in days lost to injury among professional soccer players, and a university study suggesting roughly 30% faster return after ankle sprains. The authors note that the evidence largely rests on small samples and that randomized controlled trials are needed for firm conclusions."
          ],
          source_name: "PMC – The Role of Hyperbaric Oxygen Therapy in Sports Medicine (review)",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3382683/"
        },
        {
          date: "2026",
          tag: "Guide",
          icon: "oneSeat",
          title: "Home Hyperbaric Chamber Buying Guide",
          paragraphs: [
            "The first question when choosing a hyperbaric chamber for home or private use is capacity: monoplace chambers offer a compact footprint, while multiplace chambers allow family members or small groups to be treated at the same time and make attendant-assisted sessions easier. UHMS, the international authority in hyperbaric medicine, requires pressurized chambers to be approved and regularly inspected equipment, and operators to be specially trained.",
            "Pressure level is the second key topic: clinical protocols are typically applied in the 2.0–2.4 ATA range, while 1.3–2.0 ATA is common in home systems — always review the level that fits your goals with a healthcare professional. The third topic is safety and comfort: fire-safety rules in oxygen environments, emergency decompression, noise level, interior lighting and communication systems directly shape the daily experience; confirm maintenance and warranty terms in writing before you buy."
          ],
          source_name: "StatPearls (NCBI) – Hyperbaric Oxygen Therapy",
          source_url: "https://www.ncbi.nlm.nih.gov/books/NBK459172/"
        },
        {
          date: "2026",
          tag: "Research",
          icon: "wound",
          title: "Hyperbaric Oxygen's Role in Chronic Wounds Keeps Growing",
          paragraphs: [
            "Recent reviews in surgical and chronic wound care show that hyperbaric oxygen therapy (HBOT) supports the healing process by increasing tissue oxygenation. In diabetic foot wounds, venous leg ulcers, burns and radiation-induced tissue damage, HBOT has been reported to improve wound closure rates and reduce infection risk.",
            "A study published in 2025 found that HBOT combined with negative pressure wound therapy (NPWT) significantly increased healing speed compared to NPWT alone. In reconstructive surgery, HBOT is reported to support tissue and graft survival and promote new blood vessel formation."
          ],
          source_name: "PMC – Hyperbaric Oxygen Therapy in Surgical Wound Healing and Tissue Salvage",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13109970/"
        },
        {
          date: "2026",
          tag: "Sports Health",
          icon: "burn",
          title: "Why Athletes Are Turning to Hyperbaric Chambers",
          paragraphs: [
            "Many elite athletes across tennis, swimming, basketball and golf are choosing hyperbaric oxygen therapy as part of their recovery routine. Research in sports medicine shows HBOT can speed up healing, reduce inflammation, and help athletes return to training sooner.",
            "Some studies reported lower levels of muscle soreness and fatigue in athletes who received HBOT, with recovery times shortened by up to roughly 30%. While the field still needs larger, controlled clinical trials, the results are promising for athlete health."
          ],
          source_name: "Turkish Journal of Sports Medicine",
          source_url: "https://journalofsportsmedicine.org/full-text/746/eng"
        },
        {
          date: "2026",
          tag: "Clinical Evidence",
          icon: "wound",
          title: "Meta-Analysis on Diabetic Foot Ulcers: Lower Amputation Risk",
          paragraphs: [
            "A meta-analysis of 14 studies covering 768 participants found that hyperbaric oxygen therapy provided a statistically significant benefit in the complete healing of diabetic foot ulcers and in reducing the risk of major amputation.",
            "A recent systematic review published in 2024 reached similar conclusions: the majority of studies reviewed observed lower rates of major amputation, higher wound healing rates, and reduced ulcer size and depth with HBOT."
          ],
          source_name: "PMC – Efficacy of HBOT for Diabetic Foot Ulcer",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7838311/"
        },
        {
          date: "2026",
          tag: "Clinical Evidence",
          icon: "ear",
          title: "Hyperbaric Oxygen for Sudden Hearing Loss: Early Intervention Matters",
          paragraphs: [
            "In patients with sudden sensorineural hearing loss, hyperbaric oxygen therapy aims to improve microcirculation and reduce inflammation by increasing oxygen pressure in the inner ear. Studies show that patients who start treatment early, especially in combination with corticosteroid therapy, tend to see more favorable outcomes.",
            "While research results do not offer complete consensus on effectiveness, some studies observed hearing improvement in more than half of patients. Experts emphasize the need for further clinical trials to establish standardized pressure and duration protocols."
          ],
          source_name: "JAMA Otolaryngology–Head & Neck Surgery",
          source_url: "https://jamanetwork.com/journals/jamaotolaryngology/fullarticle/2785483"
        },
        {
          date: "2026",
          tag: "Technology",
          icon: "connect",
          title: "The Age of Connected Healthcare Devices: Remote Monitoring Grows Fast",
          paragraphs: [
            "By 2026, the global healthcare IoT market is estimated to have surpassed $86 billion. As the shift from hospital-centered care to home-based care accelerates, more than 350 hospitals in the US now run IoT-enabled 'hospital-at-home' programs.",
            "Research shows IoT-based remote patient monitoring systems can reduce hospital readmission rates by up to 50%. HBOT Chamber Tech's ApexConnect™ platform is exactly part of this global trend: connecting chambers to the cloud for real-time monitoring and predictive maintenance."
          ],
          source_name: "IoT Business News",
          source_url: "https://iotbusinessnews.com/2026/04/14/connected-healthcare-iot-remote-monitoring-medical-devices-and-data-challenges/"
        },
        {
          date: "2026",
          tag: "Clinical",
          icon: "guard",
          title: "Pressure Management in Multiplace Chambers: Clinical Operating Protocols",
          paragraphs: [
            "Multiplace hyperbaric chambers are the standard choice for hospitals and clinics because they treat several patients at once and allow medical staff to accompany patients inside. Operating guidelines published by the UHMS, the international authority in hyperbaric medicine, recommend adjusting compression and decompression rates to patient comfort and ear barotrauma risk, running every session under the supervision of a certified operator, and drilling emergency evacuation scenarios on a regular basis.",
            "In clinical practice, the pressure protocol is determined by the treatment indication: common protocols run in the 2.0–2.4 ATA range, while certain special indications may require higher pressures. Experts emphasize that the appropriate pressure level must always be assessed by a physician specialized in hyperbaric medicine, and that chamber hardware is expected to be certified to safely cover the target pressure range."
          ],
          source_name: "UHMS – Undersea & Hyperbaric Medical Society",
          source_url: "https://www.uhms.org"
        },
        {
          date: "2026",
          tag: "Sports",
          icon: "healthSync",
          title: "Pre-Season Preparation in Sports Clubs: Hyperbaric Support Programs",
          paragraphs: [
            "Performance and medical teams at professional sports clubs are increasingly turning to hyperbaric oxygen applications to support recovery during congested match and training periods. Reviews in the sports medicine literature report that HBOT may help reduce edema and inflammation after soft-tissue injuries and carries the potential to shorten an athlete's return-to-training time.",
            "In a club setting, planning tops the list of priorities: sessions should be integrated into the training and match calendar, evaluated together with player-specific load monitoring, and carried out under the supervision of the club physician. Researchers also note that much of the current evidence rests on small-sample studies and that larger controlled trials are needed to establish standard protocols."
          ],
          source_name: "Frontiers in Physiology – Sport and Exercise",
          source_url: "https://www.frontiersin.org/journals/physiology"
        },
        {
          date: "2026",
          tag: "Wellness",
          icon: "premium",
          title: "A New Trend in Luxury Hotels: Hyperbaric Wellness Suites",
          paragraphs: [
            "Industry reports on the global wellness economy show wellness tourism to be one of its fastest-growing segments. Reflecting this trend, luxury hotels and resorts are moving beyond spa and fitness offerings, adding advanced recovery technologies such as hyperbaric oxygen chambers, cryotherapy and red-light therapy to the guest experience.",
            "Sector observers note that hyperbaric units stand out especially in premium 'longevity' and 'performance' themed packages. For hotel operators, the critical topics are compliance with safety standards, employing trained staff, and properly structuring pre-use health screening; guest-facing applications should be offered as general wellbeing support, not medical treatment."
          ],
          source_name: "Global Wellness Institute",
          source_url: "https://globalwellnessinstitute.org"
        },
        {
          date: "2026",
          tag: "Safety",
          icon: "care",
          title: "3.0 ATA and Above: Medical-Grade Hyperbaric Safety Standards",
          paragraphs: [
            "Pressure levels of 3.0 ATA and above are an area hyperbaric medicine applies only in tightly regulated clinical environments. Chambers operating at these levels must be manufactured in compliance with pressure-vessel regulations, meet the hyperbaric provisions of international standards such as NFPA 99 for fire safety, and undergo regular periodic inspection. Managing fire risk in an oxygen-enriched atmosphere is the most critical design topic for this class of system.",
            "The other links in the safety chain are human factors: a certified hyperbaric operator, pre-session patient assessment, an emergency evacuation plan, and medical oversight. Professional bodies recommend that treatments in the high-pressure class be delivered only in institutions with this infrastructure, and advise purchasing organizations to request pressure certificates, test reports, and training programs from the manufacturer in writing."
          ],
          source_name: "NFPA – National Fire Protection Association",
          source_url: "https://www.nfpa.org"
        }
      ]
    },
    contact: {
      header: { eyebrow: "CONTACT", title: "Get in Touch", subtitle: "Fill out the form for your questions and quote requests." },
      address_label: "Address",
      address_value: "Postane Mh. Rauf Orbay Cd. Kemal Sunal Sk. No: 29, Tuzla / Istanbul, Türkiye",
      phone_label: "Phone",
      phone_value: "0850 888 1679",
      email_label: "Email",
      email_value: "info@hbotchambertech.com",
      hours_label: "Working Hours",
      hours_value: "Monday – Friday, 09:00 – 18:00",
      form_title: "Send a Message",
      form_name: "Full Name",
      form_email: "Email",
      form_message: "Your Message",
      form_submit: "Send",
      form_sending: "Sending...",
      form_success: "Thank you! Your message has been received — we'll get back to you shortly.",
      form_error: "Something went wrong. Please try again or call us directly.",
      map_note: "Tuzla, Istanbul",
      faq: {
        eyebrow: "FREQUENTLY ASKED QUESTIONS",
        title: "Common Questions",
        subtitle: "The questions we're asked most often about ordering, payment and installation.",
        items: [
          { q: "What are the payment terms?", a: "Our standard terms require a 50% deposit, with the remaining 50% due when the unit is ready for delivery." },
          { q: "Do you offer other payment options?", a: "Yes. Besides the standard 50% deposit / 50% on delivery terms, we also offer: installment payment via corporate credit card (available for international orders too), financial leasing with a set down payment, and a 3-stage payment plan for larger orders (order confirmation / production complete / delivery). Please contact us to work out the best option for you." },
          { q: "How soon after ordering is the unit ready?", a: "From order confirmation, your unit is ready for delivery in a minimum of 6 weeks. This does not include shipping/logistics time, which is calculated separately based on your location." },
          { q: "Are installation and shipping included in the price?", a: "No. Installation and logistics costs vary by location, site access and distance. We prepare a custom installation and logistics quote for you — please reach out through the contact form." },
          { q: "What's included in the price?", a: "Every Apex model includes the ApexConnect™, ApexOS™, ApexAI™, ApexSync™ and ApexGuard™ technology platform as standard. Add-ons and chamber style choices are priced separately in the configurator." },
          { q: "How do I get a quote?", a: "Use our configurator to select your model, chamber style, color and add-ons for an instant price estimate, then submit the quote form to hear back from us." },
          { q: "Can I customize the chamber color and style?", a: "Yes. Choose freely from 12 color options, and pick from Standard Enclosed, Panoramic Glass, or Premium chamber styles." }
        ]
      }
    }
  },

  ru: {
    dir: "ltr",
    meta: {
      home: { title: "HBOT Chamber Tech | Гипербарические кислородные камеры серии Apex", desc: "Гипербарические кислородные камеры с IoT-подключением и поддержкой ИИ. Дышите на вершине с серией Apex." },
      technology: { title: "Технологии | HBOT Chamber Tech", desc: "ApexConnect, ApexOS, ApexAI, ApexSync и ApexGuard — подключённая интеллектуальная технологическая платформа серии Apex." },
      models: { title: "Модели | HBOT Chamber Tech", desc: "Apex Solo Lounge, Apex Solo, Apex Duo, Apex Quad, Apex Quad-Cube и Apex Nexus — шесть моделей гипербарических кислородных камер." },
      soloLounge: { title: "Apex Solo Lounge | HBOT Chamber Tech", desc: "Одноместная гипербарическая кислородная камера для лечения в положении лёжа." },
      solo: { title: "Apex Solo | HBOT Chamber Tech", desc: "Компактная, полностью укомплектованная камера для индивидуального использования." },
      duo: { title: "Apex Duo | HBOT Chamber Tech", desc: "Двухместная камера для совместной гипербарической оксигенотерапии." },
      quad: { title: "Apex Quad | HBOT Chamber Tech", desc: "Четырёхместная гипербарическая камера для клиник." },
      quadCube: { title: "Apex Quad-Cube | HBOT Chamber Tech", desc: "Четырёхместная гипербарическая кислородная камера с просторным кубическим дизайном." },
      nexus: { title: "Apex Nexus | HBOT Chamber Tech", desc: "Гипербарическая камера госпитального класса большой вместимости на 6 и более человек." },
      hbotInfo: { title: "Что такое ГБО? | HBOT Chamber Tech", desc: "Что такое гипербарическая оксигенотерапия (ГБО), для чего она применяется и при каких состояниях." },
      blog: { title: "Блог | HBOT Chamber Tech", desc: "Актуальные исследования, новости и разработки в области гипербарической оксигенотерапии." },
      configurator: { title: "Конфигуратор | HBOT Chamber Tech", desc: "Настройте собственную камеру Apex: выберите модель, уровень давления и опции, чтобы мгновенно получить оценку стоимости." },
      contact: { title: "Контакты | HBOT Chamber Tech", desc: "Свяжитесь с HBOT Chamber Tech: адрес, телефон, эл. почта и форма обратной связи." }
    },
    common: {
      brand: "HBOT Chamber Tech",
      home_label: "Главная",
      notfound: { title: "Страница не найдена", desc: "Возможно, страница была перемещена или удалена.", button: "На главную" },
      whatsapp_message: "Здравствуйте, я хотел(а) бы узнать больше о HBOT Chamber Tech.",
      thanks: "Спасибо, что выбрали нас.",
      sticky_cta: "Получить предложение",
      nav: { home: "Главная", technology: "Технологии", models: "Модели", hbotInfo: "Что такое ГБО?", blog: "Блог", configurator: "Конфигуратор", contact: "Контакты" },
      models_menu: {
        soloLounge: "Apex Solo Lounge",
        solo: "Apex Solo",
        duo: "Apex Duo",
        quad: "Apex Quad",
        quadCube: "Apex Quad-Cube",
        nexus: "Apex Nexus",
        all_link: "Все модели"
      },
      footer: {
        about_text: "HBOT Chamber Tech — ведущий производитель гипербарических кислородных камер с IoT-подключением и поддержкой искусственного интеллекта.",
        models_title: "Модели",
        company_title: "Компания",
        contact_title: "Контакты",
        rights: "Все права защищены.",
        membership_note: "входит в состав Almita Group."
      },
      cta_banner: {
        title: "Давайте вместе подберём вашу модель Apex",
        subtitle: "Выберите модель, уровень давления и опции — получите мгновенную оценку стоимости.",
        button: "Запустить конфигуратор"
      },
      view_all: "Смотреть все",
      learn_more: "Подробнее",
      back_to_models: "Ко всем моделям",
      included_badge: "Входит в стандарт",
      configure_this: "Настроить эту модель"
    },
    modelPage: {
      overview_title: "Обзор",
      specs_title: "Технические характеристики",
      included_title: "Технологическая экосистема Apex",
      other_models: "Другие модели"
    },
    home: {
      hero: {
        eyebrow: "СЕРИЯ APEX",
        title: "Дышите\nна вершине",
        subtitle: "HBOT Chamber Tech — ведущий производитель гипербарических кислородных камер, создающий премиальные и передовые решения для здоровья и хорошего самочувствия. Уделяя особое внимание инновациям, безопасности и совершенству дизайна, мы производим камеры, соответствующие самым высоким медицинским и коммерческим стандартам.",
        cta_primary: "Изучить модели",
        cta_secondary: "Запустить конфигуратор",
        trust_line: "Передовая инженерия · Стандарты безопасности медицинского класса"
      },
      stats: [
        { value: "5", label: "Моделей Apex" },
        { value: "94%", label: "Чистота кислорода" },
        { value: "<55дБ", label: "Уровень шума ApexSilent™" },
        { value: "24/7", label: "Удалённый мониторинг" }
      ],
      tech_teaser: {
        eyebrow: "ТЕХНОЛОГИЧЕСКАЯ ПЛАТФОРМА",
        title: "Интеллектуальная экосистема внутри камеры",
        text: "Серия Apex оснащена первым и единственным в отрасли стандартным IoT-модулем на базе ApexConnect™, ApexOS™, ApexAI™, ApexSync™ и ApexGuard™.",
        cta: "Изучить технологии"
      },
      models_teaser: {
        eyebrow: "СЕРИЯ APEX",
        title: "Наши модели",
        subtitle: "От индивидуального использования одним человеком до многоместных камер госпитального масштаба — шесть моделей под ваши задачи.",
        cta_all: "Изучить все модели"
      },
      why: {
        eyebrow: "ПОЧЕМУ HBOT CHAMBER TECH",
        title: "Единственная подключённая камера на рынке",
        items: [
          { title: "Первое IoT-ядро в отрасли", desc: "Благодаря ApexConnect™ каждая камера подключена к облаку 24/7 и может отслеживаться удалённо." },
          { title: "Лечение с поддержкой ИИ", desc: "ApexAI™ динамически оптимизирует давление и поток кислорода на основе данных пациента." },
          { title: "Интеграция с больничными системами", desc: "ApexSync™ соответствует стандартам HL7 FHIR и DICOM, напрямую подключаясь к больничным информационным системам." },
          { title: "Предупреждает до возникновения неисправности", desc: "ApexGuard™ оповещает благодаря технологии прогнозного обслуживания, не дожидаясь вызова сервиса." }
        ]
      },
      celebs: {
        eyebrow: "КТО ИСПОЛЬЗУЕТ?",
        title: "Лучшие в мире выбирают гипербарический кислород",
        subtitle: "Имена, о которых пресса сообщала об использовании ГБО для восстановления, результатов и долголетия — а мы производим такие камеры.",
        source_label: "Источник",
        disclaimer: "Перечисленные здесь лица, по сообщениям СМИ, используют ГБО; они не являются амбассадорами или клиентами HBOT Chamber Tech.",
        items: [
          { name: "Cristiano Ronaldo", role: "Футболист", text: "СМИ сообщали, что он делает ГБО дома на собственном гипербарическом аппарате для лечения мышечной травмы.", source: "https://www.thesun.co.uk/sport/17203745/cristiano-ronaldo-exclusive-hi-tech-oxygen-chamber/" },
          { name: "LeBron James", role: "Баскетболист", text: "Снят за 60-90-минутным сеансом ГБО в сериале Netflix «Starting 5».", source: "https://medium.com/@chloepaltrow/hbot-helps-lebron-james-earn-victory-for-cavs-at-the-eastern-conference-finals-1285ba769396" },
          { name: "Novak Djokovic", role: "Теннисист", text: "Спортивные СМИ писали, что он использует ГБО, чтобы оставаться на вершине.", source: "https://honestsport.substack.com/p/exclusive-novak-djokovics-lasting" },
          { name: "Justin Bieber", role: "Певец", text: "Сообщалось, что он спит в гипербарической камере как часть своего режима здоровья.", source: "https://www.dailymail.com/tvshowbiz/article-7965575/Justin-Bieber-sleeps-hyperbaric-chamber-relies-IV-infusions-years-drug-use.html" },
          { name: "Tiger Woods", role: "Гольфист", text: "Сообщалось, что он использует ГБО с 2010 года и держит камеру дома.", source: "https://x.com/TigerWoods/status/1907051252585746470" },
          { name: "Michael Phelps", role: "Пловец", text: "Легенда Олимпиады, о котором писали, что он спит в гипербарической камере.", source: "https://www.espn.com/olympics/swimming/story/_/id/7556022/michael-phelps-using-hyperbaric-chamber-aid-recovery" },
          { name: "Madonna", role: "Певица", text: "Модная пресса писала о её использовании кислородных процедур в рамках ухода за собой.", source: "https://www.nytimes.com/2006/04/06/fashion/thursdaystyles/does-the-quickfix-oxygen-facial-really-work.html" },
          { name: "Kendall Jenner", role: "Модель", text: "Vogue писал о гипербарической камере в её wellness-комнате.", source: "https://www.vogue.com/article/what-kendall-jenner-keeps-in-her-wellness-room" },
          { name: "Tom Brady", role: "Игрок НФЛ", text: "Спортивные СМИ сообщали, что он использует ГБО в своей программе восстановления.", source: "https://thesportsrush.com/nfl-news-troy-aikman-and-tom-brady-use-the-same-scientific-practice-for-their-recovery-enhancement/" }
        ]
      },
      indications_teaser: {
        eyebrow: "ОБЛАСТИ ПРИМЕНЕНИЯ",
        title: "В каких случаях применяется ГБО?",
        text: "Используется как вспомогательное лечение при широком спектре состояний — от заживления ран до внезапной потери слуха, от декомпрессионной болезни до отравления угарным газом.",
        cta: "Смотреть все области применения"
      },
      styles_teaser: {
        eyebrow: "ВАРИАНТЫ ДИЗАЙНА",
        title: "Выберите стиль камеры",
        subtitle: "Каждая модель Apex доступна в разных вариантах дизайна под ваше пространство и предпочтения.",
        items: [
          { icon: "glass", title: "Панорамная серия со стеклом", desc: "Дизайн с широкими стеклянными поверхностями — для тех, кто хочет ощущения простора и визуальной связи с окружением." },
          { icon: "solid", title: "Стандартный закрытый дизайн", desc: "Лаконичный закрытый корпус — выбор тех, кто ценит приватность и клиническую простоту." },
          { icon: "premium", title: "Премиальная серия", desc: "Высококлассная отделка салона, продвинутое освещение и эксклюзивные детали для дизайна высшего сегмента.", badge: "Премиум" }
        ],
        note: "Вы можете указать предпочтения по типу стекла и стилю камеры в запросе на предложение."
      }
    },
    technology: {
      header: { eyebrow: "ТЕХНОЛОГИЧЕСКАЯ ПЛАТФОРМА", title: "Технологическая экосистема Apex", subtitle: "Не просто панель управления — постоянно развивающаяся, подключённая и интеллектуальная система." },
      intro: "Каждая модель Apex включает в стандартной комплектации ApexConnect™, ApexOS™, ApexAI™, ApexSync™ и ApexGuard™. Вместе эти пять платформ превращают камеру из простого лечебного устройства в интеллектуальную, подключённую и прогнозирующую систему.",
      pillars: {
        connect: {
          title: "ApexConnect™",
          subtitle: "Постоянное подключение, непрерывная безопасность",
          desc: "Первый и единственный в отрасли стандартный IoT-модуль. Каждая модель Apex постоянно подключена к облаку HBOT Chamber Tech через интернет-соединение.",
          features: [
            "Удалённый мониторинг в реальном времени: техник наблюдает данные о давлении, уровне кислорода, температуре и влажности в прямом эфире",
            "Управление несколькими устройствами: управляйте несколькими камерами с единой панели",
            "Автоматическое уведомление о неисправности: при отклонении клапана давления автоматически создаётся заявка в сервис",
            "Мгновенные оповещения: SMS и email-уведомления при критических параметрах"
          ]
        },
        os: {
          title: "ApexOS™",
          subtitle: "Интеллектуальный «мозг» внутри камеры",
          desc: "Операционная система на базе Android с сенсорным экраном, которая постоянно развивается.",
          features: [
            "Постоянные обновления ПО (OTA): новые протоколы и обновления безопасности загружаются автоматически",
            "50+ готовых протоколов лечения: ожоги, диабетическая стопа, восстановление спортсменов, антивозрастная терапия, реабилитация после COVID",
            "Поддержка нескольких языков: новые языки добавляются с обновлениями ПО",
            "Профили пользователей: отдельный профиль для каждого пациента с автоматической загрузкой прошлых сеансов"
          ]
        },
        ai: {
          title: "ApexAI™",
          subtitle: "Оптимизация лечения с помощью ИИ",
          desc: "Датчики внутри камеры и данные пациента анализируются алгоритмами машинного обучения.",
          features: [
            "Динамическая регулировка давления: при признаках дискомфорта давление настраивается микрошагами для сохранения комфорта",
            "Оптимизация эффективности кислорода: поток кислорода подстраивается под ритм дыхания, сокращая расход на 30%",
            "Механизм рекомендации сеансов: по завершении протокола готовится отчёт для утверждения врачом",
            "Обнаружение клаустрофобии: при чрезмерной подвижности автоматически включается система освещения и связи"
          ]
        },
        sync: {
          title: "ApexSync™",
          subtitle: "Интеграция с больничными информационными системами в один клик",
          desc: "Соответствует стандартам HL7 FHIR и DICOM. По окончании сеанса данные автоматически попадают в карту пациента.",
          features: [
            "Прямое подключение к Epic, Cerner, Medistat, Logo и локальным больничным информационным системам",
            "Автоматическая отчётность: отчёт поступает на экран врача по окончании каждого сеанса",
            "Интеграция с биллингом: объём кислорода и продолжительность сеанса автоматически передаются в модуль учёта"
          ]
        },
        guard: {
          title: "ApexGuard™",
          subtitle: "Прогнозная безопасность и обслуживание",
          desc: "Не просто предупреждать о неисправности — предсказывать её заранее.",
          features: [
            "Прогнозное обслуживание: система предупреждает при изменении характера вибрации мотора компрессора",
            "Цифровой журнал безопасности: каждое изменение давления шифруется и записывается в облако",
            "Автоматический журнал дезинфекции: автоматическая запись при проведении UV-C или озоновой дезинфекции"
          ]
        }
      },
      extra: {
        silent: { title: "ApexSilent™", desc: "Уровень рабочего шума ниже 55 децибел." },
        care: { title: "ApexCare™", desc: "Удалённая диагностика и решение проблем без ожидания вызова сервиса." }
      },
      comparison: {
        title: "Почему HBOT Chamber Tech?",
        subtitle: "Сравните серию Apex с другими камерами на рынке.",
        col_feature: "Характеристика",
        col_competitor: "Конкуренты на рынке",
        col_apex: "Серия Apex от HBOT Chamber Tech",
        rows: [
          { feature: "Подключение к интернету", competitor: "Нет или опционально", apex: "ApexConnect™ — стандарт, 24/7" },
          { feature: "OTA-обновления ПО", competitor: "Нет, фиксированная прошивка", apex: "ApexOS™ — постоянно обновляется" },
          { feature: "Удалённый мониторинг", competitor: "Ограничен или отсутствует", apex: "ApexConnect™ — панель в реальном времени" },
          { feature: "Поддержка ИИ", competitor: "Отсутствует", apex: "ApexAI™ — динамический протокол" },
          { feature: "Интеграция с EMR/HIS", competitor: "Вручную или отсутствует", apex: "ApexSync™ — автоматически HL7/DICOM" },
          { feature: "Прогнозное обслуживание", competitor: "Отсутствует, реактивное обслуживание", apex: "ApexGuard™ — предупреждение до сбоя" },
          { feature: "Автоматическая отчётность", competitor: "Отсутствует", apex: "ApexSync™ — отчёт по окончании сеанса" },
          { feature: "Удалённая диагностика", competitor: "Отсутствует, нужен вызов сервиса", apex: "ApexCare™ — удалённое решение" },
          { feature: "Уровень шума", competitor: "60–70 дБ", apex: "ApexSilent™ — <55 дБ" },
          { feature: "Цифровой журнал безопасности", competitor: "Отсутствует", apex: "ApexGuard™ — зашифрованная запись в облаке" }
        ]
      },
      roadmap: {
        eyebrow: "ПЛАНЫ РАЗВИТИЯ",
        title: "Что дальше?",
        subtitle: "Функции, которые разрабатываются на платформе ApexConnect™ и пока не входят в стандартную комплектацию текущих моделей Apex.",
        badge: "В разработке",
        items: [
          { icon: "mobileApp", title: "Мобильное приложение мониторинга ApexConnect", desc: "Приложение для мониторинга, позволяющее клиническому персоналу отслеживать давление в камере, уровень кислорода и состояние системы с телефона." },
          { icon: "healthSync", title: "Синхронизация с приложениями здоровья", desc: "Синхронизация продолжительности и истории сеансов с Apple Health, Huawei Health и Google Fit." },
          { icon: "screen", title: "Стационарный immersive-дисплей", desc: "Большой экран, встроенный в камеру, с расслабляющим визуальным контентом во время сеанса." }
        ],
        disclaimer: "Эти функции находятся в разработке и планируются для будущих моделей; они не входят в стандартную комплектацию текущих моделей Apex. Давление и уровень кислорода в камере всегда контролируются квалифицированным оператором."
      }
    },
    modelsOverview: {
      header: { eyebrow: "СЕРИЯ APEX", title: "Наши модели", subtitle: "От индивидуального использования до многоместных камер госпитального масштаба — шесть моделей." },
      intro: "Каждая модель Apex включает в стандартной комплектации ApexConnect™, ApexOS™, ApexAI™, ApexSync™ и ApexGuard™. Различия между ними — во вместимости, положении и диапазоне давления.",
      compareTable: {
        title: "Сравните модели",
        subtitle: "Быстро определите, какая модель Apex подходит именно вам.",
        col_capacity: "Вместимость",
        col_position: "Положение",
        col_pressure: "Диапазон давления",
        col_price: "Начальная цена",
        col_noise: "Уровень шума",
        action_label: "Настроить"
      }
    },
    modelShort: {
      soloLounge: { title: "Apex Solo Lounge", tagline: "1 человек · Положение лёжа", desc: "Полностью укомплектованная камера, разработанная специально для пользователей, нуждающихся в лечении в положении лёжа." },
      solo: { title: "Apex Solo", tagline: "1 человек · Положение сидя", desc: "Компактная, элегантная, полностью укомплектованная камера для индивидуальной гипербарической оксигенотерапии." },
      duo: { title: "Apex Duo", tagline: "2 человека · Положение сидя", desc: "Двухместная камера с панорамным окном — для пар, партнёров или пациента с сопровождающим." },
      quad: { title: "Apex Quad", tagline: "4 человека · Положение сидя", desc: "Многоместная камера среднего масштаба с интегрированной панелью управления для клиник и коммерческих wellness-центров." },
      quadCube: { title: "Apex Quad-Cube", tagline: "4 человека · Просторная кабина", desc: "Четырёхместная премиум-кабина с просторным кубическим интерьером — стёганая кожа и LED-подсветка." },
      nexus: { title: "Apex Nexus", tagline: "6+ человек · Положение сидя", desc: "Камера госпитального класса большой вместимости с модульным расширением для медицинских учреждений." }
    },
    includedItems: [
      { icon: "connect", title: "ApexConnect™ включён", desc: "Подключение к интернету в стандартной комплектации. Удалённый мониторинг, мгновенные оповещения и облачное резервное копирование." },
      { icon: "os", title: "Обновления ApexOS™", desc: "Ваше устройство ежемесячно получает новые функции. OTA-обновления поддерживают протоколы актуальными." },
      { icon: "ai", title: "Оптимизация ApexAI™", desc: "ИИ, анализирующий данные пациента, динамически настраивает сеансы." },
      { icon: "sync", title: "Интеграция ApexSync™", desc: "Интеграция с больничными информационными системами в один клик. Автоматическая отчётность." },
      { icon: "guard", title: "Безопасность ApexGuard™", desc: "Технология прогнозного обслуживания, предупреждающая до возникновения неисправности." }
    ],
    modelSoloLounge: {
      breadcrumb: "Apex Solo Lounge", eyebrow: "APEX SOLO LOUNGE", title: "Apex Solo Lounge",
      tagline: "Совершенство в положении лёжа. Прилягте, расслабьтесь, восстановитесь.",
      overview_text: "Разработана специально для пользователей, нуждающихся в лечении в положении лёжа. Медицинское ортопедическое ложе и корпус из авиационного алюминия обеспечивают максимальный комфорт во время длительных сеансов.",
      specs: [
        { label: "Вместимость", value: "1 человек (положение лёжа)" },
        { label: "Диапазон давления", value: "1.5 – 2.5 ATA" },
        { label: "Ложе", value: "Медицинское ортопедическое, 200×80 см" },
        { label: "Материал", value: "Авиационный алюминий" },
        { label: "Безопасность", value: "Двойной предохранительный клапан" },
        { label: "Внешние размеры", value: "240×110×120 см" },
        { label: "Уровень шума", value: "<55 дБ (ApexSilent™)" }
      ]
    },
    modelSolo: {
      breadcrumb: "Apex Solo", eyebrow: "APEX SOLO", title: "Apex Solo",
      tagline: "Вершина вашего личного здоровья. Только вы и кислород.",
      overview_text: "Компактная, элегантная, полностью укомплектованная камера для индивидуальной гипербарической оксигенотерапии. С сенсорным управлением идеально подходит для домашнего или клинического использования.",
      specs: [
        { label: "Вместимость", value: "1 человек (сидя)" },
        { label: "Диапазон давления", value: "1.5 – 2.5 ATA" },
        { label: "Управление", value: "Сенсорный экран" },
        { label: "Материал", value: "Авиационный алюминий" },
        { label: "Безопасность", value: "Двойной предохранительный клапан" },
        { label: "Внешние размеры", value: "120×110×180 см" },
        { label: "Уровень шума", value: "<55 дБ (ApexSilent™)" }
      ]
    },
    modelDuo: {
      breadcrumb: "Apex Duo", eyebrow: "APEX DUO", title: "Apex Duo",
      tagline: "Исцеляйтесь вместе. Совместный сеанс лечения для двоих.",
      overview_text: "Двухместная гипербарическая камера для совместных сеансов терапии. Разработана для пар, партнёров или пациента с сопровождающим.",
      specs: [
        { label: "Вместимость", value: "2 человека (сидя)" },
        { label: "Диапазон давления", value: "1.5 – 2.5 ATA" },
        { label: "Чистота кислорода", value: "93–95%" },
        { label: "Безопасность", value: "Система аварийных клапанов" },
        { label: "Управление", value: "Двойная система управления" },
        { label: "Окно", value: "Панорамное" }
      ]
    },
    modelQuad: {
      breadcrumb: "Apex Quad", eyebrow: "APEX QUAD", title: "Apex Quad",
      tagline: "Решение среднего масштаба для клиник и wellness-центров.",
      overview_text: "Многоместная камера среднего масштаба с интегрированной панелью управления. Создана для клиник и коммерческих wellness-центров.",
      specs: [
        { label: "Вместимость", value: "4 человека (сидя)" },
        { label: "Диапазон давления", value: "1.5 – 2.5 ATA" },
        { label: "Чистота кислорода", value: "93–95%" },
        { label: "Безопасность", value: "Система аварийных клапанов" },
        { label: "Мониторинг", value: "Мониторинг нескольких пользователей" },
        { label: "Управление", value: "Внешняя панель управления" }
      ]
    },
    modelQuadCube: {
      breadcrumb: "Apex Quad-Cube", eyebrow: "APEX QUAD-CUBE", title: "Apex Quad-Cube",
      tagline: "Премиальный четырёхместный опыт в просторном кубическом дизайне.",
      overview_text: "Четырёхместная премиум-кабина с просторным кубическим интерьером. Стёганая кожаная обивка, LED-подсветка и независимый блок управления обеспечивают комфортную многоместную терапию для клиник и wellness-центров.",
      specs: [
        { label: "Вместимость", value: "4 человека (сидя)" },
        { label: "Диапазон давления", value: "1.5 – 2.5 ATA" },
        { label: "Чистота кислорода", value: "93–95%" },
        { label: "Интерьер", value: "Стёганая кожа, LED-подсветка" },
        { label: "Безопасность", value: "Система аварийных клапанов" },
        { label: "Управление", value: "Независимый блок управления" }
      ]
    },
    modelNexus: {
      breadcrumb: "Apex Nexus", eyebrow: "APEX NEXUS", title: "Apex Nexus",
      tagline: "Решение госпитального класса большой вместимости.",
      overview_text: "Камера госпитального класса большой вместимости для медицинских учреждений. Модульная конструкция и продвинутые системы мониторинга отвечают потребностям самых загруженных лечебных центров.",
      specs: [
        { label: "Вместимость", value: "6+ человек (сидя)" },
        { label: "Диапазон давления", value: "3.0 – 6.0 ATA" },
        { label: "Чистота кислорода", value: "93–95%" },
        { label: "Безопасность", value: "Система аварийных клапанов" },
        { label: "Конструкция", value: "Госпитальный класс" },
        { label: "Расширение", value: "Готовность к модульному расширению" }
      ]
    },
    hbotInfo: {
      header: { eyebrow: "ИНФОРМАЦИОННЫЙ ЦЕНТР", title: "Что такое ГБО?", subtitle: "Что нужно знать о гипербарической оксигенотерапии." },
      whatIsHboc: { title: "Что такое гипербарическая кислородная камера (ГБК)?", text: "Гипербарические кислородные камеры — это специально спроектированные герметичные кабины, позволяющие людям дышать чистым кислородом при давлении выше нормального атмосферного. Эти камеры используются для гипербарической оксигенотерапии (ГБО) — медицински признанного метода лечения, ускоряющего заживление и укрепляющего общее самочувствие." },
      whyNeeded: { title: "Для чего нужна ГБК?", text: "Камеры ГБК создают контролируемую среду под давлением, в которой пациенты дышат кислородом чистотой 94%, что способствует более быстрому восстановлению и улучшенной регенерации клеток. Эти камеры используются в медицинских учреждениях, wellness-центрах, спортивных клиниках и частными пользователями по всему миру." },
      whatIsHbot: {
        title: "Что такое гипербарическая оксигенотерапия (ГБО)?",
        text1: "ГБО — это медицинское лечение, при котором пациенты дышат чистым кислородом внутри камеры под давлением, превышающим нормальное атмосферное. Этот процесс ускоряет заживление ран, уменьшает воспаление и способствует регенерации тканей.",
        text2: "Пациенты дышат внутри этих камер, что помогает лёгким более эффективно собирать и усваивать кислород. ГБО также применяется при лечении внезапной потери слуха и зрения, костных инфекций и диабетических язв стопы. В зависимости от типа лечения пациенты могут сидеть или лежать во время процедуры."
      },
      indications: {
        title: "В каких случаях применяется ГБО?",
        subtitle: "Гипербарическая оксигенотерапия используется как вспомогательное лечение при широком спектре медицинских состояний.",
        items: [
          { icon: "antiaging", label: "Омоложение кожи (антивозрастная терапия)" },
          { icon: "jetlag", label: "Восстановление после смены часовых поясов (усталость от перелётов)" },
          { icon: "wound", label: "Заживление ран (диабетических и недиабетических)" },
          { icon: "eye", label: "Внезапная потеря зрения" },
          { icon: "decompression", label: "Декомпрессионная болезнь" },
          { icon: "embolism", label: "Воздушная или газовая эмболия" },
          { icon: "poisoning", label: "Отравление угарным газом и топливом" },
          { icon: "ear", label: "Внезапная потеря слуха" },
          { icon: "bone", label: "Остеонекроз" },
          { icon: "burn", label: "Термические ожоги" },
          { icon: "gangrene", label: "Газовая гангрена" },
          { icon: "blood", label: "Значительная кровопотеря" },
          { icon: "brain", label: "Аноксическая энцефалопатия" },
          { icon: "smoke", label: "Острое отравление дымом" }
        ]
      },
      disclaimer: "Данная информация носит исключительно общий ознакомительный характер и не является медицинской рекомендацией. Решения о лечении должны приниматься только специалистом-медиком."
    },
    configurator: {
      header: { eyebrow: "КОНФИГУРАТОР", title: "Создайте свою камеру Apex", subtitle: "Выберите модель, уровень давления и опции — получите мгновенную оценку стоимости." },
      step1_title: "2. Выберите модель",
      style_step_title: "1. Стиль камеры",
      style_step_note: "Выберите дизайн камеры; цена зависит от площади остекления и уровня отделки интерьера.",
      color_step_title: "3. Выберите цвет",
      color_step_note: "Бесплатный выбор из нашей стандартной цветовой палитры.",
      interior_step_title: "4. Цвет интерьера",
      interior_step_note: "Стандартные цвета интерьера включены в стоимость.",
      seat_color_step_title: "5. Цвет кресел",
      seat_color_step_note: "Цвет обивки кресел включён в стоимость; ваш выбор добавляется в сводку и форму запроса.",
      step2_title: "6. Уровень давления",
      step3_title: "7. Дополнительные опции",
      step4_title: "8. Запросите предложение",
      models: [
        { id: "solo-lounge", name: "Apex Solo Lounge", tagline: "1 человек · Положение лёжа" },
        { id: "solo", name: "Apex Solo", tagline: "1 человек · Положение сидя" },
        { id: "duo", name: "Apex Duo", tagline: "2 человека · Положение сидя" },
        { id: "quad", name: "Apex Quad", tagline: "4 человека · Положение сидя" },
        { id: "quad-cube", name: "Apex Quad-Cube", tagline: "4 человека · Просторная кабина" },
        { id: "nexus", name: "Apex Nexus", tagline: "6+ человек · Положение сидя" }
      ],
      colors: [
        { id: "pearl-white", name: "Жемчужно-белый", hex: "#F2F1EC" },
        { id: "mat-siyah", name: "Матовый чёрный", hex: "#16181A" },
        { id: "antrasit", name: "Антрацит", hex: "#3A3D42" },
        { id: "gece-laciverti", name: "Полуночный синий", hex: "#1B2A4A" },
        { id: "bordo", name: "Бордовый", hex: "#6B2737" },
        { id: "sampanya", name: "Золото шампань", hex: "#C9A876" },
        { id: "grafit", name: "Графитовый серый", hex: "#3A3F44" },
        { id: "bronz", name: "Бронза", hex: "#A5754A" },
        { id: "zumrut", name: "Изумрудно-зелёный", hex: "#1F6F54" }
      ],
      interior_colors: [
        { id: "cream", name: "Кремовый", hex: "#E8DCC8" },
        { id: "anthracite", name: "Антрацит", hex: "#3A3D42" },
        { id: "burgundy", name: "Бордовый", hex: "#6B2737" },
        { id: "navy", name: "Тёмно-синий", hex: "#1B2A4A" },
        { id: "konyak", name: "Коньяк", hex: "#8A5A2B" },
        { id: "kum-beji", name: "Песочный беж", hex: "#D9C7A7" }
      ],
      seat_colors: [
        { id: "konyak", name: "Коньяк", hex: "#8A5A2B" },
        { id: "siyah", name: "Чёрный", hex: "#16181A" },
        { id: "lacivert", name: "Тёмно-синий", hex: "#1B2A4A" },
        { id: "krem", name: "Кремовый", hex: "#E8DCC8" },
        { id: "bordo", name: "Бордовый", hex: "#6B2737" },
        { id: "gri", name: "Серый", hex: "#6B6F75" }
      ],
      styles: [
        { id: "solid", icon: "solid", name: "Стандартный закрытый дизайн", desc: "Лаконичный закрытый корпус — выбор для приватности и клинической простоты." },
        { id: "glass", icon: "glass", name: "Панорамная серия со стеклом", desc: "Дизайн с широкими стеклянными поверхностями для ощущения простора и визуальной связи с окружением." },
        { id: "premium", icon: "premium", name: "Премиум серия", desc: "Отделка высочайшего уровня, продвинутое освещение и эксклюзивные детали флагманского дизайна.", badge: "Премиум" }
      ],
      addons: [
        { id: "massage", name: "Массажное кресло", desc: "Успокаивающая массажная функция кресла во время сеансов." },
        { id: "leather", name: "Премиальная кожаная обивка", desc: "Улучшение интерьера премиальной кожей ручной работы." },
        { id: "entertainment", name: "Развлекательная мультимедийная система", desc: "Встроенный экран, звуковая система и библиотека контента." },
        { id: "finish", name: "Индивидуальный цвет и отделка", desc: "Индивидуальный цвет внешней отделки под ваш фирменный стиль." },
        { id: "uvc", name: "Продвинутый блок UV-C дезинфекции", desc: "Быстрая автоматическая UV-C дезинфекция между сеансами." },
        { id: "backup-o2", name: "Резервный кислородный концентратор", desc: "Дополнительный источник кислорода для непрерывного лечения." },
        { id: "warranty", name: "Расширенная гарантия (3 года)", desc: "Дополнительные 2 года комплексной защиты сверх стандартной гарантии." },
        { id: "install", name: "Пакет приоритетной установки и обучения", desc: "Ускоренная установка и комплексное обучение персонала." },
        { id: "playstation", name: "Игровая консоль PlayStation 5", desc: "Консоль PlayStation 5, интегрированная с экраном и звуковой системой камеры, для развлечения во время длительных сеансов." }
      ],
      pressure_note: "Диапазон давления зависит от выбранной модели.",
      pressure_nexus_only: "Только Nexus",
      pressure_auto_note: "Уровни 3.0 и 6.0 ATA доступны только для Apex Nexus — давление изменено на 2.5 ATA.",
      pressure_auto_note_up: "Apex Nexus — медицинская барокамера только с высоким давлением — давление изменено на 3.0 ATA.",
      seat_step_title: "Количество мест",
      seat_step_note: "Для модели Apex Nexus вы можете увеличивать количество мест начиная с 6, в соответствии с вашими потребностями.",
      seats_label: "мест",
      currency_label: "Валюта",
      summary: {
        title: "Сводка конфигурации",
        model_label: "Модель",
        seats_label: "Количество мест",
        style_label: "Стиль камеры",
        color_label: "Цвет",
        interior_color_label: "Цвет интерьера",
        seat_color_label: "Цвет кресел",
        seat_type_label: "Тип кресла",
        seat_standard: "Стандартное",
        seat_massage: "Массажное",
        pressure_label: "Уровень давления",
        addons_label: "Дополнительные опции",
        none_selected: "Не выбрано",
        base_price_label: "Базовая цена",
        total_label: "Ориентировочная сумма",
        disclaimer: "Цены являются ориентировочными и приведены в информационных целях. Для точного расчёта заполните форму.",
        cta: "Запросить предложение по этой конфигурации",
        print_button: "Печать / Сохранить как PDF",
        share_button: "Скопировать ссылку на конфигурацию",
        share_copied: "Ссылка скопирована!",
        discount_label: "Скидка",
        ref_badge: "Применена реферальная скидка",
        refer_button: "Порекомендовать другу",
        refer_copied: "Реферальная ссылка скопирована!",
        email_button: "Отправить предложение по e-mail",
        pdf_title: "Коммерческое предложение",
        pdf_quote_no: "№ предложения",
        pdf_date: "Дата",
        pdf_customer_section: "ИНФОРМАЦИЯ О КЛИЕНТЕ",
        pdf_configuration_section: "ДЕТАЛИ КОНФИГУРАЦИИ"
      },
      stage: {
        view_exterior: "Вид снаружи",
        view_interior: "Вид интерьера",
        spin_hint: "↔ Перетащите для поворота 360°"
      },
      quote_form: {
        title: "Запросить предложение",
        name: "Имя и фамилия",
        email: "Эл. почта",
        phone: "Телефон",
        company: "Название учреждения / клиники (необязательно)",
        message: "Дополнительные примечания",
        submit: "Отправить запрос",
        sending: "Отправка...",
        success: "Спасибо! Ваша конфигурация и запрос получены — мы скоро свяжемся с вами.",
        error: "Что-то пошло не так. Пожалуйста, попробуйте ещё раз или позвоните нам напрямую."
      }
    },
    blog: {
      header: { eyebrow: "БЛОГ", title: "Исследования и новости", subtitle: "Актуальные научные разработки и новости в области гипербарической оксигенотерапии." },
      source_label: "Источник:",
      min_read: "мин чтения",
      disclaimer: "Эти материалы представляют собой краткие сведения, составленные на основе общедоступных научных публикаций и новостных источников; они не являются медицинской рекомендацией. Для принятия решений о лечении обязательно проконсультируйтесь со специалистом-медиком.",
      posts: [
        {
          date: "2026",
          tag: "Слово основателя",
          icon: "care",
          title: "Почему я сам использую гипербарический кислород",
          paragraphs: [
            "В составе Almita Group мы одновременно развиваем шесть направлений, и плотный график с постоянными поездками — неизбежная часть этого пути. Ещё до того как мы начали производить камеры HBOT Chamber Tech, я решил регулярно пользоваться нашими собственными камерами — считаю, что прежде чем отстаивать продукт, стоит опробовать его на себе.",
            "После сеансов я, как правило, чувствую себя бодрее и собраннее; это личное наблюдение, а не обещание такого же результата для всех. Гипербарическая оксигенация не заменяет медицинское лечение — решения об использовании всегда обсуждайте со специалистом-медиком."
          ],
          source_name: "Almita Group — слово основателя",
          source_url: "https://almitagroup.com",
          author: "Мюрсель Алкан"
        },
        {
          date: "2026",
          tag: "Долголетие",
          icon: "antiaging",
          title: "ГБО и долголетие: тренд здорового старения 2026 года",
          paragraphs: [
            "Движение за долголетие, популяризированное технологическими предпринимателями вроде Брайана Джонсона и их личными протоколами «омоложения», повысило интерес и к гипербарической оксигенотерапии. Одним из научных ориентиров стало клиническое исследование 2020 года в журнале Aging, в котором 35 здоровых взрослых старше 64 лет прошли программу из 60 сеансов ГБО.",
            "В исследовании зафиксировано удлинение теломер иммунных клеток более чем на 20% — до 37% в B-клетках — и снижение доли стареющих (сенесцентных) иммунных клеток до 37%. Поскольку в исследовании не было контрольной группы, а выборка была ограниченной, результаты оцениваются как «многообещающие, но предварительные»; авторы подчёркивают необходимость более масштабных работ для определения оптимальных протоколов."
          ],
          source_name: "PMC – ГБО увеличивает длину теломер и снижает иммунное старение (Aging, 2020)",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7746357/"
        },
        {
          date: "2026",
          tag: "Спорт",
          icon: "healthSync",
          title: "Почему элитные спортсмены используют гипербарический кислород?",
          paragraphs: [
            "Всемирно известные спортсмены — Криштиану Роналду, Леброн Джеймс, Новак Джокович и Флойд Мейвезер — не раз упоминались в прессе как пользователи гипербарических камер в рамках своих программ восстановления. За этим интересом стоят данные спортивной медицины о том, что ГБО может уменьшать отёки и воспаление, поддерживать восстановление тканей и помогать спортсменам быстрее возвращаться к тренировкам.",
            "Среди работ, приводимых в обзорах: наблюдение на зимней Олимпиаде в Нагано, где 7 спортсменов быстрее восстанавливались после коротких сеансов при 1,3 ATA; ранний клинический отчёт о сокращении на 55% дней, потерянных из-за травм, у профессиональных футболистов; и университетское исследование, указывающее примерно на 30% более быстрое возвращение после растяжения голеностопа. Авторы отмечают, что доказательная база пока опирается в основном на небольшие выборки и для твёрдых выводов необходимы рандомизированные контролируемые исследования."
          ],
          source_name: "PMC – Роль гипербарической оксигенотерапии в спортивной медицине (обзор)",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3382683/"
        },
        {
          date: "2026",
          tag: "Гид",
          icon: "oneSeat",
          title: "Как выбрать домашнюю гипербарическую камеру: гид",
          paragraphs: [
            "Первый вопрос при выборе гипербарической камеры для дома — вместимость: одноместные (моноплац) камеры компактны, а многоместные (мультиплац) позволяют проводить сеансы одновременно для членов семьи или небольших групп и упрощают сопровождение. UHMS — международный авторитет в гипербарической медицине — требует, чтобы барокамеры были сертифицированным и регулярно проверяемым оборудованием, а операторы прошли специальную подготовку.",
            "Второй ключевой вопрос — давление: клинические протоколы обычно выполняются в диапазоне 2,0–2,4 ATA, тогда как в домашних системах распространён диапазон 1,3–2,0 ATA; подходящий уровень обязательно обсудите с врачом. Третий блок — безопасность и комфорт: правила пожарной безопасности в кислородной среде, аварийная декомпрессия, уровень шума, внутреннее освещение и система связи напрямую влияют на ежедневный опыт; условия обслуживания и гарантии зафиксируйте письменно до покупки."
          ],
          source_name: "StatPearls (NCBI) – Гипербарическая оксигенотерапия",
          source_url: "https://www.ncbi.nlm.nih.gov/books/NBK459172/"
        },
        {
          date: "2026",
          tag: "Исследование",
          icon: "wound",
          title: "Роль гипербарического кислорода в лечении хронических ран продолжает расти",
          paragraphs: [
            "Последние обзоры в области хирургии и лечения хронических ран показывают, что гипербарическая оксигенотерапия (ГБО) способствует процессу заживления за счёт повышения оксигенации тканей. При диабетических язвах стопы, венозных язвах голени, ожогах и лучевых повреждениях тканей ГБО, по имеющимся данным, улучшает показатели заживления ран и снижает риск инфицирования.",
            "Исследование, опубликованное в 2025 году, показало, что ГБО в сочетании с терапией ран отрицательным давлением (NPWT) значительно повышает скорость заживления по сравнению с одной лишь NPWT. В реконструктивной хирургии ГБО, как сообщается, поддерживает выживаемость тканей и трансплантатов и стимулирует образование новых кровеносных сосудов."
          ],
          source_name: "PMC – Hyperbaric Oxygen Therapy in Surgical Wound Healing and Tissue Salvage",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13109970/"
        },
        {
          date: "2026",
          tag: "Спортивное здоровье",
          icon: "burn",
          title: "Почему спортсмены всё чаще выбирают гипербарическую камеру",
          paragraphs: [
            "Многие элитные спортсмены в теннисе, плавании, баскетболе и гольфе выбирают гипербарическую оксигенотерапию как часть процесса восстановления. Исследования в области спортивной медицины показывают, что ГБО может ускорять заживление, снижать воспаление и помогать спортсменам быстрее возвращаться к тренировкам.",
            "В некоторых исследованиях у спортсменов, прошедших ГБО, отмечался более низкий уровень мышечной боли и усталости, а время восстановления сокращалось примерно на 30%. Хотя область всё ещё нуждается в более крупных контролируемых клинических исследованиях, результаты обнадёживают в отношении здоровья спортсменов."
          ],
          source_name: "Turkish Journal of Sports Medicine",
          source_url: "https://journalofsportsmedicine.org/full-text/746/eng"
        },
        {
          date: "2026",
          tag: "Клинические данные",
          icon: "wound",
          title: "Метаанализ по диабетическим язвам стопы: снижение риска ампутации",
          paragraphs: [
            "Метаанализ 14 исследований с участием 768 человек показал, что гипербарическая оксигенотерапия обеспечивает статистически значимую пользу в полном заживлении диабетических язв стопы и снижении риска большой ампутации.",
            "Недавний систематический обзор, опубликованный в 2024 году, пришёл к аналогичным выводам: в большинстве рассмотренных исследований при применении ГБО наблюдалось снижение частоты больших ампутаций, повышение показателей заживления ран, а также уменьшение размера и глубины язв."
          ],
          source_name: "PMC – Efficacy of HBOT for Diabetic Foot Ulcer",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7838311/"
        },
        {
          date: "2026",
          tag: "Клинические данные",
          icon: "ear",
          title: "Гипербарический кислород при внезапной потере слуха: важность раннего вмешательства",
          paragraphs: [
            "У пациентов с внезапной сенсоневральной потерей слуха гипербарическая оксигенотерапия направлена на улучшение микроциркуляции и снижение воспаления за счёт повышения давления кислорода во внутреннем ухе. Исследования показывают, что у пациентов, начавших лечение рано, особенно в сочетании с кортикостероидной терапией, результаты, как правило, более благоприятны.",
            "Хотя результаты исследований не дают полного единодушия относительно эффективности, в некоторых работах улучшение слуха наблюдалось более чем у половины пациентов. Эксперты подчёркивают необходимость дальнейших клинических исследований для установления стандартизированных протоколов давления и продолжительности."
          ],
          source_name: "JAMA Otolaryngology–Head & Neck Surgery",
          source_url: "https://jamanetwork.com/journals/jamaotolaryngology/fullarticle/2785483"
        },
        {
          date: "2026",
          tag: "Технологии",
          icon: "connect",
          title: "Эпоха подключённых медицинских устройств: удалённый мониторинг быстро растёт",
          paragraphs: [
            "По оценкам, к 2026 году глобальный рынок IoT в здравоохранении превысил 86 миллиардов долларов. По мере ускорения перехода от стационарной помощи к помощи на дому более 350 больниц в США уже реализуют программы «больница на дому» на базе IoT.",
            "Исследования показывают, что системы удалённого мониторинга пациентов на базе IoT способны снижать частоту повторных госпитализаций на величину до 50%. Платформа ApexConnect™ от HBOT Chamber Tech — часть именно этой глобальной тенденции: она подключает камеры к облаку для мониторинга в реальном времени и прогнозного обслуживания."
          ],
          source_name: "IoT Business News",
          source_url: "https://iotbusinessnews.com/2026/04/14/connected-healthcare-iot-remote-monitoring-medical-devices-and-data-challenges/"
        },
        {
          date: "2026",
          tag: "Клиника",
          icon: "guard",
          title: "Управление давлением в многоместных камерах: клинические протоколы эксплуатации",
          paragraphs: [
            "Многоместные гипербарические камеры — стандартный выбор больниц и клиник: они позволяют одновременно лечить нескольких пациентов и допускают сопровождение медицинским персоналом внутри камеры. Руководства по эксплуатации, публикуемые UHMS — международным авторитетом в гипербарической медицине, — рекомендуют подбирать скорость повышения и снижения давления с учётом комфорта пациента и риска баротравмы уха, проводить каждый сеанс под наблюдением сертифицированного оператора и регулярно отрабатывать сценарии аварийной эвакуации.",
            "В клинической практике протокол давления определяется показанием к лечению: распространённые протоколы выполняются в диапазоне 2.0–2.4 ATA, а отдельные специальные показания могут требовать более высокого давления. Эксперты подчёркивают, что подходящий уровень давления должен оценивать врач, специализирующийся в гипербарической медицине, а оборудование камеры должно быть сертифицировано на безопасную работу в целевом диапазоне давления."
          ],
          source_name: "UHMS – Undersea & Hyperbaric Medical Society",
          source_url: "https://www.uhms.org"
        },
        {
          date: "2026",
          tag: "Спорт",
          icon: "healthSync",
          title: "Предсезонная подготовка в спортивных клубах: программы гипербарической поддержки",
          paragraphs: [
            "Профессиональные спортивные клубы всё чаще обращаются к гипербарической оксигенации для поддержки восстановления в периоды плотного матчевого и тренировочного графика. Обзоры спортивной медицины отмечают, что ГБО может способствовать уменьшению отёка и воспаления после травм мягких тканей и потенциально сокращает сроки возвращения спортсмена к тренировкам.",
            "В клубной среде приоритетом является планирование: сеансы рекомендуется встраивать в тренировочный и соревновательный календарь, оценивать вместе с индивидуальным мониторингом нагрузки и проводить под наблюдением врача команды. Исследователи также отмечают, что значительная часть имеющихся данных основана на работах с малыми выборками и для формирования стандартных протоколов необходимы более крупные контролируемые исследования."
          ],
          source_name: "Frontiers in Physiology – Sport and Exercise",
          source_url: "https://www.frontiersin.org/journals/physiology"
        },
        {
          date: "2026",
          tag: "Wellness",
          icon: "premium",
          title: "Новый тренд в отелях класса люкс: гипербарические wellness-люксы",
          paragraphs: [
            "Отраслевые отчёты о мировой wellness-экономике показывают, что оздоровительный туризм — один из самых быстрорастущих сегментов. В русле этой тенденции люксовые отели и курорты выходят за рамки спа и фитнеса, добавляя в гостевой опыт передовые технологии восстановления: гипербарические кислородные камеры, криотерапию и терапию красным светом.",
            "Наблюдатели отрасли отмечают, что гипербарические установки особенно заметны в премиальных пакетах на темы «долголетия» и «производительности». Для операторов отелей критически важны соответствие стандартам безопасности, наличие обученного персонала и корректно выстроенный процесс оценки здоровья перед использованием; гостевые процедуры должны предлагаться как поддержка общего самочувствия, а не как медицинское лечение."
          ],
          source_name: "Global Wellness Institute",
          source_url: "https://globalwellnessinstitute.org"
        },
        {
          date: "2026",
          tag: "Безопасность",
          icon: "care",
          title: "3.0 ATA и выше: стандарты безопасности гипербарических систем медицинского класса",
          paragraphs: [
            "Уровни давления 3.0 ATA и выше — область, которую гипербарическая медицина применяет только в строго регулируемых клинических условиях. Камеры, работающие на таких уровнях, должны производиться в соответствии с нормами для сосудов под давлением, отвечать гипербарическим положениям международных стандартов пожарной безопасности, таких как NFPA 99, и проходить регулярную периодическую проверку. Управление риском возгорания в обогащённой кислородом среде — важнейшая проектная задача для систем этого класса.",
            "Остальные звенья цепи безопасности — человеческий фактор: сертифицированный гипербарический оператор, предсеансовая оценка пациента, план аварийной эвакуации и медицинское наблюдение. Профессиональные организации рекомендуют проводить лечение высокого класса давления только в учреждениях с такой инфраструктурой и советуют заказчикам письменно запрашивать у производителя сертификаты давления, протоколы испытаний и программы обучения."
          ],
          source_name: "NFPA – National Fire Protection Association",
          source_url: "https://www.nfpa.org"
        }
      ]
    },
    contact: {
      header: { eyebrow: "КОНТАКТЫ", title: "Свяжитесь с нами", subtitle: "Заполните форму для вопросов и запросов на предложение." },
      address_label: "Адрес",
      address_value: "Postane Mh. Rauf Orbay Cd. Kemal Sunal Sk. No: 29, Tuzla / Стамбул, Турция",
      phone_label: "Телефон",
      phone_value: "0850 888 1679",
      email_label: "Эл. почта",
      email_value: "info@hbotchambertech.com",
      hours_label: "Часы работы",
      hours_value: "Понедельник – пятница, 09:00 – 18:00",
      form_title: "Отправить сообщение",
      form_name: "Имя и фамилия",
      form_email: "Эл. почта",
      form_message: "Ваше сообщение",
      form_submit: "Отправить",
      form_sending: "Отправка...",
      form_success: "Спасибо! Ваше сообщение получено — мы скоро свяжемся с вами.",
      form_error: "Что-то пошло не так. Пожалуйста, попробуйте ещё раз или позвоните нам напрямую.",
      map_note: "Тузла, Стамбул",
      faq: {
        eyebrow: "ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ",
        title: "Частые вопросы",
        subtitle: "Вопросы, которые нам чаще всего задают о заказе, оплате и установке.",
        items: [
          { q: "Каковы условия оплаты?", a: "По нашим стандартным условиям при заказе вносится предоплата 50%, оставшиеся 50% оплачиваются, когда камера готова к отгрузке." },
          { q: "Предлагаете ли вы другие варианты оплаты?", a: "Да. Помимо стандартных условий 50% предоплаты / 50% при доставке, мы также предлагаем: рассрочку по корпоративной кредитной карте (действует и для международных заказов), финансовый лизинг с фиксированным первоначальным взносом, а также трёхэтапный план оплаты для крупных заказов (подтверждение заказа / завершение производства / доставка). Свяжитесь с нами, чтобы подобрать оптимальный для вас вариант." },
          { q: "Через сколько времени после заказа камера будет готова?", a: "С момента подтверждения заказа камера будет готова к отгрузке минимум через 6 недель. В этот срок не входит время доставки/логистики, которое рассчитывается отдельно в зависимости от вашего местоположения." },
          { q: "Включены ли установка и доставка в стоимость?", a: "Нет. Стоимость установки и логистики зависит от местоположения, доступа к зданию и расстояния. Мы готовим для вас индивидуальное предложение по установке и логистике — пожалуйста, свяжитесь с нами через форму обратной связи." },
          { q: "Что входит в стоимость?", a: "Каждая модель Apex включает в стандартной комплектации технологическую платформу ApexConnect™, ApexOS™, ApexAI™, ApexSync™ и ApexGuard™. Дополнительные опции и стиль камеры оплачиваются отдельно в конфигураторе." },
          { q: "Как получить коммерческое предложение?", a: "Используйте наш конфигуратор, чтобы выбрать модель, стиль камеры, цвет и опции и мгновенно получить оценку стоимости, затем отправьте форму запроса, и мы свяжемся с вами." },
          { q: "Могу ли я выбрать цвет и стиль камеры?", a: "Да. Вы можете бесплатно выбрать из 12 вариантов цвета, а также один из стилей камеры: стандартный закрытый, панорамный со стеклом или премиум." }
        ]
      }
    }
  },

  ar: {
    dir: "rtl",
    meta: {
      home: { title: "HBOT Chamber Tech | غرف الأكسجين عالي الضغط من سلسلة Apex", desc: "غرف أكسجين عالي الضغط متصلة بإنترنت الأشياء ومدعومة بالذكاء الاصطناعي. تنفّس في القمة مع سلسلة Apex." },
      technology: { title: "التقنية | HBOT Chamber Tech", desc: "ApexConnect و ApexOS و ApexAI و ApexSync و ApexGuard — منصة التقنية الذكية والمتصلة لسلسلة Apex." },
      models: { title: "الموديلات | HBOT Chamber Tech", desc: "Apex Solo Lounge و Apex Solo و Apex Duo و Apex Quad و Apex Quad-Cube و Apex Nexus — ستة موديلات لغرف الأكسجين عالي الضغط." },
      soloLounge: { title: "Apex Solo Lounge | HBOT Chamber Tech", desc: "غرفة أكسجين عالي الضغط لشخص واحد مصممة للعلاج في وضعية الاستلقاء." },
      solo: { title: "Apex Solo | HBOT Chamber Tech", desc: "غرفة مدمجة وكاملة التجهيز للاستخدام الفردي." },
      duo: { title: "Apex Duo | HBOT Chamber Tech", desc: "غرفة علاج مشترك بالأكسجين عالي الضغط لشخصين." },
      quad: { title: "Apex Quad | HBOT Chamber Tech", desc: "غرفة أكسجين عالي الضغط لأربعة أشخاص للعيادات." },
      quadCube: { title: "Apex Quad-Cube | HBOT Chamber Tech", desc: "غرفة أكسجين عالي الضغط لأربعة أشخاص بتصميم مكعّب واسع الداخل." },
      nexus: { title: "Apex Nexus | HBOT Chamber Tech", desc: "غرفة أكسجين عالي الضغط بمستوى المستشفيات وسعة كبيرة لستة أشخاص أو أكثر." },
      hbotInfo: { title: "ما هو العلاج بالأكسجين عالي الضغط؟ | HBOT Chamber Tech", desc: "ما هو العلاج بالأكسجين عالي الضغط (HBOT)، ولماذا يُستخدم، وفي أي الحالات يُطبّق." },
      blog: { title: "المدونة | HBOT Chamber Tech", desc: "أحدث الأبحاث والأخبار والتطورات في مجال العلاج بالأكسجين عالي الضغط." },
      configurator: { title: "أداة التكوين | HBOT Chamber Tech", desc: "صمّم غرفة Apex الخاصة بك: اختر الموديل ومستوى الضغط والإضافات للحصول على تقدير فوري للسعر." },
      contact: { title: "اتصل بنا | HBOT Chamber Tech", desc: "تواصل مع HBOT Chamber Tech: العنوان والهاتف والبريد الإلكتروني ونموذج التواصل." }
    },
    common: {
      brand: "HBOT Chamber Tech",
      home_label: "الرئيسية",
      notfound: { title: "الصفحة غير موجودة", desc: "ربما تم نقل الصفحة التي تبحث عنها أو إزالتها.", button: "العودة إلى الرئيسية" },
      whatsapp_message: "مرحبًا، أرغب في معرفة المزيد عن HBOT Chamber Tech.",
      thanks: "شكرا لاختيارك لنا.",
      sticky_cta: "احصل على عرض سعر",
      nav: { home: "الرئيسية", technology: "التقنية", models: "الموديلات", hbotInfo: "ما هو HBOT؟", blog: "المدونة", configurator: "أداة التكوين", contact: "اتصل بنا" },
      models_menu: {
        soloLounge: "Apex Solo Lounge",
        solo: "Apex Solo",
        duo: "Apex Duo",
        quad: "Apex Quad",
        quadCube: "Apex Quad-Cube",
        nexus: "Apex Nexus",
        all_link: "جميع الموديلات"
      },
      footer: {
        about_text: "HBOT Chamber Tech هي شركة رائدة في تصنيع غرف الأكسجين عالي الضغط المتصلة بإنترنت الأشياء والمدعومة بالذكاء الاصطناعي.",
        models_title: "الموديلات",
        company_title: "الشركة",
        contact_title: "اتصل بنا",
        rights: "جميع الحقوق محفوظة.",
        membership_note: "عضو في Almita Group."
      },
      cta_banner: {
        title: "لنجد معاً موديل Apex المثالي لك",
        subtitle: "اختر الموديل ومستوى الضغط والإضافات — واحصل على تقدير فوري للسعر.",
        button: "ابدأ أداة التكوين"
      },
      view_all: "عرض الكل",
      learn_more: "المزيد من التفاصيل",
      back_to_models: "العودة إلى جميع الموديلات",
      included_badge: "مشمول ضمن المعيار",
      configure_this: "قم بتكوين هذا الموديل"
    },
    modelPage: {
      overview_title: "نظرة عامة",
      specs_title: "المواصفات الفنية",
      included_title: "منظومة Apex التقنية",
      other_models: "موديلاتنا الأخرى"
    },
    home: {
      hero: {
        eyebrow: "سلسلة APEX",
        title: "تنفّس\nفي القمة",
        subtitle: "HBOT Chamber Tech شركة رائدة في تصنيع غرف الأكسجين عالي الضغط، ملتزمة بتقديم حلول متميزة ومتطورة للصحة والعافية. من خلال التركيز على الابتكار والسلامة والتميز في التصميم، ننتج غرفاً تلبي أعلى المعايير الطبية والتجارية.",
        cta_primary: "استكشف الموديلات",
        cta_secondary: "ابدأ أداة التكوين",
        trust_line: "هندسة متقدمة · معايير سلامة بمستوى طبي"
      },
      stats: [
        { value: "5", label: "موديلات Apex" },
        { value: "94%", label: "نقاء الأكسجين" },
        { value: "<55 ديسيبل", label: "مستوى الضجيج ApexSilent™" },
        { value: "24/7", label: "مراقبة عن بُعد" }
      ],
      tech_teaser: {
        eyebrow: "منصة التقنية",
        title: "نظام بيئي ذكي داخل الغرفة",
        text: "تتميز سلسلة Apex بأول وحدة أساسية معيارية لإنترنت الأشياء في الصناعة، مبنية على ApexConnect™ و ApexOS™ و ApexAI™ و ApexSync™ و ApexGuard™.",
        cta: "استكشف التقنية"
      },
      models_teaser: {
        eyebrow: "سلسلة APEX",
        title: "موديلاتنا",
        subtitle: "من الاستخدام الفردي لشخص واحد إلى الغرف متعددة المقاعد بحجم المستشفيات — ستة تصاميم تناسب احتياجاتك.",
        cta_all: "استكشف جميع الموديلات"
      },
      why: {
        eyebrow: "لماذا HBOT CHAMBER TECH",
        title: "الغرفة المتصلة الوحيدة في السوق",
        items: [
          { title: "أول نواة إنترنت أشياء في الصناعة", desc: "بفضل ApexConnect™، تبقى كل غرفة متصلة بالسحابة على مدار الساعة طوال أيام الأسبوع ويمكن مراقبتها عن بُعد." },
          { title: "علاج مدعوم بالذكاء الاصطناعي", desc: "يعمل ApexAI™ على تحسين الضغط وتدفق الأكسجين ديناميكياً بناءً على بيانات المريض." },
          { title: "التكامل مع أنظمة المستشفيات", desc: "يتوافق ApexSync™ مع معياري HL7 FHIR و DICOM، ويتصل مباشرة بأنظمة معلومات المستشفيات." },
          { title: "يحذر قبل حدوث العطل", desc: "ينبهك ApexGuard™ من خلال تقنية الصيانة التنبؤية، دون انتظار طلب خدمة." }
        ]
      },
      celebs: {
        eyebrow: "من يستخدمها؟",
        title: "نخبة العالم يختارون الأكسجين عالي الضغط",
        subtitle: "أسماء ورد في الصحافة أنها تستخدم العلاج بالأكسجين عالي الضغط للتعافي والأداء وطول العمر — ونحن نصنع تلك الغرف.",
        source_label: "المصدر",
        disclaimer: "الأسماء المذكورة هنا ورد في مصادر إخبارية أنها تستخدم العلاج بالأكسجين عالي الضغط؛ وليسوا سفراء للعلامة التجارية أو عملاء HBOT Chamber Tech.",
        items: [
          { name: "Cristiano Ronaldo", role: "لاعب كرة قدم", text: "ورد في التقارير أنه يجري جلسات العلاج بالأكسجين عالي الضغط في منزله بجهازه الخاص لعلاج إصابة عضلية.", source: "https://www.thesun.co.uk/sport/17203745/cristiano-ronaldo-exclusive-hi-tech-oxygen-chamber/" },
          { name: "LeBron James", role: "لاعب كرة سلة", text: "ظهر وهو يجري جلسة مدتها 60-90 دقيقة في مسلسل Netflix «Starting 5».", source: "https://medium.com/@chloepaltrow/hbot-helps-lebron-james-earn-victory-for-cavs-at-the-eastern-conference-finals-1285ba769396" },
          { name: "Novak Djokovic", role: "لاعب تنس", text: "ذكرت وسائل الإعلام الرياضية أنه يستخدم العلاج بالأكسجين عالي الضغط للبقاء في القمة.", source: "https://honestsport.substack.com/p/exclusive-novak-djokovics-lasting" },
          { name: "Justin Bieber", role: "مغنٍّ", text: "أفيد بأنه ينام في غرفة الضغط العالي كجزء من نظامه الصحي.", source: "https://www.dailymail.com/tvshowbiz/article-7965575/Justin-Bieber-sleeps-hyperbaric-chamber-relies-IV-infusions-years-drug-use.html" },
          { name: "Tiger Woods", role: "لاعب غولف", text: "أفيد بأنه يستخدم العلاج بالأكسجين عالي الضغط منذ عام 2010 ويحتفظ بغرفة في منزله.", source: "https://x.com/TigerWoods/status/1907051252585746470" },
          { name: "Michael Phelps", role: "سباح", text: "أسطورة الأولمبياد الذي ورد أنه ينام في غرفة الضغط العالي.", source: "https://www.espn.com/olympics/swimming/story/_/id/7556022/michael-phelps-using-hyperbaric-chamber-aid-recovery" },
          { name: "Madonna", role: "مغنية", text: "تناولت صحافة الموضة استخدامها للعلاجات القائمة على الأكسجين ضمن روتين جمالها.", source: "https://www.nytimes.com/2006/04/06/fashion/thursdaystyles/does-the-quickfix-oxygen-facial-really-work.html" },
          { name: "Kendall Jenner", role: "عارضة أزياء", text: "ذكرت Vogue أنها تحتفظ بغرفة ضغط عالٍ في غرفة العافية الخاصة بها.", source: "https://www.vogue.com/article/what-kendall-jenner-keeps-in-her-wellness-room" },
          { name: "Tom Brady", role: "لاعب NFL", text: "ذكرت وسائل الإعلام الرياضية أنه يستخدم العلاج بالأكسجين عالي الضغط ضمن برنامج تعافيه.", source: "https://thesportsrush.com/nfl-news-troy-aikman-and-tom-brady-use-the-same-scientific-practice-for-their-recovery-enhancement/" }
        ]
      },
      indications_teaser: {
        eyebrow: "مجالات الاستخدام",
        title: "متى يُستخدم العلاج بالأكسجين عالي الضغط؟",
        text: "يُستخدم كعلاج مساند في نطاق واسع من الحالات — من التئام الجروح إلى فقدان السمع المفاجئ، ومن داء الانخفاض إلى التسمم بأول أكسيد الكربون.",
        cta: "عرض جميع مجالات الاستخدام"
      },
      styles_teaser: {
        eyebrow: "خيارات التصميم",
        title: "اختر طراز غرفتك",
        subtitle: "يتوفر كل موديل من Apex بخيارات تصميم مختلفة تناسب مساحتك وتفضيلاتك.",
        items: [
          { icon: "glass", title: "السلسلة الزجاجية البانورامية", desc: "تصميم بسطح زجاجي واسع لمن يرغب بإحساس الانفتاح والتواصل البصري مع الخارج." },
          { icon: "solid", title: "التصميم القياسي المغلق", desc: "تصميم هيكل مغلق وبسيط، يُفضَّل للخصوصية والبساطة السريرية." },
          { icon: "premium", title: "السلسلة المميزة", desc: "تنجيد داخلي راقٍ، إضاءة متقدمة وتفاصيل مخصصة لأعلى فئة تصميم.", badge: "مميز" }
        ],
        note: "يمكنك مشاركة تفضيلاتك لنوع الزجاج وطراز الغرفة معنا ضمن طلب عرض السعر."
      }
    },
    technology: {
      header: { eyebrow: "منصة التقنية", title: "النظام البيئي التقني لـ Apex", subtitle: "ليست مجرد لوحة تحكم — بل نظام متصل وذكي في تطور مستمر." },
      intro: "تشمل كل موديلات Apex بشكل معياري: ApexConnect™ و ApexOS™ و ApexAI™ و ApexSync™ و ApexGuard™. تعمل هذه المنصات الخمس معاً لتحويل الغرفة من جهاز علاج بسيط إلى نظام ذكي ومتصل وتنبؤي.",
      pillars: {
        connect: {
          title: "ApexConnect™",
          subtitle: "اتصال مستمر، أمان بلا انقطاع",
          desc: "أول وحدة أساسية معيارية لإنترنت الأشياء في الصناعة. تبقى كل موديلات Apex متصلة بسحابة HBOT Chamber Tech عبر اتصال إنترنت مستمر.",
          features: [
            "مراقبة عن بُعد في الوقت الفعلي: يراقب الفني بيانات الضغط ومستوى الأكسجين ودرجة الحرارة والرطوبة مباشرة",
            "إدارة أجهزة متعددة: أدر عدة غرف من لوحة تحكم واحدة",
            "إشعار تلقائي بالأعطال: يتم فتح طلب خدمة تلقائياً عند حدوث انحراف في صمام الضغط",
            "تنبيهات فورية: إشعارات عبر الرسائل النصية والبريد الإلكتروني عند القيم الحرجة"
          ]
        },
        os: {
          title: "ApexOS™",
          subtitle: "عقل ذكي داخل الغرفة",
          desc: "نظام تشغيل يعمل بنظام أندرويد بشاشة لمس، ويتطور باستمرار.",
          features: [
            "تحديثات برمجية مستمرة (OTA): يتم تنزيل البروتوكولات الجديدة وتحديثات الأمان تلقائياً",
            "أكثر من 50 بروتوكول علاج جاهز: الحروق، القدم السكرية، تعافي الرياضيين، مكافحة الشيخوخة، إعادة التأهيل بعد كوفيد",
            "دعم متعدد اللغات: تُضاف لغات جديدة مع تحديثات البرمجيات",
            "ملفات تعريف المستخدمين: ملف تعريف منفصل لكل مريض مع تحميل الجلسات السابقة تلقائياً"
          ]
        },
        ai: {
          title: "ApexAI™",
          subtitle: "تحسين العلاج المدعوم بالذكاء الاصطناعي",
          desc: "تُحلَّل بيانات المستشعرات داخل الغرفة وبيانات المريض بخوارزميات التعلم الآلي.",
          features: [
            "ضبط ديناميكي للضغط: عند ظهور علامات عدم الراحة، يُضبط الضغط بخطوات دقيقة للحفاظ على الراحة",
            "تحسين كفاءة الأكسجين: يُضبط تدفق الأكسجين حسب إيقاع التنفس، مما يقلل الهدر بنسبة 30%",
            "محرك اقتراح الجلسات: يُعد تقرير لموافقة الطبيب عند اكتمال البروتوكول",
            "كشف رهاب الأماكن المغلقة: عند رصد حركة مفرطة، يتم تفعيل نظام الإضاءة والتواصل تلقائياً"
          ]
        },
        sync: {
          title: "ApexSync™",
          subtitle: "تكامل بنقرة واحدة مع أنظمة معلومات المستشفيات",
          desc: "متوافق مع معياري HL7 FHIR و DICOM. تُضاف البيانات تلقائياً إلى ملف المريض بمجرد انتهاء الجلسة.",
          features: [
            "اتصال مباشر بأنظمة Epic و Cerner و Medistat و Logo وأنظمة معلومات المستشفيات المحلية",
            "تقارير تلقائية: يصل تقرير إلى شاشة الطبيب في نهاية كل جلسة",
            "تكامل الفوترة: تُنقل كمية الأكسجين ومدة الجلسة تلقائياً إلى وحدة المحاسبة"
          ]
        },
        guard: {
          title: "ApexGuard™",
          subtitle: "أمان وصيانة تنبؤية",
          desc: "ليس فقط التحذير عند حدوث عطل — بل التنبؤ به قبل وقوعه.",
          features: [
            "صيانة تنبؤية: يُصدر النظام تحذيراً عند تغيّر نمط اهتزاز محرك الضاغط",
            "سجل أمان رقمي: يُسجَّل كل تغيّر في الضغط بشكل مشفّر في السحابة",
            "سجل تعقيم تلقائي: تسجيل تلقائي عند إجراء التعقيم بالأشعة فوق البنفسجية أو الأوزون"
          ]
        }
      },
      extra: {
        silent: { title: "ApexSilent™", desc: "ضجيج تشغيل أقل من 55 ديسيبل." },
        care: { title: "ApexCare™", desc: "تشخيص وحل عن بُعد دون انتظار طلب خدمة." }
      },
      comparison: {
        title: "لماذا HBOT Chamber Tech؟",
        subtitle: "قارن سلسلة Apex بغرف أخرى في السوق.",
        col_feature: "الميزة",
        col_competitor: "المنافسون في السوق",
        col_apex: "سلسلة Apex من HBOT Chamber Tech",
        rows: [
          { feature: "الاتصال بالإنترنت", competitor: "غير متوفر أو اختياري", apex: "ApexConnect™ — معياري، على مدار الساعة" },
          { feature: "تحديثات البرمجيات OTA", competitor: "غير متوفر، برمجيات ثابتة", apex: "ApexOS™ — تحديث مستمر" },
          { feature: "المراقبة عن بُعد", competitor: "محدودة أو غير متوفرة", apex: "ApexConnect™ — لوحة تحكم مباشرة" },
          { feature: "دعم الذكاء الاصطناعي", competitor: "غير متوفر", apex: "ApexAI™ — بروتوكول ديناميكي" },
          { feature: "تكامل EMR/HIS", competitor: "يدوي أو غير متوفر", apex: "ApexSync™ — تلقائي عبر HL7/DICOM" },
          { feature: "الصيانة التنبؤية", competitor: "غير متوفرة، صيانة تفاعلية", apex: "ApexGuard™ — تحذير قبل العطل" },
          { feature: "التقارير التلقائية", competitor: "غير متوفرة", apex: "ApexSync™ — تقرير عند انتهاء الجلسة" },
          { feature: "التشخيص عن بُعد", competitor: "غير متوفر، يتطلب طلب خدمة", apex: "ApexCare™ — حل عن بُعد" },
          { feature: "مستوى الضجيج", competitor: "60–70 ديسيبل", apex: "ApexSilent™ — أقل من 55 ديسيبل" },
          { feature: "سجل الأمان الرقمي", competitor: "غير متوفر", apex: "ApexGuard™ — سجل سحابي مشفّر" }
        ]
      },
      roadmap: {
        eyebrow: "خارطة الطريق",
        title: "ماذا بعد؟",
        subtitle: "ميزات قيد التطوير على منصة ApexConnect™ وغير معيارية بعد في موديلات Apex الحالية.",
        badge: "قيد التطوير",
        items: [
          { icon: "mobileApp", title: "تطبيق ApexConnect للمراقبة عبر الهاتف", desc: "تطبيق مراقبة يتيح للطاقم السريري متابعة ضغط الكابينة ومستوى الأكسجين وحالة النظام من الهاتف." },
          { icon: "healthSync", title: "مزامنة تطبيقات الصحة", desc: "مزامنة مدة الجلسات وسجلها مع Apple Health و Huawei Health و Google Fit." },
          { icon: "screen", title: "تجربة شاشة غامرة مثبّتة", desc: "شاشة كبيرة مثبّتة على الكابينة تعرض محتوى بصريًا مريحًا أثناء الجلسة." }
        ],
        disclaimer: "هذه الميزات قيد التطوير ومخطط لتقديمها في موديلات مستقبلية؛ وهي غير معيارية في موديلات Apex الحالية. يتم دائمًا التحكم بضغط الكابينة ومستوى الأكسجين من قبل مشغّل مؤهّل."
      }
    },
    modelsOverview: {
      header: { eyebrow: "سلسلة APEX", title: "موديلاتنا", subtitle: "من الاستخدام الفردي إلى الغرف متعددة المقاعد بحجم المستشفيات — ستة تصاميم." },
      intro: "تشمل كل موديلات Apex بشكل معياري: ApexConnect™ و ApexOS™ و ApexAI™ و ApexSync™ و ApexGuard™. يكمن الاختلاف بينها في السعة والوضعية ونطاق الضغط.",
      compareTable: {
        title: "قارن الموديلات",
        subtitle: "قرر بسرعة أي موديل Apex هو الأنسب لك.",
        col_capacity: "السعة",
        col_position: "الوضعية",
        col_pressure: "نطاق الضغط",
        col_price: "السعر الابتدائي",
        col_noise: "مستوى الضجيج",
        action_label: "تكوين"
      }
    },
    modelShort: {
      soloLounge: { title: "Apex Solo Lounge", tagline: "شخص واحد · وضعية الاستلقاء", desc: "غرفة كاملة التجهيز طُوّرت خصيصاً للمستخدمين الذين يحتاجون للعلاج في وضعية الاستلقاء." },
      solo: { title: "Apex Solo", tagline: "شخص واحد · وضعية الجلوس", desc: "غرفة مدمجة وأنيقة وكاملة التجهيز مصممة للعلاج الفردي بالأكسجين عالي الضغط." },
      duo: { title: "Apex Duo", tagline: "شخصان · وضعية الجلوس", desc: "غرفة بمقعدين ونافذة بانورامية — للأزواج أو الشركاء أو استخدام المريض مع مرافق." },
      quad: { title: "Apex Quad", tagline: "4 أشخاص · وضعية الجلوس", desc: "غرفة متوسطة الحجم متعددة المقاعد بلوحة تحكم متكاملة، مصممة للعيادات ومراكز العافية التجارية." },
      quadCube: { title: "Apex Quad-Cube", tagline: "4 أشخاص · مقصورة واسعة", desc: "مقصورة فاخرة لأربعة أشخاص بداخلية واسعة بتصميم مكعّب — جلد مبطّن وإضاءة LED محيطية." },
      nexus: { title: "Apex Nexus", tagline: "6+ أشخاص · وضعية الجلوس", desc: "غرفة بمستوى المستشفيات وسعة كبيرة قابلة للتوسع المعياري، مصممة للمؤسسات الطبية." }
    },
    includedItems: [
      { icon: "connect", title: "ApexConnect™ مشمول", desc: "الاتصال بالإنترنت معياري. مراقبة عن بُعد وتنبيهات فورية ونسخ احتياطي سحابي." },
      { icon: "os", title: "تحديثات ApexOS™", desc: "يكتسب جهازك ميزات جديدة كل شهر. تحديثات OTA تبقي البروتوكولات محدّثة." },
      { icon: "ai", title: "تحسين ApexAI™", desc: "الذكاء الاصطناعي الذي يحلل بيانات المريض يضبط الجلسات ديناميكياً." },
      { icon: "sync", title: "تكامل ApexSync™", desc: "تكامل بنقرة واحدة مع أنظمة معلومات المستشفيات. تقارير تلقائية." },
      { icon: "guard", title: "أمان ApexGuard™", desc: "تقنية صيانة تنبؤية تحذر قبل حدوث العطل." }
    ],
    modelSoloLounge: {
      breadcrumb: "Apex Solo Lounge", eyebrow: "APEX SOLO LOUNGE", title: "Apex Solo Lounge",
      tagline: "التميّز في وضعية الاستلقاء. استلقِ، استرخِ، تعافَ.",
      overview_text: "طُوّرت خصيصاً للمستخدمين الذين يحتاجون للعلاج في وضعية الاستلقاء. يوفر سريرها الطبي التقويمي وهيكلها من الألومنيوم بمعايير الطيران أقصى درجات الراحة خلال الجلسات الطويلة.",
      specs: [
        { label: "السعة", value: "شخص واحد (وضعية الاستلقاء)" },
        { label: "نطاق الضغط", value: "1.5 – 2.5 ATA" },
        { label: "السرير", value: "طبي تقويمي، 200×80 سم" },
        { label: "المادة", value: "ألومنيوم بمعايير الطيران" },
        { label: "السلامة", value: "صمام أمان مزدوج" },
        { label: "الأبعاد الخارجية", value: "240×110×120 سم" },
        { label: "مستوى الضجيج", value: "أقل من 55 ديسيبل (ApexSilent™)" }
      ]
    },
    modelSolo: {
      breadcrumb: "Apex Solo", eyebrow: "APEX SOLO", title: "Apex Solo",
      tagline: "قمة صحتك الشخصية. أنت والأكسجين فقط.",
      overview_text: "غرفة مدمجة وأنيقة وكاملة التجهيز مصممة للعلاج الفردي بالأكسجين عالي الضغط. بفضل التحكم بشاشة اللمس، فهي مثالية للاستخدام المنزلي أو في العيادة.",
      specs: [
        { label: "السعة", value: "شخص واحد (جلوس)" },
        { label: "نطاق الضغط", value: "1.5 – 2.5 ATA" },
        { label: "التحكم", value: "شاشة لمس" },
        { label: "المادة", value: "ألومنيوم بمعايير الطيران" },
        { label: "السلامة", value: "صمام أمان مزدوج" },
        { label: "الأبعاد الخارجية", value: "120×110×180 سم" },
        { label: "مستوى الضجيج", value: "أقل من 55 ديسيبل (ApexSilent™)" }
      ]
    },
    modelDuo: {
      breadcrumb: "Apex Duo", eyebrow: "APEX DUO", title: "Apex Duo",
      tagline: "تعافيا معاً. تجربة علاج مشتركة لشخصين.",
      overview_text: "غرفة أكسجين عالي الضغط بمقعدين توفر جلسات علاج مشتركة. مصممة للأزواج أو الشركاء أو استخدام المريض مع مرافق.",
      specs: [
        { label: "السعة", value: "شخصان (جلوس)" },
        { label: "نطاق الضغط", value: "1.5 – 2.5 ATA" },
        { label: "نقاء الأكسجين", value: "93–95%" },
        { label: "السلامة", value: "نظام صمامات الطوارئ" },
        { label: "التحكم", value: "نظام تحكم مزدوج" },
        { label: "النافذة", value: "بانورامية" }
      ]
    },
    modelQuad: {
      breadcrumb: "Apex Quad", eyebrow: "APEX QUAD", title: "Apex Quad",
      tagline: "حل متوسط الحجم للعيادات ومراكز العافية.",
      overview_text: "غرفة متوسطة الحجم متعددة المقاعد بلوحة تحكم متكاملة. بُنيت للعيادات ومراكز العافية التجارية.",
      specs: [
        { label: "السعة", value: "4 أشخاص (جلوس)" },
        { label: "نطاق الضغط", value: "1.5 – 2.5 ATA" },
        { label: "نقاء الأكسجين", value: "93–95%" },
        { label: "السلامة", value: "نظام صمامات الطوارئ" },
        { label: "المراقبة", value: "مراقبة متعددة المستخدمين" },
        { label: "التحكم", value: "لوحة تحكم خارجية" }
      ]
    },
    modelQuadCube: {
      breadcrumb: "Apex Quad-Cube", eyebrow: "APEX QUAD-CUBE", title: "Apex Quad-Cube",
      tagline: "تجربة فاخرة لأربعة أشخاص في تصميم مكعّب واسع.",
      overview_text: "مقصورة فاخرة لأربعة أشخاص بداخلية واسعة بتصميم مكعّب. مع تنجيد جلدي مبطّن وإضاءة LED محيطية ووحدة تحكم مستقلة، تقدّم علاجاً مريحاً متعدد الأشخاص للعيادات ومراكز العافية.",
      specs: [
        { label: "السعة", value: "4 أشخاص (جلوس)" },
        { label: "نطاق الضغط", value: "1.5 – 2.5 ATA" },
        { label: "نقاء الأكسجين", value: "93–95%" },
        { label: "التصميم الداخلي", value: "جلد مبطّن، إضاءة LED محيطية" },
        { label: "السلامة", value: "نظام صمامات الطوارئ" },
        { label: "التحكم", value: "وحدة تحكم مستقلة" }
      ]
    },
    modelNexus: {
      breadcrumb: "Apex Nexus", eyebrow: "APEX NEXUS", title: "Apex Nexus",
      tagline: "حل بمستوى المستشفيات وسعة كبيرة.",
      overview_text: "غرفة بمستوى المستشفيات وسعة كبيرة للمؤسسات الطبية. يلبي تصميمها المعياري وأنظمة المراقبة المتقدمة احتياجات أكثر مراكز العلاج ازدحاماً.",
      specs: [
        { label: "السعة", value: "6+ أشخاص (جلوس)" },
        { label: "نطاق الضغط", value: "3.0 – 6.0 ATA" },
        { label: "نقاء الأكسجين", value: "93–95%" },
        { label: "السلامة", value: "نظام صمامات الطوارئ" },
        { label: "البنية", value: "بمستوى المستشفيات" },
        { label: "التوسع", value: "جاهزة للتوسع المعياري" }
      ]
    },
    hbotInfo: {
      header: { eyebrow: "مركز المعلومات", title: "ما هو العلاج بالأكسجين عالي الضغط؟", subtitle: "ما تحتاج إلى معرفته عن العلاج بالأكسجين عالي الضغط." },
      whatIsHboc: { title: "ما هي غرفة الأكسجين عالي الضغط (HBOC)؟", text: "غرف الأكسجين عالي الضغط هي كبائن مضغوطة مصممة خصيصاً تتيح للأفراد استنشاق الأكسجين النقي بضغط أعلى من الضغط الجوي الطبيعي. تُستخدم هذه الغرف للعلاج بالأكسجين عالي الضغط (HBOT)، وهو علاج معترف به طبياً يسرّع الشفاء ويعزز الصحة العامة." },
      whyNeeded: { title: "لماذا تُستخدم غرفة HBOC؟", text: "توفر غرف HBOC بيئة مضغوطة ومتحكم بها يستنشق فيها المرضى أكسجيناً نقياً بنسبة 94%، مما يتيح تعافياً أسرع وتجدداً خلوياً محسّناً. تخدم هذه الغرف المرافق الطبية ومراكز العافية والعيادات الرياضية والمستخدمين الأفراد حول العالم." },
      whatIsHbot: {
        title: "ما هو العلاج بالأكسجين عالي الضغط (HBOT)؟",
        text1: "HBOT هو علاج طبي يستنشق فيه المرضى الأكسجين النقي داخل غرفة مضغوطة بمستويات أعلى من الضغط الجوي الطبيعي. تسرّع هذه العملية التئام الجروح وتقلل الالتهاب وتعزز تجدد الأنسجة.",
        text2: "يتنفس المرضى داخل هذه الغرف، مما يساعد الرئتين على جمع الأكسجين وامتصاصه بكفاءة أكبر. يُستخدم HBOT أيضاً في علاج فقدان السمع والبصر المفاجئ، والتهابات العظام، وقرح القدم السكرية. وحسب نوع العلاج، يمكن للمرضى الجلوس أو الاستلقاء أثناء الإجراء."
      },
      indications: {
        title: "في أي الحالات يُستخدم العلاج بالأكسجين عالي الضغط؟",
        subtitle: "يُستخدم العلاج بالأكسجين عالي الضغط كعلاج مساند في نطاق واسع من الحالات الطبية.",
        items: [
          { icon: "antiaging", label: "تجديد شباب البشرة (مكافحة الشيخوخة)" },
          { icon: "jetlag", label: "التعافي من اضطراب الرحلات الجوية (إجهاد السفر)" },
          { icon: "wound", label: "التئام الجروح (السكرية وغير السكرية)" },
          { icon: "eye", label: "فقدان البصر المفاجئ" },
          { icon: "decompression", label: "داء الانخفاض" },
          { icon: "embolism", label: "الانصمام الهوائي أو الغازي" },
          { icon: "poisoning", label: "التسمم بأول أكسيد الكربون والوقود" },
          { icon: "ear", label: "فقدان السمع المفاجئ" },
          { icon: "bone", label: "نخر العظم" },
          { icon: "burn", label: "الحروق الحرارية" },
          { icon: "gangrene", label: "الغرغرينا الغازية" },
          { icon: "blood", label: "فقدان الدم الشديد" },
          { icon: "brain", label: "اعتلال الدماغ الناقص الأكسجين" },
          { icon: "smoke", label: "التسمم الحاد بالدخان" }
        ]
      },
      disclaimer: "هذه المعلومات لأغراض التوعية العامة فقط ولا تُغني عن الاستشارة الطبية. يجب أن يقيّم أخصائي رعاية صحية دائماً قرارات العلاج."
    },
    configurator: {
      header: { eyebrow: "أداة التكوين", title: "صمّم غرفة Apex الخاصة بك", subtitle: "اختر الموديل ومستوى الضغط والإضافات — واحصل على تقدير فوري للسعر." },
      step1_title: "2. اختر الموديل",
      style_step_title: "1. نمط الكابينة",
      style_step_note: "اختر تصميم الكابينة؛ يختلف السعر حسب مساحة الزجاج ومستوى التشطيب الداخلي.",
      color_step_title: "3. اختر اللون",
      color_step_note: "اختيار مجاني من لوحة الألوان القياسية لدينا.",
      interior_step_title: "4. لون الداخل",
      interior_step_note: "ألوان الداخل القياسية مشمولة في السعر.",
      seat_color_step_title: "5. لون المقاعد",
      seat_color_step_note: "لون تنجيد المقاعد مشمول في السعر؛ ويُضاف اختيارك إلى الملخص ونموذج طلب العرض.",
      step2_title: "6. مستوى الضغط",
      step3_title: "7. الإضافات",
      step4_title: "8. اطلب عرض سعر",
      models: [
        { id: "solo-lounge", name: "Apex Solo Lounge", tagline: "شخص واحد · وضعية الاستلقاء" },
        { id: "solo", name: "Apex Solo", tagline: "شخص واحد · وضعية الجلوس" },
        { id: "duo", name: "Apex Duo", tagline: "شخصان · وضعية الجلوس" },
        { id: "quad", name: "Apex Quad", tagline: "4 أشخاص · وضعية الجلوس" },
        { id: "quad-cube", name: "Apex Quad-Cube", tagline: "4 أشخاص · مقصورة واسعة" },
        { id: "nexus", name: "Apex Nexus", tagline: "6+ أشخاص · وضعية الجلوس" }
      ],
      colors: [
        { id: "pearl-white", name: "أبيض لؤلؤي", hex: "#F2F1EC" },
        { id: "mat-siyah", name: "أسود مطفي", hex: "#16181A" },
        { id: "antrasit", name: "أنثراسيت", hex: "#3A3D42" },
        { id: "gece-laciverti", name: "كحلي داكن", hex: "#1B2A4A" },
        { id: "bordo", name: "عنابي", hex: "#6B2737" },
        { id: "sampanya", name: "ذهبي شمبانيا", hex: "#C9A876" },
        { id: "grafit", name: "رمادي جرافيت", hex: "#3A3F44" },
        { id: "bronz", name: "برونزي", hex: "#A5754A" },
        { id: "zumrut", name: "أخضر زمردي", hex: "#1F6F54" }
      ],
      interior_colors: [
        { id: "cream", name: "كريمي", hex: "#E8DCC8" },
        { id: "anthracite", name: "أنثراسيت", hex: "#3A3D42" },
        { id: "burgundy", name: "عنابي", hex: "#6B2737" },
        { id: "navy", name: "كحلي", hex: "#1B2A4A" },
        { id: "konyak", name: "كونياك", hex: "#8A5A2B" },
        { id: "kum-beji", name: "بيج رملي", hex: "#D9C7A7" }
      ],
      seat_colors: [
        { id: "konyak", name: "كونياك", hex: "#8A5A2B" },
        { id: "siyah", name: "أسود", hex: "#16181A" },
        { id: "lacivert", name: "كحلي", hex: "#1B2A4A" },
        { id: "krem", name: "كريمي", hex: "#E8DCC8" },
        { id: "bordo", name: "عنابي", hex: "#6B2737" },
        { id: "gri", name: "رمادي", hex: "#6B6F75" }
      ],
      styles: [
        { id: "solid", icon: "solid", name: "التصميم القياسي المغلق", desc: "تصميم هيكل مغلق وبسيط، يُفضَّل للخصوصية والبساطة السريرية." },
        { id: "glass", icon: "glass", name: "السلسلة الزجاجية البانورامية", desc: "تصميم بسطح زجاجي واسع لمنح إحساسًا بالانفتاح واتصالًا بصريًا بالمحيط الخارجي." },
        { id: "premium", icon: "premium", name: "السلسلة المميزة", desc: "تشطيب داخلي فاخر، وإضاءة متطورة، وتفاصيل خاصة في أعلى مستوى تصميم لدينا.", badge: "مميز" }
      ],
      addons: [
        { id: "massage", name: "مقعد بالمساج", desc: "نظام مقعد بوظيفة تدليك مريحة أثناء الجلسات." },
        { id: "leather", name: "تنجيد جلدي فاخر", desc: "ترقية داخلية بجلد فاخر مصنوع يدوياً." },
        { id: "entertainment", name: "نظام ترفيه ووسائط متعددة", desc: "شاشة مدمجة ونظام صوت ومكتبة محتوى." },
        { id: "finish", name: "لون وتشطيب مخصص", desc: "لون تشطيب خارجي مخصص يتناسب مع هويتك المؤسسية." },
        { id: "uvc", name: "وحدة تعقيم UV-C متقدمة", desc: "تعقيم UV-C سريع وتلقائي بين الجلسات." },
        { id: "backup-o2", name: "مركّز أكسجين احتياطي", desc: "مصدر أكسجين ثانٍ لعلاج بلا انقطاع." },
        { id: "warranty", name: "ضمان ممتد (3 سنوات)", desc: "سنتان إضافيتان من التغطية الشاملة بعد الضمان القياسي." },
        { id: "install", name: "باقة تركيب وتدريب ذات أولوية", desc: "تركيب سريع وتدريب شامل للموظفين." },
        { id: "playstation", name: "جهاز ألعاب PlayStation 5", desc: "جهاز PlayStation 5 متكامل مع شاشة الكابينة ونظام الصوت للترفيه خلال الجلسات الطويلة." }
      ],
      pressure_note: "يعتمد نطاق الضغط على الموديل المختار.",
      pressure_nexus_only: "Nexus فقط",
      pressure_auto_note: "مستويا 3.0 و6.0 ATA متاحان فقط في طراز Apex Nexus — تمت إعادة مستوى الضغط إلى 2.5 ATA.",
      pressure_auto_note_up: "طراز Apex Nexus هو غرفة طبية بضغط عالٍ فقط — تم ضبط مستوى الضغط إلى 3.0 ATA.",
      seat_step_title: "عدد المقاعد",
      seat_step_note: "بالنسبة لموديل Apex Nexus، يمكنك زيادة عدد المقاعد ابتداءً من 6 حسب احتياجك.",
      seats_label: "مقعد",
      currency_label: "العملة",
      summary: {
        title: "ملخص التكوين",
        model_label: "الموديل",
        seats_label: "عدد المقاعد",
        style_label: "نمط الكابينة",
        color_label: "اللون",
        interior_color_label: "لون الداخل",
        seat_color_label: "لون المقاعد",
        seat_type_label: "نوع المقعد",
        seat_standard: "قياسي",
        seat_massage: "بالمساج",
        pressure_label: "مستوى الضغط",
        addons_label: "الإضافات",
        none_selected: "لم يتم الاختيار",
        base_price_label: "السعر الأساسي",
        total_label: "الإجمالي التقديري",
        disclaimer: "الأسعار تقريبية ولأغراض إعلامية. يرجى ملء النموذج للحصول على عرض سعر دقيق.",
        cta: "اطلب عرض سعر بهذا التكوين",
        print_button: "طباعة / حفظ كملف PDF",
        share_button: "نسخ رابط التكوين",
        share_copied: "تم نسخ الرابط!",
        discount_label: "الخصم",
        ref_badge: "تم تطبيق خصم الإحالة",
        refer_button: "أخبر صديقاً",
        refer_copied: "تم نسخ رابط الإحالة!",
        email_button: "إرسال العرض بالبريد الإلكتروني",
        pdf_title: "عرض سعر التكوين",
        pdf_quote_no: "رقم العرض",
        pdf_date: "التاريخ",
        pdf_customer_section: "معلومات العميل",
        pdf_configuration_section: "تفاصيل التكوين"
      },
      stage: {
        view_exterior: "العرض الخارجي",
        view_interior: "العرض الداخلي",
        spin_hint: "↔ اسحب للتدوير 360°"
      },
      quote_form: {
        title: "اطلب عرض سعر",
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        company: "اسم المنشأة / العيادة (اختياري)",
        message: "ملاحظات إضافية",
        submit: "إرسال طلب عرض السعر",
        sending: "جارٍ الإرسال...",
        success: "شكراً لك! تم استلام تكوينك وطلبك، وسنتواصل معك قريباً.",
        error: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة."
      }
    },
    blog: {
      header: { eyebrow: "المدونة", title: "الأبحاث والأخبار", subtitle: "أحدث التطورات العلمية والأخبار في مجال العلاج بالأكسجين عالي الضغط." },
      source_label: "المصدر:",
      min_read: "دقائق قراءة",
      disclaimer: "هذه المقالات عبارة عن ملخصات مُجمَّعة من منشورات علمية ومصادر إخبارية متاحة للعموم؛ ولا تُعد بمثابة استشارة طبية. يُرجى دائماً استشارة أخصائي رعاية صحية لاتخاذ قرارات العلاج.",
      posts: [
        {
          date: "2026",
          tag: "كلمة المؤسس",
          icon: "care",
          title: "لماذا أستخدم الأكسجين عالي الضغط بنفسي",
          paragraphs: [
            "تحت مظلة Almita Group ندير ستة قطاعات مختلفة في آن واحد، وجدول زمني مكثف مع سفر مستمر أمر لا مفر منه. قبل أن نبدأ في تصنيع كبائن HBOT Chamber Tech، اخترت استخدام كبائننا بانتظام — أؤمن بأنه يجب تجربة المنتج بنفسك قبل أن تقف وراءه.",
            "يمكنني القول إنني أشعر عادة بمزيد من النشاط والتركيز بعد الجلسات؛ هذه ملاحظة شخصية وليست وعدًا بنفس النتيجة للجميع. العلاج بالأكسجين عالي الضغط ليس بديلاً عن العلاج الطبي؛ استشر دائمًا أخصائي رعاية صحية بشأن استخدامك الخاص."
          ],
          source_name: "Almita Group — كلمة المؤسس",
          source_url: "https://almitagroup.com",
          author: "مورسيل ألكان"
        },
        {
          date: "2026",
          tag: "طول العمر",
          icon: "antiaging",
          title: "العلاج بالأكسجين عالي الضغط وطول العمر: اتجاه الشيخوخة الصحية في 2026",
          paragraphs: [
            "عزّزت حركة طول العمر — التي انتشرت على يد روّاد التكنولوجيا مثل براين جونسون وبروتوكولاتهم الشخصية لـ«عكس الشيخوخة» — الاهتمامَ بالعلاج بالأكسجين عالي الضغط أيضاً. ومن المراكز العلمية لهذا الاهتمام دراسة سريرية نُشرت عام 2020 في مجلة Aging شارك فيها 35 بالغاً سليماً فوق سن 64 عاماً في برنامج من 60 جلسة.",
            "أظهرت الدراسة زيادة في طول التيلوميرات في الخلايا المناعية بأكثر من 20% — تصل إلى 37% في الخلايا البائية — مع انخفاض يصل إلى 37% في نسبة الخلايا المناعية الهرمة. وبما أن الدراسة افتقرت إلى مجموعة ضابطة وكان حجم العينة محدوداً، تُعد النتائج «واعدة لكنها أولية»؛ ويؤكد الباحثون الحاجة إلى دراسات أوسع لتحديد البروتوكولات المثلى."
          ],
          source_name: "PMC – العلاج بالأكسجين عالي الضغط يزيد طول التيلوميرات ويقلل شيخوخة المناعة (Aging, 2020)",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7746357/"
        },
        {
          date: "2026",
          tag: "رياضة",
          icon: "healthSync",
          title: "لماذا يستخدم كبار الرياضيين الأكسجين عالي الضغط؟",
          paragraphs: [
            "ذُكر رياضيون مشهورون عالمياً مثل كريستيانو رونالدو وليبرون جيمس ونوفاك دجوكوفيتش وفلويد مايويذر في تقارير صحفية لاستخدامهم الغرف الضاغطة ضمن روتين التعافي. وخلف هذا الاهتمام تقف نتائج في الطب الرياضي تشير إلى أن العلاج بالأكسجين عالي الضغط قد يقلل الوذمة والالتهاب ويدعم إصلاح الأنسجة ويساعد الرياضيين على العودة إلى التدريب أسرع.",
            "من الدراسات المشار إليها في المراجعات: ملاحظة من أولمبياد ناغانو الشتوي حيث تعافى 7 رياضيين أسرع بجلسات قصيرة عند 1.3 ATA، وتقرير سريري مبكر عن انخفاض بنسبة 55% في الأيام الضائعة بسبب الإصابات لدى لاعبي كرة قدم محترفين، ودراسة جامعية تشير إلى عودة أسرع بنحو 30% بعد التواءات الكاحل. ويلفت المؤلفون إلى أن الأدلة تعتمد غالباً على عينات صغيرة وأن التجارب العشوائية المحكمة ضرورية لاستخلاص نتائج قاطعة."
          ],
          source_name: "PMC – دور العلاج بالأكسجين عالي الضغط في الطب الرياضي (مراجعة)",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3382683/"
        },
        {
          date: "2026",
          tag: "دليل",
          icon: "oneSeat",
          title: "دليل اختيار غرفة الضغط العالي المنزلية",
          paragraphs: [
            "السؤال الأول عند اختيار غرفة ضغط عالٍ للاستخدام المنزلي أو الخاص هو السعة: فالغرف الأحادية (monoplace) توفر حجماً مدمجاً، بينما تتيح الغرف المتعددة (multiplace) جلسات لأفراد العائلة أو المجموعات الصغيرة في الوقت نفسه وتسهّل الاستخدام بوجود مرافق. وتشترط الجمعية الدولية للطب تحت المائي وفائق الضغط (UHMS) أن تكون الغرف الضاغطة معدات معتمدة تخضع لفحوص دورية، وأن يكون المشغّلون مدربين تدريباً خاصاً.",
            "مستوى الضغط هو المحور الثاني: تُطبَّق البروتوكولات السريرية عادةً في نطاق 2.0–2.4 ATA، بينما يشيع نطاق 1.3–2.0 ATA في الأنظمة المنزلية؛ راجعوا المستوى المناسب لهدفكم مع مختص صحي. أما المحور الثالث فهو السلامة والراحة: قواعد الوقاية من الحرائق في بيئة الأكسجين، والتخفيف الطارئ للضغط، ومستوى الضجيج، والإضاءة الداخلية، ونظام الاتصال — كلها تؤثر مباشرة في التجربة اليومية؛ وأكّدوا شروط الصيانة والضمان خطياً قبل الشراء."
          ],
          source_name: "StatPearls (NCBI) – العلاج بالأكسجين عالي الضغط",
          source_url: "https://www.ncbi.nlm.nih.gov/books/NBK459172/"
        },
        {
          date: "2026",
          tag: "بحث",
          icon: "wound",
          title: "دور الأكسجين عالي الضغط في علاج الجروح المزمنة يتعزز",
          paragraphs: [
            "تُظهر المراجعات الحديثة في مجال الجراحة ورعاية الجروح المزمنة أن العلاج بالأكسجين عالي الضغط (HBOT) يدعم عملية الشفاء من خلال زيادة أكسجة الأنسجة. ويُشار إلى أنه في حالات جروح القدم السكرية والقرح الوريدية في الساق والحروق وتلف الأنسجة الناتج عن الإشعاع، يُحسّن العلاج بالأكسجين عالي الضغط معدلات التئام الجروح ويقلل من خطر العدوى.",
            "أظهرت دراسة نُشرت عام 2025 أن العلاج بالأكسجين عالي الضغط إلى جانب العلاج بالضغط السلبي للجروح (NPWT) يزيد بشكل ملحوظ من سرعة الشفاء مقارنةً بـ NPWT وحده. وفي الجراحة الترميمية، يُذكر أن العلاج بالأكسجين عالي الضغط يدعم بقاء الأنسجة والطعوم ويحفّز تكوّن أوعية دموية جديدة."
          ],
          source_name: "PMC – Hyperbaric Oxygen Therapy in Surgical Wound Healing and Tissue Salvage",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13109970/"
        },
        {
          date: "2026",
          tag: "صحة رياضية",
          icon: "burn",
          title: "لماذا يتجه الرياضيون إلى الغرف عالية الضغط؟",
          paragraphs: [
            "يختار كثير من الرياضيين النخبة في التنس والسباحة وكرة السلة والغولف العلاج بالأكسجين عالي الضغط كجزء من روتين التعافي. وتُظهر الأبحاث في مجال الطب الرياضي أن هذا العلاج قد يُسرّع الشفاء ويقلل الالتهاب ويساعد الرياضيين على العودة إلى التدريب في وقت أقصر.",
            "أفادت بعض الدراسات بانخفاض مستويات ألم العضلات والإرهاق لدى الرياضيين الذين خضعوا لهذا العلاج، مع تقصير أوقات التعافي بنسبة تصل إلى نحو 30%. ورغم أن المجال لا يزال بحاجة إلى دراسات سريرية أكبر وأكثر ضبطاً، فإن النتائج مُبشّرة لصحة الرياضيين."
          ],
          source_name: "Turkish Journal of Sports Medicine",
          source_url: "https://journalofsportsmedicine.org/full-text/746/eng"
        },
        {
          date: "2026",
          tag: "دليل سريري",
          icon: "wound",
          title: "تحليل تلوي لقرح القدم السكرية: انخفاض خطر البتر",
          paragraphs: [
            "أظهر تحليل تلوي لـ 14 دراسة شملت 768 مشاركاً أن العلاج بالأكسجين عالي الضغط يوفر فائدة ذات دلالة إحصائية في الشفاء التام لقرح القدم السكرية وفي تقليل خطر البتر الكبير.",
            "توصلت مراجعة منهجية حديثة نُشرت عام 2024 إلى نتائج مماثلة: لوحظ في غالبية الدراسات المُستعرَضة انخفاض في معدلات البتر الكبير وزيادة في معدلات التئام الجروح وتقلّص في حجم القرحة وعمقها مع العلاج بالأكسجين عالي الضغط."
          ],
          source_name: "PMC – Efficacy of HBOT for Diabetic Foot Ulcer",
          source_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7838311/"
        },
        {
          date: "2026",
          tag: "دليل سريري",
          icon: "ear",
          title: "الأكسجين عالي الضغط لفقدان السمع المفاجئ: أهمية التدخل المبكر",
          paragraphs: [
            "لدى المرضى المصابين بفقدان سمع حسي عصبي مفاجئ، يهدف العلاج بالأكسجين عالي الضغط إلى تحسين الدورة الدموية الدقيقة وتقليل الالتهاب من خلال زيادة ضغط الأكسجين في الأذن الداخلية. وتُظهر الدراسات أن المرضى الذين يبدأون العلاج مبكراً، خصوصاً بالتزامن مع العلاج بالكورتيكوستيرويد، يميلون إلى تحقيق نتائج أفضل.",
            "ورغم أن نتائج الأبحاث لا تُقدّم إجماعاً كاملاً حول الفعالية، فقد لاحظت بعض الدراسات تحسناً في السمع لدى أكثر من نصف المرضى. ويؤكد الخبراء على الحاجة إلى مزيد من الدراسات السريرية لوضع بروتوكولات موحّدة للضغط والمدة."
          ],
          source_name: "JAMA Otolaryngology–Head & Neck Surgery",
          source_url: "https://jamanetwork.com/journals/jamaotolaryngology/fullarticle/2785483"
        },
        {
          date: "2026",
          tag: "تقنية",
          icon: "connect",
          title: "عصر الأجهزة الطبية المتصلة: المراقبة عن بُعد تنمو بسرعة",
          paragraphs: [
            "بحلول عام 2026، يُقدَّر أن سوق إنترنت الأشياء في الرعاية الصحية عالمياً قد تجاوز 86 مليار دولار. ومع تسارع التحول من الرعاية المرتكزة على المستشفى إلى الرعاية المنزلية، تُشغّل أكثر من 350 مستشفى في الولايات المتحدة الآن برامج «مستشفى في المنزل» المدعومة بإنترنت الأشياء.",
            "تُظهر الأبحاث أن أنظمة المراقبة عن بُعد للمرضى القائمة على إنترنت الأشياء يمكن أن تقلل معدلات إعادة دخول المستشفى بنسبة تصل إلى 50%. ومنصة ApexConnect™ من HBOT Chamber Tech هي جزء تماماً من هذا التوجه العالمي: إذ تربط الغرف بالسحابة لتوفير مراقبة فورية وصيانة استباقية."
          ],
          source_name: "IoT Business News",
          source_url: "https://iotbusinessnews.com/2026/04/14/connected-healthcare-iot-remote-monitoring-medical-devices-and-data-challenges/"
        },
        {
          date: "2026",
          tag: "سريري",
          icon: "guard",
          title: "إدارة الضغط في الغرف متعددة الأشخاص: بروتوكولات التشغيل السريرية",
          paragraphs: [
            "تُعد غرف الضغط العالي متعددة الأشخاص الخيار القياسي للمستشفيات والعيادات، لأنها تتيح علاج عدة مرضى في وقت واحد ومرافقة الطاقم الطبي داخل الغرفة. وتوصي أدلة التشغيل الصادرة عن UHMS، المرجع الدولي في طب الضغط العالي، بضبط معدلات زيادة الضغط وخفضه وفقاً لراحة المريض وخطر إصابة الأذن بالباروتروما، وإجراء كل جلسة تحت إشراف مشغّل معتمد، والتدرب على سيناريوهات الإخلاء الطارئ بانتظام.",
            "في الممارسة السريرية يُحدَّد بروتوكول الضغط وفقاً لدواعي العلاج: تُطبَّق البروتوكولات الشائعة في نطاق 2.0–2.4 ATA، بينما قد تتطلب بعض الدواعي الخاصة ضغوطاً أعلى. ويؤكد الخبراء أن مستوى الضغط المناسب يجب أن يقيّمه دائماً طبيب متخصص في طب الضغط العالي، وأن يكون جهاز الغرفة معتمداً لتغطية النطاق المستهدف بأمان."
          ],
          source_name: "UHMS – Undersea & Hyperbaric Medical Society",
          source_url: "https://www.uhms.org"
        },
        {
          date: "2026",
          tag: "رياضة",
          icon: "healthSync",
          title: "التحضير للموسم في الأندية الرياضية: برامج الدعم بالضغط العالي",
          paragraphs: [
            "تتجه فرق الأداء والطواقم الطبية في الأندية الرياضية المحترفة بشكل متزايد إلى تطبيقات الأكسجين عالي الضغط لدعم التعافي خلال فترات المباريات والتدريبات المكثفة. وتشير المراجعات في أدبيات الطب الرياضي إلى أن العلاج بالأكسجين عالي الضغط قد يساعد في تقليل الوذمة والالتهاب بعد إصابات الأنسجة الرخوة، ويحمل إمكانية تقصير مدة عودة الرياضي إلى التدريب.",
            "وفي بيئة الأندية، يتصدر التخطيط قائمة الأولويات: يُنصح بدمج الجلسات في جدول التدريبات والمباريات، وتقييمها مع متابعة الأحمال الفردية للاعبين، وتنفيذها تحت إشراف طبيب النادي. ويلاحظ الباحثون أيضاً أن جزءاً كبيراً من الأدلة الحالية يستند إلى دراسات صغيرة العينات، وأن ثمة حاجة إلى تجارب مضبوطة أكبر لتحديد بروتوكولات قياسية."
          ],
          source_name: "Frontiers in Physiology – Sport and Exercise",
          source_url: "https://www.frontiersin.org/journals/physiology"
        },
        {
          date: "2026",
          tag: "العافية",
          icon: "premium",
          title: "اتجاه جديد في الفنادق الفاخرة: أجنحة العافية بالضغط العالي",
          paragraphs: [
            "تُظهر تقارير القطاع حول اقتصاد العافية العالمي أن سياحة العافية من أسرع القطاعات نمواً. وانعكاساً لهذا التوجه، تتجاوز الفنادق والمنتجعات الفاخرة عروض السبا واللياقة، لتضيف إلى تجربة الضيوف تقنيات تعافٍ متقدمة مثل غرف الأكسجين عالي الضغط والعلاج بالتبريد والعلاج بالضوء الأحمر.",
            "ويلاحظ مراقبو القطاع أن وحدات الضغط العالي تبرز خاصة ضمن الباقات المميزة بطابع «طول العمر» و«الأداء». أما بالنسبة لمشغّلي الفنادق، فالنقاط الحرجة هي الامتثال لمعايير السلامة، وتوظيف طاقم مدرب، وبناء عملية تقييم صحي سليمة قبل الاستخدام؛ ويُشدَّد على أن تطبيقات الضيوف يجب أن تُقدَّم بوصفها دعماً عاماً للعافية وليس علاجاً طبياً."
          ],
          source_name: "Global Wellness Institute",
          source_url: "https://globalwellnessinstitute.org"
        },
        {
          date: "2026",
          tag: "السلامة",
          icon: "care",
          title: "3.0 ATA فما فوق: معايير سلامة غرف الضغط العالي بالمستوى الطبي",
          paragraphs: [
            "تُعد مستويات الضغط 3.0 ATA فما فوق مجالاً لا يطبقه طب الضغط العالي إلا في بيئات سريرية خاضعة لتنظيم صارم. فيجب أن تُصنَّع الغرف العاملة عند هذه المستويات وفقاً للوائح أوعية الضغط، وأن تستوفي أحكام الضغط العالي في المعايير الدولية للسلامة من الحرائق مثل NFPA 99، وأن تخضع لفحص دوري منتظم. ويُعد إدارة خطر الحريق في بيئة غنية بالأكسجين أهم موضوع تصميمي في هذه الفئة من الأنظمة.",
            "أما الحلقات الأخرى في سلسلة السلامة فهي العوامل البشرية: مشغّل معتمد للضغط العالي، وتقييم المريض قبل الجلسة، وخطة إخلاء طارئة، وإشراف طبي. وتوصي الهيئات المهنية بأن تُقدَّم علاجات فئة الضغط العالي فقط في مؤسسات تملك هذه البنية التحتية، وتنصح الجهات المشترية بمطالبة المصنّع كتابياً بشهادات الضغط وتقارير الاختبار وبرامج التدريب."
          ],
          source_name: "NFPA – National Fire Protection Association",
          source_url: "https://www.nfpa.org"
        }
      ]
    },
    contact: {
      header: { eyebrow: "اتصل بنا", title: "تواصل معنا", subtitle: "املأ النموذج لأسئلتك وطلبات عروض الأسعار." },
      address_label: "العنوان",
      address_value: "Postane Mh. Rauf Orbay Cd. Kemal Sunal Sk. No: 29, طوزلا / إسطنبول، تركيا",
      phone_label: "الهاتف",
      phone_value: "0850 888 1679",
      email_label: "البريد الإلكتروني",
      email_value: "info@hbotchambertech.com",
      hours_label: "ساعات العمل",
      hours_value: "الاثنين – الجمعة، 09:00 – 18:00",
      form_title: "أرسل رسالة",
      form_name: "الاسم الكامل",
      form_email: "البريد الإلكتروني",
      form_message: "رسالتك",
      form_submit: "إرسال",
      form_sending: "جارٍ الإرسال...",
      form_success: "شكراً لك! تم استلام رسالتك وسنتواصل معك قريباً.",
      form_error: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
      map_note: "طوزلا، إسطنبول",
      faq: {
        eyebrow: "الأسئلة الشائعة",
        title: "الأسئلة الأكثر شيوعًا",
        subtitle: "الأسئلة التي يطرحها عملاؤنا غالبًا حول الطلب والدفع والتركيب.",
        items: [
          { q: "ما هي شروط الدفع؟", a: "وفق شروطنا القياسية، يتم دفع 50% كدفعة أولى عند تأكيد الطلب، ويُستحق الـ 50% المتبقية عندما تصبح الوحدة جاهزة للتسليم." },
          { q: "هل تقدمون خيارات دفع أخرى؟", a: "نعم. بالإضافة إلى شرط 50% دفعة أولى / 50% عند التسليم، نقدم أيضًا: الدفع بالتقسيط عبر بطاقة ائتمان الشركات (متاح أيضًا للطلبات الدولية)، والتأجير التمويلي (leasing) بدفعة أولى محددة، وخطة دفع على 3 مراحل للطلبات الكبيرة (تأكيد الطلب / اكتمال الإنتاج / التسليم). يرجى التواصل معنا لتحديد الخيار الأنسب لكم." },
          { q: "متى تصبح الوحدة جاهزة بعد الطلب؟", a: "اعتبارًا من تأكيد الطلب، تصبح وحدتكم جاهزة للتسليم خلال 6 أسابيع كحد أدنى. لا يشمل هذا الوقت مدة الشحن/اللوجستيات، والتي تُحسب بشكل منفصل حسب موقعكم." },
          { q: "هل التركيب والشحن مشمولان في السعر؟", a: "لا. تختلف تكاليف التركيب واللوجستيات حسب الموقع وإمكانية الوصول إلى المبنى والمسافة. نقوم بإعداد عرض سعر خاص بالتركيب واللوجستيات لكم — يرجى التواصل معنا عبر نموذج الاتصال." },
          { q: "ماذا يشمل السعر؟", a: "تشمل كل موديلات Apex بشكل معياري منصة التقنية ApexConnect™ و ApexOS™ و ApexAI™ و ApexSync™ و ApexGuard™. يتم تسعير الإضافات واختيارات نمط الكابينة بشكل منفصل في أداة التكوين." },
          { q: "كيف يمكنني الحصول على عرض سعر؟", a: "استخدم أداة التكوين لاختيار الموديل ونمط الكابينة واللون والإضافات للحصول على تقدير فوري للسعر، ثم أرسل نموذج طلب العرض لنتواصل معك." },
          { q: "هل يمكنني تخصيص لون ونمط الكابينة؟", a: "نعم. يمكنك الاختيار مجانًا من بين 12 خيار لون، بالإضافة إلى اختيار نمط الكابينة: القياسي المغلق، أو الزجاجي البانورامي، أو المميز." }
        ]
      }
    }
  }
};
