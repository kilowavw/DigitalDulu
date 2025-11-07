import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import ParallaxAsset from '../ui/ParallaxAsset';
import { useLanguage } from '../../context/LanguageContext';

interface TiltCardProps {
    iconName: string;
    title: string;
    description: string;
    delay: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ iconName, title, description, delay }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);
    const springConfig = { damping: 20, stiffness: 300, mass: 0.8 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const { offsetWidth, offsetHeight } = cardRef.current;
        const { clientX, clientY } = event;
        const { left, top } = cardRef.current.getBoundingClientRect();

        const centerOffsetX = (clientX - left - offsetWidth / 2) / 2;
        const centerOffsetY = (clientY - top - offsetHeight / 2) / 2;

        x.set(centerOffsetX);
        y.set(centerOffsetY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            style={{
                perspective: '1000px',
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative bg-background-white dark:bg-dark-secondary p-8 rounded-lg shadow-xl border border-primary-black/10 dark:border-dark-text/10 cursor-pointer will-change-transform"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay }}
        >
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent-yellow mb-6">
                <ion-icon name={iconName} style={{ fontSize: '32px', color: '#000000' }}></ion-icon>
            </div>
            <h3 className="text-2xl font-bold uppercase">{title}</h3>
            <p className="mt-4 text-primary-black/70 dark:text-dark-text/70">{description}</p>
        </motion.div>
    );
};

const WhoWeAreSection: React.FC = () => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const yCircle1 = useTransform(scrollYProgress, [0, 1], ['-50%', '50%']);
    const yCircle2 = useTransform(scrollYProgress, [0, 1], ['50%', '-50%']);
    const yTriangle = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);

    const ethos = [
        {
            iconName: 'bulb-outline',
            title: t('whoweare.mission.title'),
            description: t('whoweare.mission.description'),
        },
        {
            iconName: 'eye-outline',
            title: t('whoweare.vision.title'),
            description: t('whoweare.vision.description'),
        },
        {
            iconName: 'shield-checkmark-outline',
            title: t('whoweare.values.title'),
            description: t('whoweare.values.description'),
        },
    ];

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
    };

    return (
        <SectionContainer id="whoweare" ref={containerRef} className="relative overflow-hidden bg-primary-black/5 dark:bg-dark-secondary/20">
            {/* Parallax Background Elements */}
            <ParallaxAsset
                src="https://picsum.photos/seed/abstract-circle/200/200"
                alt="Abstract Circle 1"
                y={yCircle1}
                className="absolute top-1/4 left-0 w-24 h-24 rounded-full bg-accent-yellow opacity-10 dark:opacity-5 blur-md"
            />
            <ParallaxAsset
                src="https://picsum.photos/seed/abstract-triangle/150/150"
                alt="Abstract Triangle"
                y={yTriangle}
                className="absolute bottom-1/3 right-0 w-20 h-20 bg-primary-black dark:bg-dark-text opacity-5 rotate-45 blur-md"
            />
            <ParallaxAsset
                src="https://picsum.photos/seed/abstract-square/250/250"
                alt="Abstract Square"
                y={yCircle2}
                className="absolute top-1/2 left-1/4 w-32 h-32 bg-accent-yellow opacity-5 dark:opacity-2 blur-md rounded-xl"
            />

            <motion.div
                className="relative z-10 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
                    {t('whoweare.title')} <br />
                    <span className="text-accent-yellow">{t('whoweare.subtitle')}</span>
                </h2>
                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    {ethos.map((item, index) => (
                        <TiltCard
                            key={item.title}
                            iconName={item.iconName}
                            title={item.title}
                            description={item.description}
                            delay={index * 0.2}
                        />
                    ))}
                </div>
            </motion.div>
        </SectionContainer>
    );
};

export default WhoWeAreSection;