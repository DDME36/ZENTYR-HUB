'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Rss } from 'lucide-react';
import { ZentyrLogo } from './ZentyrLogo';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

const quickLinks = [
  { name: 'หน้าแรก', href: '/' },
  { name: 'บทความ', href: '/blog' },
  { name: 'RSS Feed', href: '/feed.xml' },
  { name: 'GitHub', href: 'https://github.com/DDME36' },
  { name: 'เว็บส่วนตัว', href: 'https://satayupongpan.site/' },
];

const projects = [
  { name: 'Smart AI Stock', href: 'https://smartaistock.vercel.app/' },
  { name: 'MemoKard', href: 'https://memokard.vercel.app/' },
  { name: 'PurrDrop', href: 'https://purrdrop.onrender.com/' },
  { name: 'PUNN INVESTING', href: 'https://ddme36.github.io/PUNN-INVESTING/' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDark } = useTheme();

  return (
    <footer
      className={cn(
        'relative border-t backdrop-blur-sm transition-colors duration-700',
        isDark
          ? 'border-zinc-800/80 bg-zinc-950/90 text-zinc-400'
          : 'border-white/70 bg-white/45 text-gray-700'
      )}
    >
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* Main Footer Links */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-6 md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-display text-3xl font-black tracking-tight transition-transform hover:scale-105"
            >
              <ZentyrLogo isDark={isDark} className="h-9 w-9" />
              <span
                className={cn(
                  'bg-gradient-to-r bg-clip-text text-transparent',
                  isDark
                    ? 'from-white via-zinc-200 to-cyan-400'
                    : 'from-purple-600 via-pink-600 to-amber-500'
                )}
              >
                ZENTYR
              </span>
            </Link>
            <p
              className={cn(
                'max-w-sm text-sm leading-relaxed',
                isDark ? 'text-zinc-400' : 'text-gray-500'
              )}
            >
              แหล่งรวมความรู้ เทคนิคการเขียนโปรแกรม และอัปเดตเทคโนโลยีใหม่ๆ
              เพื่อช่วยให้การพัฒนาซอฟต์แวร์เป็นเรื่องง่ายและสร้างสรรค์
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/DDME36"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-2xl border shadow-sm transition-colors',
                  isDark
                    ? 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-white'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-purple-200 hover:text-purple-600'
                )}
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="/feed.xml"
                target="_blank"
                rel="noreferrer"
                aria-label="RSS Feed"
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-2xl border shadow-sm transition-colors',
                  isDark
                    ? 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-orange-400'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-orange-200 hover:text-orange-500'
                )}
              >
                <Rss size={18} />
              </motion.a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4
              className={cn(
                'text-xs font-black uppercase tracking-widest',
                isDark ? 'text-zinc-500' : 'text-gray-400'
              )}
            >
              ลิงก์หลัก
            </h4>
            <ul className="space-y-3.5">
              {quickLinks.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      'inline-block font-semibold transition-all hover:translate-x-1',
                      isDark
                        ? 'text-zinc-400 hover:text-white'
                        : 'text-gray-600 hover:text-purple-600'
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Projects */}
          <div className="space-y-6">
            <h4
              className={cn(
                'text-xs font-black uppercase tracking-widest',
                isDark ? 'text-zinc-500' : 'text-gray-400'
              )}
            >
              โปรเจกต์เด่น
            </h4>
            <ul className="space-y-3.5">
              {projects.map((project) => (
                <li key={project.name}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      'inline-block font-semibold transition-all hover:translate-x-1',
                      isDark
                        ? 'text-zinc-400 hover:text-cyan-400'
                        : 'text-gray-600 hover:text-purple-500'
                    )}
                  >
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={cn('mb-8 h-px w-full', isDark ? 'bg-zinc-800' : 'bg-gray-200/60')} />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 text-xs font-medium text-zinc-500 md:flex-row">
          <div className="flex items-center gap-2">
            © {currentYear} ZENTYR · Designed & Engineered by Satayu Pongpan
          </div>
          <div className="flex items-center gap-6">
            <span className="flex cursor-default items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Next.js 16
            </span>
            <span className="flex cursor-default items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              React 19
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
