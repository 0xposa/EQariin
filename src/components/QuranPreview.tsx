import React, { useMemo, useState, useEffect } from 'react';
import { Share2, Check } from 'lucide-react';
import {
  AppLanguage,
  UI_LABELS,
  formatSurahNumber,
  formatRevelationPlace,
} from '../constants/uiLabels';
import { SurahJsonObject, VerseItem } from '../types';
import { toSurahSlug } from '../utils/slugUtils';

interface QuranPreviewProps {
  jsonString: string;
  appLanguage?: AppLanguage;
  folder?: string;
  fileName?: string;
  initialVerse?: number | null;
}

export function QuranPreview({
  jsonString,
  appLanguage = 'Bahasa Indonesia',
  folder = '',
  fileName = '',
  initialVerse = null,
}: QuranPreviewProps) {
  const labels = UI_LABELS[appLanguage] || UI_LABELS['Bahasa Indonesia'];
  const [selectedVerse, setSelectedVerse] = useState<number | null>(initialVerse);
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);
  const [copiedSurah, setCopiedSurah] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const data = useMemo<SurahJsonObject | null>(() => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return null;
    }
  }, [jsonString]);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const scrollToVerse = (num: number) => {
    const container = containerRef.current;
    if (!container) return;
    const el = document.getElementById(`verse-${num}`);
    if (el) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offset = elRect.top - containerRect.top + container.scrollTop - 24;
      container.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
    }
  };

  // Auto-scroll and select if initialVerse is provided
  useEffect(() => {
    if (initialVerse) {
      setSelectedVerse(initialVerse);
      const timer = setTimeout(() => {
        scrollToVerse(initialVerse);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [initialVerse, data]);

  // Listen to hash changes (e.g., #verse-3)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#verse-')) {
        const num = parseInt(hash.replace('#verse-', ''), 10);
        if (!isNaN(num)) {
          setSelectedVerse(num);
          setTimeout(() => scrollToVerse(num), 100);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const surahNum = data?.surah_number ?? data?.nomor_surah;
  const surahName = data?.surah_name ?? data?.nama_surah;
  const surahMeaning = data?.surah_meaning ?? data?.arti_nama_surah;
  const revPlace = data?.revelation_place ?? data?.tempat_turun;
  const verseCount = data?.verse_count ?? data?.jumlah_ayat;
  const versesList: VerseItem[] = data?.verses ?? data?.ayat ?? [];

  const handleShareVerse = async (verseNum: number) => {
    // Construct clean and URL-safe share URL using slug, e.g. /app?ayat=al-anam-105
    const url = new URL(window.location.origin + '/app');
    const rawIdentifier = surahName || (fileName ? fileName.replace(/\.json$/i, '') : (surahNum ? String(surahNum) : '1'));
    const surahSlug = toSurahSlug(rawIdentifier);
    url.searchParams.set('ayat', `${surahSlug}-${verseNum}`);
    if (folder && folder.toLowerCase() !== 'arabic' && folder.toLowerCase() !== 'bahasa indonesia') {
      url.searchParams.set('folder', folder);
    }
    const shareUrl = url.toString();

    // Directly copy link to clipboard without triggering any OS share pop-up
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopiedVerse(verseNum);
    setTimeout(() => setCopiedVerse(null), 2500);

    const feedbackText = appLanguage === 'English' ? 'Verse link copied!' : 'Tautan ayat berhasil disalin!';
    setToastMessage(feedbackText);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleShareSurah = async () => {
    // Construct clean and URL-safe share URL for surah using slug, e.g. /app?surah=al-anam
    const url = new URL(window.location.origin + '/app');
    const rawIdentifier = surahName || (fileName ? fileName.replace(/\.json$/i, '') : (surahNum ? String(surahNum) : '1'));
    const surahSlug = toSurahSlug(rawIdentifier);
    url.searchParams.set('surah', surahSlug);
    if (folder && folder.toLowerCase() !== 'arabic' && folder.toLowerCase() !== 'bahasa indonesia') {
      url.searchParams.set('folder', folder);
    }
    const shareUrl = url.toString();

    // Directly copy link to clipboard without triggering any OS share pop-up
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopiedSurah(true);
    setTimeout(() => setCopiedSurah(false), 2500);

    const feedbackText = appLanguage === 'English' ? 'Surah link copied!' : 'Tautan surah berhasil disalin!';
    setToastMessage(feedbackText);
    setTimeout(() => setToastMessage(null), 2500);
  };

  if (!data) {
    return (
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-8 bg-stone-50 text-stone-500 text-center">
        <p className="text-sm">Gagal membaca data JSON untuk preview.</p>
      </div>
    );
  }

  const formattedSurahNum = formatSurahNumber(surahNum, labels);
  const formattedPlace = formatRevelationPlace(revPlace, labels);
  const badgeHeader = labels.surahHeader.replace('#', String(surahNum ?? '—'));

  return (
    <div
      ref={containerRef}
      className="relative flex-1 min-h-0 overflow-y-auto overscroll-contain bg-white text-stone-900 font-sans p-4 sm:p-8"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-stone-900/95 text-white text-xs sm:text-sm font-medium rounded-full shadow-2xl flex items-center gap-2 border border-stone-700 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Information Card */}
        <div className="relative bg-stone-50/90 border border-stone-200/90 rounded-2xl p-6 sm:p-8 text-center space-y-2.5 shadow-2xs">
          {/* Surah Share Button */}
          <button
            type="button"
            onClick={handleShareSurah}
            aria-label={`Bagikan Surah ${surahName || ''}`}
            title="Bagikan tautan Surah ini"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-emerald-50 text-stone-600 hover:text-emerald-700 active:scale-95 border border-stone-200 hover:border-emerald-300 shadow-2xs flex items-center justify-center cursor-pointer transition-all z-10"
          >
            {copiedSurah ? (
              <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>

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
            {surahNum !== undefined && surahNum !== null && (
              <>
                <span>
                  {typeof surahNum === 'number' ? `Surah ${surahNum}` : surahNum}
                </span>
                {(revPlace || verseCount || versesList.length > 0) && <span>•</span>}
              </>
            )}

            {revPlace && (
              <>
                <span>{revPlace}</span>
                {(verseCount || versesList.length > 0) && <span>•</span>}
              </>
            )}

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
            const isSelected = selectedVerse === verseNum;

            return (
              <div key={verseNum} className="relative">
                {/* Round Share Button: Appears on the left side precisely centered vertically when clicked */}
                {isSelected && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareVerse(verseNum);
                    }}
                    aria-label={`Bagikan Ayat ${verseNum}`}
                    title="Bagikan tautan ayat ini"
                    className="absolute -left-12 sm:-left-14 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-800 hover:bg-emerald-900 active:scale-90 text-white shadow-lg shadow-emerald-950/25 flex items-center justify-center cursor-pointer transition-all duration-200 z-20 animate-in fade-in zoom-in-75"
                  >
                    {copiedVerse === verseNum ? (
                      <Check className="w-4 h-4 text-white stroke-[2.5]" />
                    ) : (
                      <Share2 className="w-4 h-4 text-white" />
                    )}
                  </button>
                )}

                {/* Verse box with simple animation and dark green styling on click */}
                <div
                  id={`verse-${verseNum}`}
                  onClick={() => setSelectedVerse(isSelected ? null : verseNum)}
                  className={`flex items-start gap-4 p-4 sm:p-5 rounded-xl cursor-pointer transition-all duration-300 ease-out active:scale-[0.995] ${
                    isSelected
                      ? 'bg-emerald-950/[0.03] border-2 border-emerald-800 shadow-md ring-4 ring-emerald-800/10 scale-[1.01] sm:scale-[1.015]'
                      : 'bg-white border border-stone-150 hover:border-stone-300 hover:shadow-xs shadow-2xs'
                  }`}
                >
                  {/* Verse Number Circle */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-2xs transition-all duration-300 ${
                      isSelected
                        ? 'bg-emerald-800 text-white border border-emerald-900 scale-105 shadow-sm'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                    }`}
                  >
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
