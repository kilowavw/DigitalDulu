import React from 'react';
import { motion, Variants } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import { useLanguage } from '../../context/LanguageContext';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  // Variants for text animations
  // Fix: Explicitly type animation variants with `Variants` from framer-motion to resolve type inference issues.
  const titleContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.2,
      },
    },
  };

  // Fix: Explicitly type animation variants with `Variants` from framer-motion to resolve type inference issues.
  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      skewY: 5,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };
  
  // Fix: Explicitly type animation variants with `Variants` from framer-motion to resolve type inference issues.
  const paragraphContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.8,
      },
    },
  };

  // Fix: Explicitly type animation variants with `Variants` from framer-motion to resolve type inference issues.
  const wordVariants: Variants = {
      hidden: { opacity: 0, y: 15 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  // Config for image slice animation
  const NUM_SLICES = 10;
  const slices = Array.from({ length: NUM_SLICES });
  const imageUrl = "https://res.cloudinary.com/dj0draukr/image/upload/v1761188844/yorgos-ntrahas-lp8ZlyAZjy8-unsplash_wzoiqg.jpg";

  // Fix: Explicitly type animation variants with `Variants` from framer-motion to resolve type inference issues.
  const imageContainerVariants: Variants = {
      hidden: {},
      visible: {
          transition: {
              staggerChildren: 0.04,
              delayChildren: 0.4
          }
      }
  }

  // Fix: Explicitly type animation variants with `Variants` from framer-motion to resolve type inference issues.
  const sliceVariants: Variants = {
      hidden: { opacity: 0, x: -60, scale: 0.95 },
      visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  }


  return (
    <SectionContainer id="about">
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div>
            {/* Animated Title */}
            <motion.h2 
                className="text-4xl font-black uppercase tracking-tighter sm:text-5xl"
                variants={titleContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
            >
                <span className="sr-only">{t('about.title_1')} {t('about.title_2')}</span>
                <span aria-hidden className="block">
                    {t('about.title_1').split('').map((char, index) => (
                        <motion.span key={index} variants={letterVariants} className="inline-block">
                             {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </span>
                <span aria-hidden className="block text-accent-yellow">
                    {t('about.title_2').split('').map((char, index) => (
                        <motion.span key={index} variants={letterVariants} className="inline-block">
                             {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </span>
            </motion.h2>

            {/* Animated Paragraph */}
            <motion.p 
                className="mt-6 text-lg text-primary-black/80 dark:text-dark-text/80"
                variants={paragraphContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
            >
                {t('about.description').split(' ').map((word, index) => (
                    <motion.span key={index} variants={wordVariants} className="inline-block mr-1.5">
                        {word}
                    </motion.span>
                ))}
            </motion.p>
        </div>
        
        {/* Animated Image */}
        <div className="flex justify-center">
            <motion.div 
                className="relative w-full max-w-md aspect-[4/3] rounded-lg shadow-2xl overflow-hidden"
                variants={imageContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                {/* Image Slices */}
                {slices.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-full"
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: `center ${i * (100 / (NUM_SLICES - 1))}%`,
                            clipPath: `inset(${i * (100 / NUM_SLICES)}% 0% ${(NUM_SLICES - 1 - i) * (100 / NUM_SLICES)}% 0%)`,
                        }}
                        variants={sliceVariants}
                    />
                ))}

                {/* Glitch Effect Overlay */}
                <motion.div 
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.1, repeat: 5, repeatType: 'mirror', repeatDelay: 0.1 }}
                >
                    <div 
                        className="absolute inset-0 mix-blend-color-dodge opacity-50"
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transform: 'translateX(-2px) scale(1.01)',
                            filter: 'hue-rotate(90deg)'
                        }}
                    />
                    <div 
                        className="absolute inset-0 mix-blend-color-dodge opacity-50"
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transform: 'translateX(2px) scale(1.01)',
                            filter: 'hue-rotate(-90deg)'
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default AboutSection;