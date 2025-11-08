import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const AISection: React.FC = () => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // --- Animation Definitions ---
    const sceneOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
    
    const rotateX = useTransform(scrollYProgress, [0.1, 0.8], [25, 30]);
    const rotateY = useTransform(scrollYProgress, [0.1, 0.8], [-25, 25]);
    
    const aiTextOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
    const aiTextGlow = useTransform(scrollYProgress, [0.3, 0.4, 0.8], [0, 1, 1]);

    const bgCircuitOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 0.3]);
    
    const feature1Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
    const feature1Y = useTransform(scrollYProgress, [0.4, 0.5], [30, 0]);
    const feature2Opacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
    const feature2Y = useTransform(scrollYProgress, [0.55, 0.65], [30, 0]);
    const feature3Opacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
    const feature3Y = useTransform(scrollYProgress, [0.7, 0.8], [30, 0]);
    
    const path1Progress = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
    const path2Progress = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
    const path3Progress = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);

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
        <section id="ai" ref={containerRef} className="h-[400vh] relative bg-dark-bg text-dark-text">
            <div className="sticky top-0 h-screen overflow-hidden">
                <motion.div style={{ opacity: sceneOpacity }} className="w-full h-full flex flex-col items-center justify-center">
                    {/* Background Visuals */}
                    <motion.div 
                        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
                        style={{ opacity: bgCircuitOpacity }}
                    />
                     <svg className="absolute inset-0 z-0 w-full h-full opacity-10" width="100%" height="100%">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,229,0,0.2)" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>

                    {/* Title */}
                    <motion.div className="absolute top-[15vh] text-center px-4 z-30" style={{ opacity: useTransform(scrollYProgress, [0.1, 0.25], [1, 0]) }}>
                        <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl text-white">
                            {t('ai.title')}
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-dark-text/70">
                            {t('ai.subtitle')}
                        </p>
                    </motion.div>

                    <div className="flex-grow w-full relative flex items-center justify-center">
                        {/* Connecting Lines SVG */}
                        <svg width="100%" height="100%" className="absolute inset-0 z-0 pointer-events-none">
                            <defs>
                                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#FFE500" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#FFE500" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="line-gradient-rev" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#FFE500" stopOpacity="0" />
                                    <stop offset="100%" stopColor="#FFE500" stopOpacity="0.8" />
                                </linearGradient>
                            </defs>
                            <motion.line x1="20%" y1="50%" x2="45%" y2="50%" stroke="url(#line-gradient-rev)" strokeWidth="1" style={{ pathLength: path1Progress }} />
                            <motion.line x1="55%" y1="50%" x2="80%" y2="50%" stroke="url(#line-gradient)" strokeWidth="1" style={{ pathLength: path2Progress }} />
                            <motion.line x1="50%" y1="65%" x2="50%" y2="90%" stroke="#FFE500" strokeWidth="1" strokeDasharray="4 4" style={{ pathLength: path3Progress }} />
                        </svg>

                        {/* 3D Cube Scene */}
                        <div className="relative w-full h-full flex items-center justify-center z-10" style={{ perspective: '1200px' }}>
                            <motion.div
                                className="relative"
                                style={{
                                    width: cubeSize,
                                    height: cubeSize,
                                    transformStyle: 'preserve-3d',
                                    rotateX,
                                    rotateY,
                                }}
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
                                                    textShadow: useTransform(
                                                        aiTextGlow,
                                                        (v) => `0 0 ${v * 15}px #FFE500, 0 0 ${v * 30}px #FFE500`
                                                    )
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
                        <div className="absolute inset-0 flex items-center justify-between max-w-6xl mx-auto px-8 pointer-events-none z-20">
                            <motion.div 
                                className="w-1/4 text-left"
                                style={{ opacity: feature1Opacity, y: feature1Y }}
                            >
                                <h3 className="text-xl font-bold text-accent-yellow">{t('ai.feature1.title')}</h3>
                                <p className="mt-2 text-dark-text/80 text-sm">{t('ai.feature1.description')}</p>
                            </motion.div>
                            <motion.div 
                                className="w-1/4 text-right"
                                style={{ opacity: feature2Opacity, y: feature2Y }}
                            >
                                <h3 className="text-xl font-bold text-accent-yellow">{t('ai.feature2.title')}</h3>
                                <p className="mt-2 text-dark-text/80 text-sm">{t('ai.feature2.description')}</p>
                            </motion.div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-8 pointer-events-none z-20">
                            <motion.div 
                                className="w-1/3 text-center"
                                style={{ opacity: feature3Opacity, y: feature3Y }}
                            >
                                <h3 className="text-xl font-bold text-accent-yellow">{t('ai.feature3.title')}</h3>
                                <p className="mt-2 text-dark-text/80 text-sm">{t('ai.feature3.description')}</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AISection;
