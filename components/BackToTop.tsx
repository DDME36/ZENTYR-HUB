'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 28 });
  const circleOffset = useTransform(smoothProgress, [0, 1], [138.2, 0]);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = 0;

    const toggleVisibility = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollY) > 30) {
          setIsVisible(currentScrollY > 350);
          lastScrollY = currentScrollY;
        }
        rafId = 0;
      });
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          data-article-action="back-to-top"
          className="group fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md transition-shadow hover:shadow-[0_16px_40px_rgba(168,85,247,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 dark:border dark:border-zinc-800 dark:bg-zinc-900/95 dark:text-zinc-100 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
          aria-label="กลับขึ้นด้านบน"
        >
          {/* Circular Progress Ring */}
          <svg
            viewBox="0 0 52 52"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full -rotate-90"
          >
            <circle
              cx="26"
              cy="26"
              r="22"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="transparent"
              className="text-gray-100 dark:text-zinc-800"
            />
            <motion.circle
              cx="26"
              cy="26"
              r="22"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray="138.2"
              style={{ strokeDashoffset: circleOffset }}
              className="text-purple-600 dark:text-cyan-400"
            />
          </svg>

          <ArrowUp
            size={20}
            className="relative z-10 text-gray-700 transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-purple-600 dark:text-zinc-200 dark:group-hover:text-cyan-400 sm:h-5 sm:w-5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
