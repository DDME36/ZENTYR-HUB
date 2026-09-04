'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Rss,
  Sparkles,
  Zap,
  Gamepad2,
  Compass,
} from 'lucide-react';
import type { PostSummary } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ZentyrV2Props {
  posts: PostSummary[];
}

// Zentyr Next-Gen Monogram
const ZentyrNextGenLogo = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <div className={cn('group relative flex select-none items-center justify-center', className)}>
    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-rose-500 opacity-70 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg" />
    <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/90 bg-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-transform duration-300 group-hover:scale-105">
      <svg viewBox="0 0 32 32" fill="none" className="h-[60%] w-[60%]">
        <defs>
          <linearGradient id="zentyr-v2-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
        <path
          d="M6 7.5H26L10 24.5H26"
          stroke="url(#zentyr-v2-grad)"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

// Interactive Showcase Presets
interface ShowcasePreset {
  id: string;
  code: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  gradient: string;
  shadowGlow: string;
  href: string;
  stats: { label: string; value: string }[];
  tags: string[];
}

const showcasePresets: ShowcasePreset[] = [
  {
    id: 'memokard',
    code: 'SPECIMEN // 01',
    name: 'MemoKard',
    category: 'Cognitive Software & PWA',
    tagline: 'ระบบแฟลชการ์ดช่วยจำภาษาไทยแบบ Offline-First',
    description:
      'แอปช่วยจำด้วยอัลกอริทึม FSRS (Free Spaced Repetition Scheduler) v4 พร้อมระบบ Active Recall แบบออฟไลน์ 100% ติดตั้งได้ทุกอุปกรณ์',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    shadowGlow: 'rgba(16,185,129,0.25)',
    href: '/blog/MemoKard',
    stats: [
      { label: 'Algorithm', value: 'FSRS v4' },
      { label: 'Architecture', value: 'IndexedDB PWA' },
      { label: 'Performance', value: '100% Offline' },
    ],
    tags: ['Next.js 16', 'TypeScript', 'Tailwind', 'FSRS'],
  },
  {
    id: 'crimsonvc',
    code: 'SPECIMEN // 02',
    name: 'CrimsonVC Studio',
    category: 'Neural Voice Synthesis',
    tagline: 'สตูดิโอแปลงเสียงและ AI Cover ผ่าน Google Colab',
    description:
      'สภาพแวดล้อมฝึกโมเดลเสียง RVC v2 แบบวันคลิก รองรับการสลับโมเดลเสียง ปรับแต่ง pitch และสร้าง AI Cover เพลงคุณภาพระดับสตูดิโอ',
    gradient: 'from-rose-500 via-red-600 to-purple-700',
    shadowGlow: 'rgba(244,63,94,0.25)',
    href: '/blog/CrimsonVCStudio',
    stats: [
      { label: 'Engine', value: 'RVC v2' },
      { label: 'Platform', value: 'Google Colab' },
      { label: 'Sample Rate', value: '48,000 Hz' },
    ],
    tags: ['Python', 'PyTorch', 'Audio DSP', 'Colab'],
  },
  {
    id: 'smartaistock',
    code: 'SPECIMEN // 03',
    name: 'Smart AI Stock',
    category: 'Algorithmic FinTech',
    tagline: 'ระบบสแกนหุ้นด้วย AI และสัญญาณทางเทคนิค',
    description:
      'แพลตฟอร์มตรวจจับปริมาณการซื้อขายผิดปกติ (Volume Spike) และคัดกรองหุ้นแนวโน้มขาขึ้นด้วย Machine Learning แบบเรียลไทม์',
    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
    shadowGlow: 'rgba(99,102,241,0.25)',
    href: 'https://smartaistock.vercel.app/',
    stats: [
      { label: 'Data Feed', value: 'Realtime WebSocket' },
      { label: 'Model', value: 'Trend ML Scoring' },
      { label: 'Status', value: 'Live Deployment' },
    ],
    tags: ['React', 'TradingView', 'AI Analytics', 'Vercel'],
  },
];

