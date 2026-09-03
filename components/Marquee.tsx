'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const marqueePhrases = [
  'BUILD & EXPERIMENT',
  'ทดลองจริง โค้ดจริง',
  'AI & SOFTWARE LAB',
  'CRAFTED WITH PASSION',
  'FROM IDEA TO REALITY',
  'CREATIVE INNOVATION',
];

const skills = [
  'Next.js 15',
  'React 19',
  'TypeScript',
  'Python',
  'RVC & Voice AI',
  'PyTorch',
  'Tailwind CSS',
  'Offline-First PWA',
  'Web Audio API',
  'Discord Bots',
  'Cloudflare Workers',
  'UI/UX Design',
];

export interface MarqueeProps {
  isDark?: boolean;
}

export const Marquee = ({}: MarqueeProps = {}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(marqueeRef, { margin: '200px 0px' });

  return (
    <motion.div
      ref={marqueeRef}
      initial={{ opacity: 0, y: 22, rotate: 2, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, rotate: 2, filter: 'blur(0px)' }}
      transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-12 mt-6 w-full overflow-hidden border-y border-gray-200/30 bg-white/70 py-6 shadow-lg backdrop-blur-md transition-colors duration-500 sm:-mt-12 sm:mb-8 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
    >
      {/* Top marquee - Pure CSS Animation (GPU Accelerated) */}
      <div className="relative mb-3 flex overflow-hidden whitespace-nowrap">
        <span className="sr-only">BUILD & EXPERIMENT • ทดลองจริง โค้ดจริง • AI & SOFTWARE LAB</span>
        <div
          aria-hidden="true"
          className="animate-marquee flex whitespace-nowrap font-display text-xl font-black sm:text-2xl md:text-3xl lg:text-4xl"
          style={{
            animationPlayState: isInView ? 'running' : 'paused',
            willChange: isInView ? 'transform' : 'auto',
            letterSpacing: '0.1em',
            lineHeight: '1.5',
          }}
        >
          {/* Duplicate content 2 ครั้งเพื่อให้วนลูปไม่มีรอยต่อ */}
          {[...Array(2)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex">
              {marqueePhrases.map((phrase, i) => (
                <span
                  key={i}
                  className="mx-6 inline-block bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 bg-clip-text text-transparent transition-transform duration-300 hover:scale-105 sm:mx-8 md:mx-10 dark:from-zinc-200 dark:via-white dark:to-zinc-300"
                >
                  {phrase} •
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Skills marquee - continuous movement in the same direction */}
      <div className="relative flex overflow-hidden whitespace-nowrap">
        <span className="sr-only">{skills.join(', ')}</span>
        <div
          aria-hidden="true"
          className="animate-marquee-skills flex whitespace-nowrap text-sm font-semibold sm:text-base"
          style={{
            animationPlayState: isInView ? 'running' : 'paused',
            willChange: isInView ? 'transform' : 'auto',
            letterSpacing: '0.05em',
          }}
        >
          {/* Duplicate content 2 ครั้งเพื่อให้วนลูปไม่มีรอยต่อ */}
          {[...Array(2)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex">
              {[...Array(20)].map((_, i) => (
                <span
                  key={i}
                  className="mx-6 inline-block text-gray-500 transition duration-300 hover:scale-110 hover:text-purple-500 sm:mx-8 dark:text-zinc-400 dark:hover:text-white"
                >
                  {skills[i % skills.length]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white/80 to-transparent dark:from-[#09090b]" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white/80 to-transparent dark:from-[#09090b]" />
    </motion.div>
  );
};
