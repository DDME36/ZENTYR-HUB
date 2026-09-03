'use client';

import { MotionConfig } from 'framer-motion';

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="never" transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
