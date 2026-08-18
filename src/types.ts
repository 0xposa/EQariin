export interface VerseItem {
  verse_number?: number;
  text?: string;
  [key: string]: any;
}

export interface SurahJsonObject {
  surah_number?: number;
  surah_name?: string;
  surah_meaning?: string;
  revelation_place?: string;
  verse_count?: number;
  verses?: VerseItem[];
  [key: string]: any;
}
