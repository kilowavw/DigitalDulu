import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { translations, TranslationKey } from '../translations';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('id');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      setLanguageState(browserLang === 'id' ? 'id' : 'en');
    }
  }, []);
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  const t = useCallback((key: TranslationKey): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
    }
    return result || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};