import React, { createContext, useContext, useState } from 'react';
import { AppLanguage } from '../constants/uiLabels';

interface LanguageContextType {
  appLanguage: AppLanguage;
  setAppLanguage: (lang: AppLanguage) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [appLanguage, setAppLanguageState] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem('muslim_plus_lang');
      if (saved) return saved as AppLanguage;
    } catch {
      // ignore localStorage errors
    }
    return 'English';
  });

  const setAppLanguage = (lang: AppLanguage) => {
    setAppLanguageState(lang);
    try {
      localStorage.setItem('muslim_plus_lang', lang);
    } catch {
      // ignore localStorage errors
    }
  };

  return (
    <LanguageContext.Provider value={{ appLanguage, setAppLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
