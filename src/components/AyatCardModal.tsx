import React, { useState, useRef, useMemo } from 'react';
import { toPng, toBlob } from 'html-to-image';
import {
  X,
  Download,
  Copy,
  Check,
  Share2,
  Sparkles,
  Palette,
  Eye,
  Type,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { toSurahSlug } from '../utils/slugUtils';
import {
  AppLanguage,
  UI_LABELS,
  formatSurahNumber,
} from '../constants/uiLabels';

export interface AyatCardData {
  surahNumber?: number;
  surahName?: string;
  surahMeaning?: string;
  revelationPlace?: string;
  totalVerses?: number;
  verseNumber: number;
  verseText: string;
  arabicText?: string;
  translationText?: string;
  folder?: string;
  fileName?: string;
}

interface AyatCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AyatCardData;
  appLanguage?: string;
  allVerses?: Array<{
    verseNumber: number;
    verseText: string;
    arabicText?: string;
    translationText?: string;
  }>;
  onSelectVerse?: (verseNum: number) => void;
}

type CardTheme = 'emerald' | 'cyber' | 'obsidian-gold' | 'twilight' | 'ivory';
type AspectRatio = 'square' | 'story' | 'banner';

export default function AyatCardModal({
  isOpen,
  onClose,
  data,
  appLanguage = 'Bahasa Indonesia',
  allVerses = [],
  onSelectVerse,
}: AyatCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const labels = UI_LABELS[appLanguage as AppLanguage] || UI_LABELS['Bahasa Indonesia'];

  const [theme, setTheme] = useState<CardTheme>('emerald');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('square');
  const [showArabic, setShowArabic] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [showMeaning, setShowMeaning] = useState<boolean>(true);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedImage, setCopiedImage] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const surahNum = data.surahNumber || 1;
  const surahName = data.surahName || 'Surah';
  const verseNum = data.verseNumber || 1;

  // Determine Arabic vs Translation text
  const isInputArabic = /[\u0600-\u06FF]/.test(data.verseText || '');
  const primaryArabic = data.arabicText || (isInputArabic ? data.verseText : '');
  const primaryTranslation = data.translationText || (!isInputArabic ? data.verseText : '');

  // Format Surah display tag
  const surahBadge = `QS. ${surahName.toUpperCase()} : ${verseNum}`;
  const revPlace = data.revelationPlace || '';
  const formattedSurahRef = formatSurahNumber(surahNum, labels);

  const currentVerseIdx = allVerses.findIndex((v) => v.verseNumber === verseNum);
  const hasPrev = currentVerseIdx > 0;
  const hasNext = currentVerseIdx >= 0 && currentVerseIdx < allVerses.length - 1;

  const handlePrevVerse = () => {
    if (hasPrev && onSelectVerse) {
      onSelectVerse(allVerses[currentVerseIdx - 1].verseNumber);
    }
  };

  const handleNextVerse = () => {
    if (hasNext && onSelectVerse) {
      onSelectVerse(allVerses[currentVerseIdx + 1].verseNumber);
    }
  };

  const getShareUrl = () => {
    const url = new URL(window.location.origin + '/app');
    const slug = toSurahSlug(surahName || String(surahNum));
    url.searchParams.set('ayat', `${slug}-${verseNum}`);
    if (data.folder && data.folder.toLowerCase() !== 'arabic' && data.folder.toLowerCase() !== 'bahasa indonesia') {
      url.searchParams.set('folder', data.folder);
    }
    return url.toString();
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleDownloadPng = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2.5,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `AyatCard_${toSurahSlug(surahName)}_${verseNum}.png`;
      link.href = dataUrl;
      link.click();
      showToast(labels.downloadSuccessToast);
    } catch (err) {
      console.error('Download error:', err);
      showToast('Error generating image');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const blob = await toBlob(cardRef.current, {
        quality: 1,
        pixelRatio: 2.5,
        cacheBust: true,
      });
      if (blob) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ]);
          setCopiedImage(true);
          setTimeout(() => setCopiedImage(false), 2500);
          showToast(labels.copyImageSuccessToast);
        } catch {
          handleDownloadPng();
        }
      }
    } catch (err) {
      console.error('Copy image error:', err);
      showToast('Error copying image');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
    showToast(labels.copyLinkSuccessToast);
  };

  const handleShareSocial = (platform: 'wa' | 'x' | 'tg') => {
    const url = getShareUrl();
    const text = `📖 ${surahBadge} (${surahName})\n\n"${primaryTranslation || primaryArabic}"\n\n${url}`;

    if (platform === 'wa') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'x') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'tg') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`📖 ${surahBadge}\n"${primaryTranslation || primaryArabic}"`)}`, '_blank');
    }
  };

  // Theme Styling Classes
  const getThemeStyles = () => {
    switch (theme) {
      case 'emerald':
        return {
          container: 'bg-gradient-to-br from-[#021d13] via-[#05110d] to-[#010a06] text-white border-emerald-500/40 shadow-2xl shadow-emerald-950/80',
          accentGlow: 'bg-emerald-500/10',
          badgeHeader: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          badgeTag: 'bg-emerald-950/80 text-emerald-400 border-emerald-700/50',
          pnlBadge: 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-extrabold shadow-lg shadow-emerald-500/30',
          arabicText: 'text-emerald-50 drop-shadow-[0_2px_8px_rgba(16,185,129,0.3)]',
          translationText: 'text-emerald-100/90 border-l-2 border-emerald-500/60',
          footerBadge: 'text-emerald-400/80 border-emerald-500/20 bg-emerald-950/40',
          gridOverlay: 'bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:18px_18px] opacity-15',
        };
      case 'cyber':
        return {
          container: 'bg-gradient-to-br from-[#070b19] via-[#04060f] to-[#010207] text-white border-cyan-500/40 shadow-2xl shadow-cyan-950/80',
          accentGlow: 'bg-cyan-500/10',
          badgeHeader: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
          badgeTag: 'bg-cyan-950/80 text-cyan-400 border-cyan-700/50',
          pnlBadge: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold shadow-lg shadow-cyan-500/30',
          arabicText: 'text-cyan-50 drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)]',
          translationText: 'text-cyan-100/90 border-l-2 border-cyan-400/60',
          footerBadge: 'text-cyan-400/80 border-cyan-500/20 bg-cyan-950/40',
          gridOverlay: 'bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:18px_18px] opacity-20',
        };
      case 'obsidian-gold':
        return {
          container: 'bg-gradient-to-br from-[#12100e] via-[#090807] to-[#000000] text-white border-amber-500/40 shadow-2xl shadow-amber-950/80',
          accentGlow: 'bg-amber-500/10',
          badgeHeader: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          badgeTag: 'bg-amber-950/80 text-amber-400 border-amber-700/50',
          pnlBadge: 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-black font-extrabold shadow-lg shadow-amber-500/30',
          arabicText: 'text-amber-50 drop-shadow-[0_2px_8px_rgba(245,158,11,0.35)]',
          translationText: 'text-amber-100/90 border-l-2 border-amber-400/60',
          footerBadge: 'text-amber-400/80 border-amber-500/20 bg-amber-950/40',
          gridOverlay: 'bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:18px_18px] opacity-15',
        };
      case 'twilight':
        return {
          container: 'bg-gradient-to-br from-[#1e0e24] via-[#100717] to-[#050208] text-white border-purple-500/40 shadow-2xl shadow-purple-950/80',
          accentGlow: 'bg-purple-500/10',
          badgeHeader: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          badgeTag: 'bg-purple-950/80 text-purple-300 border-purple-700/50',
          pnlBadge: 'bg-gradient-to-r from-fuchsia-400 to-pink-500 text-black font-extrabold shadow-lg shadow-fuchsia-500/30',
          arabicText: 'text-purple-50 drop-shadow-[0_2px_8px_rgba(217,70,239,0.3)]',
          translationText: 'text-purple-100/90 border-l-2 border-purple-400/60',
          footerBadge: 'text-purple-400/80 border-purple-500/20 bg-purple-950/40',
          gridOverlay: 'bg-[radial-gradient(#d946ef_1px,transparent_1px)] [background-size:18px_18px] opacity-15',
        };
      case 'ivory':
      default:
        return {
          container: 'bg-gradient-to-br from-[#fcfbf9] via-[#f7f5f0] to-[#eae5dc] text-stone-900 border-stone-300 shadow-2xl shadow-stone-900/15',
          accentGlow: 'bg-emerald-600/5',
          badgeHeader: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          badgeTag: 'bg-stone-200/80 text-stone-700 border-stone-300',
          pnlBadge: 'bg-gradient-to-r from-emerald-800 to-teal-700 text-white font-extrabold shadow-md shadow-emerald-900/20',
          arabicText: 'text-stone-950',
          translationText: 'text-stone-800 border-l-2 border-emerald-800',
          footerBadge: 'text-stone-600 border-stone-300 bg-stone-100',
          gridOverlay: 'bg-[radial-gradient(#047857_1px,transparent_1px)] [background-size:18px_18px] opacity-5',
        };
    }
  };

  const themeStyles = getThemeStyles();

  // Aspect ratio dimension classes
  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case 'story':
        return 'w-full max-w-[380px] min-h-[640px] aspect-[9/16]';
      case 'banner':
        return 'w-full max-w-[620px] min-h-[350px] aspect-[16/9]';
      case 'square':
      default:
        return 'w-full max-w-[480px] min-h-[480px] aspect-square';
    }
  };

  // Font size classes
  const getArabicFontSize = () => {
    switch (fontSize) {
      case 'normal':
        return 'text-2xl sm:text-3xl leading-[2.1]';
      case 'xlarge':
        return 'text-3xl sm:text-4xl md:text-[2.6rem] leading-[2.4]';
      case 'large':
      default:
        return 'text-2xl sm:text-3xl md:text-4xl leading-[2.3]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-60 px-4 py-2.5 bg-stone-900/95 text-white text-xs sm:text-sm font-medium rounded-full shadow-2xl flex items-center gap-2 border border-emerald-500/40 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative w-full max-w-5xl bg-[#0f1117] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[95vh]">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-800/80 bg-[#141824]/90 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {labels.ayatCardModalTitle}
                </h2>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {labels.pnlEdition}
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                {surahBadge} • {surahName}{data.surahMeaning && appLanguage.toLowerCase() !== 'arabic' ? ` (${data.surahMeaning})` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Previous / Next Verse Switcher */}
            {allVerses.length > 0 && (
              <div className="hidden sm:flex items-center bg-stone-800/80 rounded-lg p-0.5 border border-stone-700">
                <button
                  type="button"
                  onClick={handlePrevVerse}
                  disabled={!hasPrev}
                  className="p-1 text-stone-400 hover:text-white disabled:opacity-30 disabled:hover:text-stone-400 transition-colors"
                  title={labels.prevVerse}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 text-xs font-mono text-stone-300">
                  {verseNum} / {data.totalVerses || allVerses.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextVerse}
                  disabled={!hasNext}
                  className="p-1 text-stone-400 hover:text-white disabled:opacity-30 disabled:hover:text-stone-400 transition-colors"
                  title={labels.nextVerse}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
              title={labels.closeBtn}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body (2 Columns on Desktop) */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-y-auto">
          {/* Left: Interactive Live Card Preview Canvas */}
          <div className="flex-1 bg-[#090b10] p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-stone-800/80">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent pointer-events-none" />

            {/* THE AYAT CARD NODE (Exported to PNG/Clipboard) */}
            <div
              ref={cardRef}
              className={`relative rounded-3xl p-6 sm:p-8 border flex flex-col justify-between overflow-hidden transition-all duration-300 ${themeStyles.container} ${getAspectRatioClasses()}`}
            >
              {/* Radial Grid & Ambient Highlight */}
              <div className={`absolute inset-0 pointer-events-none ${themeStyles.gridOverlay}`} />
              <div className={`absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none ${themeStyles.accentGlow}`} />
              <div className={`absolute -bottom-24 -left-24 w-60 h-60 rounded-full blur-3xl pointer-events-none ${themeStyles.accentGlow}`} />

              {/* CARD TOP ROW (Crypto PnL style header) */}
              <div className="relative z-10 flex items-start justify-between gap-3 border-b pb-4 border-current/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base bg-current/10 border border-current/20 shadow-xs">
                    📖
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] tracking-widest font-black uppercase opacity-75 font-mono">
                        AL-QUR'ANUL KARIM
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <div className="text-base sm:text-lg font-black tracking-tight font-sans">
                      <span>{surahName}</span>
                      {data.surahMeaning && appLanguage.toLowerCase() !== 'arabic' && (
                        <span className="font-semibold opacity-85 text-sm ml-1.5">({data.surahMeaning})</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  {/* High Impact PnL style badge */}
                  <div className={`px-2.5 py-1 rounded-lg text-xs tracking-wider uppercase ${themeStyles.pnlBadge}`}>
                    {surahBadge}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono opacity-80">
                    <span>{formattedSurahRef}</span>
                    {revPlace && <span>• {revPlace.toUpperCase()}</span>}
                  </div>
                </div>
              </div>

              {/* CARD MAIN CONTENT (Arabic Verse & Translation) */}
              <div className="relative z-10 my-auto py-5 space-y-4">
                {/* Arabic Calligraphy */}
                {showArabic && primaryArabic && (
                  <div className="text-right">
                    <p
                      dir="rtl"
                      className={`font-['Amiri',serif] font-normal tracking-wide text-right select-all ${getArabicFontSize()} ${themeStyles.arabicText}`}
                    >
                      {primaryArabic}
                    </p>
                  </div>
                )}

                {/* Translation Quote Box */}
                {showTranslation && (primaryTranslation || !primaryArabic) && (
                  <div className={`pl-4 py-1 text-left ${themeStyles.translationText}`}>
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed font-sans font-medium select-all">
                      "{primaryTranslation || data.verseText}"
                    </p>
                  </div>
                )}

                {/* Surah Meaning & Context */}
                {showMeaning && (data.surahMeaning || data.totalVerses) && (
                  <div className="flex items-center gap-2 pt-1 text-[11px] opacity-75 font-sans">
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {data.surahMeaning ? (
                        <>
                          {labels.surahMeaningLabel}: <strong>{data.surahMeaning}</strong> •{' '}
                        </>
                      ) : null}
                      {labels.ayatLabel} {verseNum} / {data.totalVerses || allVerses.length || '—'}
                    </span>
                  </div>
                )}
              </div>

              {/* CARD FOOTER ROW (Watermark & Verified Seal) */}
              {showWatermark && (
                <div className="relative z-10 pt-4 border-t border-current/10 flex items-center justify-between gap-3 text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-0.5 rounded-md border font-mono font-bold text-[10px] tracking-wider ${themeStyles.footerBadge}`}>
                      EQARIIN
                    </div>
                    <span className="opacity-70 font-mono text-[10px] hidden sm:inline">
                      Quran JSON Open Repository
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 opacity-80 font-mono text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>eqariin.ai.studio</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Customization Controls & Export Actions */}
          <div className="w-full lg:w-96 bg-[#121622] p-5 sm:p-6 space-y-5 overflow-y-auto shrink-0">
            {/* Theme Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-emerald-400" />
                <span>{labels.cardThemeHeader}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'emerald', label: 'Emerald Bull', desc: 'Trojan Matrix', color: 'bg-emerald-900 border-emerald-500' },
                  { id: 'cyber', label: 'Cyber Midnight', desc: 'Neon Blue', color: 'bg-cyan-950 border-cyan-500' },
                  { id: 'obsidian-gold', label: 'Obsidian Gold', desc: 'Luxury Dark', color: 'bg-amber-950 border-amber-500' },
                  { id: 'twilight', label: 'Twilight Rose', desc: 'Purple Glow', color: 'bg-purple-950 border-purple-500' },
                  { id: 'ivory', label: 'Ivory Minimalist', desc: 'Light Elegance', color: 'bg-stone-200 border-stone-400 text-stone-900' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id as CardTheme)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      theme === t.id
                        ? 'border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-500/20 text-white'
                        : 'border-stone-800 bg-stone-900/60 hover:bg-stone-800/80 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold">{t.label}</span>
                      <div className={`w-3.5 h-3.5 rounded-full border ${t.color}`} />
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{labels.cardFormatHeader}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'square', label: 'Square (1:1)', sub: 'Feed / X' },
                  { id: 'story', label: 'Story (9:16)', sub: 'Status / Reels' },
                  { id: 'banner', label: 'Banner (16:9)', sub: 'Telegram' },
                ].map((ar) => (
                  <button
                    key={ar.id}
                    type="button"
                    onClick={() => setAspectRatio(ar.id as AspectRatio)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      aspectRatio === ar.id
                        ? 'border-emerald-400 bg-emerald-950/50 text-emerald-300 font-bold'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="text-xs font-semibold">{ar.label}</div>
                    <div className="text-[9px] text-stone-500">{ar.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Toggles */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>{labels.contentSettingsHeader}</span>
              </label>
              <div className="space-y-1.5">
                <label className="flex items-center justify-between p-2 rounded-lg bg-stone-900/60 border border-stone-800 text-xs text-stone-300 cursor-pointer">
                  <span>{labels.showArabicToggle}</span>
                  <input
                    type="checkbox"
                    checked={showArabic}
                    onChange={(e) => setShowArabic(e.target.checked)}
                    className="accent-emerald-500 w-4 h-4 rounded cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-lg bg-stone-900/60 border border-stone-800 text-xs text-stone-300 cursor-pointer">
                  <span>{labels.showTranslationToggle}</span>
                  <input
                    type="checkbox"
                    checked={showTranslation}
                    onChange={(e) => setShowTranslation(e.target.checked)}
                    className="accent-emerald-500 w-4 h-4 rounded cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-lg bg-stone-900/60 border border-stone-800 text-xs text-stone-300 cursor-pointer">
                  <span>{labels.showMeaningToggle}</span>
                  <input
                    type="checkbox"
                    checked={showMeaning}
                    onChange={(e) => setShowMeaning(e.target.checked)}
                    className="accent-emerald-500 w-4 h-4 rounded cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-lg bg-stone-900/60 border border-stone-800 text-xs text-stone-300 cursor-pointer">
                  <span>{labels.showWatermarkToggle}</span>
                  <input
                    type="checkbox"
                    checked={showWatermark}
                    onChange={(e) => setShowWatermark(e.target.checked)}
                    className="accent-emerald-500 w-4 h-4 rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Font Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-emerald-400" />
                <span>{labels.arabicFontSizeHeader}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'normal', label: labels.fontNormal },
                  { id: 'large', label: labels.fontLarge },
                  { id: 'xlarge', label: labels.fontXLarge },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFontSize(f.id as any)}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                      fontSize === f.id
                        ? 'border-emerald-400 bg-emerald-950/50 text-emerald-300'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 space-y-2.5">
              {/* Download PNG Button */}
              <button
                type="button"
                onClick={handleDownloadPng}
                disabled={isExporting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] disabled:opacity-60"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>{isExporting ? labels.downloading : labels.downloadImageBtn}</span>
              </button>

              {/* Copy Image & Copy Link */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyImage}
                  disabled={isExporting}
                  className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs border border-stone-700 flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                >
                  {copiedImage ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedImage ? labels.copiedImage : labels.copyImageBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs border border-stone-700 flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                >
                  {copiedLink ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                  ) : (
                    <Share2 className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedLink ? labels.copiedLink : labels.copyLinkBtn}</span>
                </button>
              </div>

              {/* Direct Social Share */}
              <div className="pt-1 flex items-center justify-between gap-2">
                <span className="text-[11px] text-stone-400">{labels.shareTo}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleShareSocial('wa')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShareSocial('tg')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#229ED9]/20 hover:bg-[#229ED9]/30 text-[#229ED9] border border-[#229ED9]/40 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>Telegram</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShareSocial('x')}
                    className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>X</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

