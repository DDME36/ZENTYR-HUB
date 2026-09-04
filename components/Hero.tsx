'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Layers, Cpu } from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { GradientText } from './GradientText';
import { MagneticButton } from './MagneticButton';
import { MouseEvent, useRef } from 'react';

const heroTitles = ['Knowledge Hub', 'แหล่งความรู้', 'Tech Blog', 'Developer Hub'];

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 180, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const orb1X = useTransform(smoothMouseX, [-300, 300], [-35, 35]);
  const orb1Y = useTransform(smoothMouseY, [-300, 300], [-30, 30]);
  const orb2X = useTransform(smoothMouseX, [-300, 300], [30, -30]);
  const orb2Y = useTransform(smoothMouseY, [-300, 300], [25, -25]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[46vh] items-center justify-center overflow-hidden py-16 sm:min-h-[54vh] sm:py-24"
    >
      {/* Animated Background Gradient Orbs with Mouse Parallax & Breathing Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          animate={{ scale: [1, 1.08, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-gradient-to-r from-rose-300/40 via-purple-300/35 to-pink-300/30 blur-3xl"
        />
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          animate={{ scale: [1, 1.06, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-gradient-to-l from-blue-300/35 via-indigo-300/30 to-purple-300/25 blur-3xl"
        />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-rose-200/25 blur-3xl" />
      </div>

      {/* Floating Interactive Tech Chips (Desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden 2xl:block" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)', y: [0, -12, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.5 },
            x: { type: 'spring', stiffness: 120, damping: 20, delay: 0.5 },
            filter: { duration: 0.8, delay: 0.5 },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute left-16 top-16 flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/85 px-4 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-purple-500 text-white shadow-sm">
            <Zap size={16} />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Next.js 16
            </div>
            <div className="text-xs font-bold text-gray-700">App Router & Fast ISR</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)', y: [0, 12, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.7 },
            x: { type: 'spring', stiffness: 120, damping: 20, delay: 0.7 },
            filter: { duration: 0.8, delay: 0.7 },
            y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
          }}
          className="absolute right-16 top-20 flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/85 px-4 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-sm">
            <Cpu size={16} />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Technology
            </div>
            <div className="text-xs font-bold text-gray-700">AI & Web Innovations</div>
          </div>
        </motion.div>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Floating Badge with Live Pulse Dot */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)', scale: 0.95 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 150 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/90 px-5 py-2.5 text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition-shadow hover:shadow-[0_12px_40px_rgb(0,0,0,0.1)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <span className="text-gray-500">Welcome to</span>
          <motion.a
            href="/"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block cursor-pointer bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text font-bold text-transparent"
          >
            PUNN HUB
          </motion.a>
        </motion.div>

        {/* Main Heading with Fluid Word Morph */}
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', damping: 22, stiffness: 130, delay: 0.1 }}
          className="mb-5 font-display text-3xl font-black leading-[1.3] tracking-tight text-gray-800 sm:text-4xl lg:text-5xl"
        >
          <span className="mb-2 block min-h-[1.35em] text-center">
            <TypewriterText texts={heroTitles} delayBetween={3200} className="inline-flex" />
          </span>
          <GradientText className="block">สำหรับนักพัฒนา</GradientText>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', damping: 22, stiffness: 130, delay: 0.22 }}
          className="mx-auto mb-8 max-w-xl text-base font-light leading-relaxed text-gray-500 sm:text-lg"
        >
          แหล่งรวมความรู้ ไอเดีย และเทคนิคต่างๆ
          <br className="hidden sm:block" />
          สำหรับการพัฒนาเว็บไซต์และเทคโนโลยี
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', damping: 20, stiffness: 140, delay: 0.32 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <MagneticButton>
            <motion.a
              href="/blog"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              aria-label="อ่านบทความทั้งหมด"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgb(251,113,133,0.35)] transition-all hover:shadow-[0_14px_45px_rgb(251,113,133,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 sm:px-8 sm:py-4 sm:text-base"
            >
              <div className="shimmer-effect animate-[shimmer_3s_ease-out_infinite]" />
              <span className="relative z-10 font-bold">บทความ</span>
              <motion.span
                className="relative z-10"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.a>
          </MagneticButton>

          <MagneticButton>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
              aria-label="ดูโปรเจกต์ทั้งหมด"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/80 bg-white/90 px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition-all hover:border-rose-100 hover:text-rose-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 sm:px-8 sm:py-4 sm:text-base"
            >
              <Layers size={16} className="text-gray-400 group-hover:text-rose-500" />
              <span>โปรเจกต์</span>
            </motion.button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};
