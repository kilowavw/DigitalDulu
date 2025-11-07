import React from 'react';
import { motion } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import { useLanguage } from '../../context/LanguageContext';

const ThreeDSection: React.FC = () => {
    const { t } = useLanguage();

    const technologies = [
        { name: 'logo-react', transform: 'rotateY(0deg) translateZ(104px)' },
        { name: 'logo-nodejs', transform: 'rotateY(90deg) translateZ(104px)' },
        { name: 'logo-python', transform: 'rotateY(180deg) translateZ(104px)' },
        { name: 'logo-figma', transform: 'rotateY(-90deg) translateZ(104px)' },
        { name: 'logo-docker', transform: 'rotateX(90deg) translateZ(104px)' },
        { name: 'logo-javascript', transform: 'rotateX(-90deg) translateZ(104px)' },
    ];

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
    };

    const keyframes = `
        @keyframes spin {
            from { transform: rotateX(0deg) rotateY(0deg); }
            to { transform: rotateX(360deg) rotateY(360deg); }
        }
    `;

    return (
        <SectionContainer id="techstack" className="bg-primary-black/5 dark:bg-dark-secondary/20">
            <style>{keyframes}</style>
            <motion.div
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">{t('techstack.title')}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-black/70 dark:text-dark-text/70">
                    {t('techstack.subtitle')}
                </p>
            </motion.div>

            <div className="mt-20 flex justify-center items-center" style={{ perspective: '1000px', minHeight: '300px' }}>
                <motion.div
                    className="relative w-52 h-52"
                    style={{ transformStyle: 'preserve-3d', animation: 'spin 20s infinite linear' }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            className="absolute w-52 h-52 flex items-center justify-center bg-background-white/80 dark:bg-dark-secondary/80 backdrop-blur-sm border border-primary-black/10 dark:border-dark-text/10 rounded-lg"
                            style={{ transform: tech.transform }}
                        >
                            <ion-icon name={tech.name} style={{ fontSize: '100px', color: '#FFE500' }}></ion-icon>
                        </div>
                    ))}
                </motion.div>
            </div>
            
            <motion.p 
              className="mt-20 max-w-3xl mx-auto text-center text-md text-primary-black/80 dark:text-dark-text/80"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{...sectionVariants, visible: {...sectionVariants.visible, transition: { ...sectionVariants.visible.transition, delay: 0.6 }}}}
            >
              {t('techstack.description')}
            </motion.p>
        </SectionContainer>
    );
};

export default ThreeDSection;
