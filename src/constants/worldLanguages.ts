export type LanguageStatus = 'available' | 'soon';

export type LanguageRegion =
  | 'All'
  | 'East & Southeast Asia'
  | 'South & Central Asia'
  | 'Middle East & North Africa'
  | 'Europe'
  | 'Africa'
  | 'Americas & Oceania';

export interface WorldLanguageItem {
  id: string;
  name: string;
  nativeName: string;
  region: LanguageRegion;
  status: LanguageStatus;
  countries: string; // List of sovereign nations/countries using this national language
}

export const WORLD_LANGUAGES: WorldLanguageItem[] = [
  // =========================================================================
  // AVAILABLE LANGUAGES (9)
  // =========================================================================
  {
    id: 'arabic',
    name: 'Arabic',
    nativeName: 'العربية',
    region: 'Middle East & North Africa',
    status: 'available',
    countries: 'Saudi Arabia, Egypt, UAE, Iraq, Jordan, Morocco, Algeria, Sudan, Oman, Qatar, Kuwait, Tunisia, Yemen, Syria, Lebanon, & 10+ countries'
  },
  {
    id: 'indonesian',
    name: 'Bahasa Indonesia',
    nativeName: 'Bahasa Indonesia',
    region: 'East & Southeast Asia',
    status: 'available',
    countries: 'Indonesia'
  },
  {
    id: 'english',
    name: 'English',
    nativeName: 'English',
    region: 'Europe',
    status: 'available',
    countries: 'United Kingdom, United States, Canada, Australia, New Zealand, Ireland, Singapore, Nigeria, South Africa, & 50+ countries'
  },
  {
    id: 'mandarin',
    name: 'Mandarin Chinese',
    nativeName: '中文 (普通话)',
    region: 'East & Southeast Asia',
    status: 'available',
    countries: 'China, Taiwan, Singapore'
  },
  {
    id: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    region: 'Europe',
    status: 'available',
    countries: 'Spain, Mexico, Colombia, Argentina, Peru, Chile, Venezuela, Ecuador, Guatemala, Cuba, Dominican Republic, & 10+ countries'
  },
  {
    id: 'japanese',
    name: 'Japanese',
    nativeName: '日本語',
    region: 'East & Southeast Asia',
    status: 'available',
    countries: 'Japan'
  },
  {
    id: 'turkish',
    name: 'Turkish',
    nativeName: 'Türkçe',
    region: 'Middle East & North Africa',
    status: 'available',
    countries: 'Turkey, Northern Cyprus'
  },
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    region: 'Europe',
    status: 'available',
    countries: 'France, Canada, Belgium, Switzerland, Senegal, Ivory Coast, DR Congo, Cameroon, Madagascar, Mali, & 20+ countries'
  },
  {
    id: 'malay',
    name: 'Malay',
    nativeName: 'Bahasa Melayu',
    region: 'East & Southeast Asia',
    status: 'available',
    countries: 'Malaysia, Brunei, Singapore'
  },

  // =========================================================================
  // EAST & SOUTHEAST ASIA (SOON)
  // =========================================================================
  {
    id: 'korean',
    name: 'Korean',
    nativeName: '한국어',
    region: 'East & Southeast Asia',
    status: 'soon',
    countries: 'South Korea, North Korea'
  },
  {
    id: 'vietnamese',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    region: 'East & Southeast Asia',
    status: 'soon',
    countries: 'Vietnam'
  },
  {
    id: 'thai',
    name: 'Thai',
    nativeName: 'ภาษาไทย',
    region: 'East & Southeast Asia',
    status: 'soon',
    countries: 'Thailand'
  },
  {
    id: 'filipino',
    name: 'Filipino (Tagalog)',
    nativeName: 'Wikang Tagalog',
    region: 'East & Southeast Asia',
    status: 'soon',
    countries: 'Philippines'
  },
  {
    id: 'burmese',
    name: 'Burmese',
    nativeName: 'မြန်မာစာ',
    region: 'East & Southeast Asia',
    status: 'soon',
    countries: 'Myanmar'
  },
  {
    id: 'khmer',
    name: 'Khmer',
    nativeName: 'ភាសាខ្មែរ',
    region: 'East & Southeast Asia',
    status: 'soon',
    countries: 'Cambodia'
  },
  {
    id: 'lao',
    name: 'Lao',
    nativeName: 'ພາສາລາວ',
    region: 'East & Southeast Asia',
    status: 'soon',
    countries: 'Laos'
  },
  {
    id: 'mongolian',
    name: 'Mongolian',
    nativeName: 'Монгол хэл',
    region: 'East & Southeast Asia',
    status: 'soon',
    countries: 'Mongolia'
  },
  {
    id: 'tetum',
    name: 'Tetum',
    nativeName: 'Lia-Tetun',
    region: 'East & Southeast Asia',
    status: 'soon',
    countries: 'East Timor (Timor-Leste)'
  },

  // =========================================================================
  // SOUTH & CENTRAL ASIA (SOON)
  // =========================================================================
  {
    id: 'urdu',
    name: 'Urdu',
    nativeName: 'اردو',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'Pakistan, India'
  },
  {
    id: 'hindi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'India, Fiji'
  },
  {
    id: 'bengali',
    name: 'Bengali',
    nativeName: 'বাংলা',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'Bangladesh, India'
  },
  {
    id: 'pashto',
    name: 'Pashto',
    nativeName: 'پښتو',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'Afghanistan, Pakistan'
  },
  {
    id: 'dari',
    name: 'Dari (Afghan Persian)',
    nativeName: 'دری',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'Afghanistan'
  },
  {
    id: 'uzbek',
    name: 'Uzbek',
    nativeName: 'Oʻzbekcha',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'Uzbekistan'
  },
  {
    id: 'kazakh',
    name: 'Kazakh',
    nativeName: 'Қазақша',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'Kazakhstan'
  },
  {
    id: 'tajik',
    name: 'Tajik',
    nativeName: 'Тоҷикӣ',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'Tajikistan'
  },
  {
    id: 'kyrgyz',
    name: 'Kyrgyz',
    nativeName: 'Кыргызча',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'Kyrgyzstan'
  },
  {
    id: 'turkmen',
    name: 'Turkmen',
    nativeName: 'Türkmençe',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'Turkmenistan'
  },
  {
    id: 'nepali',
    name: 'Nepali',
    nativeName: 'नेपाली',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'Nepal, India'
  },
  {
    id: 'sinhala',
    name: 'Sinhala',
    nativeName: 'සිංහල',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'Sri Lanka'
  },
  {
    id: 'dhivehi',
    name: 'Dhivehi (Maldivian)',
    nativeName: 'ދިވެހި',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'Maldives'
  },
  {
    id: 'dzongkha',
    name: 'Dzongkha (Bhutanese)',
    nativeName: 'རྫོང་ཁ',
    region: 'South & Central Asia',
    status: 'soon',
    countries: 'Bhutan'
  },

  // =========================================================================
  // MIDDLE EAST & NORTH AFRICA (SOON)
  // =========================================================================
  {
    id: 'persian',
    name: 'Persian (Farsi)',
    nativeName: 'فارسی',
    region: 'Middle East & North Africa',
    status: 'soon',
    countries: 'Iran'
  },
  {
    id: 'azerbaijani',
    name: 'Azerbaijani',
    nativeName: 'Azərbaycan dili',
    region: 'Middle East & North Africa',
    status: 'soon',
    countries: 'Azerbaijan'
  },
  {
    id: 'hebrew',
    name: 'Hebrew',
    nativeName: 'עברית',
    region: 'Middle East & North Africa',
    status: 'soon',
    countries: 'Israel'
  },
  {
    id: 'armenian',
    name: 'Armenian',
    nativeName: 'Հայերեն',
    region: 'Middle East & North Africa',
    status: 'soon',
    countries: 'Armenia'
  },
  {
    id: 'georgian',
    name: 'Georgian',
    nativeName: 'ქართული',
    region: 'Middle East & North Africa',
    status: 'soon',
    countries: 'Georgia'
  },
  {
    id: 'tamazight',
    name: 'Tamazight (Berber)',
    nativeName: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
    region: 'Middle East & North Africa',
    status: 'soon',
    countries: 'Morocco, Algeria'
  },

  // =========================================================================
  // EUROPE (SOON)
  // =========================================================================
  {
    id: 'german',
    name: 'German',
    nativeName: 'Deutsch',
    region: 'Europe',
    status: 'soon',
    countries: 'Germany, Austria, Switzerland, Liechtenstein, Luxembourg, Belgium'
  },
  {
    id: 'russian',
    name: 'Russian',
    nativeName: 'Русский',
    region: 'Europe',
    status: 'soon',
    countries: 'Russia, Belarus, Kazakhstan, Kyrgyzstan'
  },
  {
    id: 'portuguese',
    name: 'Portuguese',
    nativeName: 'Português',
    region: 'Europe',
    status: 'soon',
    countries: 'Portugal, Brazil, Angola, Mozambique, Cape Verde, Guinea-Bissau, São Tomé, East Timor'
  },
  {
    id: 'italian',
    name: 'Italian',
    nativeName: 'Italiano',
    region: 'Europe',
    status: 'soon',
    countries: 'Italy, Switzerland, San Marino, Vatican City'
  },
  {
    id: 'dutch',
    name: 'Dutch',
    nativeName: 'Nederlands',
    region: 'Europe',
    status: 'soon',
    countries: 'Netherlands, Belgium, Suriname'
  },
  {
    id: 'polish',
    name: 'Polish',
    nativeName: 'Polski',
    region: 'Europe',
    status: 'soon',
    countries: 'Poland'
  },
  {
    id: 'ukrainian',
    name: 'Ukrainian',
    nativeName: 'Українська',
    region: 'Europe',
    status: 'soon',
    countries: 'Ukraine'
  },
  {
    id: 'romanian',
    name: 'Romanian',
    nativeName: 'Română',
    region: 'Europe',
    status: 'soon',
    countries: 'Romania, Moldova'
  },
  {
    id: 'greek',
    name: 'Greek',
    nativeName: 'Ελληνικά',
    region: 'Europe',
    status: 'soon',
    countries: 'Greece, Cyprus'
  },
  {
    id: 'czech',
    name: 'Czech',
    nativeName: 'Čeština',
    region: 'Europe',
    status: 'soon',
    countries: 'Czech Republic'
  },
  {
    id: 'slovak',
    name: 'Slovak',
    nativeName: 'Slovenčina',
    region: 'Europe',
    status: 'soon',
    countries: 'Slovakia'
  },
  {
    id: 'hungarian',
    name: 'Hungarian',
    nativeName: 'Magyar',
    region: 'Europe',
    status: 'soon',
    countries: 'Hungary'
  },
  {
    id: 'swedish',
    name: 'Swedish',
    nativeName: 'Svenska',
    region: 'Europe',
    status: 'soon',
    countries: 'Sweden, Finland'
  },
  {
    id: 'danish',
    name: 'Danish',
    nativeName: 'Dansk',
    region: 'Europe',
    status: 'soon',
    countries: 'Denmark'
  },
  {
    id: 'norwegian',
    name: 'Norwegian',
    nativeName: 'Norsk',
    region: 'Europe',
    status: 'soon',
    countries: 'Norway'
  },
  {
    id: 'finnish',
    name: 'Finnish',
    nativeName: 'Suomi',
    region: 'Europe',
    status: 'soon',
    countries: 'Finland'
  },
  {
    id: 'bulgarian',
    name: 'Bulgarian',
    nativeName: 'Български',
    region: 'Europe',
    status: 'soon',
    countries: 'Bulgaria'
  },
  {
    id: 'serbian',
    name: 'Serbian',
    nativeName: 'Српски',
    region: 'Europe',
    status: 'soon',
    countries: 'Serbia, Bosnia & Herzegovina, Montenegro'
  },
  {
    id: 'croatian',
    name: 'Croatian',
    nativeName: 'Hrvatski',
    region: 'Europe',
    status: 'soon',
    countries: 'Croatia, Bosnia & Herzegovina'
  },
  {
    id: 'bosnian',
    name: 'Bosnian',
    nativeName: 'Bosanski',
    region: 'Europe',
    status: 'soon',
    countries: 'Bosnia & Herzegovina'
  },
  {
    id: 'albanian',
    name: 'Albanian',
    nativeName: 'Shqip',
    region: 'Europe',
    status: 'soon',
    countries: 'Albania, Kosovo, North Macedonia'
  },
  {
    id: 'macedonian',
    name: 'Macedonian',
    nativeName: 'Македонски',
    region: 'Europe',
    status: 'soon',
    countries: 'North Macedonia'
  },
  {
    id: 'slovenian',
    name: 'Slovenian',
    nativeName: 'Slovenščina',
    region: 'Europe',
    status: 'soon',
    countries: 'Slovenia'
  },
  {
    id: 'lithuanian',
    name: 'Lithuanian',
    nativeName: 'Lietuvių',
    region: 'Europe',
    status: 'soon',
    countries: 'Lithuania'
  },
  {
    id: 'latvian',
    name: 'Latvian',
    nativeName: 'Latviešu',
    region: 'Europe',
    status: 'soon',
    countries: 'Latvia'
  },
  {
    id: 'estonian',
    name: 'Estonian',
    nativeName: 'Eesti',
    region: 'Europe',
    status: 'soon',
    countries: 'Estonia'
  },
  {
    id: 'icelandic',
    name: 'Icelandic',
    nativeName: 'Íslenska',
    region: 'Europe',
    status: 'soon',
    countries: 'Iceland'
  },
  {
    id: 'irish',
    name: 'Irish (Gaeilge)',
    nativeName: 'Gaeilge',
    region: 'Europe',
    status: 'soon',
    countries: 'Ireland'
  },
  {
    id: 'maltese',
    name: 'Maltese',
    nativeName: 'Malti',
    region: 'Europe',
    status: 'soon',
    countries: 'Malta'
  },
  {
    id: 'luxembourgish',
    name: 'Luxembourgish',
    nativeName: 'Lëtzebuergesch',
    region: 'Europe',
    status: 'soon',
    countries: 'Luxembourg'
  },
  {
    id: 'belarusian',
    name: 'Belarusian',
    nativeName: 'Беларуская',
    region: 'Europe',
    status: 'soon',
    countries: 'Belarus'
  },
  {
    id: 'montenegrin',
    name: 'Montenegrin',
    nativeName: 'Crnogorski',
    region: 'Europe',
    status: 'soon',
    countries: 'Montenegro'
  },

  // =========================================================================
  // AFRICA (SOON)
  // =========================================================================
  {
    id: 'swahili',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    region: 'Africa',
    status: 'soon',
    countries: 'Tanzania, Kenya, Uganda, Rwanda, DR Congo'
  },
  {
    id: 'hausa',
    name: 'Hausa',
    nativeName: 'Harshen Hausa',
    region: 'Africa',
    status: 'soon',
    countries: 'Nigeria, Niger'
  },
  {
    id: 'yoruba',
    name: 'Yoruba',
    nativeName: 'Èdè Yorùbá',
    region: 'Africa',
    status: 'soon',
    countries: 'Nigeria, Benin, Togo'
  },
  {
    id: 'igbo',
    name: 'Igbo',
    nativeName: 'Asụsụ Igbo',
    region: 'Africa',
    status: 'soon',
    countries: 'Nigeria'
  },
  {
    id: 'amharic',
    name: 'Amharic',
    nativeName: 'አማርኛ',
    region: 'Africa',
    status: 'soon',
    countries: 'Ethiopia'
  },
  {
    id: 'somali',
    name: 'Somali',
    nativeName: 'Af-Soomaali',
    region: 'Africa',
    status: 'soon',
    countries: 'Somalia, Djibouti, Ethiopia'
  },
  {
    id: 'oromo',
    name: 'Oromo',
    nativeName: 'Afaan Oromoo',
    region: 'Africa',
    status: 'soon',
    countries: 'Ethiopia, Kenya'
  },
  {
    id: 'tigrinya',
    name: 'Tigrinya',
    nativeName: 'ትግርኛ',
    region: 'Africa',
    status: 'soon',
    countries: 'Eritrea, Ethiopia'
  },
  {
    id: 'kinyarwanda',
    name: 'Kinyarwanda',
    nativeName: 'Ikinyarwanda',
    region: 'Africa',
    status: 'soon',
    countries: 'Rwanda'
  },
  {
    id: 'kirundi',
    name: 'Kirundi',
    nativeName: 'Ikirundi',
    region: 'Africa',
    status: 'soon',
    countries: 'Burundi'
  },
  {
    id: 'lingala',
    name: 'Lingala',
    nativeName: 'Lingála',
    region: 'Africa',
    status: 'soon',
    countries: 'DR Congo, Republic of the Congo'
  },
  {
    id: 'luganda',
    name: 'Luganda',
    nativeName: 'Oluganda',
    region: 'Africa',
    status: 'soon',
    countries: 'Uganda'
  },
  {
    id: 'malagasy',
    name: 'Malagasy',
    nativeName: 'Fiteny Malagasy',
    region: 'Africa',
    status: 'soon',
    countries: 'Madagascar'
  },
  {
    id: 'zulu',
    name: 'Zulu (isiZulu)',
    nativeName: 'isiZulu',
    region: 'Africa',
    status: 'soon',
    countries: 'South Africa'
  },
  {
    id: 'xhosa',
    name: 'Xhosa (isiXhosa)',
    nativeName: 'isiXhosa',
    region: 'Africa',
    status: 'soon',
    countries: 'South Africa'
  },
  {
    id: 'afrikaans',
    name: 'Afrikaans',
    nativeName: 'Afrikaans',
    region: 'Africa',
    status: 'soon',
    countries: 'South Africa, Namibia'
  },
  {
    id: 'shona',
    name: 'Shona',
    nativeName: 'chiShona',
    region: 'Africa',
    status: 'soon',
    countries: 'Zimbabwe'
  },
  {
    id: 'sesotho',
    name: 'Sesotho',
    nativeName: 'Sesotho',
    region: 'Africa',
    status: 'soon',
    countries: 'Lesotho, South Africa'
  },
  {
    id: 'setswana',
    name: 'Setswana',
    nativeName: 'Setswana',
    region: 'Africa',
    status: 'soon',
    countries: 'Botswana, South Africa'
  },
  {
    id: 'swati',
    name: 'Swati (siSwati)',
    nativeName: 'siSwati',
    region: 'Africa',
    status: 'soon',
    countries: 'Eswatini (Swaziland), South Africa'
  },
  {
    id: 'chichewa',
    name: 'Chichewa (Nyanja)',
    nativeName: 'Chichewa',
    region: 'Africa',
    status: 'soon',
    countries: 'Malawi, Zambia, Mozambique'
  },
  {
    id: 'sango',
    name: 'Sango',
    nativeName: 'Sängö',
    region: 'Africa',
    status: 'soon',
    countries: 'Central African Republic'
  },
  {
    id: 'wolof',
    name: 'Wolof',
    nativeName: 'Wollof',
    region: 'Africa',
    status: 'soon',
    countries: 'Senegal, The Gambia'
  },
  {
    id: 'comorian',
    name: 'Comorian (Shikomor)',
    nativeName: 'Shikomor',
    region: 'Africa',
    status: 'soon',
    countries: 'Comoros'
  },
  {
    id: 'seychellois',
    name: 'Seychellois Creole',
    nativeName: 'Kreol Seselwa',
    region: 'Africa',
    status: 'soon',
    countries: 'Seychelles'
  },
  {
    id: 'mauritian',
    name: 'Mauritian Creole',
    nativeName: 'Morisien',
    region: 'Africa',
    status: 'soon',
    countries: 'Mauritius'
  },

  // =========================================================================
  // AMERICAS & OCEANIA (SOON)
  // =========================================================================
  {
    id: 'haitian_creole',
    name: 'Haitian Creole',
    nativeName: 'Kreyòl Ayisyen',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Haiti'
  },
  {
    id: 'papiamento',
    name: 'Papiamento',
    nativeName: 'Papiamentu',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Aruba, Curaçao, Bonaire'
  },
  {
    id: 'quechua',
    name: 'Quechua',
    nativeName: 'Runasimi',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Peru, Bolivia, Ecuador'
  },
  {
    id: 'guarani',
    name: 'Guarani',
    nativeName: 'Avañe\'ẽ',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Paraguay, Bolivia'
  },
  {
    id: 'aymara',
    name: 'Aymara',
    nativeName: 'Aymar aru',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Bolivia, Peru'
  },
  {
    id: 'tok_pisin',
    name: 'Tok Pisin',
    nativeName: 'Tok Pisin',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Papua New Guinea'
  },
  {
    id: 'hiri_motu',
    name: 'Hiri Motu',
    nativeName: 'Hiri Motu',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Papua New Guinea'
  },
  {
    id: 'maori',
    name: 'Māori',
    nativeName: 'Te Reo Māori',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'New Zealand'
  },
  {
    id: 'fijian',
    name: 'Fijian',
    nativeName: 'Na Vosa Vakaviti',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Fiji'
  },
  {
    id: 'samoan',
    name: 'Samoan',
    nativeName: 'Gagana Sāmoa',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Samoa'
  },
  {
    id: 'tongan',
    name: 'Tongan',
    nativeName: 'Lea Fakatonga',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Tonga'
  },
  {
    id: 'bislama',
    name: 'Bislama',
    nativeName: 'Bislama',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Vanuatu'
  },
  {
    id: 'marshallese',
    name: 'Marshallese',
    nativeName: 'Kajin M̧ajeļ',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Marshall Islands'
  },
  {
    id: 'palauan',
    name: 'Palauan',
    nativeName: 'Tekoi er a Belau',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Palau'
  },
  {
    id: 'kiribati',
    name: 'Kiribati (Gilbertese)',
    nativeName: 'Taetae ni Kiribati',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Kiribati'
  },
  {
    id: 'nauruan',
    name: 'Nauruan',
    nativeName: 'Dorerin Naoero',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Nauru'
  },
  {
    id: 'tuvaluan',
    name: 'Tuvaluan',
    nativeName: 'Te Ggana Tuvalu',
    region: 'Americas & Oceania',
    status: 'soon',
    countries: 'Tuvalu'
  }
];
