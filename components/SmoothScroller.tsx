'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export const SmoothScroller = () => {
  useEffect(() => {
    const coarsePointerQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    let lenis: Lenis | null = null;
    let frameId = 0;

    function raf(time: number) {
      lenis?.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    const stopLoop = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const startLoop = () => {
      if (!frameId && lenis && document.visibilityState === 'visible') {
        frameId = requestAnimationFrame(raf);
      }
    };

    const configureScroller = () => {
      stopLoop();
      lenis?.destroy();
      lenis = null;

      if (coarsePointerQuery.matches) return;

      lenis = new Lenis({
        duration: 0.85,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      });
      startLoop();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') startLoop();
      else stopLoop();
    };

    configureScroller();
    coarsePointerQuery.addEventListener('change', configureScroller);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopLoop();
      coarsePointerQuery.removeEventListener('change', configureScroller);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      lenis?.destroy();
    };
  }, []);

  return null;
};
