import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const StepCard: React.FC<{ iconName: string; title: string; description: string; }> = ({ iconName, title, description }) => {
    return (
        <div className="flex-shrink-0 w-[80vw] md:w-[40vw] h-[50vh] bg-background-white dark:bg-dark-secondary p-8 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center mx-8 border border-primary-black/10 dark:border-dark-text/10">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-accent-yellow mb-6">
                <ion-icon name={iconName} style={{ fontSize: '48px', color: '#000000' }}></ion-icon>
            </div>
            <h3 className="text-3xl font-bold uppercase">{title}</h3>
            <p className="mt-4 text-primary-black/70 dark:text-dark-text/70 text-lg">{description}</p>
        </div>
    );
};

const HowWeWorkSection: React.FC = () => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Define animation phases based on scroll progress
    const ZOOM_IN_END = 0.25;
    const HORIZONTAL_SCROLL_START = ZOOM_IN_END;
    const HORIZONTAL_SCROLL_END = 0.9;
    const FADE_OUT_START = HORIZONTAL_SCROLL_END;

    // Fade out the title as the zoom-in effect begins
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    // Zoom in effect for the horizontal scene, making it feel like it's going "full screen"
    const scale = useTransform(scrollYProgress, [0, ZOOM_IN_END], [0.7, 1]);
    
    // Fade out the entire section at the very end of the scroll
    const opacity = useTransform(scrollYProgress, [FADE_OUT_START, 1], [1, 0]);
    
    // Horizontal scroll animation, starts after the zoom-in is complete.
    // The translation value is increased to ~76% to account for the width of the spacer elements,
    // ensuring the final card is properly centered at the end of the scroll.
    const x = useTransform(scrollYProgress, [HORIZONTAL_SCROLL_START, HORIZONTAL_SCROLL_END], ['0%', '-76%']);

    // Animate drawing of the dashed lines during the horizontal scroll phase
    const path1Progress = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
    const path2Progress = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);

    const strokeColor = 'hsl(54, 100%, 50%)'; // #FFE500

    const steps = [
        { iconName: 'chatbubbles-outline', title: t('howwework.step1.title'), description: t('howwework.step1.description') },
        { iconName: 'document-text-outline', title: t('howwework.step2.title'), description: t('howwework.step2.description') },
        { iconName: 'cafe-outline', title: t('howwework.step3.title'), description: t('howwework.step3.description') }
    ];

    return (
        <section id="howwework" ref={containerRef} className="h-[400vh] relative bg-primary-black/5 dark:bg-dark-secondary/20">
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Title Section: Fades out on scroll */}
                <motion.div 
                    style={{ opacity: titleOpacity }}
                    className="absolute inset-x-0 top-[15vh] text-center z-20 pointer-events-none"
                >
                    <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">{t('howwework.title')}</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-black/70 dark:text-dark-text/70">
                        {t('howwework.subtitle')}
                    </p>
                </motion.div>

                {/* Main Content: Zooms in and then scrolls horizontally */}
                <motion.div 
                    style={{ scale, opacity }} 
                    className="w-full h-full flex items-center justify-start"
                >
                    <motion.div style={{ x }} className="flex items-center pl-[calc(50vw-80vw/2)] md:pl-[calc(50vw-40vw/2)]">
                        <StepCard {...steps[0]} />
                        
                        <div className="flex-shrink-0 flex items-center justify-center w-36 md:w-64">
                            <svg viewBox="0 0 150 100" className="w-full h-auto">
                                <motion.path
                                    d="M 10,50 C 40,0 110,0 140,50"
                                    fill="transparent"
                                    strokeWidth="3"
                                    stroke={strokeColor}
                                    strokeDasharray="6 6"
                                    strokeLinecap="round"
                                    style={{ pathLength: path1Progress }}
                                />
                            </svg>
                        </div>

                        <StepCard {...steps[1]} />
                        
                        <div className="flex-shrink-0 flex items-center justify-center w-36 md:w-64">
                             <svg viewBox="0 0 150 100" className="w-full h-auto">
                                <motion.path
                                    d="M 10,50 C 40,100 110,100 140,50"
                                    fill="transparent"
                                    strokeWidth="3"
                                    stroke={strokeColor}
                                    strokeDasharray="6 6"
                                    strokeLinecap="round"
                                    style={{ pathLength: path2Progress }}
                                />
                            </svg>
                        </div>
                        <StepCard {...steps[2]} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HowWeWorkSection;