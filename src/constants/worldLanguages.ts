export type LanguageStatus = 'available' | 'soon';

export type LanguageRegion =
  | 'All'
  | 'Middle East & North Africa'
  | 'South & Central Asia'
  | 'East & Southeast Asia'
  | 'Europe'
  | 'Africa'
  | 'Americas & Oceania';

export interface WorldLanguageItem {
  id: string;
  name: string;
  nativeName: string;
  region: LanguageRegion;
  status: LanguageStatus;
  countryOrSpeakerArea?: string;
}

export const WORLD_LANGUAGES: WorldLanguageItem[] = [
  // Available Languages (9)
  {
    id: 'arabic',
    name: 'Arabic',
    nativeName: 'العربية',
    region: 'Middle East & North Africa',
    status: 'available',
    countryOrSpeakerArea: 'Middle East & North Africa'
  },
  {
    id: 'indonesian',
    name: 'Bahasa Indonesia',
    nativeName: 'Bahasa Indonesia',
    region: 'East & Southeast Asia',
    status: 'available',
    countryOrSpeakerArea: 'Indonesia'
  },
  {
    id: 'english',
    name: 'English',
    nativeName: 'English',
    region: 'Europe',
    status: 'available',
    countryOrSpeakerArea: 'Global'
  },
  {
    id: 'mandarin',
    name: 'Mandarin Chinese',
    nativeName: '中文 (普通话)',
    region: 'East & Southeast Asia',
    status: 'available',
    countryOrSpeakerArea: 'China, Taiwan, Singapore'
  },
  {
    id: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    region: 'Europe',
    status: 'available',
    countryOrSpeakerArea: 'Spain & Latin America'
  },
  {
    id: 'japanese',
    name: 'Japanese',
    nativeName: '日本語',
    region: 'East & Southeast Asia',
    status: 'available',
    countryOrSpeakerArea: 'Japan'
  },
  {
    id: 'turkish',
    name: 'Turkish',
    nativeName: 'Türkçe',
    region: 'Middle East & North Africa',
    status: 'available',
    countryOrSpeakerArea: 'Turkey, Cyprus'
  },
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    region: 'Europe',
    status: 'available',
    countryOrSpeakerArea: 'France, Francophone Africa'
  },
  {
    id: 'malay',
    name: 'Malay',
    nativeName: 'Bahasa Melayu',
    region: 'East & Southeast Asia',
    status: 'available',
    countryOrSpeakerArea: 'Malaysia, Brunei, Singapore'
  },

  // Upcoming World Languages (Soon)
  // South & Central Asia
  {
    id: 'urdu',
    name: 'Urdu',
    nativeName: 'اردو',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Pakistan, India'
  },
  {
    id: 'bengali',
    name: 'Bengali',
    nativeName: 'বাংলা',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Bangladesh, India'
  },
  {
    id: 'hindi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'India'
  },
  {
    id: 'pashto',
    name: 'Pashto',
    nativeName: 'پښتو',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Afghanistan, Pakistan'
  },
  {
    id: 'punjabi',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ / پنجابی',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Pakistan, India'
  },
  {
    id: 'sindhi',
    name: 'Sindhi',
    nativeName: 'سنڌي',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Pakistan, India'
  },
  {
    id: 'uzbek',
    name: 'Uzbek',
    nativeName: 'Oʻzbekcha',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Uzbekistan'
  },
  {
    id: 'kazakh',
    name: 'Kazakh',
    nativeName: 'Қазақша',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Kazakhstan'
  },
  {
    id: 'tajik',
    name: 'Tajik',
    nativeName: 'Тоҷикӣ',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Tajikistan'
  },
  {
    id: 'kyrgyz',
    name: 'Kyrgyz',
    nativeName: 'Кыргызча',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Kyrgyzstan'
  },
  {
    id: 'turkmen',
    name: 'Turkmen',
    nativeName: 'Türkmençe',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Turkmenistan'
  },
  {
    id: 'uyghur',
    name: 'Uyghur',
    nativeName: 'ئۇيغۇرچە',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Xinjiang, Central Asia'
  },
  {
    id: 'tamil',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'India, Sri Lanka, Singapore'
  },
  {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'India'
  },
  {
    id: 'malayalam',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'India (Kerala), Gulf'
  },
  {
    id: 'gujarati',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    region: 'South & Central Asia',
    status: 'soon',
    countryOrSpeakerArea: 'India'
  },

  // Middle East & North Africa (Soon)
  {
    id: 'persian',
    name: 'Persian (Farsi)',
    nativeName: 'فارسی',
    region: 'Middle East & North Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Iran, Afghanistan, Tajikistan'
  },
  {
    id: 'kurdish',
    name: 'Kurdish',
    nativeName: 'Kurdî / کوردی',
    region: 'Middle East & North Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Iraq, Syria, Turkey, Iran'
  },
  {
    id: 'azerbaijani',
    name: 'Azerbaijani',
    nativeName: 'Azərbaycan dili',
    region: 'Middle East & North Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Azerbaijan, Iran'
  },
  {
    id: 'somali',
    name: 'Somali',
    nativeName: 'Af-Soomaali',
    region: 'Middle East & North Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Somalia, Djibouti, Ethiopia'
  },
  {
    id: 'berber',
    name: 'Tamazight (Berber)',
    nativeName: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
    region: 'Middle East & North Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Morocco, Algeria, North Africa'
  },
  {
    id: 'hebrew',
    name: 'Hebrew',
    nativeName: 'עברית',
    region: 'Middle East & North Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Middle East'
  },

  // Sub-Saharan Africa (Soon)
  {
    id: 'swahili',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    region: 'Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Tanzania, Kenya, Uganda, DRC'
  },
  {
    id: 'hausa',
    name: 'Hausa',
    nativeName: 'Harshen Hausa',
    region: 'Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Nigeria, Niger, Ghana'
  },
  {
    id: 'yoruba',
    name: 'Yoruba',
    nativeName: 'Èdè Yorùbá',
    region: 'Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Nigeria, Benin'
  },
  {
    id: 'oromo',
    name: 'Oromo',
    nativeName: 'Afaan Oromoo',
    region: 'Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Ethiopia, Kenya'
  },
  {
    id: 'amharic',
    name: 'Amharic',
    nativeName: 'አማርኛ',
    region: 'Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Ethiopia'
  },
  {
    id: 'fula',
    name: 'Fulani (Fula)',
    nativeName: 'Fulfulde',
    region: 'Africa',
    status: 'soon',
    countryOrSpeakerArea: 'West & Central Africa'
  },
  {
    id: 'wolof',
    name: 'Wolof',
    nativeName: 'Wollof',
    region: 'Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Senegal, Gambia'
  },
  {
    id: 'bambara',
    name: 'Bambara',
    nativeName: 'Bamanankan',
    region: 'Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Mali'
  },
  {
    id: 'zulu',
    name: 'Zulu',
    nativeName: 'isiZulu',
    region: 'Africa',
    status: 'soon',
    countryOrSpeakerArea: 'South Africa'
  },
  {
    id: 'malagasy',
    name: 'Malagasy',
    nativeName: 'Fiteny Malagasy',
    region: 'Africa',
    status: 'soon',
    countryOrSpeakerArea: 'Madagascar'
  },

  // Europe (Soon)
  {
    id: 'german',
    name: 'German',
    nativeName: 'Deutsch',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Germany, Austria, Switzerland'
  },
  {
    id: 'russian',
    name: 'Russian',
    nativeName: 'Русский',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Russia, Eastern Europe, Central Asia'
  },
  {
    id: 'portuguese',
    name: 'Portuguese',
    nativeName: 'Português',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Portugal, Brazil, Angola'
  },
  {
    id: 'italian',
    name: 'Italian',
    nativeName: 'Italiano',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Italy, Switzerland'
  },
  {
    id: 'dutch',
    name: 'Dutch',
    nativeName: 'Nederlands',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Netherlands, Belgium, Suriname'
  },
  {
    id: 'bosnian',
    name: 'Bosnian',
    nativeName: 'Bosanski',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Bosnia and Herzegovina, Balkans'
  },
  {
    id: 'albanian',
    name: 'Albanian',
    nativeName: 'Shqip',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Albania, Kosovo, North Macedonia'
  },
  {
    id: 'polish',
    name: 'Polish',
    nativeName: 'Polski',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Poland'
  },
  {
    id: 'swedish',
    name: 'Swedish',
    nativeName: 'Svenska',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Sweden, Finland'
  },
  {
    id: 'ukrainian',
    name: 'Ukrainian',
    nativeName: 'Українська',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Ukraine'
  },
  {
    id: 'tatar',
    name: 'Tatar',
    nativeName: 'Татар теле',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Tatarstan, Russia'
  },
  {
    id: 'romanian',
    name: 'Romanian',
    nativeName: 'Română',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Romania, Moldova'
  },
  {
    id: 'greek',
    name: 'Greek',
    nativeName: 'Ελληνικά',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Greece, Cyprus'
  },
  {
    id: 'hungarian',
    name: 'Hungarian',
    nativeName: 'Magyar',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Hungary'
  },
  {
    id: 'czech',
    name: 'Czech',
    nativeName: 'Čeština',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Czech Republic'
  },
  {
    id: 'bulgarian',
    name: 'Bulgarian',
    nativeName: 'Български',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Bulgaria'
  },
  {
    id: 'serbian',
    name: 'Serbian',
    nativeName: 'Srpski / Српски',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Serbia, Balkans'
  },
  {
    id: 'danish',
    name: 'Danish',
    nativeName: 'Dansk',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Denmark'
  },
  {
    id: 'norwegian',
    name: 'Norwegian',
    nativeName: 'Norsk',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Norway'
  },
  {
    id: 'finnish',
    name: 'Finnish',
    nativeName: 'Suomi',
    region: 'Europe',
    status: 'soon',
    countryOrSpeakerArea: 'Finland'
  },

  // East & Southeast Asia (Soon)
  {
    id: 'korean',
    name: 'Korean',
    nativeName: '한국어',
    region: 'East & Southeast Asia',
    status: 'soon',
    countryOrSpeakerArea: 'South Korea, North Korea'
  },
  {
    id: 'vietnamese',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    region: 'East & Southeast Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Vietnam'
  },
  {
    id: 'thai',
    name: 'Thai',
    nativeName: 'ภาษาไทย',
    region: 'East & Southeast Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Thailand'
  },
  {
    id: 'tagalog',
    name: 'Filipino (Tagalog)',
    nativeName: 'Wikang Tagalog',
    region: 'East & Southeast Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Philippines'
  },
  {
    id: 'javanese',
    name: 'Javanese',
    nativeName: 'Basa Jawa',
    region: 'East & Southeast Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Indonesia (Java)'
  },
  {
    id: 'sundanese',
    name: 'Sundanese',
    nativeName: 'Basa Sunda',
    region: 'East & Southeast Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Indonesia (West Java)'
  },
  {
    id: 'minangkabau',
    name: 'Minangkabau',
    nativeName: 'Baso Minang',
    region: 'East & Southeast Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Indonesia (West Sumatra)'
  },
  {
    id: 'burmese',
    name: 'Burmese',
    nativeName: 'မြန်မာစာ',
    region: 'East & Southeast Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Myanmar'
  },
  {
    id: 'khmer',
    name: 'Khmer',
    nativeName: 'ភាសាខ្មែរ',
    region: 'East & Southeast Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Cambodia'
  },
  {
    id: 'cantonese',
    name: 'Cantonese',
    nativeName: '粵語',
    region: 'East & Southeast Asia',
    status: 'soon',
    countryOrSpeakerArea: 'Hong Kong, Guangdong'
  },

  // Americas & Oceania (Soon)
  {
    id: 'quechua',
    name: 'Quechua',
    nativeName: 'Runasimi',
    region: 'Americas & Oceania',
    status: 'soon',
    countryOrSpeakerArea: 'Andes (Peru, Bolivia, Ecuador)'
  },
  {
    id: 'guarani',
    name: 'Guarani',
    nativeName: 'Avañe\'ẽ',
    region: 'Americas & Oceania',
    status: 'soon',
    countryOrSpeakerArea: 'Paraguay, South America'
  },
  {
    id: 'maori',
    name: 'Māori',
    nativeName: 'Te Reo Māori',
    region: 'Americas & Oceania',
    status: 'soon',
    countryOrSpeakerArea: 'New Zealand'
  },
  {
    id: 'samoan',
    name: 'Samoan',
    nativeName: 'Gagana Sāmoa',
    region: 'Americas & Oceania',
    status: 'soon',
    countryOrSpeakerArea: 'Samoa, Pacific Islands'
  }
];
