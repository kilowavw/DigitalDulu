import React from 'react';
import { motion } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import { useLanguage } from '../../context/LanguageContext';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <SectionContainer id="about">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            {t('about.title_1')} <br />
            <span className="text-accent-yellow">{t('about.title_2')}</span>
          </h2>
          <p className="mt-6 text-lg text-primary-black/80 dark:text-dark-text/80">
            {t('about.description')}
          </p>
        </motion.div>
        <motion.div variants={itemVariants} className="flex justify-center">
          <img 
            src="https://res.cloudinary.com/dj0draukr/image/upload/v1761188844/yorgos-ntrahas-lp8ZlyAZjy8-unsplash_wzoiqg.jpg" 
            alt="About us"
            className="rounded-lg shadow-2xl object-cover w-full h-auto max-w-md"
          />
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
};

export default AboutSection;