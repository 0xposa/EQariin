export interface VerseItem {
  ayat_number?: number;
  verse_number?: number;
  nomor_ayat?: number;
  nomor?: number;
  ayat?: number;
  text?: string;
  teks?: string;
  [key: string]: any;
}

export interface SurahJsonObject {
  surah_number?: number;
  nomor_surah?: number;
  surah_name?: string;
  nama_surah?: string;
  surah_meaning?: string;
  arti_nama_surah?: string;
  revelation_place?: string;
  tempat_turun?: string;
  ayat_count?: number;
  verse_count?: number;
  jumlah_ayat?: number;
  verses?: VerseItem[];
  ayat?: VerseItem[];
  [key: string]: any;
}

export interface FileInfo {
  fullPath: string;
  folder: string;
  fileName: string;
  content: string;
}
