import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface Project {
  title: string;
  imageUrl: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-primary-black/70 dark:bg-dark-bg/90"
            onClick={onClose}
          ></motion.div>

          {/* Modal Content */}
          <motion.div
            className="relative bg-background-white dark:bg-dark-bg rounded-lg shadow-2xl max-w-4xl w-full mx-auto p-6 sm:p-8 md:p-10 transform scale-95 opacity-0"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            aria-live="assertive"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-primary-black dark:text-dark-text hover:text-accent-yellow dark:hover:text-accent-yellow focus:outline-none focus:ring-2 focus:ring-accent-yellow rounded-full p-1"
              aria-label={t('modal.close')}
            >
              <ion-icon name="close-circle-outline" style={{ fontSize: '32px' }}></ion-icon>
            </button>

            <h2 id="modal-title" className="text-3xl font-black uppercase tracking-tighter text-primary-black dark:text-dark-text mb-6">
              {project.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="md:col-span-1">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto object-cover rounded-md shadow-lg"
                />
              </div>

              <div className="md:col-span-1">
                <p className="mt-4 text-lg text-primary-black/80 dark:text-dark-text/80 leading-relaxed">
                  {project.description}
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4 text-primary-black dark:text-dark-text">{t('modal.technologies')}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-accent-yellow/20 text-accent-yellow px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex gap-4">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent-yellow text-primary-black font-bold py-3 px-8 text-base rounded-full hover:bg-yellow-300 transition-colors transform hover:scale-105"
                      aria-label={t('modal.viewLive')}
                    >
                      {t('modal.viewLive')}
                      <ion-icon name="open-outline" style={{ fontSize: '18px', marginLeft: '8px' }}></ion-icon>
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary-black/10 dark:bg-dark-secondary/50 text-primary-black dark:text-dark-text font-bold py-3 px-8 text-base rounded-full hover:bg-gray-200 dark:hover:bg-dark-secondary transition-colors transform hover:scale-105"
                      aria-label={t('modal.viewCode')}
                    >
                      {t('modal.viewCode')}
                      <ion-icon name="logo-github" style={{ fontSize: '18px', marginLeft: '8px' }}></ion-icon>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;