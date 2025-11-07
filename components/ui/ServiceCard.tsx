import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  iconName: string;
  title: string;
  description: string;
  index: number;
}

// A simple pseudo-random generator based on the index to ensure animations are consistent across re-renders.
const pseudoRandom = (seed: number) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const getTossedInitialState = (index: number) => {
    // Generate varied starting positions and rotations for a "tossed" effect
    // Reduced the multiplier from 400 to 300 to make the initial position less extreme on mobile devices.
    const offsetX = (pseudoRandom(index * 2) - 0.5) * 300; // -150 to 150
    const offsetY = (pseudoRandom(index * 3) - 0.5) * 300; // -150 to 150
    
    const rotateX = (pseudoRandom(index * 5) - 0.5) * 180; // -90 to 90 degrees
    const rotateY = (pseudoRandom(index * 7) - 0.5) * 180; // -90 to 90 degrees
    const rotateZ = (pseudoRandom(index * 11) - 0.5) * 90; // -45 to 45 degrees

    return {
        opacity: 0,
        x: offsetX,
        y: offsetY,
        scale: 0.4,
        rotateX: rotateX,
        rotateY: rotateY,
        rotateZ: rotateZ,
    };
};


const ServiceCard: React.FC<ServiceCardProps> = ({ iconName, title, description, index }) => {
  const initialState = getTossedInitialState(index);
  
  return (
    <motion.div
      className="bg-background-white dark:bg-dark-secondary p-8 rounded-lg shadow-lg border border-primary-black/10 dark:border-dark-text/10 will-change-transform"
      style={{ transformStyle: 'preserve-3d' }} // Required for child elements to respect 3D transformations
      initial={initialState}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0, 
        scale: 1,
        rotateX: 0, 
        rotateY: 0, 
        rotateZ: 0 
      }}
      viewport={{ once: true, amount: 0.2 }} // Lowered from 0.5 to ensure animation triggers reliably on mobile
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 1,
        delay: index * 0.1,
      }}
      whileHover={{
        scale: 1.05,
        y: -15,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 10px 20px -8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent-yellow mb-6">
        <ion-icon name={iconName} style={{ fontSize: '32px', color: '#000000' }}></ion-icon>
      </div>
      <h3 className="text-2xl font-bold uppercase">{title}</h3>
      <p className="mt-4 text-primary-black/70 dark:text-dark-text/70">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;