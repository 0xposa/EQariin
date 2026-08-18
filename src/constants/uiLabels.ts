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
  copyJsonButton: string;
  copiedStatus: string;
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
    copyJsonButton: 'Salin JSON',
    copiedStatus: 'Tersalin!',
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
  },

  English: {
    surahPrefix: 'Surah ',
    surahSuffix: '',
    ayatLabel: 'Verses',
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
    copyJsonButton: 'Copy JSON',
    copiedStatus: 'Copied!',
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
  },

  Arabic: {
    surahPrefix: 'سورة رقم ',
    surahSuffix: '',
    ayatLabel: 'آية',
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
    copyJsonButton: 'نسخ JSON',
    copiedStatus: 'تم النسخ!',
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
  },

  Mandarin: {
    surahPrefix: '第',
    surahSuffix: '章',
    ayatLabel: '节经文',
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
    copyJsonButton: '复制 JSON',
    copiedStatus: '已复制！',
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
  },

  Spanish: {
    surahPrefix: 'Sura ',
    surahSuffix: '',
    ayatLabel: 'Aleyas',
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
    copyJsonButton: 'Copiar JSON',
    copiedStatus: '¡Copiado!',
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
  },

  Japanese: {
    surahPrefix: '第',
    surahSuffix: '章',
    ayatLabel: '節',
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
    copyJsonButton: 'JSONをコピー',
    copiedStatus: 'コピー完了！',
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
  },

  Turkish: {
    surahPrefix: 'Sure ',
    surahSuffix: '',
    ayatLabel: 'Ayet',
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
    copyJsonButton: "JSON'ı Kopyala",
    copiedStatus: 'Kopyalandı!',
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
  },

  French: {
    surahPrefix: 'Sourate n°',
    surahSuffix: '',
    ayatLabel: 'Versets',
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
    copyJsonButton: 'Copier le JSON',
    copiedStatus: 'Copié !',
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
    copyJsonButton: 'Salin JSON',
    copiedStatus: 'Tersalin!',
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
