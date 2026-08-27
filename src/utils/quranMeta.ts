// Arabic Surah metadata and names mapping
export interface SurahMetaItem {
  number: number;
  arabicName: string; // e.g. الفاتحة
  latinName: string;  // e.g. Al-Fatihah
  revelationPlace: 'Makkiyyah' | 'Madaniyah';
  totalVerses: number;
}

export const SURAH_METADATA: Record<number, SurahMetaItem> = {
  1: { number: 1, arabicName: 'الفَاتِحَة', latinName: 'Al-Fatihah', revelationPlace: 'Makkiyyah', totalVerses: 7 },
  2: { number: 2, arabicName: 'البَقَرَة', latinName: 'Al-Baqarah', revelationPlace: 'Madaniyah', totalVerses: 286 },
  3: { number: 3, arabicName: 'آلِ عِمْرَان', latinName: 'Ali \'Imran', revelationPlace: 'Madaniyah', totalVerses: 200 },
  4: { number: 4, arabicName: 'النِّسَاء', latinName: 'An-Nisa\'', revelationPlace: 'Madaniyah', totalVerses: 176 },
  5: { number: 5, arabicName: 'المَائِدَة', latinName: 'Al-Ma\'idah', revelationPlace: 'Madaniyah', totalVerses: 120 },
  6: { number: 6, arabicName: 'الأَنْعَام', latinName: 'Al-An\'am', revelationPlace: 'Makkiyyah', totalVerses: 165 },
  7: { number: 7, arabicName: 'الأَعْرَاف', latinName: 'Al-A\'raf', revelationPlace: 'Makkiyyah', totalVerses: 206 },
  8: { number: 8, arabicName: 'الأَنْفَال', latinName: 'Al-Anfal', revelationPlace: 'Madaniyah', totalVerses: 75 },
  9: { number: 9, arabicName: 'التَّوْبَة', latinName: 'At-Tawbah', revelationPlace: 'Madaniyah', totalVerses: 129 },
  10: { number: 10, arabicName: 'يُونُس', latinName: 'Yunus', revelationPlace: 'Makkiyyah', totalVerses: 109 },
  11: { number: 11, arabicName: 'هُود', latinName: 'Hud', revelationPlace: 'Makkiyyah', totalVerses: 123 },
  12: { number: 12, arabicName: 'يُوسُف', latinName: 'Yusuf', revelationPlace: 'Makkiyyah', totalVerses: 111 },
  13: { number: 13, arabicName: 'الرَّعْد', latinName: 'Ar-Ra\'d', revelationPlace: 'Madaniyah', totalVerses: 43 },
  14: { number: 14, arabicName: 'إِبْرَاهِيم', latinName: 'Ibrahim', revelationPlace: 'Makkiyyah', totalVerses: 52 },
  15: { number: 15, arabicName: 'الحِجْر', latinName: 'Al-Hijr', revelationPlace: 'Makkiyyah', totalVerses: 99 },
  16: { number: 16, arabicName: 'النَّحْل', latinName: 'An-Nahl', revelationPlace: 'Makkiyyah', totalVerses: 128 },
  17: { number: 17, arabicName: 'الإِسْرَاء', latinName: 'Al-Isra\'', revelationPlace: 'Makkiyyah', totalVerses: 111 },
  18: { number: 18, arabicName: 'الكَهْف', latinName: 'Al-Kahf', revelationPlace: 'Makkiyyah', totalVerses: 110 },
  19: { number: 19, arabicName: 'مَرْيَم', latinName: 'Maryam', revelationPlace: 'Makkiyyah', totalVerses: 98 },
  20: { number: 20, arabicName: 'طه', latinName: 'Ta-Ha', revelationPlace: 'Makkiyyah', totalVerses: 135 },
  21: { number: 21, arabicName: 'الأَنْبِيَاء', latinName: 'Al-Anbiya\'', revelationPlace: 'Makkiyyah', totalVerses: 112 },
  22: { number: 22, arabicName: 'الحَجّ', latinName: 'Al-Hajj', revelationPlace: 'Madaniyah', totalVerses: 78 },
  23: { number: 23, arabicName: 'المُؤْمِنُون', latinName: 'Al-Mu\'minun', revelationPlace: 'Makkiyyah', totalVerses: 118 },
  24: { number: 24, arabicName: 'النُّور', latinName: 'An-Nur', revelationPlace: 'Madaniyah', totalVerses: 64 },
  25: { number: 25, arabicName: 'الفُرْقَان', latinName: 'Al-Furqan', revelationPlace: 'Makkiyyah', totalVerses: 77 },
  26: { number: 26, arabicName: 'الشُّعَرَاء', latinName: 'Ash-Shu\'ara\'', revelationPlace: 'Makkiyyah', totalVerses: 227 },
  27: { number: 27, arabicName: 'النَّمْل', latinName: 'An-Naml', revelationPlace: 'Makkiyyah', totalVerses: 93 },
  28: { number: 28, arabicName: 'القَصَص', latinName: 'Al-Qasas', revelationPlace: 'Makkiyyah', totalVerses: 88 },
  29: { number: 29, arabicName: 'العَنْكَبُوت', latinName: 'Al-\'Ankabut', revelationPlace: 'Makkiyyah', totalVerses: 69 },
  30: { number: 30, arabicName: 'الرُّوم', latinName: 'Ar-Rum', revelationPlace: 'Makkiyyah', totalVerses: 60 },
  31: { number: 31, arabicName: 'لُقْمَان', latinName: 'Luqman', revelationPlace: 'Makkiyyah', totalVerses: 34 },
  32: { number: 32, arabicName: 'السَّجْدَة', latinName: 'As-Sajdah', revelationPlace: 'Makkiyyah', totalVerses: 30 },
  33: { number: 33, arabicName: 'الأَحْزَاب', latinName: 'Al-Ahzab', revelationPlace: 'Madaniyah', totalVerses: 73 },
  34: { number: 34, arabicName: 'سَبَأ', latinName: 'Saba\'', revelationPlace: 'Makkiyyah', totalVerses: 54 },
  35: { number: 35, arabicName: 'فَاطِر', latinName: 'Fatir', revelationPlace: 'Makkiyyah', totalVerses: 45 },
  36: { number: 36, arabicName: 'يس', latinName: 'Ya-Sin', revelationPlace: 'Makkiyyah', totalVerses: 83 },
  37: { number: 37, arabicName: 'الصَّافَّات', latinName: 'As-Saffat', revelationPlace: 'Makkiyyah', totalVerses: 182 },
  38: { number: 38, arabicName: 'ص', latinName: 'Sad', revelationPlace: 'Makkiyyah', totalVerses: 88 },
  39: { number: 39, arabicName: 'الزُّمَر', latinName: 'Az-Zumar', revelationPlace: 'Makkiyyah', totalVerses: 75 },
  40: { number: 40, arabicName: 'غَافِر', latinName: 'Ghafir', revelationPlace: 'Makkiyyah', totalVerses: 85 },
  41: { number: 41, arabicName: 'فُصِّلَت', latinName: 'Fussilat', revelationPlace: 'Makkiyyah', totalVerses: 54 },
  42: { number: 42, arabicName: 'الشُّورَى', latinName: 'Ash-Shura', revelationPlace: 'Makkiyyah', totalVerses: 53 },
  43: { number: 43, arabicName: 'الزُّخْرُف', latinName: 'Az-Zukhruf', revelationPlace: 'Makkiyyah', totalVerses: 89 },
  44: { number: 44, arabicName: 'الدُّخَان', latinName: 'Ad-Dukhan', revelationPlace: 'Makkiyyah', totalVerses: 59 },
  45: { number: 45, arabicName: 'الجَاثِيَة', latinName: 'Al-Jathiyah', revelationPlace: 'Makkiyyah', totalVerses: 37 },
  46: { number: 46, arabicName: 'الأَحْقَاف', latinName: 'Al-Ahqaf', revelationPlace: 'Makkiyyah', totalVerses: 35 },
  47: { number: 47, arabicName: 'مُحَمَّد', latinName: 'Muhammad', revelationPlace: 'Madaniyah', totalVerses: 38 },
  48: { number: 48, arabicName: 'الفَتْح', latinName: 'Al-Fath', revelationPlace: 'Madaniyah', totalVerses: 29 },
  49: { number: 49, arabicName: 'الحُجُرَات', latinName: 'Al-Hujurat', revelationPlace: 'Madaniyah', totalVerses: 18 },
  50: { number: 50, arabicName: 'ق', latinName: 'Qaf', revelationPlace: 'Makkiyyah', totalVerses: 45 },
  51: { number: 51, arabicName: 'الذَّارِيَات', latinName: 'Adh-Dhariyat', revelationPlace: 'Makkiyyah', totalVerses: 60 },
  52: { number: 52, arabicName: 'الطُّور', latinName: 'At-Tur', revelationPlace: 'Makkiyyah', totalVerses: 49 },
  53: { number: 53, arabicName: 'النَّجْم', latinName: 'An-Najm', revelationPlace: 'Makkiyyah', totalVerses: 62 },
  54: { number: 54, arabicName: 'القَمَر', latinName: 'Al-Qamar', revelationPlace: 'Makkiyyah', totalVerses: 55 },
  55: { number: 55, arabicName: 'الرَّحْمٰن', latinName: 'Ar-Rahman', revelationPlace: 'Madaniyah', totalVerses: 78 },
  56: { number: 56, arabicName: 'الوَاقِعَة', latinName: 'Al-Waqi\'ah', revelationPlace: 'Makkiyyah', totalVerses: 96 },
  57: { number: 57, arabicName: 'الحَدِيد', latinName: 'Al-Hadid', revelationPlace: 'Madaniyah', totalVerses: 29 },
  58: { number: 58, arabicName: 'المُجَادَلَة', latinName: 'Al-Mujadilah', revelationPlace: 'Madaniyah', totalVerses: 22 },
  59: { number: 59, arabicName: 'الحَشْر', latinName: 'Al-Hashr', revelationPlace: 'Madaniyah', totalVerses: 24 },
  60: { number: 60, arabicName: 'المُمْتَحَنَة', latinName: 'Al-Mumtahanah', revelationPlace: 'Madaniyah', totalVerses: 13 },
  61: { number: 61, arabicName: 'الصَّفّ', latinName: 'As-Saff', revelationPlace: 'Madaniyah', totalVerses: 14 },
  62: { number: 62, arabicName: 'الجُمُعَة', latinName: 'Al-Jumu\'ah', revelationPlace: 'Madaniyah', totalVerses: 11 },
  63: { number: 63, arabicName: 'المُنَافِقُون', latinName: 'Al-Munafiqun', revelationPlace: 'Madaniyah', totalVerses: 11 },
  64: { number: 64, arabicName: 'التَّغَابُن', latinName: 'At-Taghabun', revelationPlace: 'Madaniyah', totalVerses: 18 },
  65: { number: 65, arabicName: 'الطَّلَاق', latinName: 'At-Talaq', revelationPlace: 'Madaniyah', totalVerses: 12 },
  66: { number: 66, arabicName: 'التَّحْرِيم', latinName: 'At-Tahrim', revelationPlace: 'Madaniyah', totalVerses: 12 },
  67: { number: 67, arabicName: 'المُلْك', latinName: 'Al-Mulk', revelationPlace: 'Makkiyyah', totalVerses: 30 },
  68: { number: 68, arabicName: 'القَلَم', latinName: 'Al-Qalam', revelationPlace: 'Makkiyyah', totalVerses: 52 },
  69: { number: 69, arabicName: 'الحَاقَّة', latinName: 'Al-Haqqah', revelationPlace: 'Makkiyyah', totalVerses: 52 },
  70: { number: 70, arabicName: 'المَعَارِج', latinName: 'Al-Ma\'arij', revelationPlace: 'Makkiyyah', totalVerses: 44 },
  71: { number: 71, arabicName: 'نُوح', latinName: 'Nuh', revelationPlace: 'Makkiyyah', totalVerses: 28 },
  72: { number: 72, arabicName: 'الجِنّ', latinName: 'Al-Jinn', revelationPlace: 'Makkiyyah', totalVerses: 28 },
  73: { number: 73, arabicName: 'المُزَّمِّل', latinName: 'Al-Muzzammil', revelationPlace: 'Makkiyyah', totalVerses: 20 },
  74: { number: 74, arabicName: 'المُدَّثِّر', latinName: 'Al-Muddaththir', revelationPlace: 'Makkiyyah', totalVerses: 56 },
  75: { number: 75, arabicName: 'القِيَامَة', latinName: 'Al-Qiyamah', revelationPlace: 'Makkiyyah', totalVerses: 40 },
  76: { number: 76, arabicName: 'الإِنْسَان', latinName: 'Al-Insan', revelationPlace: 'Madaniyah', totalVerses: 31 },
  77: { number: 77, arabicName: 'المُرْسَلَات', latinName: 'Al-Mursalat', revelationPlace: 'Makkiyyah', totalVerses: 50 },
  78: { number: 78, arabicName: 'النَّبَأ', latinName: 'An-Naba\'', revelationPlace: 'Makkiyyah', totalVerses: 40 },
  79: { number: 79, arabicName: 'النَّازِعَات', latinName: 'An-Nazi\'at', revelationPlace: 'Makkiyyah', totalVerses: 46 },
  80: { number: 80, arabicName: 'عَبَسَ', latinName: '\'Abasa', revelationPlace: 'Makkiyyah', totalVerses: 42 },
  81: { number: 81, arabicName: 'التَّكْوِير', latinName: 'At-Takwir', revelationPlace: 'Makkiyyah', totalVerses: 29 },
  82: { number: 82, arabicName: 'الانْفِطَار', latinName: 'Al-Infitar', revelationPlace: 'Makkiyyah', totalVerses: 19 },
  83: { number: 83, arabicName: 'المُطَفِّفِين', latinName: 'Al-Mutaffifin', revelationPlace: 'Makkiyyah', totalVerses: 36 },
  84: { number: 84, arabicName: 'الانْشِقَاق', latinName: 'Al-Inshiqaq', revelationPlace: 'Makkiyyah', totalVerses: 25 },
  85: { number: 85, arabicName: 'البُرُوج', latinName: 'Al-Buruj', revelationPlace: 'Makkiyyah', totalVerses: 22 },
  86: { number: 86, arabicName: 'الطَّارِق', latinName: 'At-Tariq', revelationPlace: 'Makkiyyah', totalVerses: 17 },
  87: { number: 87, arabicName: 'الأَعْلَى', latinName: 'Al-A\'la', revelationPlace: 'Makkiyyah', totalVerses: 19 },
  88: { number: 88, arabicName: 'الغَاشِيَة', latinName: 'Al-Ghashiyah', revelationPlace: 'Makkiyyah', totalVerses: 26 },
  89: { number: 89, arabicName: 'الفَجْر', latinName: 'Al-Fajr', revelationPlace: 'Makkiyyah', totalVerses: 30 },
  90: { number: 90, arabicName: 'البَلَد', latinName: 'Al-Balad', revelationPlace: 'Makkiyyah', totalVerses: 20 },
  91: { number: 91, arabicName: 'الشَّمْس', latinName: 'Ash-Shams', revelationPlace: 'Makkiyyah', totalVerses: 15 },
  92: { number: 92, arabicName: 'اللَّيْل', latinName: 'Al-Layl', revelationPlace: 'Makkiyyah', totalVerses: 21 },
  93: { number: 93, arabicName: 'الضُّحَى', latinName: 'Ad-Duha', revelationPlace: 'Makkiyyah', totalVerses: 11 },
  94: { number: 94, arabicName: 'الشَّرْح', latinName: 'Ash-Sharh', revelationPlace: 'Makkiyyah', totalVerses: 8 },
  95: { number: 95, arabicName: 'التِّين', latinName: 'At-Tin', revelationPlace: 'Makkiyyah', totalVerses: 8 },
  96: { number: 96, arabicName: 'العَلَق', latinName: 'Al-\'Alaq', revelationPlace: 'Makkiyyah', totalVerses: 19 },
  97: { number: 97, arabicName: 'القَدْر', latinName: 'Al-Qadr', revelationPlace: 'Makkiyyah', totalVerses: 5 },
  98: { number: 98, arabicName: 'البَيِّنَة', latinName: 'Al-Bayyinah', revelationPlace: 'Madaniyah', totalVerses: 8 },
  99: { number: 99, arabicName: 'الزَّلْزَلَة', latinName: 'Az-Zalzalah', revelationPlace: 'Madaniyah', totalVerses: 8 },
  100: { number: 100, arabicName: 'العَادِيَات', latinName: 'Al-\'Adiyat', revelationPlace: 'Makkiyyah', totalVerses: 11 },
  101: { number: 101, arabicName: 'القَارِعَة', latinName: 'Al-Qari\'ah', revelationPlace: 'Makkiyyah', totalVerses: 11 },
  102: { number: 102, arabicName: 'التَّكَاثُر', latinName: 'At-Takathur', revelationPlace: 'Makkiyyah', totalVerses: 8 },
  103: { number: 103, arabicName: 'العَصْر', latinName: 'Al-\'Asr', revelationPlace: 'Makkiyyah', totalVerses: 3 },
  104: { number: 104, arabicName: 'الهُمَزَة', latinName: 'Al-Humazah', revelationPlace: 'Makkiyyah', totalVerses: 9 },
  105: { number: 105, arabicName: 'الفِيل', latinName: 'Al-Fil', revelationPlace: 'Makkiyyah', totalVerses: 5 },
  106: { number: 106, arabicName: 'قُرَيْش', latinName: 'Quraysh', revelationPlace: 'Makkiyyah', totalVerses: 4 },
  107: { number: 107, arabicName: 'المَاعُون', latinName: 'Al-Ma\'un', revelationPlace: 'Makkiyyah', totalVerses: 7 },
  108: { number: 108, arabicName: 'الكَوْثَر', latinName: 'Al-Kawthar', revelationPlace: 'Makkiyyah', totalVerses: 3 },
  109: { number: 109, arabicName: 'الكَافِرُون', latinName: 'Al-Kafirun', revelationPlace: 'Makkiyyah', totalVerses: 6 },
  110: { number: 110, arabicName: 'النَّصْر', latinName: 'An-Nasr', revelationPlace: 'Madaniyah', totalVerses: 3 },
  111: { number: 111, arabicName: 'المَسَد', latinName: 'Al-Masad', revelationPlace: 'Makkiyyah', totalVerses: 5 },
  112: { number: 112, arabicName: 'الإِخْلَاص', latinName: 'Al-Ikhlas', revelationPlace: 'Makkiyyah', totalVerses: 4 },
  113: { number: 113, arabicName: 'الفَلَق', latinName: 'Al-Falaq', revelationPlace: 'Makkiyyah', totalVerses: 5 },
  114: { number: 114, arabicName: 'النَّاس', latinName: 'An-Nas', revelationPlace: 'Makkiyyah', totalVerses: 6 },
};

export function getArabicSurahName(surahNumber?: number | string | null): string {
  if (!surahNumber) return '';
  const num = typeof surahNumber === 'number' ? surahNumber : parseInt(String(surahNumber), 10);
  return SURAH_METADATA[num]?.arabicName || '';
}

export function getArabicSurahRevelation(place?: string): string {
  if (!place) return '';
  const lower = place.toLowerCase();
  if (lower.includes('mak') || lower.includes('mec') || lower.includes('マッカ') || lower.includes('麦加')) {
    return 'مَكِّيَّة';
  }
  if (lower.includes('mad') || lower.includes('med') || lower.includes('マディーナ') || lower.includes('麦地那')) {
    return 'مَدَنِيَّة';
  }
  return place;
}
