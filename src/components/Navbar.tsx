import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APP_LANGUAGES } from '../constants/uiLabels';
import { useLanguage } from '../context/LanguageContext';
import { LANDING_TRANSLATIONS } from '../constants/landingTranslations';

export default function Navbar() {
  const navigate = useNavigate();
  const { appLanguage, setAppLanguage } = useLanguage();
  const [isAppLangOpen, setIsAppLangOpen] = useState(false);
  const appLangRef = useRef<HTMLDivElement>(null);

  const t = LANDING_TRANSLATIONS[appLanguage] || LANDING_TRANSLATIONS['English'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (appLangRef.current && !appLangRef.current.contains(event.target as Node)) {
        setIsAppLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full bg-emerald-950/90 backdrop-blur-md text-emerald-50 z-50 border-b border-emerald-900/50 shadow-md">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 md:py-5 flex justify-between items-center">
          <div 
            onClick={() => navigate('/')}
            className="font-['Playfair_Display'] text-2xl font-bold tracking-tight cursor-pointer hover:opacity-90 transition-opacity"
          >
            EQariin<span className="text-emerald-400">.</span>
          </div>
          <div className="flex items-center gap-6">
            {/* Language Dropdown */}
            <div className="relative" ref={appLangRef}>
              <button
                onClick={() => setIsAppLangOpen(!isAppLangOpen)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-emerald-50 font-medium text-xs rounded-full backdrop-blur-md transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-100 shrink-0" />
                <span className="font-semibold tracking-wide">{appLanguage}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-emerald-200/70 shrink-0 transition-transform duration-200 ${isAppLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isAppLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-emerald-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-emerald-800/50 py-1.5 z-50 max-h-72 overflow-y-auto"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 border-b border-emerald-800/50 mb-1">
                      {t.selectLanguage}
                    </div>
                    {APP_LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setAppLanguage(lang);
                          setIsAppLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between hover:bg-emerald-800/50 transition-colors cursor-pointer ${
                          appLanguage === lang ? 'font-semibold text-emerald-50 bg-emerald-800/80' : 'text-emerald-200/90'
                        }`}
                      >
                        <span>{lang}</span>
                        {appLanguage === lang && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent page content from hiding under fixed navbar */}
      <div className="h-[65px] md:h-[73px] w-full shrink-0" aria-hidden="true" />
    </>
  );
}
