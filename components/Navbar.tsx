'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TrendingUp,
  Share2,
  Target,
  Code,
  User,
  ArrowUpRight,
  Menu as MenuIcon,
  X as XIcon,
  Home,
  Bell,
  BookOpen,
  Music,
  Brain,
  Ticket,
  Sun,
  Moon,
} from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { ZentyrLogo } from './ZentyrLogo';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

const menuLinks = [
  { name: 'หน้าแรก', href: '/', icon: Home, internal: true },
  { name: 'บทความ', href: '/blog', icon: BookOpen, internal: true },
  { name: 'Smart AI Stock', href: 'https://smartaistock.vercel.app/', icon: Bell },
  { name: 'MemoKard', href: 'https://memokard.vercel.app/', icon: Brain },
  { name: 'PurrDrop', href: 'https://purrdrop.onrender.com/', icon: Share2 },
  { name: 'PUNN INVESTING', href: 'https://ddme36.github.io/PUNN-INVESTING/', icon: TrendingUp },
  { name: 'จดหวย', href: 'https://ddme36.github.io/JodHuay/', icon: Ticket },
  {
    name: 'HEARTOPIANO',
    href: 'https://www.punn.site/blog/HowToUseHeartopiano',
    icon: Music,
    internal: true,
  },
  { name: '2026 Goals', href: 'https://2026-vision-goals.vercel.app/', icon: Target },
  { name: 'GitHub', href: 'https://github.com/DDME36', icon: Code },
  { name: 'เว็บส่วนตัว', href: 'https://satayupongpan.site/', icon: User },
];

