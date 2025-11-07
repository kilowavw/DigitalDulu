
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center text-primary-black dark:text-accent-yellow bg-primary-black/10 dark:bg-dark-secondary"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? (
            <ion-icon name="moon-outline" style={{ fontSize: '20px' }}></ion-icon>
          ) : (
            <ion-icon name="sunny-outline" style={{ fontSize: '20px' }}></ion-icon>
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;