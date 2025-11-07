import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import ParallaxAsset from '../ui/ParallaxAsset';
import { useLanguage } from '../../context/LanguageContext';

const HighlightText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="relative inline-block">
        <span className="absolute inset-0 bg-accent-yellow -skew-y-2" aria-hidden="true"></span>
        <span className="relative text-primary-black">{children}</span>
    </span>
);

const HeroSection: React.FC = () => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const yLaptop = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const yPhone = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const yDrone = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);

    return (
        <SectionContainer id="hero" ref={containerRef} className="min-h-screen flex items-center justify-center overflow-hidden relative pt-16">
            <ParallaxAsset 
                src="https://picsum.photos/seed/laptop/400/300" 
                alt="Laptop" 
                y={yLaptop}
                className="absolute top-1/4 left-4 w-32 md:w-40 lg:left-10 lg:w-48 opacity-30 dark:opacity-10"
            />
             <ParallaxAsset 
                src="https://picsum.photos/seed/phone/200/400" 
                alt="Phone" 
                y={yPhone}
                className="absolute top-20 right-4 w-16 md:w-20 lg:right-10 lg:w-24 opacity-30 dark:opacity-10"
            />
            <ParallaxAsset 
                src="https://picsum.photos/seed/drone/300/200" 
                alt="Drone" 
                y={yDrone}
                className="absolute bottom-10 right-1/4 w-24 md:w-32 lg:w-36 opacity-30 dark:opacity-10"
            />

            <div className="text-center relative z-10">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter"
                >
                    {t('hero.main_1')} <br />
                    {t('hero.main_2')}
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-primary-black/80 dark:text-dark-text/80"
                >
                    {t('hero.subtitle')} <HighlightText>{t('hero.highlight')}</HighlightText>.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-10"
                >
                    <a href="#contact" className="bg-accent-yellow text-primary-black font-bold py-4 px-10 text-lg rounded-full hover:bg-yellow-300 transition-colors transform hover:scale-105">
                        {t('hero.cta')}
                    </a>
                </motion.div>
            </div>
        </SectionContainer>
    );
};

export default HeroSection;