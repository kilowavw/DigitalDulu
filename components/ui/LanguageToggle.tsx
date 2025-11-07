import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-10 h-10 rounded-full flex items-center justify-center text-primary-black dark:text-accent-yellow bg-primary-black/10 dark:bg-dark-secondary ml-4"
      aria-label="Toggle language"
    >
      <motion.div
        key={language}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="font-bold text-sm"
      >
        {language.toUpperCase()}
      </motion.div>
    </button>
  );
};

export default LanguageToggle;
