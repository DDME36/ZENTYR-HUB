'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { BentoGrid } from './BentoGrid';
import { Marquee } from './Marquee';
import { TechStackMarquee } from './TechStackMarquee';
import { MagneticButton } from './MagneticButton';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { useTheme } from './ThemeProvider';
import type { PostSummary } from '@/lib/types';

interface ZentyrHomeProps {
  posts: PostSummary[];
}

export const ZentyrHome = ({ posts }: ZentyrHomeProps) => {
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen pt-20 transition-colors duration-700 sm:pt-24">
      <div id="top" className="relative z-10">
        {/* ========================================================= */}
        {/* 1. HERO SECTION (CLEAN TYPEWRITER WITH PARALLAX)          */}
        {/* ========================================================= */}
        <section className="relative flex min-h-[48vh] items-center justify-center overflow-hidden py-16 sm:min-h-[56vh] sm:py-24">
          {/* Calm background accents: static so the headline remains the focal point. */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-gradient-to-r from-purple-300/40 via-pink-300/35 to-amber-200/30 blur-3xl transition-colors duration-700 dark:from-purple-900/35 dark:via-violet-900/25 dark:to-zinc-950/40" />
            <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-gradient-to-l from-rose-300/35 via-purple-300/30 to-amber-300/25 blur-3xl transition-colors duration-700 dark:from-cyan-900/30 dark:via-indigo-900/20 dark:to-zinc-950/40" />
          </div>

          {/* Centered Hero Content */}
          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)', scale: 0.96 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-purple-200/80 bg-white/90 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm backdrop-blur-md transition-all duration-500 dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:text-zinc-100"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 dark:bg-cyan-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-cyan-500" />
              </span>
              <span className="text-gray-500 dark:text-zinc-400">Welcome to</span>
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text font-bold text-transparent transition-all duration-500 dark:from-white dark:via-zinc-200 dark:to-cyan-400">
                ZENTYR
              </span>
            </motion.div>

            {/* Typewriter Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 font-display text-3xl font-black leading-[1.3] tracking-tight text-gray-800 transition-colors duration-500 dark:text-white sm:text-4xl lg:text-5xl"
            >
              <span className="mb-2 block min-h-[1.35em] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text px-2 py-1 text-center text-transparent dark:from-white dark:via-zinc-100 dark:to-zinc-300">
                Creative Tech Lab
              </span>
              <span className="block overflow-visible whitespace-nowrap bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text pb-[0.08em] pt-[0.18em] text-[clamp(1.35rem,7vw,3rem)] leading-[1.4] tracking-[-0.025em] text-transparent transition-all duration-500 dark:from-white dark:via-zinc-200 dark:to-cyan-400 sm:text-4xl lg:text-5xl">
                ทดลองไอเดีย สร้างของจริง
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mb-8 max-w-xl text-base font-light leading-relaxed text-gray-500 transition-colors duration-500 dark:text-zinc-400 sm:text-lg"
            >
              รวมเครื่องมือ AI เว็บแอป และเบื้องหลังการพัฒนา
              <br className="hidden sm:block" />
              จากไอเดียทดลองสู่โปรดักต์ที่ใช้งานได้จริง
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.76, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <MagneticButton>
                <Link
                  href="/blog"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-rose-600 to-amber-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-5px_rgba(217,70,239,0.38)] transition-all duration-500 hover:shadow-xl focus-visible:outline-none dark:from-white dark:via-zinc-100 dark:to-zinc-200 dark:!text-black dark:shadow-[0_10px_30px_-5px_rgba(255,255,255,0.25)] sm:px-8 sm:py-4 sm:text-base"
                >
                  <span className="relative z-10 font-bold">บทความ</span>
                  <ArrowRight size={18} className="relative z-10" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={() => {
                    document.getElementById('projects')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/80 bg-white/90 px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-sm backdrop-blur-md transition-all hover:border-gray-200 hover:text-black hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:text-white sm:px-8 sm:py-4 sm:text-base"
                >
                  <span>โปรเจกต์</span>
                  <ArrowDown size={16} />
                </button>
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* 2. MARQUEE BANNER */}
        <div className="transition-colors duration-500">
          <Marquee isDark={isDark} />
        </div>

        {/* 3. BALANCED CLASSIC BENTO GRID */}
        <section id="projects" className="scroll-mt-24 sm:scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-6xl px-5 pt-4 text-center sm:px-6 sm:pt-8"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-600 dark:text-cyan-400">
              Featured Showcase
            </p>
            <h2 className="mt-2 font-display text-2xl font-black tracking-tight text-gray-800 transition-colors duration-500 dark:text-white sm:text-4xl">
              ผลงานจริงและโปรเจกต์ไฮไลต์
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 transition-colors duration-500 dark:text-zinc-400 sm:text-base">
              คัดสรรแอปพลิเคชัน เครื่องมือ AI และโมเดลที่พัฒนาขึ้นจากโจทย์จริง
              พร้อมให้คุณทดลองใช้งาน
            </p>
          </motion.div>
          <BentoGrid posts={posts} isDark={isDark} />
        </section>

        {/* 4. TECH STACK MARQUEE (สิ่งที่เราศึกษาวิจัย - การ์ดสีขาวบนมืด) */}
        <div className="transition-colors duration-500">
          <TechStackMarquee isDark={isDark} />
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};
