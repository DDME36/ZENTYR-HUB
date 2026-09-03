'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]"
        style={{ scaleX }}
      />
    </div>
  );
};
