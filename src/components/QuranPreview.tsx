import React, { useMemo } from 'react';
import {
  AppLanguage,
  UI_LABELS,
  formatSurahNumber,
  formatRevelationPlace,
} from '../constants/uiLabels';
import { SurahJsonObject, VerseItem } from '../types';

interface QuranPreviewProps {
  jsonString: string;
  appLanguage?: AppLanguage;
}

export function QuranPreview({ jsonString, appLanguage = 'Bahasa Indonesia' }: QuranPreviewProps) {
  const labels = UI_LABELS[appLanguage] || UI_LABELS['Bahasa Indonesia'];

  const data = useMemo<SurahJsonObject | null>(() => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return null;
    }
  }, [jsonString]);

  if (!data) {
    return (
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-8 bg-stone-50 text-stone-500 text-center">
        <p className="text-sm">Gagal membaca data JSON untuk preview.</p>
      </div>
    );
  }

  const surahNum = data.surah_number ?? data.nomor_surah;
  const surahName = data.surah_name ?? data.nama_surah;
  const surahMeaning = data.surah_meaning ?? data.arti_nama_surah;
  const revPlace = data.revelation_place ?? data.tempat_turun;
  const verseCount = data.verse_count ?? data.jumlah_ayat;
  const versesList: VerseItem[] = data.verses ?? data.ayat ?? [];

  const formattedSurahNum = formatSurahNumber(surahNum, labels);
  const formattedPlace = formatRevelationPlace(revPlace, labels);
  const badgeHeader = labels.surahHeader.replace('#', String(surahNum ?? '—'));

  return (
    <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-white text-stone-900 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Information Card */}
        <div className="bg-stone-50/90 border border-stone-200/90 rounded-2xl p-6 sm:p-8 text-center space-y-2.5 shadow-2xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
            <span>{badgeHeader}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            {surahName || 'Surah'}
          </h1>

          {surahMeaning && (
            <p className="text-sm sm:text-base font-medium text-stone-600">
              ({surahMeaning})
            </p>
          )}

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-stone-500 font-medium">
            <span>{formattedSurahNum}</span>
            <span>•</span>
            <span>{formattedPlace}</span>
            <span>•</span>
            <span>
              {verseCount ?? versesList.length} {labels.ayatLabel}
            </span>
          </div>
        </div>

        {/* Verses List */}
        <div className="space-y-4 pt-2 pb-6">
          {versesList.map((item, idx) => {
            const verseNum = item.verse_number ?? item.nomor_ayat ?? item.nomor ?? item.ayat ?? idx + 1;
            const verseText = item.text ?? item.teks ?? '';
            const isArabicText = /[\u0600-\u06FF]/.test(verseText);

            return (
              <div
                key={verseNum}
                className="flex items-start gap-4 p-4 sm:p-5 bg-white border border-stone-150 hover:border-stone-250 rounded-xl transition-colors shadow-2xs"
              >
                {/* Verse Number Circle */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  {verseNum}
                </div>

                {/* Verse Text */}
                <div className="flex-1 min-w-0 pt-1">
                  <p
                    dir={isArabicText ? 'rtl' : 'ltr'}
                    className={
                      isArabicText
                        ? 'text-right font-serif text-2xl sm:text-3xl leading-[2.2] sm:leading-[2.4] text-stone-900 tracking-wide font-normal'
                        : 'text-left font-sans text-stone-800 text-sm sm:text-base leading-relaxed'
                    }
                  >
                    {verseText}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
