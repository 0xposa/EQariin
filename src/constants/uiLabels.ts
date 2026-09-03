export type AppLanguage =
  | 'Arabic'
  | 'Bahasa Indonesia'
  | 'English'
  | 'Mandarin'
  | 'Spanish'
  | 'Japanese'
  | 'Turkish'
  | 'French'
  | 'Malay';

export interface UILabels {
  // Quran preview card labels
  surahPrefix: string;
  surahSuffix: string;
  ayatLabel: string;
  makkiyah: string;
  madaniyah: string;
  surahHeader: string;

  // Header & Chrome UI labels
  languagesAvailableBadge: string;
  aboutUsButton: string;
  downloadLanguagesButton: string;
  appLanguageLabel: string;
  selectAppLanguageHeader: string;

  // Breadcrumb & Viewer Controls
  languagesBreadcrumb: string;
  codeToggle: string;
  previewToggle: string;
  charactersLabel: string;
  linesLabel: string;
  noFileSelected: string;
  statusConnected: string;

  // About Us panel strings
  aboutTitle: string;
  founderTitle: string;
  followX: string;
  joinDiscord: string;
  contactWA: string;
  investorRelations: string;
  supportVision: string;

  // Ayat Card Modal & Verse Action Labels
  ayatCardBtn: string;
  ayatCardModalTitle: string;
  pnlEdition: string;
  cardThemeHeader: string;
  cardFormatHeader: string;
  contentSettingsHeader: string;
  showArabicToggle: string;
  showTranslationToggle: string;
  showMeaningToggle: string;
  showWatermarkToggle: string;
  arabicFontSizeHeader: string;
  fontNormal: string;
  fontLarge: string;
  fontXLarge: string;
  downloadImageBtn: string;
  downloading: string;
  copyImageBtn: string;
  copiedImage: string;
  copyLinkBtn: string;
  copiedLink: string;
  shareTo: string;
  surahMeaningLabel: string;
  prevVerse: string;
  nextVerse: string;
  closeBtn: string;
  copyTextBtn: string;
  copiedText: string;
  shareVerseBtn: string;
  downloadSuccessToast: string;
  copyImageSuccessToast: string;
  copyLinkSuccessToast: string;
  copyTextSuccessToast: string;
}

export const APP_LANGUAGES: AppLanguage[] = [
  'Arabic',
  'Bahasa Indonesia',
  'English',
  'Mandarin',
  'Spanish',
  'Japanese',
  'Turkish',
  'French',
  'Malay',
];

