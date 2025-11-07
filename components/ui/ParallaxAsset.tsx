
import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface ParallaxAssetProps {
  src: string;
  alt: string;
  y: MotionValue<string>;
  className?: string;
}

const ParallaxAsset: React.FC<ParallaxAssetProps> = ({ src, alt, y, className }) => {
  return (
    <motion.div style={{ y }} className={className}>
      <img src={src} alt={alt} className="w-full h-auto object-contain rounded-lg" />
    </motion.div>
  );
};

export default ParallaxAsset;
