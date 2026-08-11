'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = 0;

    const toggleVisibility = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        // Only update if scrolled more than 50px to reduce re-renders
        if (Math.abs(currentScrollY - lastScrollY) > 50) {
          setIsVisible(currentScrollY > 400);
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
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={scrollToTop}
          data-article-action="back-to-top"
          className="group fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-purple-400 text-white shadow-[0_8px_30px_rgba(251,113,133,0.4)] transition-shadow hover:shadow-[0_12px_40px_rgba(251,113,133,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
          aria-label="กลับขึ้นด้านบน"
        >
          <ArrowUp
            size={20}
            className="transition-transform group-hover:-translate-y-1 sm:h-6 sm:w-6"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
