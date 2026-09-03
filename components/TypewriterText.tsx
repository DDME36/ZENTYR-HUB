'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  className?: string;
  textClassName?: string;
}

export const TypewriterText = ({
  texts,
  delayBetween = 3200,
  className = '',
  textClassName,
}: TypewriterTextProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, delayBetween);
    return () => clearInterval(interval);
  }, [texts, delayBetween]);

  const currentText = texts[index] || '';

  return (
    <span className={`inline-flex items-center justify-center align-baseline ${className}`}>
      <span className="sr-only">{currentText}</span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentText}
          initial={{
            opacity: 0,
            filter: 'blur(8px)',
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            transition: {
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          exit={{
            opacity: 0,
            filter: 'blur(8px)',
            scale: 1.02,
            transition: {
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          className={
            textClassName ||
            'inline-block whitespace-nowrap px-2 py-1 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent'
          }
        >
          {currentText}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