export const ZentyrV2 = ({ posts }: ZentyrV2Props) => {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const activePreset = showcasePresets[activePresetIndex];

  // Interactive flashcard state for MemoKard preview
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  // Recent 4 posts
  const articleList = useMemo(() => posts.slice(0, 4), [posts]);

  return (
    <div className="relative min-h-screen bg-[#fafbfe] text-gray-900 selection:bg-purple-100 selection:text-purple-700">
      {/* Precision Geometric Grid Background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(to right, #4f46e5 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Floating Aurora Lights */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-300/35 via-sky-200/30 to-purple-300/25 blur-[120px]" />
        <div className="absolute -right-32 top-1/4 h-[580px] w-[580px] rounded-full bg-gradient-to-bl from-rose-300/30 via-purple-300/25 to-indigo-200/25 blur-[130px]" />
        <div className="absolute bottom-10 left-1/3 h-[480px] w-[480px] rounded-full bg-gradient-to-tr from-emerald-200/25 via-teal-200/20 to-blue-200/25 blur-[110px]" />
      </div>

      {/* ========================================================= */}
      {/* 1. FUTURISTIC FLOATING DOCK                               */}
      {/* ========================================================= */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center p-3 sm:p-5">
        <div className="pointer-events-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-full border border-white/80 bg-white/85 px-4 shadow-[0_16px_45px_-12px_rgba(30,41,59,0.08)] backdrop-blur-2xl transition-all sm:px-6">
          {/* Brand Monogram */}
          <Link href="/zentyr-v2" className="group flex items-center gap-3">
            <ZentyrNextGenLogo className="h-10 w-10" />
            <div className="flex flex-col">
              <span className="font-display text-lg font-black tracking-wider text-gray-900 transition-colors group-hover:text-purple-600">
                ZENTYR
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
                Digital Atelier
              </span>
            </div>
          </Link>

          {/* Navigation Matrix */}
          <nav className="hidden items-center gap-1 rounded-full border border-gray-100 bg-gray-50/70 p-1 text-xs font-bold text-gray-600 md:flex">
            <a
              href="#stage"
              className="rounded-full px-4 py-1.5 transition-all hover:bg-white hover:text-black"
            >
              Live Stage
            </a>
            <a
              href="#specimens"
              className="rounded-full px-4 py-1.5 transition-all hover:bg-white hover:text-black"
            >
              Specimens
            </a>
            <Link
              href="/blog"
              className="rounded-full px-4 py-1.5 transition-all hover:bg-white hover:text-black"
            >
              Dispatches
            </Link>
            <a
              href="https://satayupongpan.site/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full px-4 py-1.5 transition-all hover:bg-white hover:text-black"
            >
              Creator
            </a>
          </nav>

          {/* Version Switchers & GitHub */}
          <div className="flex items-center gap-2">
            <Link
              href="/zentyr-preview"
              className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/80 bg-purple-50/80 px-3.5 py-1.5 text-xs font-bold text-purple-700 shadow-sm transition-colors hover:bg-purple-100"
              title="สลับไปดูแบบที่ 1 (Classic Refined)"
            >
              <Compass size={13} />
              <span className="hidden sm:inline">แบบที่ 1 (Classic)</span>
              <span className="sm:hidden">แบบ 1</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-500 transition-colors hover:text-gray-900"
              title="ดูหน้าเดิม PUNN HUB"
            >
              <span className="hidden sm:inline">หน้าเดิม (PUNN)</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO ATELIER STAGE                                     */}
      {/* ========================================================= */}
      <main className="relative z-10 pb-20 pt-28 sm:pt-36">
        <section id="stage" className="mx-auto max-w-6xl px-5">
          {/* Top Status & Specimen Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/70 pb-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-3.5 py-1 font-mono text-xs font-semibold text-gray-700 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span>ZENTYR // ATELIER 2.0</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">BANGKOK, TH</span>
            </div>

            <div className="hidden font-mono text-xs text-gray-600 sm:block">
              ENGINEERED BY SATAYU PONGPAN • 2026
            </div>
          </div>

          {/* Hero Typography */}
          <div className="mt-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-purple-600">
              <Sparkles size={14} />
              <span>Experimental Software & Digital Laboratory</span>
            </div>

            <h1 className="mt-4 font-display text-[clamp(3.5rem,11vw,7.5rem)] font-black leading-[0.92] tracking-[-0.05em] text-gray-900">
              Z E N T Y R
            </h1>

            <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-gray-600 sm:text-xl">
              พื้นที่ทดลอง วิศวกรรมซอฟต์แวร์ และงานประดิษฐ์ทางเทคโนโลยี
              <br className="hidden sm:block" />
              ที่ผสมผสานความแม่นยำด้านโค้ด เข้ากับสุนทรียะในการใช้งานจริง
            </p>
          </div>

          {/* ========================================================= */}
          {/* INTERACTIVE STAGE SHOWCASE (แท่นพรีวิวแบบไดนามิก)        */}
          {/* ========================================================= */}
          <div className="mt-12 rounded-[2.5rem] border border-white/80 bg-white/75 p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] backdrop-blur-2xl sm:p-8">
            {/* Stage Tab Controller */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-5">
              <div className="flex flex-wrap items-center gap-2">
                {showcasePresets.map((preset, idx) => {
                  const isActive = activePresetIndex === idx;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setActivePresetIndex(idx);
                        setFlashcardFlipped(false);
                      }}
                      className={cn(
                        'relative flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm',
                        isActive
                          ? 'bg-gray-900 text-white shadow-md'
                          : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-black'
                      )}
                    >
                      <span>{preset.code.split('//')[1]}</span>
                      <span>{preset.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="font-mono text-xs text-gray-600">
                ACTIVE STAGE: {activePreset.code}
              </div>
            </div>

            {/* Stage Screen Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePreset.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center"
              >
                {/* Left Description Column (5 cols) */}
                <div className="space-y-4 lg:col-span-5">
                  <div className="inline-block rounded-lg bg-purple-50 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-purple-700">
                    {activePreset.category}
                  </div>

                  <h2 className="font-display text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                    {activePreset.name}
                  </h2>

                  <p className="text-sm font-bold text-gray-800">{activePreset.tagline}</p>
                  <p className="text-xs leading-relaxed text-gray-500 sm:text-sm">
                    {activePreset.description}
                  </p>

                  {/* Architecture Metrics */}
                  <div className="grid grid-cols-3 gap-2 border-y border-gray-100 py-3">
                    {activePreset.stats.map((stat, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-[10px] font-bold uppercase text-gray-600">
                          {stat.label}
                        </div>
                        <div className="text-xs font-bold text-gray-800">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href={activePreset.href}
                      className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-5 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-black hover:shadow-lg"
                    >
                      <span>สำรวจ {activePreset.name}</span>
                      <ArrowRight size={14} />
                    </Link>

                    <div className="flex flex-wrap gap-1.5">
                      {activePreset.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-gray-200/80 bg-white px-2.5 py-1 text-[11px] font-semibold text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Interactive Visual Stage (7 cols) */}
                <div className="lg:col-span-7">
                  <div
                    className={cn(
                      'relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white transition-all sm:p-8',
                      activePreset.gradient
                    )}
                    style={{
                      boxShadow: `0 20px 50px -10px ${activePreset.shadowGlow}`,
                    }}
                  >
                    {/* Background Graphic Grid */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] opacity-15 [background-size:16px_16px]" />

                    {/* Interactive Content Based on Specimen */}
                    {activePreset.id === 'memokard' && (
                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center justify-between text-xs text-emerald-100">
                          <span className="font-mono">SIMULATION // ACTIVE RECALL</span>
                          <span className="rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-bold">
                            CLICK TO FLIP
                          </span>
                        </div>

                        {/* Interactive Flip Flashcard */}
                        <div
                          onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                          className="cursor-pointer rounded-2xl border border-white/30 bg-black/20 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-black/25"
                        >
                          <div className="font-mono text-[11px] text-emerald-200">
                            QUESTION #{flashcardFlipped ? 'REVEALED' : 'HIDDEN'}
                          </div>
                          <div className="mt-2 font-display text-lg font-bold sm:text-xl">
                            {flashcardFlipped
                              ? 'อัลกอริทึม FSRS (Free Spaced Repetition Scheduler) ช่วยคำนวณรอบทบทวนตามความจำจริงของผู้เรียน'
                              : 'ทำไม MemoKard ถึงเลือกใช้ FSRS แทน Anki SM-2?'}
                          </div>
                          <div className="mt-4 flex items-center justify-between text-[11px] text-emerald-200">
                            <span>
                              {flashcardFlipped ? '✅ คลิกเพื่อซ่อนเฉลย' : '🔍 คลิกเพื่อดูคำตอบ'}
                            </span>
                            <span className="rounded bg-white/20 px-2 py-0.5 text-[10px]">
                              FSRS v4
                            </span>
                          </div>
                        </div>

                        {/* Rating Buttons */}
                        <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
                          <div className="rounded-xl border border-red-300/30 bg-red-500/30 p-2 text-red-100">
                            Again
                            <span className="block text-[9px] font-normal opacity-75">
                              &lt; 10m
                            </span>
                          </div>
                          <div className="rounded-xl border border-amber-300/30 bg-amber-500/30 p-2 text-amber-100">
                            Hard
                            <span className="block text-[9px] font-normal opacity-75">1.2d</span>
                          </div>
                          <div className="rounded-xl border border-emerald-300/30 bg-emerald-500/30 p-2 text-emerald-100">
                            Good
                            <span className="block text-[9px] font-normal opacity-75">3.5d</span>
                          </div>
                          <div className="rounded-xl border border-cyan-300/30 bg-cyan-500/30 p-2 text-cyan-100">
                            Easy
                            <span className="block text-[9px] font-normal opacity-75">7.0d</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activePreset.id === 'crimsonvc' && (
                      <div className="relative z-10 space-y-5">
                        <div className="flex items-center justify-between text-xs text-rose-100">
                          <span className="font-mono">NEURAL SPECTRUM // 48kHz</span>
                          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold">
                            AUDIO ACTIVE
                          </span>
                        </div>

                        {/* Simulated Audio Spectrum Equalizer */}
                        <div className="flex h-24 items-end justify-between gap-1 rounded-2xl border border-white/25 bg-black/25 p-4">
                          {[
                            40, 65, 80, 50, 95, 75, 60, 85, 45, 90, 70, 55, 80, 60, 75, 50, 85, 65,
                          ].map((height, i) => (
                            <motion.span
                              key={i}
                              animate={{
                                height: [`${height * 0.4}%`, `${height}%`, `${height * 0.3}%`],
                              }}
                              transition={{
                                duration: 1.2 + (i % 5) * 0.2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              className="w-full rounded-full bg-gradient-to-t from-white/40 to-white"
                            />
                          ))}
                        </div>

                        <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-2 text-xs backdrop-blur-sm">
                          <span>Target Voice: Trained Idol RVC</span>
                          <span className="font-mono text-[11px] text-rose-200">
                            Pitch Shift: +12
                          </span>
                        </div>
                      </div>
                    )}

                    {activePreset.id === 'smartaistock' && (
                      <div className="relative z-10 space-y-5">
                        <div className="flex items-center justify-between text-xs text-indigo-100">
                          <span className="font-mono">ALGO FEED // REALTIME</span>
                          <span className="rounded-full border border-emerald-300/40 bg-emerald-400/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-100">
                            +14.8% DETECTED
                          </span>
                        </div>

                        {/* Simulated Candlestick / Trendline Chart */}
                        <div className="rounded-2xl border border-white/25 bg-black/25 p-4">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <div className="text-2xl font-black">$ZTY / USD</div>
                              <div className="text-xs text-emerald-200">
                                Bullish Breakout Signal
                              </div>
                            </div>
                            <div className="text-right font-mono text-xs text-indigo-200">
                              Vol: 4.8M (240% avg)
                            </div>
                          </div>

                          {/* Chart SVG */}
                          <svg viewBox="0 0 400 100" fill="none" className="mt-3 h-16 w-full">
                            <path
                              d="M0 80 Q 80 85, 140 60 T 260 40 T 350 15 L 400 10"
                              stroke="#a5b4fc"
                              strokeWidth="3"
                              fill="none"
                            />
                            <path
                              d="M0 80 Q 80 85, 140 60 T 260 40 T 350 15 L 400 10 L 400 100 L 0 100 Z"
                              fill="url(#stock-area)"
                              opacity="0.25"
                            />
                            <defs>
                              <linearGradient id="stock-area" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#c7d2fe" />
                                <stop offset="100%" stopColor="transparent" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. SPECIMEN ARCHIVE (NEW ASYMMETRIC BENTO)                */}
        {/* ========================================================= */}
        <section id="specimens" className="mx-auto mt-24 max-w-6xl px-5">
          <div className="flex items-center justify-between border-b border-gray-200/70 pb-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-purple-600">
                ARCHIVE // 02
              </p>
              <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                Specimen & Lab Records
              </h2>
            </div>

            <div className="font-mono text-xs text-gray-600">EXPLORE ALL EXPERIMENTS</div>
          </div>

          {/* New Asymmetric Bento Grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Card A: Activity Studio */}
            <div className="rounded-3xl border border-gray-200/80 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Gamepad2 size={20} />
                </div>
                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                  DISCORD TOOL
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg font-black text-gray-900">
                PUNN Activity Studio
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                จำลองสถานะ Custom Status และ Game Presence แบบสดบนโปรไฟล์ Discord
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs">
                <span className="font-mono text-gray-600">Discord API</span>
                <Link
                  href="/blog/PUNNActivityStudio"
                  className="inline-flex items-center gap-1 font-bold text-blue-600 hover:underline"
                >
                  อ่านคู่มือ <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            {/* Card B: Creator Dossier (Satayu) */}
            <div className="rounded-3xl border border-purple-200/80 bg-gradient-to-br from-purple-50/50 via-white to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-600 font-display text-sm font-black text-white">
                  SP
                </div>
                <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                  LEAD CREATOR
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg font-black text-gray-900">Satayu Pongpan</h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                Software Developer & Creative Technologist ผู้สร้างโปรเจกต์ ZENTYR
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs">
                <a
                  href="https://github.com/DDME36"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-gray-700 hover:text-black"
                >
                  <Github size={13} /> GitHub
                </a>
                <a
                  href="https://satayupongpan.site/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-purple-600 hover:underline"
                >
                  Portfolio <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Card C: Tech Stack Radar */}
            <div className="rounded-3xl border border-gray-200/80 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <Zap size={20} />
                </div>
                <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600">
                  FOUNDATION
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg font-black text-gray-900">
                Modern Web Stack
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                ขับเคลื่อนด้วย Next.js 16, React 19, Tailwind CSS และรันไทม์ Bun สำหรับ ISR
                ความเร็วสูง
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-gray-100 pt-4">
                {['Next.js 16', 'React 19', 'Bun', 'Tailwind', 'Framer'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. RECENT DISPATCHES (ARTICLES STREAM)                    */}
        {/* ========================================================= */}
        <section className="mx-auto mt-20 max-w-6xl px-5">
          <div className="flex items-center justify-between border-b border-gray-200/70 pb-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-purple-600">
                DISPATCHES // 03
              </p>
              <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                Recent Technical Writings
              </h2>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700"
            >
              <span>ดูทั้งหมด ({posts.length})</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Editorial Stream List */}
          <div className="mt-6 divide-y divide-gray-100 overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm">
            {articleList.map((post, idx) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between gap-3 p-5 transition-colors hover:bg-purple-50/40 sm:flex-row sm:items-center sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="pt-1 font-mono text-xs font-bold text-gray-600">0{idx + 1}</span>
                  <div>
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-600">
                      {post.tags[0] || 'Technical'}
                    </span>
                    <h4 className="mt-1.5 font-display text-base font-bold text-gray-900 transition-colors group-hover:text-purple-600">
                      {post.title}
                    </h4>
                    {post.excerpt && (
                      <p className="mt-1 line-clamp-1 max-w-xl text-xs text-gray-500">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 pl-8 text-xs text-gray-600 sm:pl-0">
                  <span className="font-mono">{post.date}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all group-hover:bg-purple-600 group-hover:text-white">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* ========================================================= */}
      {/* 5. ATELIER FOOTER                                         */}
      {/* ========================================================= */}
      <footer className="border-t border-gray-200/80 bg-white/80 py-16 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <ZentyrNextGenLogo className="h-8 w-8" />
            <div>
              <div className="font-display text-base font-black tracking-wider text-gray-900">
                ZENTYR
              </div>
              <div className="font-mono text-[11px] text-gray-600">
                DIGITAL ATELIER BY SATAYU PONGPAN
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
            <Link href="/zentyr-preview" className="transition-colors hover:text-purple-600">
              แบบที่ 1 (Classic)
            </Link>
            <Link href="/" className="transition-colors hover:text-purple-600">
              หน้าเดิม (PUNN)
            </Link>
            <a
              href="https://github.com/DDME36"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-purple-600"
            >
              <Github size={14} /> GitHub
            </a>
            <Link
              href="/feed.xml"
              className="inline-flex items-center gap-1 transition-colors hover:text-orange-500"
            >
              <Rss size={14} /> RSS
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center font-mono text-[11px] text-gray-600">
          © {new Date().getFullYear()} ZENTYR // ALL SYSTEMS OPERATIONAL
        </div>
      </footer>
    </div>
  );
};
