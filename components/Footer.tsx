import React from 'react';
import { motion } from 'framer-motion';
import SectionContainer from './ui/SectionContainer';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const socialIconVariants = {
      initial: { scale: 1, y: 0 },
      hover: { scale: 1.1, y: -5, transition: { type: 'spring', stiffness: 300 } },
  }

  return (
    <footer id="contact" className="bg-primary-black text-background-white dark:bg-gradient-to-b dark:from-dark-bg dark:to-black scroll-mt-20">
      <SectionContainer className="py-24 sm:py-32 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent-yellow/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent-yellow/5 rounded-full blur-3xl" aria-hidden="true" />

        <motion.div
          className="relative z-10 text-center max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-black tracking-tighter sm:text-5xl text-accent-yellow">
            {t('footer.title')}
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-gray-300">
            {t('footer.subtitle')}
          </motion.p>
          <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-x-6">
             <motion.a 
                href="https://www.instagram.com/digitaldulu.id/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-accent-yellow transition-colors"
                variants={socialIconVariants}
                initial="initial"
                whileHover="hover"
              >
                <span className="sr-only">Instagram</span>
                <ion-icon name="logo-instagram" style={{fontSize: '40px'}}></ion-icon>
            </motion.a>
             <motion.a 
                href="http://wa.me/+6285157751861"
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-accent-yellow transition-colors"
                variants={socialIconVariants}
                initial="initial"
                whileHover="hover"
             >
                <span className="sr-only">WhatsApp</span>
                <ion-icon name="logo-whatsapp" style={{fontSize: '40px'}}></ion-icon>
            </motion.a>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-12 text-3xl font-black tracking-widest text-white opacity-80">
            DIGITALDULU.ID
          </motion.p>
          <motion.div variants={itemVariants} className="mt-12 border-t border-gray-700/50 pt-8">
            <p className="text-base text-gray-400">
              © {new Date().getFullYear()} DigitalDulu. {t('footer.copyright')}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {t('footer.disclaimer')}
            </p>
          </motion.div>
        </motion.div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
