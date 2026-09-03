'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Github,
  Rss,
  Zap,
  Check,
  Clock,
  Moon,
  Sun,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { MouseEvent, useRef, useState, useEffect } from 'react';
import { BentoGrid } from './BentoGrid';
import { Marquee } from './Marquee';
import { TechStackMarquee } from './TechStackMarquee';
import { TypewriterText } from './TypewriterText';
import { MagneticButton } from './MagneticButton';
import type { PostSummary } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ZentyrPreviewProps {
  posts: PostSummary[];
}

export type PaletteId = 'obsidian' | 'sunset' | 'cyber' | 'monochrome' | 'azure';

interface PaletteConfig {
  id: PaletteId;
  name: string;
  icon: string;
  badgeLabel: string;
  description: string;
  isDark: boolean;
  isBlackLogo?: boolean;
  brandGradient: string;
  typewriterClass?: string;
  buttonGradient: string;
  buttonShadow: string;
  navActive: string;
  tagColor: string;
  orb1: string;
  orb2: string;
  logoStops: [string, string, string];
  chip1: string;
  chip2: string;
  badgeBorder: string;
}

export const palettes: Record<PaletteId, PaletteConfig> = {
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Dark',
    icon: '🌑',
    badgeLabel: 'โหมดกลางคืน (Night)',
    description: 'โทนสีดำ Deep Black พร้อมเส้นตารางกริดสีขาวและแสงเรืองนีออนหรูหรา',
    isDark: true,
    brandGradient: 'from-white via-zinc-200 to-cyan-400',
    typewriterClass:
      'inline-block whitespace-nowrap px-2 py-1 bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent',
    buttonGradient: 'from-white via-zinc-100 to-zinc-200 !text-black',
    buttonShadow: 'rgba(255,255,255,0.25)',
    navActive: 'text-white',
    tagColor: 'text-cyan-400',
    orb1: 'from-purple-900/35 via-violet-900/25 to-zinc-950/40',
    orb2: 'from-cyan-900/30 via-indigo-900/20 to-zinc-950/40',
    logoStops: ['#ffffff', '#e4e4e7', '#06b6d4'],
    chip1: 'from-zinc-800 to-zinc-900 border border-zinc-700',
    chip2: 'from-zinc-800 to-zinc-900 border border-zinc-700',
    badgeBorder: 'border-zinc-700/80 bg-zinc-900/90 text-zinc-100',
  },
  sunset: {
    id: 'sunset',
    name: 'Iris Horizon',
    icon: '🌅',
    badgeLabel: 'โหมดกลางวัน (Day)',
    description: 'โทนสว่างสีม่วงไอริส + ชมพูสด + ส้มคอรัล (อบอุ่น มีพลังสร้างสรรค์)',
    isDark: false,
    brandGradient: 'from-purple-600 via-pink-600 to-amber-500',
    buttonGradient: 'from-purple-600 via-rose-600 to-amber-500',
    buttonShadow: 'rgba(217,70,239,0.38)',
    navActive: 'text-purple-600',
    tagColor: 'text-purple-600',
    orb1: 'from-purple-300/40 via-pink-300/35 to-amber-200/30',
    orb2: 'from-rose-300/35 via-purple-300/30 to-amber-300/25',
    logoStops: ['#9333ea', '#e11d48', '#f59e0b'],
    chip1: 'from-purple-600 to-rose-600',
    chip2: 'from-pink-500 to-amber-500',
    badgeBorder: 'border-purple-200/80',
  },
  cyber: {
    id: 'cyber',
    name: 'Cyber Prism',
    icon: '🔮',
    badgeLabel: 'Electric Violet & Cyan',
    description: 'Electric Violet & Cyber Cyan (ล้ำสมัย คมกริบ ไฮเทคที่สุด)',
    isDark: false,
    brandGradient: 'from-violet-600 via-indigo-600 to-cyan-500',
    buttonGradient: 'from-violet-600 via-indigo-600 to-cyan-600',
    buttonShadow: 'rgba(99,102,241,0.38)',
    navActive: 'text-violet-600',
    tagColor: 'text-violet-600',
    orb1: 'from-violet-300/40 via-indigo-300/35 to-cyan-300/30',
    orb2: 'from-cyan-300/35 via-blue-300/30 to-violet-300/25',
    logoStops: ['#8b5cf6', '#6366f1', '#06b6d4'],
    chip1: 'from-violet-600 to-indigo-600',
    chip2: 'from-cyan-500 to-blue-600',
    badgeBorder: 'border-violet-200/80',
  },
  monochrome: {
    id: 'monochrome',
    name: 'Jet Black Z',
    icon: '⚡',
    badgeLabel: 'โลโก้ดำ / Apple Style',
    description: 'พื้นหลังขาวสะอาด + โลโก้ตัว Z สีดำสนิทและตัวหนังสือคมเข้ม พรีเมียมมินิมอล',
    isDark: false,
    isBlackLogo: true,
    brandGradient: 'from-black via-zinc-900 to-zinc-700',
    typewriterClass:
      'inline-block whitespace-nowrap px-2 py-1 bg-gradient-to-r from-black via-zinc-900 to-zinc-800 bg-clip-text text-transparent',
    buttonGradient: 'from-black via-zinc-900 to-zinc-800 text-white',
    buttonShadow: 'rgba(0,0,0,0.25)',
    navActive: 'text-black',
    tagColor: 'text-zinc-900',
    orb1: 'from-zinc-200/50 via-gray-200/40 to-slate-200/35',
    orb2: 'from-slate-200/45 via-zinc-200/35 to-gray-200/30',
    logoStops: ['#09090b', '#18181b', '#27272a'],
    chip1: 'from-zinc-900 to-black text-white',
    chip2: 'from-zinc-800 to-zinc-900 text-white',
    badgeBorder: 'border-zinc-300 bg-white/90 text-zinc-900',
  },
  azure: {
    id: 'azure',
    name: 'Quantum Azure',
    icon: '💎',
    badgeLabel: 'Cobalt & Mint',
    description: 'Deep Cobalt & Emerald Mint (สะอาด มั่นใจ สไตล์ Stripe & Lab)',
    isDark: false,
    brandGradient: 'from-blue-600 via-indigo-600 to-teal-500',
    buttonGradient: 'from-blue-600 via-indigo-600 to-teal-600',
    buttonShadow: 'rgba(37,99,235,0.38)',
    navActive: 'text-blue-600',
    tagColor: 'text-blue-600',
    orb1: 'from-blue-300/40 via-indigo-300/35 to-teal-200/30',
    orb2: 'from-teal-300/35 via-cyan-300/30 to-blue-300/25',
    logoStops: ['#2563eb', '#4f46e5', '#10b981'],
    chip1: 'from-blue-600 to-indigo-600',
    chip2: 'from-teal-500 to-emerald-600',
    badgeBorder: 'border-blue-200/80',
  },
};