export const UI_LABELS: Record<AppLanguage, UILabels> = {
  'Bahasa Indonesia': {
    surahPrefix: 'Surah ke-',
    surahSuffix: '',
    ayatLabel: 'Ayat',
    makkiyah: 'Makkiyah',
    madaniyah: 'Madaniyah',
    surahHeader: 'Surah #',

    languagesAvailableBadge: 'Bahasa Tersedia',
    aboutUsButton: 'Tentang Kami',
    downloadLanguagesButton: 'Unduh Folder',
    appLanguageLabel: 'Bahasa Aplikasi',
    selectAppLanguageHeader: 'Pilih Bahasa Aplikasi',

    languagesBreadcrumb: 'bahasa',
    codeToggle: 'Kode',
    previewToggle: 'Pratinjau',
    charactersLabel: 'karakter',
    linesLabel: 'baris',
    noFileSelected: 'Pilih file JSON dari dropdown di atas untuk melihat isinya.',
    statusConnected: 'Terhubung ke Sistem File Proyek',

    aboutTitle: 'Tentang Kami',
    founderTitle: 'Pendiri',
    followX: 'Ikuti di Twitter / X',
    joinDiscord: 'Join Discord',
    contactWA: 'Hubungi via WhatsApp',
    investorRelations: 'Hubungan Investor',
    supportVision: 'Dukung Visi Kami / Investasi',

    ayatCardBtn: 'Ayat Card (PnL)',
    ayatCardModalTitle: 'Ayat Card Generator',
    pnlEdition: 'PNL EDITION',
    cardThemeHeader: 'Pilih Tema Card (Gaya PnL)',
    cardFormatHeader: 'Format / Ukuran Card',
    contentSettingsHeader: 'Pengaturan Konten',
    showArabicToggle: 'Tampilkan Teks Arab',
    showTranslationToggle: 'Tampilkan Terjemahan',
    showMeaningToggle: 'Tampilkan Arti Surah & Meta',
    showWatermarkToggle: 'Watermark & Header QS',
    arabicFontSizeHeader: 'Ukuran Font Arab',
    fontNormal: 'Normal',
    fontLarge: 'Besar',
    fontXLarge: 'Sangat Besar',
    downloadImageBtn: 'Download Image (PNG)',
    downloading: 'Memproses Gambar...',
    copyImageBtn: 'Copy Image',
    copiedImage: 'Disalin!',
    copyLinkBtn: 'Copy Link',
    copiedLink: 'Tautan Disalin!',
    shareTo: 'Share ke:',
    surahMeaningLabel: 'Arti Surah',
    prevVerse: 'Ayat Sebelumnya',
    nextVerse: 'Ayat Selanjutnya',
    closeBtn: 'Tutup',
    copyTextBtn: 'Salin Teks',
    copiedText: 'Disalin',
    shareVerseBtn: 'Bagikan',
    downloadSuccessToast: 'Ayat Card berhasil diunduh!',
    copyImageSuccessToast: 'Gambar Ayat Card berhasil disalin!',
    copyLinkSuccessToast: 'Tautan ayat berhasil disalin!',
    copyTextSuccessToast: 'Teks ayat berhasil disalin!',
  },

  English: {
    surahPrefix: 'Surah ',
    surahSuffix: '',
    ayatLabel: 'Ayat',
    makkiyah: 'Meccan',
    madaniyah: 'Medinan',
    surahHeader: 'Surah #',

    languagesAvailableBadge: 'Languages Available',
    aboutUsButton: 'About Us',
    downloadLanguagesButton: 'Download Folder',
    appLanguageLabel: 'App Language',
    selectAppLanguageHeader: 'Select App Language',

    languagesBreadcrumb: 'languages',
    codeToggle: 'Code',
    previewToggle: 'Preview',
    charactersLabel: 'characters',
    linesLabel: 'lines',
    noFileSelected: 'Select a JSON file from the dropdowns above to view its content.',
    statusConnected: 'Connected to Project File System',

    aboutTitle: 'About Us',
    founderTitle: 'Founder',
    followX: 'Follow on Twitter / X',
    joinDiscord: 'Join Discord',
    contactWA: 'Contact via WhatsApp',
    investorRelations: 'Investor Relations',
    supportVision: 'Support Our Vision / Invest',

    ayatCardBtn: 'Ayat Card (PnL)',
    ayatCardModalTitle: 'Ayat Card Generator',
    pnlEdition: 'PNL EDITION',
    cardThemeHeader: 'Choose Card Theme (PnL Style)',
    cardFormatHeader: 'Card Format / Ratio',
    contentSettingsHeader: 'Content Settings',
    showArabicToggle: 'Show Arabic Text',
    showTranslationToggle: 'Show Translation',
    showMeaningToggle: 'Show Surah Meaning & Info',
    showWatermarkToggle: 'Watermark & QS Tag',
    arabicFontSizeHeader: 'Arabic Font Size',
    fontNormal: 'Normal',
    fontLarge: 'Large',
    fontXLarge: 'Extra Large',
    downloadImageBtn: 'Download Image (PNG)',
    downloading: 'Generating Image...',
    copyImageBtn: 'Copy Image',
    copiedImage: 'Copied!',
    copyLinkBtn: 'Copy Link',
    copiedLink: 'Link Copied!',
    shareTo: 'Share to:',
    surahMeaningLabel: 'Surah Meaning',
    prevVerse: 'Previous Ayat',
    nextVerse: 'Next Ayat',
    closeBtn: 'Close',
    copyTextBtn: 'Copy Text',
    copiedText: 'Copied',
    shareVerseBtn: 'Share',
    downloadSuccessToast: 'Ayat Card downloaded successfully!',
    copyImageSuccessToast: 'Ayat Card image copied to clipboard!',
    copyLinkSuccessToast: 'Ayat link copied to clipboard!',
    copyTextSuccessToast: 'Ayat text copied to clipboard!',
  },

  Arabic: {
    surahPrefix: 'سورة رقم ',
    surahSuffix: '',
    ayatLabel: 'Ayat',
    makkiyah: 'مكية',
    madaniyah: 'مدنية',
    surahHeader: 'سورة #',

    languagesAvailableBadge: 'لغات متاحة',
    aboutUsButton: 'عن التطبيق',
    downloadLanguagesButton: 'تنزيل المجلد',
    appLanguageLabel: 'لغة التطبيق',
    selectAppLanguageHeader: 'اختر لغة التطبيق',

    languagesBreadcrumb: 'اللغات',
    codeToggle: 'كود',
    previewToggle: 'معاينة',
    charactersLabel: 'حرف',
    linesLabel: 'سطر',
    noFileSelected: 'حدد ملف JSON من القائمة المنسدلة أعلاه لعرض محتواه.',
    statusConnected: 'متصل بنظام ملفات المشروع',

    aboutTitle: 'عن التطبيق',
    founderTitle: 'المؤسس',
    followX: 'متابعة على Twitter / X',
    joinDiscord: 'انضم إلى ديسكورد',
    contactWA: 'التواصل عبر WhatsApp',
    investorRelations: 'علاقات المستثمرين',
    supportVision: 'دعم رؤيتنا / الاستثمار',

    ayatCardBtn: 'بطاقة Ayat (PnL)',
    ayatCardModalTitle: 'مولد بطاقة الآيات',
    pnlEdition: 'إصدار PNL',
    cardThemeHeader: 'اختر مظهر البطاقة (نمط PnL)',
    cardFormatHeader: 'تنسيق / حجم البطاقة',
    contentSettingsHeader: 'إعدادات المحتوى',
    showArabicToggle: 'عرض النص العربي',
    showTranslationToggle: 'عرض الترجمة',
    showMeaningToggle: 'عرض معنى السورة والبيانات',
    showWatermarkToggle: 'العلامة المائية وترويسة السورة',
    arabicFontSizeHeader: 'حجم الخط العربي',
    fontNormal: 'عادي',
    fontLarge: 'كبير',
    fontXLarge: 'كبير جداً',
    downloadImageBtn: 'تنزيل الصورة (PNG)',
    downloading: 'جاري إنشاء الصورة...',
    copyImageBtn: 'نسخ الصورة',
    copiedImage: 'تم النسخ!',
    copyLinkBtn: 'نسخ الرابط',
    copiedLink: 'تم نسخ الرابط!',
    shareTo: 'مشاركة إلى:',
    surahMeaningLabel: 'معنى السورة',
    prevVerse: 'Ayat السابقة',
    nextVerse: 'Ayat التالية',
    closeBtn: 'إغلاق',
    copyTextBtn: 'نسخ النص',
    copiedText: 'تم النسخ',
    shareVerseBtn: 'مشاركة',
    downloadSuccessToast: 'تم تنزيل بطاقة Ayat بنجاح!',
    copyImageSuccessToast: 'تم نسخ صورة البطاقة إلى الحافظة!',
    copyLinkSuccessToast: 'تم نسخ رابط Ayat بنجاح!',
    copyTextSuccessToast: 'تم نسخ نص Ayat بنجاح!',
  },

  Mandarin: {
    surahPrefix: '第',
    surahSuffix: '章',
    ayatLabel: 'Ayat',
    makkiyah: '麦加',
    madaniyah: '麦地那',
    surahHeader: '第#章',

    languagesAvailableBadge: '种可用语言',
    aboutUsButton: '关于我们',
    downloadLanguagesButton: '下载文件夹',
    appLanguageLabel: '应用语言',
    selectAppLanguageHeader: '选择应用语言',

    languagesBreadcrumb: '语言',
    codeToggle: '代码',
    previewToggle: '预览',
    charactersLabel: '字符',
    linesLabel: '行',
    noFileSelected: '请从上方下拉菜单中选择一个 JSON 文件以查看内容。',
    statusConnected: '已连接至项目文件系统',

    aboutTitle: '关于我们',
    founderTitle: '创始人',
    followX: '关注 Twitter / X',
    joinDiscord: '加入 Discord',
    contactWA: '通过 WhatsApp 联系',
    investorRelations: '投资者关系',
    supportVision: '支持我们的愿景 / 投资',

    ayatCardBtn: 'Ayat 卡片 (PnL)',
    ayatCardModalTitle: '古兰经 Ayat 卡片生成器',
    pnlEdition: 'PNL 版本',
    cardThemeHeader: '选择卡片主题 (PnL 风格)',
    cardFormatHeader: '卡片比例与格式',
    contentSettingsHeader: '内容显示设置',
    showArabicToggle: '显示阿拉伯语原文',
    showTranslationToggle: '显示译文',
    showMeaningToggle: '显示章名含义及详情',
    showWatermarkToggle: '水印与古兰经标记',
    arabicFontSizeHeader: '阿语字体大小',
    fontNormal: '标准',
    fontLarge: '较大',
    fontXLarge: '特大',
    downloadImageBtn: '下载图片 (PNG)',
    downloading: '正在生成图片...',
    copyImageBtn: '复制图片',
    copiedImage: '已复制!',
    copyLinkBtn: '复制链接',
    copiedLink: '链接已复制!',
    shareTo: '分享至:',
    surahMeaningLabel: '章名含义',
    prevVerse: '上一 Ayat',
    nextVerse: '下一 Ayat',
    closeBtn: '关闭',
    copyTextBtn: '复制文本',
    copiedText: '已复制',
    shareVerseBtn: '分享',
    downloadSuccessToast: 'Ayat 卡片下载成功！',
    copyImageSuccessToast: '卡片图片已复制到剪贴板！',
    copyLinkSuccessToast: 'Ayat 链接已复制！',
    copyTextSuccessToast: 'Ayat 文本已复制！',
  },

  Spanish: {
    surahPrefix: 'Sura ',
    surahSuffix: '',
    ayatLabel: 'Ayat',
    makkiyah: 'Mequina',
    madaniyah: 'Medinesa',
    surahHeader: 'Sura #',

    languagesAvailableBadge: 'Idiomas disponibles',
    aboutUsButton: 'Sobre nosotros',
    downloadLanguagesButton: 'Descargar carpeta',
    appLanguageLabel: 'Idioma de la app',
    selectAppLanguageHeader: 'Seleccionar idioma de la app',

    languagesBreadcrumb: 'idiomas',
    codeToggle: 'Código',
    previewToggle: 'Vista previa',
    charactersLabel: 'caracteres',
    linesLabel: 'líneas',
    noFileSelected: 'Seleccione un archivo JSON de los desplegables anteriores para ver su contenido.',
    statusConnected: 'Conectado al sistema de archivos del proyecto',

    aboutTitle: 'Sobre nosotros',
    founderTitle: 'Fundador',
    followX: 'Seguir en Twitter / X',
    joinDiscord: 'Únete a Discord',
    contactWA: 'Contactar por WhatsApp',
    investorRelations: 'Relaciones con inversores',
    supportVision: 'Apoyar nuestra visión / Invertir',

    ayatCardBtn: 'Tarjeta de Ayat (PnL)',
    ayatCardModalTitle: 'Generador de Tarjetas de Ayat',
    pnlEdition: 'EDICIÓN PNL',
    cardThemeHeader: 'Elegir tema de tarjeta (Estilo PnL)',
    cardFormatHeader: 'Formato / Proporción',
    contentSettingsHeader: 'Ajustes de contenido',
    showArabicToggle: 'Mostrar texto en árabe',
    showTranslationToggle: 'Mostrar traducción',
    showMeaningToggle: 'Mostrar significado e info',
    showWatermarkToggle: 'Marca de agua y etiqueta QS',
    arabicFontSizeHeader: 'Tamaño de fuente árabe',
    fontNormal: 'Normal',
    fontLarge: 'Grande',
    fontXLarge: 'Muy grande',
    downloadImageBtn: 'Descargar Imagen (PNG)',
    downloading: 'Generando imagen...',
    copyImageBtn: 'Copiar imagen',
    copiedImage: '¡Copiado!',
    copyLinkBtn: 'Copiar enlace',
    copiedLink: '¡Enlace copiado!',
    shareTo: 'Compartir en:',
    surahMeaningLabel: 'Significado de la Sura',
    prevVerse: 'Ayat anterior',
    nextVerse: 'Ayat siguiente',
    closeBtn: 'Cerrar',
    copyTextBtn: 'Copiar texto',
    copiedText: 'Copiado',
    shareVerseBtn: 'Compartir',
    downloadSuccessToast: '¡Tarjeta de Ayat descargada con éxito!',
    copyImageSuccessToast: '¡Imagen copiada al portapapeles!',
    copyLinkSuccessToast: '¡Enlace del Ayat copiado!',
    copyTextSuccessToast: '¡Texto del Ayat copiado!',
  },

  Japanese: {
    surahPrefix: '第',
    surahSuffix: '章',
    ayatLabel: 'Ayat',
    makkiyah: 'マッカ啓示',
    madaniyah: 'マディーナ啓示',
    surahHeader: '第#章',

    languagesAvailableBadge: '言語利用可能',
    aboutUsButton: '私たちについて',
    downloadLanguagesButton: 'フォルダ保存',
    appLanguageLabel: 'アプリの言語',
    selectAppLanguageHeader: 'アプリの言語を選択',

    languagesBreadcrumb: '言語',
    codeToggle: 'コード',
    previewToggle: 'プレビュー',
    charactersLabel: '文字',
    linesLabel: '行',
    noFileSelected: '上のドロップダウンからJSONファイルを選択して内容を表示します。',
    statusConnected: 'プロジェクトファイルシステムに接続中',

    aboutTitle: '私たちについて',
    founderTitle: '創業者',
    followX: 'Twitter / X をフォロー',
    joinDiscord: 'Discordに参加する',
    contactWA: 'WhatsApp で問い合わせ',
    investorRelations: '投資家情報',
    supportVision: 'ビジョンを支援 / 投資',

    ayatCardBtn: 'Ayat カード (PnL)',
    ayatCardModalTitle: 'クルアーン Ayat カード作成',
    pnlEdition: 'PNL EDITION',
    cardThemeHeader: 'カードテーマを選択 (PnL風)',
    cardFormatHeader: 'カードの比率・サイズ',
    contentSettingsHeader: 'コンテンツ表示設定',
    showArabicToggle: 'アラビア語本文を表示',
    showTranslationToggle: '翻訳文を表示',
    showMeaningToggle: '章の意味・情報を表示',
    showWatermarkToggle: 'ウォーターマークと章タグ',
    arabicFontSizeHeader: 'アラビア語フォントサイズ',
    fontNormal: '標準',
    fontLarge: '大',
    fontXLarge: '特大',
    downloadImageBtn: '画像を保存 (PNG)',
    downloading: '画像を生成中...',
    copyImageBtn: '画像をコピー',
    copiedImage: 'コピー完了!',
    copyLinkBtn: 'リンクをコピー',
    copiedLink: 'リンクをコピーしました!',
    shareTo: '共有先:',
    surahMeaningLabel: '章の意味',
    prevVerse: '前の Ayat',
    nextVerse: '次の Ayat',
    closeBtn: '閉じる',
    copyTextBtn: 'テキストをコピー',
    copiedText: 'コピー完了',
    shareVerseBtn: '共有',
    downloadSuccessToast: 'Ayat カードが保存されました！',
    copyImageSuccessToast: 'カード画像がクリップボードにコピーされました！',
    copyLinkSuccessToast: 'Ayat のリンクをコピーしました！',
    copyTextSuccessToast: 'Ayat のテキストをコピーしました！',
  },

  Turkish: {
    surahPrefix: 'Sure ',
    surahSuffix: '',
    ayatLabel: 'Ayat',
    makkiyah: 'Mekkî',
    madaniyah: 'Medenî',
    surahHeader: 'Sure #',

    languagesAvailableBadge: 'Mevcut Dil',
    aboutUsButton: 'Hakkımızda',
    downloadLanguagesButton: 'Klasörü İndir',
    appLanguageLabel: 'Uygulama Dili',
    selectAppLanguageHeader: 'Uygulama Dilini Seçin',

    languagesBreadcrumb: 'diller',
    codeToggle: 'Kod',
    previewToggle: 'Önizleme',
    charactersLabel: 'karakter',
    linesLabel: 'satır',
    noFileSelected: 'İçeriğini görüntülemek için yukarıdaki açılır menüden bir JSON dosyası seçin.',
    statusConnected: 'Proje Dosya Sistemine Bağlı',

    aboutTitle: 'Hakkımızda',
    founderTitle: 'Kurucu',
    followX: "Twitter / X'te Takip Et",
    joinDiscord: "Discord'a Katıl",
    contactWA: 'WhatsApp ile İletişime Geçin',
    investorRelations: 'Yatırımcı İlişkileri',
    supportVision: 'Vizyonumuzu Destekleyin / Yatırım Yapın',

    ayatCardBtn: 'Ayat Kartı (PnL)',
    ayatCardModalTitle: 'Ayat Kartı Oluşturucu',
    pnlEdition: 'PNL SÜRÜMÜ',
    cardThemeHeader: 'Kart Temasını Seçin (PnL Stili)',
    cardFormatHeader: 'Kart Formatı / Oranı',
    contentSettingsHeader: 'İçerik Ayarları',
    showArabicToggle: 'Arapça Metni Göster',
    showTranslationToggle: 'Çeviriyi Göster',
    showMeaningToggle: 'Sure Anlamı ve Bilgileri Göster',
    showWatermarkToggle: 'Filigran ve Sure Başlığı',
    arabicFontSizeHeader: 'Arapça Yazı Boyutu',
    fontNormal: 'Normal',
    fontLarge: 'Büyük',
    fontXLarge: 'Çok Büyük',
    downloadImageBtn: 'Resmi İndir (PNG)',
    downloading: 'Resim Oluşturuluyor...',
    copyImageBtn: 'Resmi Kopyala',
    copiedImage: 'Kopyalandı!',
    copyLinkBtn: 'Bağlantıyı Kopyala',
    copiedLink: 'Bağlantı Kopyalandı!',
    shareTo: 'Paylaş:',
    surahMeaningLabel: 'Sure Anlamı',
    prevVerse: 'Önceki Ayat',
    nextVerse: 'Sonraki Ayat',
    closeBtn: 'Kapat',
    copyTextBtn: 'Metni Kopyala',
    copiedText: 'Kopyalandı',
    shareVerseBtn: 'Paylaş',
    downloadSuccessToast: 'Ayat kartı başarıyla indirildi!',
    copyImageSuccessToast: 'Kart resmi panoya kopyalandı!',
    copyLinkSuccessToast: 'Ayat bağlantısı kopyalandı!',
    copyTextSuccessToast: 'Ayat metni kopyalandı!',
  },

  French: {
    surahPrefix: 'Sourate n°',
    surahSuffix: '',
    ayatLabel: 'Ayat',
    makkiyah: 'Mecquoise',
    madaniyah: 'Médinoise',
    surahHeader: 'Sourate #',

    languagesAvailableBadge: 'Langues disponibles',
    aboutUsButton: 'À propos de nous',
    downloadLanguagesButton: 'Télécharger dossier',
    appLanguageLabel: 'Langue de l’application',
    selectAppLanguageHeader: 'Sélectionner la langue',

    languagesBreadcrumb: 'langues',
    codeToggle: 'Code',
    previewToggle: 'Aperçu',
    charactersLabel: 'caractères',
    linesLabel: 'lignes',
    noFileSelected: 'Sélectionnez un fichier JSON dans les menus déroulants ci-dessus pour afficher son contenu.',
    statusConnected: 'Connecté au système de fichiers du projet',

    aboutTitle: 'À propos de nous',
    founderTitle: 'Fondateur',
    followX: 'Suivre sur Twitter / X',
    joinDiscord: 'Rejoindre Discord',
    contactWA: 'Contacter via WhatsApp',
    investorRelations: 'Relations investisseurs',
    supportVision: 'Soutenir notre vision / Investir',

    ayatCardBtn: 'Carte d’Ayat (PnL)',
    ayatCardModalTitle: 'Générateur de Carte d’Ayat',
    pnlEdition: 'ÉDITION PNL',
    cardThemeHeader: 'Choisir le thème (Style PnL)',
    cardFormatHeader: 'Format / Ratio de la carte',
    contentSettingsHeader: 'Paramètres du contenu',
    showArabicToggle: 'Afficher le texte arabe',
    showTranslationToggle: 'Afficher la traduction',
    showMeaningToggle: 'Afficher la signification & infos',
    showWatermarkToggle: 'Filigrane & En-tête QS',
    arabicFontSizeHeader: 'Taille de police arabe',
    fontNormal: 'Normale',
    fontLarge: 'Grande',
    fontXLarge: 'Très grande',
    downloadImageBtn: 'Télécharger l’image (PNG)',
    downloading: 'Génération de l’image...',
    copyImageBtn: 'Copier l’image',
    copiedImage: 'Copié !',
    copyLinkBtn: 'Copier le lien',
    copiedLink: 'Lien copié !',
    shareTo: 'Partager sur :',
    surahMeaningLabel: 'Signification de la sourate',
    prevVerse: 'Ayat précédent',
    nextVerse: 'Ayat suivant',
    closeBtn: 'Fermer',
    copyTextBtn: 'Copier le texte',
    copiedText: 'Copié',
    shareVerseBtn: 'Partager',
    downloadSuccessToast: 'Carte d’ayat téléchargée avec succès !',
    copyImageSuccessToast: 'Image de la carte copiée dans le presse-papier !',
    copyLinkSuccessToast: 'Lien de l’ayat copié !',
    copyTextSuccessToast: 'Texte de l’ayat copié !',
  },

  Malay: {
    surahPrefix: 'Surah ke-',
    surahSuffix: '',
    ayatLabel: 'Ayat',
    makkiyah: 'Makkiyah',
    madaniyah: 'Madaniyah',
    surahHeader: 'Surah #',

    languagesAvailableBadge: 'Bahasa Tersedia',
    aboutUsButton: 'Mengenai Kami',
    downloadLanguagesButton: 'Muat Turun Folder',
    appLanguageLabel: 'Bahasa Aplikasi',
    selectAppLanguageHeader: 'Pilih Bahasa Aplikasi',

    languagesBreadcrumb: 'bahasa',
    codeToggle: 'Kod',
    previewToggle: 'Pratinjau',
    charactersLabel: 'aksara',
    linesLabel: 'baris',
    noFileSelected: 'Pilih fail JSON daripada menu di atas untuk melihat kandungannya.',
    statusConnected: 'Tersambung ke Sistem Fail Projek',

    aboutTitle: 'Mengenai Kami',
    founderTitle: 'Pengasas',
    followX: 'Ikuti di Twitter / X',
    joinDiscord: 'Sertai Discord',
    contactWA: 'Hubungi menerusi WhatsApp',
    investorRelations: 'Hubungan Pelabur',
    supportVision: 'Sokong Visi Kami / Melabur',

    ayatCardBtn: 'Kad Ayat (PnL)',
    ayatCardModalTitle: 'Penjana Kad Ayat',
    pnlEdition: 'EDISI PNL',
    cardThemeHeader: 'Pilih Tema Kad (Gaya PnL)',
    cardFormatHeader: 'Format / Saiz Kad',
    contentSettingsHeader: 'Tetapan Kandungan',
    showArabicToggle: 'Papar Teks Arab',
    showTranslationToggle: 'Papar Terjemahan',
    showMeaningToggle: 'Papar Makna Surah & Maklumat',
    showWatermarkToggle: 'Tera Air & Kepala QS',
    arabicFontSizeHeader: 'Saiz Fon Arab',
    fontNormal: 'Biasa',
    fontLarge: 'Besar',
    fontXLarge: 'Sangat Besar',
    downloadImageBtn: 'Muat Turun Imej (PNG)',
    downloading: 'Memproses Imej...',
    copyImageBtn: 'Salin Imej',
    copiedImage: 'Disalin!',
    copyLinkBtn: 'Salin Pautan',
    copiedLink: 'Pautan Disalin!',
    shareTo: 'Kongsi ke:',
    surahMeaningLabel: 'Makna Surah',
    prevVerse: 'Ayat Sebelumnya',
    nextVerse: 'Ayat Seterusnya',
    closeBtn: 'Tutup',
    copyTextBtn: 'Salin Teks',
    copiedText: 'Disalin',
    shareVerseBtn: 'Kongsi',
    downloadSuccessToast: 'Kad ayat berjaya dimuat turun!',
    copyImageSuccessToast: 'Imej kad berjaya disalin ke papan keratan!',
    copyLinkSuccessToast: 'Pautan ayat berjaya disalin!',
    copyTextSuccessToast: 'Teks ayat berjaya disalin!',
  },
};

export function formatSurahNumber(nomor: number | string | undefined, labels: UILabels): string {
  if (nomor === undefined || nomor === null || nomor === '') return '—';
  return `${labels.surahPrefix}${nomor}${labels.surahSuffix}`;
}

export function formatRevelationPlace(place: string | undefined, labels: UILabels): string {
  if (!place) return '—';
  const lower = place.toLowerCase();
  if (
    lower.includes('makk') ||
    lower.includes('mecc') ||
    lower.includes('makki') ||
    lower.includes('マッカ') ||
    lower.includes('麦加')
  ) {
    return labels.makkiyah;
  }
  if (
    lower.includes('madan') ||
    lower.includes('medin') ||
    lower.includes('madin') ||
    lower.includes('マディーナ') ||
    lower.includes('麦地那')
  ) {
    return labels.madaniyah;
  }
  return place;
}
