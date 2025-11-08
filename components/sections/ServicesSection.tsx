import React from 'react';
import { motion, Variants } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import ServiceCard from '../ui/ServiceCard';
import { useLanguage } from '../../context/LanguageContext';

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      iconName: 'laptop-outline',
      title: t('services.web.title'),
      description: t('services.web.description')
    },
    {
      iconName: 'phone-portrait-outline',
      title: t('services.app.title'),
      description: t('services.app.description')
    },
    {
      iconName: 'hardware-chip-outline',
      title: t('services.iot.title'),
      description: t('services.iot.description')
    },
    {
      iconName: 'school-outline',
      title: t('services.joki.title'),
      description: t('services.joki.description')
    }
  ];
  
  const title = t('services.title');
  // Fix: Explicitly type animation variants with `Variants` from framer-motion to resolve type inference issues.
  const titleContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  // Fix: Explicitly type animation variants with `Variants` from framer-motion to resolve type inference issues.
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotate: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };

  return (
    <SectionContainer id="services" className="bg-primary-black/5 dark:bg-dark-secondary/20 overflow-hidden">
      <motion.div
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 
            className="text-4xl font-black uppercase tracking-tighter sm:text-5xl"
            variants={titleContainerVariants}
        >
             {title.split('').map((char, index) => (
                <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.h2>
        <motion.p 
            className="mt-4 max-w-2xl mx-auto text-lg text-primary-black/70 dark:text-dark-text/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: title.length * 0.05 + 0.3 }}
        >
          {t('services.subtitle')}
        </motion.p>
      </motion.div>
      <div 
        className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        style={{ perspective: '1200px' }}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            iconName={service.iconName}
            title={service.title}
            description={service.description}
            index={index}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default ServicesSection;