// Monogram Prism / Jet Black / Obsidian Logo
export const ZentyrDynamicLogo = ({
  stops,
  isBlack = false,
  isDark = false,
  className = 'w-9 h-9',
}: {
  stops: [string, string, string];
  isBlack?: boolean;
  isDark?: boolean;
  className?: string;
}) => (
  <div className={cn('relative flex items-center justify-center select-none group', className)}>
    <div
      className={cn(
        'absolute -inset-0.5 rounded-2xl opacity-60 blur-[6px] transition-all duration-500 group-hover:opacity-100',
        isBlack
          ? 'bg-black/30 blur-[4px]'
          : isDark
            ? 'bg-cyan-400/30 blur-[6px]'
            : ''
      )}
      style={
        !isBlack && !isDark
          ? { background: `linear-gradient(135deg, ${stops[0]}, ${stops[1]}, ${stops[2]})` }
          : undefined
      }
    />
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center rounded-2xl border shadow-sm backdrop-blur-md transition-all duration-300',
        isDark
          ? 'border-zinc-700 bg-zinc-900/90 shadow-[0_0_12px_rgba(255,255,255,0.08)]'
          : isBlack
            ? 'border-zinc-800/20 bg-white/95 shadow-sm'
            : 'border-white/80 bg-white/95'
      )}
    >
      <svg viewBox="0 0 32 32" fill="none" className="h-[62%] w-[62%]">
        {isBlack ? (
          <path
            d="M7 8.5H25L10 23.5H25"
            stroke="#09090b"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : isDark ? (
          <>
            <defs>
              <linearGradient id="zentyr-dark-logo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#e4e4e7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <path
              d="M7 8.5H25L10 23.5H25"
              stroke="url(#zentyr-dark-logo)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            <defs>
              <linearGradient id="zentyr-dyn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={stops[0]} />
                <stop offset="50%" stopColor={stops[1]} />
                <stop offset="100%" stopColor={stops[2]} />
              </linearGradient>
            </defs>
            <path
              d="M7 8.5H25L10 23.5H25"
              stroke="url(#zentyr-dyn-grad)"
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </div>
  </div>
);

const heroTitles = [
  'Knowledge Hub',
  'แหล่งความรู้',
  'Tech Blog',
  'Developer Hub',
  'Digital Atelier',
];

// Helper to determine Day vs Night (2 times)
function getTwoTimeTheme(): { id: 'sunset' | 'obsidian'; isDay: boolean; label: string } {
  const hour = new Date().getHours();
  // Day: 06:00 to 17:59 (Iris Horizon), Night: 18:00 to 05:59 (Obsidian Dark)
  const isDay = hour >= 6 && hour < 18;
  return {
    id: isDay ? 'sunset' : 'obsidian',
    isDay,
    label: isDay ? 'กลางวัน (06:00 - 18:00) ➔ 🌅 Iris Horizon' : 'กลางคืน (18:00 - 06:00) ➔ 🌑 Obsidian Dark',
  };
}

export const ZentyrPreview = ({ posts }: ZentyrPreviewProps) => {
  // Default to Obsidian Dark to show the dark mode + new white grid
  const [currentPalette, setCurrentPalette] = useState<PaletteId>('obsidian');
  const [isAutoDayNight, setIsAutoDayNight] = useState(false);
  const [timeStatusText, setTimeStatusText] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const p = palettes[currentPalette];

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

  // 2-Time Day/Night auto switch effect
  useEffect(() => {
    const updateTwoTime = () => {
      const { id, label } = getTwoTimeTheme();
      const now = new Date();
      const timeStr = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      setTimeStatusText(`เวลาปัจจุบัน ${timeStr} น. • ${label}`);
      if (isAutoDayNight) {
        setCurrentPalette(id);
      }
    };
    updateTwoTime();
    const interval = setInterval(updateTwoTime, 30000);
    return () => clearInterval(interval);
  }, [isAutoDayNight]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 35);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'relative min-h-screen pt-20 sm:pt-24 transition-colors duration-700',
        p.isDark ? 'bg-[#09090b] text-zinc-100' : 'bg-[#fafafa] text-gray-800'
      )}
    >
      {/* ========================================================= */}
      {/* BACKGROUND GRID OVERLAY (WHITE GRID ON DARK / BLACK ON LIGHT) */}
      {/* ========================================================= */}
      {p.isDark ? (
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-60 transition-opacity duration-700"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255, 255, 255, 0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.055) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage:
              'radial-gradient(ellipse 65% 55% at 50% 38%, black 10%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 65% 55% at 50% 38%, black 10%, transparent 80%)',
          }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-60 transition-opacity duration-700"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage:
              'radial-gradient(ellipse 70% 70% at 50% 40%, black 15%, transparent 85%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 70% at 50% 40%, black 15%, transparent 85%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* ========================================================= */}
      {/* 1. FLOATING RESPONSIVE NAVBAR                             */}
      {/* ========================================================= */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center p-3 sm:p-4">
        <nav
          className={cn(
            'pointer-events-auto flex h-[56px] w-full items-center justify-between border sm:h-[64px]',
            'transition-[max-width,border-radius,padding,background-color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            scrolled
              ? p.isDark
                ? 'max-w-[780px] translate-y-1 rounded-[40px] border-zinc-800/90 bg-zinc-900/95 px-5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl'
                : 'max-w-[780px] translate-y-1 rounded-[40px] border-white/80 bg-white/90 px-5 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.08)] backdrop-blur-xl'
              : p.isDark
                ? 'max-w-7xl translate-y-0 rounded-2xl border-zinc-800/70 bg-zinc-900/70 px-7 shadow-none backdrop-blur-md'
                : 'max-w-7xl translate-y-0 rounded-2xl border-white/60 bg-white/70 px-7 shadow-none backdrop-blur-md'
          )}
        >
          {/* Logo & Brand */}
          <div className="flex min-w-[90px] flex-1 items-center justify-start">
            <MagneticButton intensity={0.1}>
              <Link
                href="/zentyr-preview"
                className="group flex items-center gap-2.5 font-display text-lg font-black tracking-tight sm:text-2xl"
              >
                <ZentyrDynamicLogo
                  stops={p.logoStops}
                  isBlack={p.isBlackLogo}
                  isDark={p.isDark}
                  className="h-8 w-8 sm:h-9 sm:w-9"
                />
                <span
                  className={cn(
                    'bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500',
                    p.brandGradient
                  )}
                >
                  ZENTYR
                </span>
              </Link>
            </MagneticButton>
          </div>

          {/* Center Links */}
          <div className="hidden items-center justify-center gap-6 sm:gap-8 md:flex">
            <a
              href="#top"
              className={cn('text-sm font-bold transition-all hover:scale-105', p.navActive)}
            >
              หน้าแรก
            </a>
            <a
              href="#projects"
              className={cn(
                'text-sm font-bold transition-all hover:scale-105',
                p.isDark ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              )}
            >
              โปรเจกต์
            </a>
            <Link
              href="/blog"
              className={cn(
                'text-sm font-bold transition-all hover:scale-105',
                p.isDark ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              )}
            >
              บทความ
            </Link>
            <Link
              href="/zentyr-v2"
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-colors',
                p.isDark
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200'
              )}
            >
              <span>แบบที่ 2 (Next-Gen)</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* Right Action: Quick Day/Night Toggle & Old Page Button */}
          <div className="flex min-w-[90px] flex-1 items-center justify-end gap-2">
            {/* Quick Toggle Day/Night */}
            <button
              onClick={() => {
                setIsAutoDayNight(false);
                setCurrentPalette(p.isDark ? 'sunset' : 'obsidian');
              }}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition-all hover:scale-105',
                p.isDark
                  ? 'border-zinc-700 bg-zinc-800 text-amber-300 hover:border-zinc-600'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              )}
              title={p.isDark ? 'สลับเป็นโหมดกลางวัน (Iris Horizon)' : 'สลับเป็นโหมดกลางคืน (Obsidian Dark)'}
            >
              {p.isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link
              href="/"
              className={cn(
                'inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-bold shadow-sm transition-all sm:h-10 sm:px-4',
                p.isDark
                  ? 'border-zinc-700 bg-zinc-800/90 text-zinc-300 hover:border-zinc-600 hover:text-white'
                  : 'border-gray-200/80 bg-white/90 text-gray-600 hover:border-gray-300 hover:text-black'
              )}
              title="ดูหน้าเดิม (PUNN HUB)"
            >
              <span className="hidden sm:inline">หน้าเดิม (PUNN)</span>
              <span className="sm:hidden">เดิม</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </nav>
      </div>

      <main id="top" className="relative z-10">
        {/* ========================================================= */}
        {/* 2. HERO SECTION (CLEAN TYPEWRITER WITH PARALLAX)          */}
        {/* ========================================================= */}
        <section
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex min-h-[48vh] items-center justify-center overflow-hidden py-16 sm:min-h-[56vh] sm:py-24"
        >
          {/* Animated Background Orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <motion.div
              style={{ x: orb1X, y: orb1Y }}
              animate={{ scale: [1, 1.08, 1], rotate: [0, 45, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              className={cn(
                'absolute -left-20 top-0 h-80 w-80 rounded-full bg-gradient-to-r blur-3xl transition-all duration-700',
                p.orb1
              )}
            />
            <motion.div
              style={{ x: orb2X, y: orb2Y }}
              animate={{ scale: [1, 1.06, 1], rotate: [0, -45, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className={cn(
                'absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-gradient-to-l blur-3xl transition-all duration-700',
                p.orb2
              )}
            />
            <div
              className={cn(
                'absolute left-1/2 top-1/3 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl transition-all duration-500',
                p.isDark ? 'bg-zinc-800/30' : 'bg-white/40'
              )}
            />
          </div>

          {/* Floating Subtle Tech Chips (Desktop only) */}
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
              className={cn(
                'absolute left-16 top-16 flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition-all duration-500',
                p.isDark
                  ? 'border-zinc-800 bg-zinc-900/85 text-zinc-100'
                  : 'border-white/80 bg-white/85 text-gray-800'
              )}
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-xl text-white shadow-sm bg-gradient-to-br transition-all duration-500',
                  p.chip1
                )}
              >
                <Zap size={16} />
              </div>
              <div className="text-left">
                <div
                  className={cn(
                    'text-[11px] font-bold uppercase tracking-wider',
                    p.isDark ? 'text-zinc-500' : 'text-gray-400'
                  )}
                >
                  Next.js 16
                </div>
                <div
                  className={cn('text-xs font-bold', p.isDark ? 'text-zinc-200' : 'text-gray-700')}
                >
                  App Router & Fast ISR
                </div>
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
              className={cn(
                'absolute right-16 top-20 flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition-all duration-500',
                p.isDark
                  ? 'border-zinc-800 bg-zinc-900/85 text-zinc-100'
                  : 'border-white/80 bg-white/85 text-gray-800'
              )}
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-xl text-white shadow-sm bg-gradient-to-br transition-all duration-500',
                  p.chip2
                )}
              >
                <Cpu size={16} />
              </div>
              <div className="text-left">
                <div
                  className={cn(
                    'text-[11px] font-bold uppercase tracking-wider',
                    p.isDark ? 'text-zinc-500' : 'text-gray-400'
                  )}
                >
                  Technology
                </div>
                <div
                  className={cn('text-xs font-bold', p.isDark ? 'text-zinc-200' : 'text-gray-700')}
                >
                  AI & Web Innovations
                </div>
              </div>
            </motion.div>
          </div>

          {/* Centered Hero Content */}
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)', scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 150 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={cn(
                'mb-6 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition-all duration-500',
                p.badgeBorder
              )}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={cn(
                    'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                    p.isDark ? 'bg-cyan-400' : 'bg-emerald-400'
                  )}
                />
                <span
                  className={cn(
                    'relative inline-flex h-2 w-2 rounded-full',
                    p.isDark ? 'bg-cyan-500' : 'bg-emerald-500'
                  )}
                />
              </span>
              <span className={p.isDark ? 'text-zinc-400' : 'text-gray-500'}>Welcome to</span>
              <span
                className={cn(
                  'bg-gradient-to-r bg-clip-text font-bold text-transparent transition-all duration-500',
                  p.brandGradient
                )}
              >
                ZENTYR
              </span>
            </motion.div>

            {/* Typewriter Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ type: 'spring', damping: 22, stiffness: 130, delay: 0.1 }}
              className={cn(
                'mb-5 font-display text-3xl font-black leading-[1.3] tracking-tight sm:text-4xl lg:text-5xl transition-colors duration-500',
                p.isDark ? 'text-white' : 'text-gray-800'
              )}
            >
              <span className="mb-2 block min-h-[1.35em] text-center">
                <TypewriterText
                  texts={heroTitles}
                  delayBetween={3200}
                  className="inline-flex"
                  textClassName={p.typewriterClass}
                />
              </span>
              <span
                className={cn(
                  'block bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500',
                  p.brandGradient
                )}
              >
                สำหรับนักพัฒนาและผู้สร้าง
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ type: 'spring', damping: 22, stiffness: 130, delay: 0.22 }}
              className={cn(
                'mx-auto mb-8 max-w-xl text-base font-light leading-relaxed sm:text-lg transition-colors duration-500',
                p.isDark ? 'text-zinc-400' : 'text-gray-500'
              )}
            >
              แหล่งรวมความรู้ ไอเดีย และเทคนิคต่างๆ
              <br className="hidden sm:block" />
              สำหรับการพัฒนาเว็บไซต์ ซอฟต์แวร์ และเทคโนโลยี
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ type: 'spring', damping: 20, stiffness: 140, delay: 0.32 }}
              className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <MagneticButton>
                <Link
                  href="/blog"
                  className={cn(
                    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r px-6 py-3.5 text-sm font-semibold transition-all hover:shadow-xl focus-visible:outline-none sm:px-8 sm:py-4 sm:text-base duration-500',
                    p.buttonGradient
                  )}
                  style={{
                    boxShadow: `0 10px 30px -5px ${p.buttonShadow}`,
                  }}
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
                  className={cn(
                    'inline-flex items-center justify-center gap-2 rounded-2xl border px-6 py-3.5 text-sm font-semibold shadow-sm backdrop-blur-md transition-all sm:px-8 sm:py-4 sm:text-base',
                    p.isDark
                      ? 'border-zinc-700 bg-zinc-900/90 text-zinc-200 hover:border-zinc-500 hover:text-white'
                      : 'border-white/80 bg-white/90 text-gray-700 hover:border-gray-200 hover:text-black hover:shadow-md'
                  )}
                >
                  <span>โปรเจกต์</span>
                  <ArrowDown size={16} />
                </button>
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE 2-TIME DAY/NIGHT & PALETTE SWITCHER           */}
        {/* ========================================================= */}
        <div className="relative z-20 mx-auto max-w-5xl px-4 pb-12 pt-2">
          <div
            className={cn(
              'flex flex-col gap-4 rounded-3xl border p-5 shadow-sm backdrop-blur-xl transition-all duration-500',
              p.isDark
                ? 'border-zinc-800/90 bg-zinc-900/90 text-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
                : 'border-white/80 bg-white/85 text-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
            )}
          >
            {/* Top Bar: 2 Favorites Quick Selector (Day vs Night vs Auto 2-Time) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-4 border-gray-200/40 dark:border-zinc-800">
              <div className="flex items-center gap-2.5 text-xs font-bold">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                  <Sparkles size={15} />
                </span>
                <div>
                  <span className="font-extrabold text-sm">2 ธีมที่คุณชอบที่สุด:</span>
                  <span className="ml-2 text-[11px] font-normal opacity-75">
                    สลับระหว่าง กลางวัน (Iris) & กลางคืน (Obsidian)
                  </span>
                </div>
              </div>

              {/* Primary 2-Time Switcher Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {/* 1. Day Mode Button */}
                <button
                  onClick={() => {
                    setIsAutoDayNight(false);
                    setCurrentPalette('sunset');
                  }}
                  className={cn(
                    'flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all duration-300',
                    currentPalette === 'sunset' && !isAutoDayNight
                      ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-md scale-105'
                      : p.isDark
                        ? 'border border-zinc-800 bg-zinc-800/60 text-zinc-300 hover:border-zinc-700'
                        : 'border border-gray-200 bg-white text-gray-700 hover:border-purple-200'
                  )}
                >
                  <Sun size={13} className="text-amber-400" />
                  <span>🌅 กลางวัน (Iris Horizon)</span>
                  {currentPalette === 'sunset' && !isAutoDayNight && (
                    <Check size={12} className="text-white" />
                  )}
                </button>

                {/* 2. Night Mode Button */}
                <button
                  onClick={() => {
                    setIsAutoDayNight(false);
                    setCurrentPalette('obsidian');
                  }}
                  className={cn(
                    'flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all duration-300',
                    currentPalette === 'obsidian' && !isAutoDayNight
                      ? 'bg-white text-zinc-950 shadow-md scale-105 font-black'
                      : p.isDark
                        ? 'border border-zinc-800 bg-zinc-800/60 text-zinc-300 hover:border-zinc-700'
                        : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                  )}
                >
                  <Moon size={13} className="text-cyan-400" />
                  <span>🌑 กลางคืน (Obsidian Dark)</span>
                  {currentPalette === 'obsidian' && !isAutoDayNight && (
                    <Check size={12} className="text-zinc-950" />
                  )}
                </button>

                {/* 3. Auto 2-Time Switcher */}
                <button
                  onClick={() => {
                    const next = !isAutoDayNight;
                    setIsAutoDayNight(next);
                    if (next) {
                      const { id } = getTwoTimeTheme();
                      setCurrentPalette(id);
                    }
                  }}
                  className={cn(
                    'flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all duration-300',
                    isAutoDayNight
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md scale-105'
                      : p.isDark
                        ? 'border border-zinc-800 bg-zinc-800/60 text-zinc-400 hover:text-white'
                        : 'border border-gray-200 bg-white text-gray-600 hover:text-black'
                  )}
                  title="สลับอัตโนมัติตามเวลา: 06:00-18:00 (Iris Horizon) / 18:00-06:00 (Obsidian Dark)"
                >
                  <Clock size={13} className={isAutoDayNight ? 'animate-spin' : ''} />
                  <span>🌓 Auto สลับ 2 เวลา</span>
                  {isAutoDayNight && <Check size={12} className="text-emerald-300" />}
                </button>
              </div>
            </div>

            {/* Bottom Bar: Extra Palette Options */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 opacity-75">
                <SlidersHorizontal size={13} />
                <span>ตัวเลือกเฉดสีเพิ่มเติม:</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {(['cyber', 'monochrome', 'azure'] as PaletteId[]).map((key) => {
                  const item = palettes[key];
                  const isSelected = currentPalette === key && !isAutoDayNight;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setIsAutoDayNight(false);
                        setCurrentPalette(key);
                      }}
                      className={cn(
                        'flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-semibold transition-all',
                        isSelected
                          ? 'bg-gray-900 text-white'
                          : p.isDark
                            ? 'border border-zinc-800 text-zinc-400 hover:text-white'
                            : 'border border-gray-200 text-gray-600 hover:text-black'
                      )}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Auto 2-Time Live Notification */}
            {isAutoDayNight && (
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3.5 py-2 text-center text-xs font-mono text-cyan-400 animate-pulse">
                ● ระบบ Auto 2 เวลาทำงานอยู่: {timeStatusText}
              </div>
            )}
          </div>
        </div>

        {/* 3. MARQUEE BANNER */}
        <div className="transition-colors duration-500">
          <Marquee isDark={p.isDark} />
        </div>

        {/* 4. BALANCED CLASSIC BENTO GRID */}
        <section id="projects" className="scroll-mt-24 sm:scroll-mt-28">
          <div className="mx-auto max-w-6xl px-5 pt-4 text-center sm:px-6 sm:pt-8">
            <p className={cn('text-xs font-black uppercase tracking-[0.18em]', p.tagColor)}>
              Selected Work
            </p>
            <h2
              className={cn(
                'mt-2 font-display text-2xl font-black tracking-tight sm:text-4xl transition-colors duration-500',
                p.isDark ? 'text-white' : 'text-gray-800'
              )}
            >
              ของที่กำลังสร้างและทดลอง
            </h2>
            <p
              className={cn(
                'mx-auto mt-3 max-w-xl text-sm leading-6 sm:text-base transition-colors duration-500',
                p.isDark ? 'text-zinc-400' : 'text-gray-500'
              )}
            >
              บางอย่างพร้อมใช้ บางอย่างยังอยู่ระหว่างลอง แต่ทุกชิ้นเกิดจากความอยากรู้และลงมือทำ
            </p>
          </div>
          <BentoGrid posts={posts} isDark={p.isDark} />
        </section>

        {/* 5. TECH STACK MARQUEE (สิ่งที่เราศึกษาวิจัย) */}
        <div className="transition-colors duration-500">
          <TechStackMarquee isDark={p.isDark} />
        </div>
      </main>

      {/* 6. POLISHED ZENTYR FOOTER */}
      <footer
        className={cn(
          'relative z-10 border-t backdrop-blur-sm transition-colors duration-700',
          p.isDark
            ? 'border-zinc-800 bg-zinc-950/90 text-zinc-400'
            : 'border-white/70 bg-white/45 text-gray-700'
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-end sm:justify-between sm:py-16">
          <div>
            <div className="flex items-center gap-3">
              <ZentyrDynamicLogo
                stops={p.logoStops}
                isBlack={p.isBlackLogo}
                isDark={p.isDark}
                className="h-9 w-9"
              />
              <span
                className={cn(
                  'font-display text-3xl font-black tracking-tight bg-gradient-to-r bg-clip-text text-transparent',
                  p.brandGradient
                )}
              >
                ZENTYR
              </span>
            </div>
            <p
              className={cn(
                'mt-3 max-w-md text-sm leading-6',
                p.isDark ? 'text-zinc-400' : 'text-gray-500'
              )}
            >
              โปรเจกต์ ไอเดีย และบันทึกการเรียนรู้ของ Satayu Pongpan
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/DDME36"
              target="_blank"
              rel="noreferrer"
              className={cn(
                'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold shadow-sm transition-colors',
                p.isDark
                  ? 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-black'
              )}
            >
              <Github size={15} /> GitHub
            </a>
            <Link
              href="/feed.xml"
              className={cn(
                'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold shadow-sm transition-colors',
                p.isDark
                  ? 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-orange-400'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-orange-200 hover:text-orange-600'
              )}
            >
              <Rss size={15} /> RSS
            </Link>
            <Link
              href="/"
              className={cn(
                'inline-flex items-center gap-2 px-2 py-2.5 text-xs font-bold transition-colors',
                p.isDark
                  ? 'text-zinc-500 hover:text-zinc-300'
                  : 'text-gray-400 hover:text-gray-700'
              )}
            >
              กลับหน้าเดิม (PUNN) <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
