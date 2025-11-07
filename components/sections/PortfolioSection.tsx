import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import { useLanguage } from '../../context/LanguageContext';

declare const anime: any;

const PortfolioCard: React.FC<{ title: string; imageUrl: string; delay: number }> = ({ title, imageUrl, delay }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    // Use effect to wrap letters in spans for animation, runs once per title change
    useEffect(() => {
        const currentTitle = titleRef.current;
        if (currentTitle) {
            currentTitle.innerHTML = title.replace(/\S/g, "<span class='letter' style='display:inline-block;'>$&</span>");
        }
    }, [title]);

    useEffect(() => {
        const currentCard = cardRef.current;
        if (!currentCard) return;

        const revealEl = currentCard.querySelector('.reveal-overlay') as HTMLElement;
        const imageEl = currentCard.querySelector('img');
        // Query for letters after they've been created
        const letters = currentCard.querySelectorAll('.letter');

        if (!revealEl || !imageEl || letters.length === 0) return;

        // Set initial animation states
        anime.set(imageEl, { scale: 1.2 });
        anime.set(letters, { translateY: '100%', opacity: 0 });
        anime.set(revealEl, { translateX: '-101%' });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const tl = anime.timeline({
                            easing: 'easeOutExpo',
                            delay: delay, // Use the direct delay value in ms
                        });

                        tl.add({
                            targets: revealEl,
                            translateX: ['-101%', '101%'],
                            duration: 1000,
                            easing: 'easeInOutQuint',
                        })
                        .add({
                            targets: imageEl,
                            scale: 1,
                            duration: 1000,
                        }, '-=1000') // Start image animation with the reveal
                        .add({
                            targets: letters,
                            translateY: ['100%', '0%'],
                            opacity: [0, 1],
                            duration: 800,
                            delay: anime.stagger(40),
                        }, '-=700'); // Start text animation as reveal is finishing

                        observer.unobserve(currentCard); // Ensure animation runs only once
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(currentCard);

        return () => {
            if (currentCard) {
                observer.unobserve(currentCard);
            }
        };
    }, [delay, title]); // Re-run effect if title changes, to re-query letters

    return (
        <div ref={cardRef} className="group relative overflow-hidden rounded-lg shadow-lg">
            <div className="absolute inset-0 bg-accent-yellow reveal-overlay z-10"></div>
            {/* Remove transition classes that might conflict with anime.js */}
            <img src={imageUrl} alt={title} className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
                {/* Add a wrapper to hide text overflow during animation */}
                <div className="overflow-hidden">
                   <h3 ref={titleRef} className="text-white text-2xl font-bold">{title}</h3>
                </div>
            </div>
        </div>
    );
};

const PortfolioSection: React.FC = () => {
    const { t } = useLanguage();
    const projects = [
        { title: 'Cimahi Billiard Centre', imageUrl: 'https://res.cloudinary.com/dj0draukr/image/upload/v1761212208/Screenshot_2025-10-23_163501_umyfoi.png' },
        { title: 'Lomba PMR SMK KES Cimahi', imageUrl: 'https://res.cloudinary.com/dj0draukr/image/upload/v1761213122/Screenshot_2025-10-23_165141_f0xpby.png' },
        { title: 'Website for PT Inti Konten', imageUrl: 'https://res.cloudinary.com/dj0draukr/image/upload/v1761220808/Screenshot_2025-10-23_185950_zmrolx.png' },
        { title: 'Attendance Web', imageUrl: 'https://res.cloudinary.com/dj0draukr/image/upload/v1761222790/Screenshot_2025-10-23_193234_jxgpnu.png' },
    ];

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
    };

    return (
        <SectionContainer id="portfolio" className="bg-primary-black/5 dark:bg-dark-secondary/20">
            <motion.div
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">{t('portfolio.title')}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-black/70 dark:text-dark-text/70">
                    {t('portfolio.subtitle')}
                </p>
            </motion.div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <PortfolioCard key={project.title} title={project.title} imageUrl={project.imageUrl} delay={index * 200} />
                ))}
            </div>
        </SectionContainer>
    );
};

export default PortfolioSection;