import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const TechAndAISection: React.FC = () => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // --- Animation Timeline ---
    // Phase 1: Tech Stack
    const techTitleOpacity = useTransform(scrollYProgress, [0.05, 0.1, 0.25, 0.3], [0, 1, 1, 0]);
    const techCubeOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.28, 0.35], [0, 1, 1, 0]);
    const techDescOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.28, 0.35], [0, 1, 1, 0]);

    // Phase 2: AI Innovation
    const aiSceneOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.9, 1], [0, 1, 1, 0]);
    const aiTitleOpacity = useTransform(scrollYProgress, [0.35, 0.4], [0, 1]);
    const aiTitleY = useTransform(scrollYProgress, [0.35, 0.4], [50, 0]);
    
    // AI Cube animations
    const rotateX = useTransform(scrollYProgress, [0.4, 0.9], [25, 30]);
    const rotateY = useTransform(scrollYProgress, [0.4, 0.9], [-25, 25]);
    const aiTextOpacity = useTransform(scrollYProgress, [0.45, 0.5], [0, 1]);
    const aiTextGlow = useTransform(scrollYProgress, [0.5, 0.55, 0.9], [0, 1, 1]);
    
    // AI Features animations
    const feature1Opacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
    const feature1Y = useTransform(scrollYProgress, [0.55, 0.65], [30, 0]);
    const feature2Opacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
    const feature2Y = useTransform(scrollYProgress, [0.7, 0.8], [30, 0]);
    const feature3Opacity = useTransform(scrollYProgress, [0.85, 0.9], [0, 1]);
    const feature3Y = useTransform(scrollYProgress, [0.85, 0.9], [30, 0]);
    
    // AI Connecting Lines
    const path1Progress = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
    const path2Progress = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
    const path3Progress = useTransform(scrollYProgress, [0.85, 0.9], [0, 1]);

    const TechStackContent: React.FC = () => {
        const technologies = [
            { name: 'logo-react', transform: 'rotateY(0deg) translateZ(104px)' },
            { name: 'logo-nodejs', transform: 'rotateY(90deg) translateZ(104px)' },
            { name: 'logo-python', transform: 'rotateY(180deg) translateZ(104px)' },
            { name: 'logo-figma', transform: 'rotateY(-90deg) translateZ(104px)' },
            { name: 'logo-docker', transform: 'rotateX(90deg) translateZ(104px)' },
            { name: 'logo-javascript', transform: 'rotateX(-90deg) translateZ(104px)' },
        ];
        const keyframes = `@keyframes spin { from { transform: rotateX(0deg) rotateY(0deg); } to { transform: rotateX(360deg) rotateY(360deg); } }`;

        return (
            <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
                <style>{keyframes}</style>
                <motion.div style={{ opacity: techTitleOpacity }} className="absolute top-[10vh] text-center px-4 z-30">
                    <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">{t('techstack.title')}</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-black/70 dark:text-dark-text/70">{t('techstack.subtitle')}</p>
                </motion.div>

                <div className="flex-grow flex justify-center items-center" style={{ perspective: '1000px' }}>
                    <motion.div style={{ opacity: techCubeOpacity }}>
                        <div className="w-42 h-42" style={{ transformStyle: 'preserve-3d', animation: 'spin 20s infinite linear' }}>
                             {technologies.map((tech, index) => (
                                <div
                                    key={index}
                                    className="absolute w-52 h-52 flex items-center justify-center bg-background-white/80 dark:bg-dark-secondary/80 backdrop-blur-sm border border-primary-black/10 dark:border-dark-text/10 rounded-lg"
                                    style={{ transform: tech.transform }}
                                >
                                    <ion-icon name={tech.name} style={{ fontSize: '100px', color: '#FFE500' }}></ion-icon>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
                
                <motion.p 
                  style={{ opacity: techDescOpacity }}
                  className="max-w-3xl mx-auto text-center text-md text-primary-black/80 dark:text-dark-text/80 pb-16"
                >
                  {t('techstack.description')}
                </motion.p>
            </div>
        );
    };

    const AIContent: React.FC = () => {
        const cubeSize = 200;
        const halfSize = cubeSize / 2;
        const faces = [
            { transform: `rotateY(0deg) translateZ(${halfSize}px)`, key: 'front' }, 
            { transform: `rotateY(180deg) translateZ(${halfSize}px)`, key: 'back' },
            { transform: `rotateY(90deg) translateZ(${halfSize}px)`, key: 'right' },
            { transform: `rotateY(-90deg) translateZ(${halfSize}px)`, key: 'left' },
            { transform: `rotateX(90deg) translateZ(${halfSize}px)`, key: 'top' },
            { transform: `rotateX(-90deg) translateZ(${halfSize}px)`, key: 'bottom' },
        ];

        return (
            <motion.div style={{ opacity: aiSceneOpacity }} className="absolute inset-0 flex flex-col items-center justify-center text-dark-text pointer-events-none">
                {/* Background Visuals */}
                <div className="absolute inset-0 z-0 bg-dark-bg" />
                <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                 <svg className="absolute inset-0 z-0 w-full h-full opacity-10" width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,229,0,0.2)" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Title */}
                <motion.div className="absolute top-[15vh] text-center px-4 z-30" style={{ opacity: aiTitleOpacity, y: aiTitleY }}>
                    <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl text-white">{t('ai.title')}</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-dark-text/70">{t('ai.subtitle')}</p>
                </motion.div>

                <div className="flex-grow w-full relative flex items-center justify-center">
                    {/* Connecting Lines SVG */}
                    <svg width="100%" height="100%" className="absolute inset-0 z-0">
                        <defs>
                            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FFE500" stopOpacity="0.8" /><stop offset="100%" stopColor="#FFE500" stopOpacity="0" /></linearGradient>
                            <linearGradient id="line-gradient-rev" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FFE500" stopOpacity="0" /><stop offset="100%" stopColor="#FFE500" stopOpacity="0.8" /></linearGradient>
                        </defs>
                        <motion.line x1="20%" y1="50%" x2="45%" y2="50%" stroke="url(#line-gradient-rev)" strokeWidth="1" style={{ pathLength: path1Progress }} />
                        <motion.line x1="55%" y1="50%" x2="80%" y2="50%" stroke="url(#line-gradient)" strokeWidth="1" style={{ pathLength: path2Progress }} />
                        <motion.line x1="50%" y1="65%" x2="50%" y2="90%" stroke="#FFE500" strokeWidth="1" strokeDasharray="4 4" style={{ pathLength: path3Progress }} />
                    </svg>

                    {/* 3D Cube Scene */}
                    <div className="relative w-full h-full flex items-center justify-center z-10" style={{ perspective: '1200px' }}>
                        <motion.div
                            className="relative"
                            style={{ width: cubeSize, height: cubeSize, transformStyle: 'preserve-3d', rotateX, rotateY }}
                        >
                            {faces.map((face) => (
                                <div
                                    key={face.key}
                                    className="absolute w-full h-full flex items-center justify-center border border-accent-yellow/30 bg-black/40 backdrop-blur-sm"
                                    style={{ transform: face.transform, backfaceVisibility: 'hidden' }}
                                >
                                    {face.key === 'front' && (
                                        <motion.span 
                                            className="text-7xl font-black text-accent-yellow"
                                            style={{ 
                                                opacity: aiTextOpacity,
                                                textShadow: useTransform(aiTextGlow, (v) => `0 0 ${v * 15}px #FFE500, 0 0 ${v * 30}px #FFE500`)
                                            }}
                                        >
                                            AI
                                        </motion.span>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                    
                    {/* Feature Descriptions */}
                    <div className="absolute inset-0 flex items-center justify-between max-w-6xl mx-auto px-8 z-20">
                        <motion.div className="w-1/4 text-left" style={{ opacity: feature1Opacity, y: feature1Y }}>
                            <h3 className="text-xl font-bold text-accent-yellow">{t('ai.feature1.title')}</h3>
                            <p className="mt-2 text-dark-text/80 text-sm">{t('ai.feature1.description')}</p>
                        </motion.div>
                        <motion.div className="w-1/4 text-right" style={{ opacity: feature2Opacity, y: feature2Y }}>
                            <h3 className="text-xl font-bold text-accent-yellow">{t('ai.feature2.title')}</h3>
                            <p className="mt-2 text-dark-text/80 text-sm">{t('ai.feature2.description')}</p>
                        </motion.div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex justify-center pb-8 z-20">
                        <motion.div className="w-1/3 text-center" style={{ opacity: feature3Opacity, y: feature3Y }}>
                            <h3 className="text-xl font-bold text-accent-yellow">{t('ai.feature3.title')}</h3>
                            <p className="mt-2 text-dark-text/80 text-sm">{t('ai.feature3.description')}</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <section id="techstack" ref={containerRef} className="h-[500vh] relative bg-primary-black/5 dark:bg-dark-secondary/20">
            <div className="sticky top-0 h-screen overflow-hidden">
                <TechStackContent />
                <AIContent />
            </div>
        </section>
    );
};

export default TechAndAISection;