const mainNavLinks = [
  { name: 'หน้าแรก', href: '/' },
  { name: 'บทความ', href: '/blog' },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const pathname = usePathname();
  const { toggleTheme } = useTheme();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          // Smooth hysteresis buffer: collapse at 75px, expand back near top (< 25px)
          if (currentY > 75) {
            setScrolled(true);
          } else if (currentY < 25) {
            setScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  // If on standalone prototype routes, don't duplicate
  if (pathname === '/zentyr-v2') return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center p-3 sm:p-4"
      >
        <motion.nav
          initial={false}
          animate={{
            maxWidth: scrolled ? 680 : 1024,
            borderRadius: scrolled ? 999 : 16,
          }}
          transition={{
            type: 'spring',
            stiffness: 210,
            damping: 28,
            mass: 0.85,
          }}
          className={cn(
            'pointer-events-auto relative flex h-[56px] w-full items-center justify-between border px-5 transition-[background-color,border-color,box-shadow] duration-500 sm:h-[62px] sm:px-6',
            scrolled
              ? 'border-white/80 border-t-white/95 bg-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-zinc-800/80 dark:border-t-white/15 dark:bg-zinc-900/95 dark:shadow-[0_16px_45px_rgba(0,0,0,0.7)]'
              : 'border-white/60 border-t-white/80 bg-white/70 shadow-none backdrop-blur-md dark:border-zinc-800/60 dark:border-t-white/10 dark:bg-zinc-900/60'
          )}
        >
          {/* Left: Zentyr Logo & Brand */}
          <div className="flex min-w-[90px] flex-1 items-center justify-start">
            <MagneticButton intensity={0.1}>
              <Link
                href="/"
                className="group flex items-center gap-2.5 font-display text-lg font-black tracking-tight sm:text-2xl"
              >
                <motion.span layout="position" className="relative h-8 w-8 shrink-0 sm:h-9 sm:w-9">
                  <ZentyrLogo className="h-full w-full" />
                </motion.span>
                <AnimatePresence initial={false}>
                  {!scrolled && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, x: -6 }}
                      animate={{ opacity: 1, width: 'auto', x: 0 }}
                      exit={{ opacity: 0, width: 0, x: -6 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent dark:from-white dark:via-zinc-200 dark:to-cyan-400"
                    >
                      ZENTYR
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </MagneticButton>
          </div>

          {/* Center: Main Links with Sliding Glass Hover Capsule */}
          <div className="hidden items-center justify-center gap-1 md:flex">
            {mainNavLinks.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname?.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredNav(item.href)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={cn(
                    'relative rounded-full px-4 py-1.5 text-sm font-bold transition-colors duration-200',
                    isActive
                      ? 'text-purple-600 dark:text-white'
                      : 'text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white'
                  )}
                >
                  {/* Sliding Glass Capsule on Hover */}
                  {hoveredNav === item.href && (
                    <motion.span
                      layoutId="navbar-hover-capsule"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      className="absolute inset-0 rounded-full bg-purple-50/90 shadow-sm -z-10 dark:bg-zinc-800/90 dark:border dark:border-zinc-700/60"
                    />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Actions: Theme Toggle (Sun/Moon) + Menu */}
          <div className="flex min-w-[90px] flex-1 items-center justify-end gap-2 sm:gap-3">
            {/* Global Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              aria-label="สลับโหมดการแสดงผล (Iris Horizon / Obsidian Dark)"
              title="สลับโหมดการแสดงผล (Iris Horizon / Obsidian Dark)"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/80 bg-white/90 text-purple-600 shadow-sm backdrop-blur-md transition-all hover:border-purple-200 hover:bg-purple-50 sm:h-10 sm:w-10 dark:border-zinc-700 dark:bg-zinc-800/90 dark:text-amber-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-700"
            >
              <Sun size={17} className="hidden dark:block" />
              <Moon size={17} className="block dark:hidden" />
            </motion.button>

            {/* Mobile / Side Menu Button */}
            <MagneticButton intensity={0.15}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setMenuOpen(true)}
                aria-label="เปิดเมนูหลัก"
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
                className="flex h-9 items-center justify-center gap-1.5 rounded-full border border-gray-200/80 bg-white/85 px-3.5 text-xs font-bold text-gray-700 shadow-sm backdrop-blur-sm transition-all hover:border-purple-200 hover:text-purple-600 sm:h-10 sm:px-4 sm:text-sm dark:border-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:text-white"
              >
                <MenuIcon size={16} />
                <span>เมนู</span>
              </motion.button>
            </MagneticButton>
          </div>
        </motion.nav>
      </motion.div>

      {/* Slide-out Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-[2px]"
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="navigation-dialog-title"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-[210] flex h-full w-full flex-col overflow-y-auto border-l border-gray-100 bg-white text-gray-800 shadow-2xl sm:w-96 transition-colors duration-500 dark:border-zinc-800 dark:bg-[#09090b] dark:text-zinc-100"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <ZentyrLogo className="h-7 w-7" />
                  <h2
                    id="navigation-dialog-title"
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text font-display text-xl font-black text-transparent dark:from-white dark:via-zinc-200 dark:to-cyan-400"
                  >
                    ZENTYR
                  </h2>
                </div>
                <button
                  aria-label="ปิดเมนู"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors active:scale-95 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  <XIcon size={20} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 space-y-1 p-4">
                {menuLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  const LinkComponent = link.internal ? Link : 'a';
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <LinkComponent
                        href={link.href}
                        {...(!link.internal
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className={cn(
                          'group flex items-center gap-3 rounded-2xl p-3 transition-all',
                          isActive
                            ? 'bg-purple-50 text-purple-600 font-bold dark:bg-zinc-800 dark:text-cyan-400 dark:font-black'
                            : 'text-gray-700 hover:bg-gray-50 dark:text-zinc-300 dark:hover:bg-zinc-900'
                        )}
                        onClick={() => setMenuOpen(false)}
                      >
                        <div
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                            isActive
                              ? 'bg-white text-purple-600 shadow-sm dark:bg-zinc-700 dark:text-cyan-400'
                              : 'bg-gray-100 text-gray-500 dark:bg-zinc-800/80 dark:text-zinc-400'
                          )}
                        >
                          <link.icon size={18} />
                        </div>
                        <span className="flex-1 text-sm font-bold">{link.name}</span>
                        {!link.internal && <ArrowUpRight size={14} className="opacity-30" />}
                      </LinkComponent>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer Footer Theme Switcher */}
              <div className="border-t border-gray-100 p-4 flex items-center justify-between text-gray-500 dark:border-zinc-800 dark:text-zinc-400">
                <span className="text-xs font-semibold">โหมดธีม:</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold border border-gray-200 bg-gray-50 text-purple-600 transition-colors dark:border-zinc-700 dark:bg-zinc-800 dark:text-amber-300"
                >
                  <Sun size={14} className="hidden dark:block" />
                  <Moon size={14} className="block dark:hidden" />
                  <span className="hidden dark:inline">Obsidian Dark</span>
                  <span className="inline dark:hidden">Iris Horizon</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
