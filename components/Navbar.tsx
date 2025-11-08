import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ui/ThemeToggle';
import LanguageToggle from './ui/LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.howwework'), href: '#howwework' },
    { name: t('nav.whatwecando'), href: '#whatwecando' },
    { name: t('nav.portfolio'), href: '#portfolio' },
    { name: t('nav.techstack'), href: '#techstack' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close menu on resize if window becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen ? 'bg-background-white/80 dark:bg-dark-bg/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="font-black text-2xl text-primary-black dark:text-accent-yellow">
                DIGITALDULU
              </a>
            </div>
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-primary-black dark:text-dark-text hover:text-accent-yellow dark:hover:text-accent-yellow px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center">
               <ThemeToggle />
               <LanguageToggle />
               <div className="lg:hidden ml-2">
                  <button 
                    onClick={toggleMenu} 
                    className="inline-flex items-center justify-center p-2 rounded-md text-primary-black dark:text-dark-text focus:outline-none"
                    aria-controls="mobile-menu"
                    aria-expanded={menuOpen}
                    aria-label="Toggle menu"
                  >
                      <AnimatePresence initial={false} mode="wait">
                        <motion.div
                          key={menuOpen ? 'close' : 'menu'}
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {menuOpen ? (
                              <ion-icon name="close-outline" style={{ fontSize: '28px' }}></ion-icon>
                          ) : (
                              <ion-icon name="menu-outline" style={{ fontSize: '28px' }}></ion-icon>
                          )}
                        </motion.div>
                      </AnimatePresence>
                  </button>
               </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-16 left-0 right-0 z-40 bg-background-white/95 dark:bg-dark-bg/95 backdrop-blur-sm shadow-lg lg:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-primary-black dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-secondary block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;