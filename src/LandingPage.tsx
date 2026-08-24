import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Github, Database, BookOpen, TrendingUp, Handshake, Code2, ArrowRight, Search, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import { UI_LABELS } from './constants/uiLabels';
import { LANDING_TRANSLATIONS } from './constants/landingTranslations';
import { WORLD_LANGUAGES, LanguageRegion } from './constants/worldLanguages';

const TRANSLATIONS = [
  { lang: "Bahasa Indonesia", text: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang." },
  { lang: "English", text: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
  { lang: "Mandarin", text: "奉至仁至慈的真主之名" },
  { lang: "Japanese", text: "慈悲あまねく慈愛深きアッラーの御名において。" }
];

const REGIONS: LanguageRegion[] = [
  'All',
  'Middle East & North Africa',
  'South & Central Asia',
  'East & Southeast Asia',
  'Europe',
  'Africa',
  'Americas & Oceania'
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { appLanguage } = useLanguage();
  const [currentTransIdx, setCurrentTransIdx] = useState(0);

  // World languages filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'soon'>('all');
  const [selectedRegion, setSelectedRegion] = useState<LanguageRegion>('All');

  const t = LANDING_TRANSLATIONS[appLanguage] || LANDING_TRANSLATIONS['English'];
  const labels = UI_LABELS[appLanguage] || UI_LABELS['English'];

  
  const shouldReduceMotion = useReducedMotion();

  const filteredLanguages = useMemo(() => {
    return WORLD_LANGUAGES.filter((item) => {
      const matchesStatus =
        statusFilter === 'all' || item.status === statusFilter;
      const matchesRegion =
        selectedRegion === 'All' || item.region === selectedRegion;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.nativeName.toLowerCase().includes(query) ||
        item.countries.toLowerCase().includes(query) ||
        item.region.toLowerCase().includes(query);

      return matchesStatus && matchesRegion && matchesQuery;
    });
  }, [statusFilter, selectedRegion, searchQuery]);

  const availableCount = useMemo(() => WORLD_LANGUAGES.filter(l => l.status === 'available').length, []);
  const soonCount = useMemo(() => WORLD_LANGUAGES.filter(l => l.status === 'soon').length, []);

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: shouldReduceMotion ? 1 : 0, 
      y: shouldReduceMotion ? 0 : 16 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 1, 0.5, 1] 
      },
    },
  };

  const FEATURES = [
    {
      icon: Globe,
      title: t.feat1Title,
      desc: t.feat1Desc
    },
    {
      icon: BookOpen,
      title: t.feat2Title,
      desc: t.feat2Desc
    },
    {
      icon: Database,
      title: t.feat3Title,
      desc: t.feat3Desc
    },
    {
      icon: Code2,
      title: t.feat4Title,
      desc: t.feat4Desc
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTransIdx((prev) => (prev + 1) % TRANSLATIONS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans selection:bg-emerald-900 selection:text-emerald-50">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative w-full max-w-7xl mx-auto px-6 pt-12 pb-24 md:pt-20 md:pb-32 flex flex-col items-center text-center"
      >
        {/* Background Decorative Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl h-64 bg-emerald-100/50 blur-[100px] rounded-full pointer-events-none -z-10" />

        <motion.h1 
          variants={itemVariants}
          className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-emerald-950 tracking-tight mb-6"
        >
          Muslim Plus
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-stone-600 max-w-2xl mb-3 leading-relaxed"
        >
          {t.heroDesc}
        </motion.p>
        
        <motion.p 
          variants={itemVariants}
          className={`text-base md:text-lg text-emerald-800/90 font-medium italic max-w-2xl mb-14 leading-relaxed ${
            appLanguage === 'Arabic' ? 'font-[\'Amiri\'] text-xl md:text-2xl not-italic' : ''
          }`}
          dir={appLanguage === 'Arabic' ? 'rtl' : 'ltr'}
        >
          {t.innaLillahiQuote}
        </motion.p>

        {/* Quran Verse Display */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-3xl bg-white border border-stone-200/60 shadow-xl shadow-stone-200/40 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-500" />
          
          <div className="text-center font-['Amiri'] text-4xl md:text-6xl text-emerald-950 mb-8 leading-[1.8] md:leading-[1.8]" dir="rtl">
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </div>
          
          <div className="min-h-[5.5rem] flex flex-col justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTransIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className="text-stone-700 text-lg md:text-xl mb-2 font-medium">
                  {TRANSLATIONS[currentTransIdx].text}
                </p>
                <p className="text-xs tracking-wider text-amber-700 font-semibold uppercase">
                  {TRANSLATIONS[currentTransIdx].lang}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col gap-4 w-full max-w-xs sm:max-w-lg mx-auto items-center"
        >
          {/* Top Row: Main Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button 
              onClick={() => navigate('/app')}
              className="flex-1 sm:max-w-[160px] flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-emerald-50 px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-emerald-900/20 whitespace-nowrap"
            >
              {t.tryApp}
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
            <button 
              disabled
              className="relative flex-1 sm:max-w-[160px] flex items-center justify-center gap-2 bg-white border border-stone-200 text-stone-400 px-5 py-2.5 rounded-full text-sm font-medium cursor-not-allowed transition-all whitespace-nowrap"
            >
              <Code2 className="w-4 h-4 shrink-0" />
              <span>{t.getApi}</span>
              <div className="absolute -top-3 -right-2 bg-stone-100 border-2 border-white text-stone-500 text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-sm rotate-[10deg]">
                {t.soonBadge}
              </div>
            </button>
          </div>

          {/* Bottom Row: Mobile App Stores */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-2">
            
            {/* Google Play Button */}
            <button 
              disabled
              className="relative flex-1 sm:max-w-[216px] flex items-center justify-start gap-3 bg-white border border-stone-200 px-5 py-3 rounded-xl cursor-not-allowed transition-all opacity-90 shadow-sm"
            >
              <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24">
                <path fill="#ea4335" d="M13.544 13.056l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/>
                <path fill="#fbbc04" d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z"/>
                <path fill="#4285f4" d="M1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924z"/>
                <path fill="#34a853" d="M13.544 10.989l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973z"/>
              </svg>
              <div className="flex flex-col items-start leading-none gap-0.5">
                <span className="text-[11px] uppercase font-semibold text-stone-500 tracking-wider">GET IN ON</span>
                <span className="text-[20px] font-bold text-stone-900 tracking-tight">Google Play</span>
              </div>
              <div className="absolute -top-3 -right-2 bg-stone-100 border-2 border-white text-stone-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm rotate-[10deg]">
                {t.soonBadge}
              </div>
            </button>

            {/* App Store Button */}
            <button 
              disabled
              className="relative flex-1 sm:max-w-[216px] flex items-center justify-start gap-3 bg-white border border-stone-200 px-5 py-3 rounded-xl cursor-not-allowed transition-all opacity-90 shadow-sm"
            >
              <svg className="w-9 h-9 shrink-0 fill-black -ml-0.5" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.8 1.45.06 2.65.65 3.39 1.76-2.91 1.73-2.4 5.76.54 7.02-.7 1.83-1.63 3.51-2.51 4.19zm-3.32-14.3c.7-1.05 1.25-2.5 1.11-3.98-1.28.11-2.83.92-3.66 2.02-.69.87-1.33 2.38-1.12 3.84 1.42.15 2.87-.71 3.67-1.88z"/>
              </svg>
              <div className="flex flex-col items-start leading-none gap-0.5 -ml-1">
                <span className="text-[11px] uppercase font-semibold text-stone-500 tracking-wider">Download on the</span>
                <span className="text-[20px] font-bold text-stone-900 tracking-tight">App Store</span>
              </div>
              <div className="absolute -top-3 -right-2 bg-stone-100 border-2 border-white text-stone-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm rotate-[10deg]">
                {t.soonBadge}
              </div>
            </button>
            
          </div>
        </motion.div>
      </motion.section>

      {/* Investor & Strategic Partnership Section */}
      <section className="bg-gradient-to-b from-stone-50 via-white to-stone-50 py-24 px-6 border-y border-stone-200/70 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-50/70 blur-[90px] rounded-full pointer-events-none -z-10" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="w-full max-w-3xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-900 text-emerald-300 shadow-md shadow-emerald-950/15 mb-6 ring-4 ring-emerald-50">
            <TrendingUp className="w-7 h-7" />
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-emerald-950 mb-5 tracking-tight">
            {t.investorTitle}
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-stone-600 text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            {t.investorDesc}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://wa.me/6282197362062?text=Halo%20Tim%20Muslim%20Plus%2C%20saya%20tertarik%20untuk%20membahas%20peluang%20investasi%20%2F%20kemitraan%20strategis." 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-emerald-900 hover:bg-emerald-950 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all shadow-lg shadow-emerald-950/20 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <Handshake className="w-4 h-4 text-emerald-300" />
              <span>{t.investorBtn}</span>
              <ArrowRight className="w-4 h-4 text-emerald-300 ml-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-emerald-950 text-emerald-50 py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/50 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-900/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="w-full max-w-7xl mx-auto relative z-10"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4">{t.coreFeatures}</h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div 
                  variants={itemVariants}
                  key={idx} 
                  className="bg-emerald-900/40 border border-emerald-800/50 p-8 rounded-2xl flex flex-col items-start backdrop-blur-sm"
                >
                  <div className="w-12 h-12 bg-emerald-800/80 rounded-xl flex items-center justify-center mb-6 text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feat.title}</h3>
                  <p className="text-emerald-100/70 leading-relaxed text-sm">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Languages Section */}
      <motion.section 
        id="world-languages"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="py-24 px-6 w-full max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>{WORLD_LANGUAGES.length}+ Global Datasets</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-emerald-950 mb-4">{t.langTitle}</h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">{t.langDesc}</p>
        </motion.div>

        {/* Filter & Search Bar */}
        <motion.div variants={itemVariants} className="w-full max-w-4xl mx-auto mb-10 flex flex-col gap-4">
          
          {/* Top Row: Status Tabs & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-between">
            {/* Status Switcher Tabs */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 shadow-inner">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === 'all'
                    ? 'bg-white text-emerald-950 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t.langFilterAll} ({WORLD_LANGUAGES.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('available')}
                className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  statusFilter === 'available'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {t.langFilterAvailable} ({availableCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('soon')}
                className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  statusFilter === 'soon'
                    ? 'bg-white text-amber-700 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {t.langFilterSoon} ({soonCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.langSearchPlaceholder}
                className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Region Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {REGIONS.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap text-xs border ${
                  selectedRegion === region
                    ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                    : 'bg-white text-stone-600 border-stone-200/80 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                {region === 'All' ? 'All Regions' : region}
              </button>
            ))}
          </div>
        </motion.div>

        {/* World Languages Grid */}
        {filteredLanguages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 max-w-6xl mx-auto">
            {filteredLanguages.map((lang) => {
              const isAvailable = lang.status === 'available';

              return (
                <div
                  key={lang.id}
                  className={`relative p-4 rounded-2xl border transition-all duration-150 flex flex-col justify-between ${
                    isAvailable
                      ? 'bg-white border-emerald-300 shadow-sm ring-1 ring-emerald-100'
                      : 'bg-white/90 border-stone-200/90 shadow-2xs'
                  }`}
                >
                  <div>
                    {/* Top: Language Name & Status Badge */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <h3 className="font-bold text-stone-900 text-sm md:text-base tracking-tight leading-snug">
                          {lang.name}
                        </h3>
                        <div className="font-['Amiri'] text-stone-500 text-xs md:text-sm font-normal tracking-wide mt-0.5">
                          {lang.nativeName}
                        </div>
                      </div>
                      
                      {isAvailable ? (
                        <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          {t.langAvailableBadge}
                        </span>
                      ) : (
                        <span className="shrink-0 inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-300/80 px-2 py-0.5 rounded-full shadow-2xs">
                          <Clock className="w-2.5 h-2.5 text-amber-700" />
                          {t.soonBadge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Countries Info */}
                  <div className="pt-2.5 mt-2 border-t border-stone-100 flex items-start gap-1.5 text-[11px] text-stone-500">
                    <MapPin className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2 leading-relaxed" title={lang.countries}>
                      {lang.countries}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-3xl max-w-xl mx-auto shadow-sm">
            <Globe className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-stone-700 mb-1">No languages found</h4>
            <p className="text-xs text-stone-400 mb-4">Try clearing filters or search terms.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setSelectedRegion('All');
              }}
              className="px-4 py-2 bg-emerald-800 text-emerald-50 rounded-full text-xs font-medium hover:bg-emerald-900 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </motion.section>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-16 px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8"
        >
          
          {/* Brand & Copyright */}
          <motion.div variants={itemVariants} className="text-center md:text-left flex flex-col justify-center md:justify-start">
            <div className="font-['Playfair_Display'] text-2xl font-bold text-emerald-900 mb-4">
              Muslim Plus.
            </div>
            <p className="text-sm text-stone-500 max-w-xs mx-auto md:mx-0 leading-relaxed">
              {t.footerDesc}
            </p>
            <p className="text-sm text-stone-400 mt-6">
              © 2026 Muslim Plus Project.<br className="hidden md:block" /> All rights reserved.
            </p>
          </motion.div>

          {/* About Us */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h4 className="font-bold text-emerald-950 mb-4 uppercase tracking-wider text-sm">{t.aboutTitle}</h4>
            <div className="flex flex-col items-center md:items-start gap-4 mt-2">
              <a
                href="https://x.com/EQariin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-stone-500 hover:text-emerald-700 transition-colors text-sm group"
              >
                <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-emerald-50 flex items-center justify-center transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <span className="font-medium">{labels.followX}</span>
              </a>

              <a
                href="https://discord.gg/XsHdgf4Eb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-stone-500 hover:text-emerald-700 transition-colors text-sm group"
              >
                <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-emerald-50 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </div>
                <span className="font-medium">{labels.joinDiscord}</span>
              </a>

              <a
                href="https://wa.me/6282197362062"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-stone-500 hover:text-emerald-700 transition-colors text-sm group"
              >
                <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-emerald-50 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <span className="font-medium">{labels.contactWA}</span>
              </a>
            </div>
          </motion.div>

        </motion.div>
      </footer>

    </div>
  );
}
