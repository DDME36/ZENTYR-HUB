'use client';

import React, { PointerEvent, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const MagneticButton = ({
  children,
  className = '',
  intensity = 0.2,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const bounds = useRef<DOMRect | null>(null);
  const pointerEnabled = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.12 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.12 });

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    pointerEnabled.current =
      event.pointerType === 'mouse' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    bounds.current = pointerEnabled.current ? event.currentTarget.getBoundingClientRect() : null;
  };

  const handlePointerMove = ({ clientX, clientY }: PointerEvent<HTMLDivElement>) => {
    if (!pointerEnabled.current || !bounds.current) return;

    const { width, height, left, top } = bounds.current;
    x.set((clientX - (left + width / 2)) * intensity);
    y.set((clientY - (top + height / 2)) * intensity);
  };

  const reset = () => {
    pointerEnabled.current = false;
    bounds.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
