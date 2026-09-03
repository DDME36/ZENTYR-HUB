'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ZentyrLogoProps {
  className?: string;
  isDark?: boolean;
}

export const ZentyrLogo = ({ className = 'w-9 h-9' }: ZentyrLogoProps) => {
  return (
    <div className={cn('relative flex items-center justify-center select-none group', className)}>
      {/* Background Glow */}
      <div className="absolute -inset-0.5 rounded-2xl opacity-60 blur-[6px] transition-all duration-500 group-hover:opacity-100 bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500 dark:from-zinc-500 dark:via-cyan-500 dark:to-violet-500 dark:opacity-40 dark:blur-[8px]" />

      {/* Card Border & Background */}
      <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/80 bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-900/90 dark:shadow-[0_0_12px_rgba(255,255,255,0.08)]">
        {/* Dark Mode SVG */}
        <svg viewBox="0 0 32 32" fill="none" className="hidden dark:block h-[62%] w-[62%]">
          <defs>
            <linearGradient id="zentyr-logo-dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#e4e4e7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <path
            d="M7 8.5H25L10 23.5H25"
            stroke="url(#zentyr-logo-dark)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Light Mode SVG */}
        <svg viewBox="0 0 32 32" fill="none" className="block dark:hidden h-[62%] w-[62%]">
          <defs>
            <linearGradient id="zentyr-logo-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <path
            d="M7 8.5H25L10 23.5H25"
            stroke="url(#zentyr-logo-light)"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
