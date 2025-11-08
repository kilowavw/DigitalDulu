import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import { useLanguage } from '../../context/LanguageContext';
import ProjectModal from '../ui/ProjectModal'; // Import the new modal component

declare const anime: any;

interface Project {
    title: string;
    imageUrl: string;
    description: string;
    technologies: string[];
    liveLink?: string;
    githubLink?: string;
}

const PortfolioCard: React.FC<{ project: Project; delay: number; onCardClick: (project: Project) => void }> = ({ project, delay, onCardClick }) => {
    // Fix: Corrected the useRef type from HTMLDivElement to HTMLButtonElement to match the actual element.
    const cardRef = useRef<HTMLButtonElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    // Use effect to wrap letters in spans for animation, runs once per title change
    useEffect(() => {
        const currentTitle = titleRef.current;
        if (currentTitle) {
            currentTitle.innerHTML = project.title.replace(/\S/g, "<span class='letter' style='display:inline-block;'>$&</span>");
        }
    }, [project.title]);

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
    }, [delay, project.title]); // Re-run effect if title changes, to re-query letters

    return (
        <button
            ref={cardRef}
            onClick={() => onCardClick(project)}
            className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
            aria-label={`View details for ${project.title}`}
        >
            <div className="absolute inset-0 bg-accent-yellow reveal-overlay z-10"></div>
            {/* Remove transition classes that might conflict with anime.js */}
            <img src={project.imageUrl} alt={project.title} className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
                {/* Add a wrapper to hide text overflow during animation */}
                <div className="overflow-hidden">
                   <h3 ref={titleRef} className="text-white text-2xl font-bold">{project.title}</h3>
                </div>
            </div>
        </button>
    );
};

const PortfolioSection: React.FC = () => {
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const projects: Project[] = [
        { 
            title: 'Cimahi Billiard Centre', 
            imageUrl: 'https://res.cloudinary.com/dj0draukr/image/upload/v1761212208/Screenshot_2025-10-23_163501_umyfoi.png',
            description: 'A comprehensive web application for managing a billiard center, including table bookings, membership, and event scheduling. Designed for ease of use and efficient operations.',
            technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
            liveLink: '#',
            githubLink: '#',
        },
        { 
            title: 'Lomba PMR SMK KES Cimahi', 
            imageUrl: 'https://res.cloudinary.com/dj0draukr/image/upload/v1761213122/Screenshot_2025-10-23_165141_f0xpby.png',
            description: 'Event management system for the Red Cross Youth (PMR) competition at SMK KES Cimahi. Features registration, score tracking, and participant information management.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
            liveLink: '#',
            githubLink: '#',
        },
        { 
            title: 'Website for PT Inti Konten', 
            imageUrl: 'https://res.cloudinary.com/dj0draukr/image/upload/v1761220808/Screenshot_2025-10-23_185950_zmrolx.png',
            description: 'Official corporate website for PT Inti Konten, showcasing their services, portfolio, and contact information. Focus on modern design and responsive experience.',
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
            liveLink: '#',
            githubLink: '#',
        },
        { 
            title: 'Attendance Web', 
            imageUrl: 'https://res.cloudinary.com/dj0draukr/image/upload/v1761222790/Screenshot_2025-10-23_193234_jxgpnu.png',
            description: 'A web-based attendance system for employees, complete with check-in/check-out, leave requests, and administrative reporting features. Streamlines HR processes.',
            technologies: ['Vue.js', 'Laravel', 'PostgreSQL', 'Bootstrap'],
            liveLink: '#',
            githubLink: '#',
        },
    ];

    const handleCardClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Disable body scroll
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        document.body.style.overflow = ''; // Re-enable body scroll
    };

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
                    <PortfolioCard 
                        key={project.title} 
                        project={project} 
                        delay={index * 200} 
                        onCardClick={handleCardClick} 
                    />
                ))}
            </div>

            <ProjectModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                project={selectedProject} 
            />
        </SectionContainer>
    );
};

export default PortfolioSection;