import React, { useMemo, useState, useEffect } from 'react';
import { Share2, Check, Sparkles, Copy, ExternalLink, Image as ImageIcon } from 'lucide-react';
import {
  AppLanguage,
  UI_LABELS,
  formatSurahNumber,
} from '../constants/uiLabels';
import { SurahJsonObject, VerseItem, FileInfo } from '../types';
import { toSurahSlug, matchesSurahSlug } from '../utils/slugUtils';
import { getArabicSurahName } from '../utils/quranMeta';
import AyatCardModal, { AyatCardData } from './AyatCardModal';

interface QuranPreviewProps {
  jsonString: string;
  appLanguage?: AppLanguage;
  folder?: string;
  fileName?: string;
  initialVerse?: number | null;
  activeVerse?: number | null;
  onVerseChange?: (verseNum: number | null) => void;
  allFiles?: FileInfo[];
}

export function QuranPreview({
  jsonString,
  appLanguage = 'Bahasa Indonesia',
  folder = '',
  fileName = '',
  initialVerse = null,
  activeVerse,
  onVerseChange,
  allFiles = [],
}: QuranPreviewProps) {
  const labels = UI_LABELS[appLanguage] || UI_LABELS['Bahasa Indonesia'];
  const [localSelectedVerse, setLocalSelectedVerse] = useState<number | null>(initialVerse);
  const selectedVerse = activeVerse !== undefined ? activeVerse : localSelectedVerse;
  
  const handleSelectVerse = (verseNum: number | null) => {
    setLocalSelectedVerse(verseNum);
    if (onVerseChange) {
      onVerseChange(verseNum);
    }
  };

  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);
  const [copiedTextVerse, setCopiedTextVerse] = useState<number | null>(null);
  const [copiedSurah, setCopiedSurah] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Ayat Card Modal state
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);
  const [cardModalVerseNum, setCardModalVerseNum] = useState<number>(1);

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

  const surahNum = data?.surah_number ?? data?.nomor_surah;
  const surahName = data?.surah_name ?? data?.nama_surah;
  const surahMeaning = data?.surah_meaning ?? data?.arti_nama_surah;
  const revPlace = data?.revelation_place ?? data?.tempat_turun;
  const verseCount = data?.ayat_count ?? data?.verse_count ?? data?.jumlah_ayat;
  const versesList: VerseItem[] = data?.verses ?? data?.ayat ?? [];

  // Track the current surah number/identifier
  const prevSurahKeyRef = React.useRef<string | null>(null);

  useEffect(() => {
    const currentSurahKey = surahNum ? `surah-${surahNum}` : (surahName || fileName || '');
    
    if (initialVerse) {
      handleSelectVerse(initialVerse);
      const timer = setTimeout(() => scrollToVerse(initialVerse), 300);
      prevSurahKeyRef.current = currentSurahKey;
      return () => clearTimeout(timer);
    }

    if (selectedVerse) {
      const timer1 = setTimeout(() => scrollToVerse(selectedVerse), 100);
      const timer2 = setTimeout(() => scrollToVerse(selectedVerse), 300);
      prevSurahKeyRef.current = currentSurahKey;
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      if (currentSurahKey && prevSurahKeyRef.current && prevSurahKeyRef.current !== currentSurahKey) {
        if (containerRef.current) {
          containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
      prevSurahKeyRef.current = currentSurahKey;
    }
  }, [initialVerse, selectedVerse, data, surahNum, surahName, fileName]);

  // Lookup parsed surah files for Arabic cross-reference and Translation cross-reference
  const pairedSurahs = useMemo(() => {
    let arabicData: SurahJsonObject | null = null;
    let targetLangData: SurahJsonObject | null = null;
    let indonesianData: SurahJsonObject | null = null;
    let englishData: SurahJsonObject | null = null;

    if (allFiles && allFiles.length > 0) {
      const targetSlug = toSurahSlug(surahName || fileName);

      // Find Arabic file
      const arabicFile = allFiles.find((f) => {
        if (f.folder.toLowerCase() !== 'arabic') return false;
        return matchesSurahSlug(f.fileName, targetSlug) || (surahNum && f.content.includes(`"surah_number": ${surahNum}`));
      });
      if (arabicFile) {
        try { arabicData = JSON.parse(arabicFile.content); } catch {}
      }

      // Find user selected appLanguage file (if not Arabic)
      if (appLanguage && appLanguage.toLowerCase() !== 'arabic') {
        const langFile = allFiles.find((f) => {
          if (f.folder.toLowerCase() !== appLanguage.toLowerCase()) return false;
          return matchesSurahSlug(f.fileName, targetSlug) || (surahNum && (f.content.includes(`"surah_number": ${surahNum}`) || f.content.includes(`"nomor_surah": ${surahNum}`)));
        });
        if (langFile) {
          try { targetLangData = JSON.parse(langFile.content); } catch {}
        }
      }

      // Fallback Indonesian
      const indoFile = allFiles.find((f) => {
        if (f.folder.toLowerCase() !== 'bahasa indonesia') return false;
        return matchesSurahSlug(f.fileName, targetSlug) || (surahNum && (f.content.includes(`"nomor_surah": ${surahNum}`) || f.content.includes(`"surah_number": ${surahNum}`)));
      });
      if (indoFile) {
        try { indonesianData = JSON.parse(indoFile.content); } catch {}
      }

      // Fallback English
      const engFile = allFiles.find((f) => {
        if (f.folder.toLowerCase() !== 'english') return false;
        return matchesSurahSlug(f.fileName, targetSlug) || (surahNum && f.content.includes(`"surah_number": ${surahNum}`));
      });
      if (engFile) {
        try { englishData = JSON.parse(engFile.content); } catch {}
      }
    }

    return { arabicData, targetLangData, indonesianData, englishData };
  }, [allFiles, surahName, fileName, surahNum, appLanguage]);

  // Helper to extract Arabic and Translation text for a specific verse
  const getVersePair = (vNum: number) => {
    let arabicText = '';
    let translationText = '';

    // If current file is Arabic
    const currentIsArabic = folder.toLowerCase() === 'arabic' || /[\u0600-\u06FF]/.test(versesList[0]?.text || versesList[0]?.teks || '');

    const currentItem = versesList.find(
      (v, idx) => (v.ayat_number ?? v.verse_number ?? v.nomor_ayat ?? v.nomor ?? v.ayat ?? idx + 1) === vNum
    );
    const currentText = currentItem?.text ?? currentItem?.teks ?? '';

    if (currentIsArabic) {
      arabicText = currentText;
      // In Arabic app language mode, translation is optional
      if (appLanguage.toLowerCase() === 'arabic') {
        translationText = '';
      } else if (pairedSurahs.targetLangData) {
        const langVerses: VerseItem[] = pairedSurahs.targetLangData.verses ?? pairedSurahs.targetLangData.ayat ?? [];
        const langItem = langVerses.find((v, idx) => (v.ayat_number ?? v.verse_number ?? v.nomor_ayat ?? v.nomor ?? v.ayat ?? idx + 1) === vNum);
        if (langItem) translationText = langItem.text ?? langItem.teks ?? '';
      } else if (pairedSurahs.indonesianData) {
        const indoVerses: VerseItem[] = pairedSurahs.indonesianData.verses ?? pairedSurahs.indonesianData.ayat ?? [];
        const indoItem = indoVerses.find((v, idx) => (v.ayat_number ?? v.verse_number ?? v.nomor_ayat ?? v.nomor ?? v.ayat ?? idx + 1) === vNum);
        if (indoItem) translationText = indoItem.text ?? indoItem.teks ?? '';
      } else if (pairedSurahs.englishData) {
        const engVerses: VerseItem[] = pairedSurahs.englishData.ayat ?? pairedSurahs.englishData.verses ?? [];
        const engItem = engVerses.find((v, idx) => (v.ayat_number ?? v.verse_number ?? idx + 1) === vNum);
        if (engItem) translationText = engItem.text ?? '';
      }
    } else {
      translationText = currentText;
      // Find Arabic from paired Arabic
      const arabVerses: VerseItem[] = pairedSurahs.arabicData?.ayat ?? pairedSurahs.arabicData?.verses ?? [];
      const arabItem = arabVerses.find((v, idx) => (v.ayat_number ?? v.verse_number ?? idx + 1) === vNum);
      if (arabItem) {
        arabicText = arabItem.text ?? '';
      }
    }

    return { arabicText, translationText, currentText };
  };

  const handleOpenAyatCard = (verseNum: number) => {
    setCardModalVerseNum(verseNum);
    setIsCardModalOpen(true);
  };

  const handleShareVerse = async (verseNum: number) => {
    const url = new URL(window.location.origin + '/app');
    const rawIdentifier = surahName || (fileName ? fileName.replace(/\.json$/i, '') : (surahNum ? String(surahNum) : '1'));
    const surahSlug = toSurahSlug(rawIdentifier);
    url.searchParams.set('ayat', `${surahSlug}-${verseNum}`);
    if (folder && folder.toLowerCase() !== 'arabic' && folder.toLowerCase() !== 'bahasa indonesia') {
      url.searchParams.set('folder', folder);
    }
    const shareUrl = url.toString();

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

    setToastMessage(labels.copyLinkSuccessToast);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyVerseText = async (verseNum: number) => {
    const { arabicText, translationText, currentText } = getVersePair(verseNum);
    const surahTag = `QS. ${surahName || 'Surah'} : ${verseNum}`;
    let formatted = `${surahTag}\n`;
    if (arabicText) formatted += `${arabicText}\n\n`;
    if (translationText) formatted += `"${translationText}"\n\n`;
    else if (!arabicText) formatted += `"${currentText}"\n\n`;
    formatted += `Baca di: ${window.location.origin}/app?ayat=${toSurahSlug(surahName || String(surahNum))}-${verseNum}`;

    try {
      await navigator.clipboard.writeText(formatted);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = formatted;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopiedTextVerse(verseNum);
    setTimeout(() => setCopiedTextVerse(null), 2500);
    setToastMessage(labels.copyTextSuccessToast);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleShareSurah = async () => {
    const url = new URL(window.location.origin + '/app');
    const rawIdentifier = surahName || (fileName ? fileName.replace(/\.json$/i, '') : (surahNum ? String(surahNum) : '1'));
    const surahSlug = toSurahSlug(rawIdentifier);
    url.searchParams.set('surah', surahSlug);
    if (folder && folder.toLowerCase() !== 'arabic' && folder.toLowerCase() !== 'bahasa indonesia') {
      url.searchParams.set('folder', folder);
    }
    const shareUrl = url.toString();

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

    setToastMessage(labels.copyLinkSuccessToast);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Determine surah_meaning according to appLanguage
  // Rule: Value dari key surah_meaning mengikuti bahasa aplikasi, tidak berlaku bagi bahasa arab!
  // Rule: Jika tidak ada berkas JSON-nya untuk bahasa tersebut, maka jangan diisi (kosong), berlaku pada semua bahasa!
  const appMeaning = useMemo(() => {
    if (!appLanguage || appLanguage.toLowerCase() === 'arabic') {
      return '';
    }

    // 1. If the current active file itself is in the target appLanguage folder
    if (folder && folder.toLowerCase() === appLanguage.toLowerCase()) {
      if (surahMeaning) return surahMeaning;
    }

    // 2. From matched file in the target appLanguage folder (via pairedSurahs.targetLangData)
    const targetMeaning = pairedSurahs.targetLangData?.surah_meaning || pairedSurahs.targetLangData?.arti_nama_surah;
    if (targetMeaning) return targetMeaning;

    // Strict policy: Jika tidak ada JSON-nya maka jangan diisi (berlaku untuk semua bahasa)
    return '';
  }, [appLanguage, pairedSurahs, folder, surahMeaning]);

  // Build card modal data for current active verse
  const cardModalData: AyatCardData = useMemo(() => {
    const vNum = cardModalVerseNum || selectedVerse || 1;
    const { arabicText, translationText, currentText } = getVersePair(vNum);

    return {
      surahNumber: typeof surahNum === 'number' ? surahNum : parseInt(String(surahNum), 10) || 1,
      surahName: surahName || 'Surah',
      surahMeaning: appMeaning,
      revelationPlace: revPlace || '',
      totalVerses: verseCount || versesList.length,
      verseNumber: vNum,
      verseText: currentText,
      arabicText: arabicText,
      translationText: translationText,
      folder: folder,
      fileName: fileName,
    };
  }, [cardModalVerseNum, selectedVerse, surahNum, surahName, appMeaning, revPlace, verseCount, versesList, folder, fileName, pairedSurahs]);

  // List of all verses for prev/next in modal
  const allVersesList = useMemo(() => {
    return versesList.map((item, idx) => {
      const vNum = item.ayat_number ?? item.verse_number ?? item.nomor_ayat ?? item.nomor ?? item.ayat ?? idx + 1;
      const { arabicText, translationText, currentText } = getVersePair(vNum);
      return {
        verseNumber: vNum,
        verseText: currentText,
        arabicText,
        translationText,
      };
    });
  }, [versesList, pairedSurahs]);

  if (!data) {
    return (
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-8 bg-stone-50 text-stone-500 text-center">
        <p className="text-sm">Gagal membaca data JSON untuk preview.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex-1 min-h-0 overflow-y-auto overscroll-contain bg-white text-stone-900 font-sans p-4 sm:p-8"
    >
      {/* Ayat Card Generator Modal */}
      {isCardModalOpen && (
        <AyatCardModal
          isOpen={isCardModalOpen}
          onClose={() => setIsCardModalOpen(false)}
          data={cardModalData}
          appLanguage={appLanguage}
          allVerses={allVersesList}
          onSelectVerse={(vNum) => setCardModalVerseNum(vNum)}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-stone-900/95 text-white text-xs sm:text-sm font-medium rounded-full shadow-2xl flex items-center gap-2 border border-stone-700 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Information Card */}
        <div className="relative bg-gradient-to-b from-stone-50 via-emerald-50/20 to-stone-50/90 border border-stone-200/90 rounded-3xl p-6 sm:p-9 text-center space-y-3.5 shadow-xs overflow-hidden">
          {/* Subtle Islamic Motif Background Accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-emerald-500/5 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-radial from-teal-500/5 to-transparent rounded-full -ml-16 -mb-16 pointer-events-none" />

          {/* Header Action Buttons */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-10">
            {/* Surah Share Link Button */}
            <button
              type="button"
              onClick={handleShareSurah}
              aria-label={`Share ${surahName || ''}`}
              title={labels.shareVerseBtn}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-emerald-50 text-stone-600 hover:text-emerald-700 active:scale-95 border border-stone-200 hover:border-emerald-300 shadow-2xs flex items-center justify-center cursor-pointer transition-all"
            >
              {copiedSurah ? (
                <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
          </div>



          {/* Main Arabic Surah Title */}
          {(() => {
            const rawArabicName = getArabicSurahName(surahNum) || (folder.toLowerCase() === 'arabic' ? surahName : '');
            const arabicDisplayName = rawArabicName
              ? (rawArabicName.startsWith('سُورَةُ') || rawArabicName.startsWith('سورة') ? rawArabicName : `سُورَةُ ${rawArabicName}`)
              : '';
            
            return (
              <div className="space-y-2 pt-1">
                {arabicDisplayName && (
                  <h1
                    dir="rtl"
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-emerald-950 tracking-wide select-text drop-shadow-2xs leading-relaxed"
                    style={{ fontFamily: "'Amiri', 'Traditional Arabic', 'Scheherazade New', serif" }}
                  >
                    {arabicDisplayName}
                  </h1>
                )}

                {/* Transliterated / Localized Surah Name */}
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                  <span>{surahName || 'Surah'}</span>
                  {appMeaning && (
                    <span className="ml-2 text-stone-900 font-bold">({appMeaning})</span>
                  )}
                </h2>
              </div>
            );
          })()}

          {/* Metadata Row: Surah Number, Revelation Place, and Total Ayat */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-stone-500 font-medium">
            {/* Surah Number (Surah ke berapa) directly from JSON */}
            {surahNum !== undefined && surahNum !== null && (
              <div className="inline-flex items-center gap-1">
                <span>{formatSurahNumber(surahNum, labels)}</span>
              </div>
            )}

            {surahNum !== undefined && surahNum !== null && revPlace && (
              <span className="text-stone-300 select-none">•</span>
            )}

            {/* Revelation place directly from JSON */}
            {revPlace && (
              <div className="inline-flex items-center gap-1">
                <span>{revPlace}</span>
              </div>
            )}

            {((surahNum !== undefined && surahNum !== null) || revPlace) && (
              <span className="text-stone-300 select-none">•</span>
            )}

            {/* Total Verses / Ayat */}
            <div className="inline-flex items-center gap-1">
              <span>{verseCount ?? versesList.length}</span>
              <span>{labels.ayatLabel}</span>
            </div>
          </div>
        </div>

        {/* Verses List */}
        <div className="space-y-4 pt-2 pb-6">
          {versesList.map((item, idx) => {
            const verseNum = item.ayat_number ?? item.verse_number ?? item.nomor_ayat ?? item.nomor ?? item.ayat ?? idx + 1;
            const { arabicText, translationText, currentText } = getVersePair(verseNum);
            const isSelected = selectedVerse === verseNum;

            // Determine if the current active file contains Arabic script or is from Arabic folder
            const isCurrentArabic = folder.toLowerCase() === 'arabic' || /[\u0600-\u06FF]/.test(currentText);

            return (
              <div key={verseNum} className="relative group">
                {/* Verse box with interactive animation and green highlight on click */}
                <div
                  id={`verse-${verseNum}`}
                  onClick={() => handleSelectVerse(isSelected ? null : verseNum)}
                  className={`flex flex-col gap-4 p-4 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 ease-out active:scale-[0.995] ${
                    isSelected
                      ? 'bg-emerald-950/[0.03] border-2 border-emerald-800 shadow-md ring-4 ring-emerald-800/10 scale-[1.01] sm:scale-[1.015]'
                      : 'bg-white border border-stone-200/90 hover:border-emerald-300 hover:shadow-xs shadow-2xs'
                  }`}
                >
                  {/* Top row of the verse item: Verse Number Badge & Main Verse Text */}
                  <div className="flex items-start gap-4">
                    {/* Verse Number Circle */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-2xs transition-all duration-300 ${
                        isSelected
                          ? 'bg-emerald-800 text-white border border-emerald-900 scale-105 shadow-sm'
                          : 'bg-emerald-50 text-emerald-850 border border-emerald-200/80 text-emerald-900'
                      }`}
                    >
                      {verseNum}
                    </div>

                    {/* Main Verse Text based on selected Language/File */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      {isCurrentArabic ? (
                        <p
                          dir="rtl"
                          className="font-['Amiri',serif] text-2xl sm:text-3xl lg:text-4xl leading-[2.3] sm:leading-[2.5] text-stone-900 font-normal text-right select-text tracking-wide"
                          style={{ fontFamily: "'Amiri', 'Traditional Arabic', 'Scheherazade New', serif" }}
                        >
                          {currentText || arabicText}
                        </p>
                      ) : (
                        <p
                          dir="ltr"
                          className="text-left font-sans text-stone-800 text-sm sm:text-[15px] sm:leading-relaxed select-text"
                        >
                          {currentText || translationText}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Action Toolbar on Verse Click / Active */}
                  {isSelected && (
                    <div className="mt-2 pt-3 border-t border-emerald-900/10 flex flex-wrap items-center justify-between gap-2 animate-in fade-in slide-in-from-top-1 duration-150">
                      {/* Left: Ayat Card Trigger Button (PnL Meme Card Style) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAyatCard(verseNum);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold shadow-md shadow-emerald-950/20 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>{labels.ayatCardBtn}</span>
                      </button>

                      {/* Right: Quick Copy & Share buttons */}
                      <div className="flex items-center gap-1.5 ml-auto">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyVerseText(verseNum);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium border border-stone-200/80 flex items-center gap-1 transition-all"
                          title={labels.copyTextBtn}
                        >
                          {copiedTextVerse === verseNum ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-stone-500" />
                          )}
                          <span className="hidden sm:inline">
                            {copiedTextVerse === verseNum ? labels.copiedText : labels.copyTextBtn}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShareVerse(verseNum);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium border border-stone-200/80 flex items-center gap-1 transition-all"
                          title={labels.shareVerseBtn}
                        >
                          {copiedVerse === verseNum ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5 text-stone-500" />
                          )}
                          <span className="hidden sm:inline">
                            {copiedVerse === verseNum ? labels.copiedLink : labels.shareVerseBtn}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
