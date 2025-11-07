import React from 'react';
import { motion } from 'framer-motion';
import SectionContainer from './ui/SectionContainer';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <footer id="contact" className="bg-primary-black dark:bg-black text-background-white">
      <SectionContainer className="py-12 sm:py-16">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={footerVariants}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-accent-yellow">
            {t('footer.title')}
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-300">
            {t('footer.subtitle')}
          </p>
          <div className="mt-8 flex justify-center space-x-6">
             <a href="#" className="text-gray-400 hover:text-accent-yellow transition-colors">
                <span className="sr-only">Instagram</span>
                <ion-icon name="logo-instagram" style={{fontSize: '32px'}}></ion-icon>
            </a>
             <a href="#" className="text-gray-400 hover:text-accent-yellow transition-colors">
                <span className="sr-only">WhatsApp</span>
                <ion-icon name="logo-whatsapp" style={{fontSize: '32px'}}></ion-icon>
            </a>
          </div>
          <p className="mt-8 text-2xl font-black tracking-widest text-white">
            DIGITALDULU.ID
          </p>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400">
              © {new Date().getFullYear()} DigitalDulu. {t('footer.copyright')}
            </p>
            <p className="mt-2 text-sm text-secondary-gray">
              {t('footer.disclaimer')}
            </p>
          </div>
        </motion.div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;