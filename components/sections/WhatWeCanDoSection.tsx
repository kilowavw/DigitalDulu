import React from 'react';
import { motion } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import { useLanguage } from '../../context/LanguageContext';

interface CapabilityCardProps {
    iconName: string;
    title: string;
    description: string;
    delay: number;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({ iconName, title, description, delay }) => {
    return (
        <motion.div
            className="text-center p-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-accent-yellow/20 dark:bg-accent-yellow/10 mb-6 mx-auto text-accent-yellow">
                <ion-icon name={iconName} style={{ fontSize: '48px' }}></ion-icon>
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-primary-black/70 dark:text-dark-text/70">{description}</p>
        </motion.div>
    );
};

const WhatWeCanDoSection: React.FC = () => {
    const { t } = useLanguage();
    
    const capabilities = [
        {
            iconName: 'color-palette-outline',
            title: t('whatwecando.uiux.title'),
            description: t('whatwecando.uiux.description')
        },
        {
            iconName: 'code-slash-outline',
            title: t('whatwecando.frontend.title'),
            description: t('whatwecando.frontend.description')
        },
        {
            iconName: 'server-outline',
            title: t('whatwecando.backend.title'),
            description: t('whatwecando.backend.description')
        },
        {
            iconName: 'rocket-outline',
            title: t('whatwecando.marketing.title'),
            description: t('whatwecando.marketing.description')
        }
    ];

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
    };

    return (
        <SectionContainer id="whatwecando">
            <motion.div
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">{t('whatwecando.title')}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-black/70 dark:text-dark-text/70">
                    {t('whatwecando.subtitle')}
                </p>
            </motion.div>
            <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {capabilities.map((cap, index) => (
                    <CapabilityCard 
                        key={cap.title}
                        iconName={cap.iconName}
                        title={cap.title}
                        description={cap.description}
                        delay={index * 0.2}
                    />
                ))}
            </div>
        </SectionContainer>
    );
};

export default WhatWeCanDoSection;