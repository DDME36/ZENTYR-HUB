'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export const GradientText = ({ children, className = '', animate = true }: GradientTextProps) => {
  if (!animate) {
    return (
      <span
        className={`bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 bg-clip-text text-transparent ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={`bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 7,
        repeat: 0,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </motion.span>
  );
};
