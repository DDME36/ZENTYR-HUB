'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { List, X, ChevronRight } from 'lucide-react';
import { slugify } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const headings = useMemo<Heading[]>(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    return Array.from(content.matchAll(headingRegex)).map((match) => ({
      level: match[1].length,
      text: match[2].trim(),
      id: slugify(match[2].trim()),
    }));
  }, [content]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const circleOffset = useTransform(scrollYProgress, [0, 1], [150.8, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextProgress = Math.round(latest * 100);
    setProgress((current) => (current === nextProgress ? current : nextProgress));
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -75% 0px', threshold: 0 }
    );

    const frameId = requestAnimationFrame(() => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.observe(element);
      });
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [headings]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Compact table-of-contents action for phone and tablet layouts */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(!isOpen)}
        data-article-action="toc"
        aria-label={isOpen ? 'ปิดสารบัญ' : 'เปิดสารบัญ'}
        aria-expanded={isOpen}
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-4 z-[100] flex h-12 items-center gap-2 rounded-full border border-gray-200/80 bg-white/95 py-1 pl-1 pr-3 text-gray-800 shadow-[0_10px_30px_rgba(15,23,42,0.14)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 sm:bottom-8 sm:left-8 sm:h-14 sm:gap-2.5 sm:pr-4 2xl:hidden dark:border-zinc-800 dark:bg-zinc-900/95 dark:text-zinc-100 dark:hover:bg-zinc-800"
      >
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12">
          <svg viewBox="0 0 56 56" aria-hidden="true" className="absolute h-full w-full -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              className="text-gray-100 dark:text-zinc-800"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray="150.8"
              style={{ strokeDashoffset: circleOffset }}
              className="text-purple-600 dark:text-cyan-400"
            />
          </svg>
          {isOpen ? <X size={18} /> : <List size={18} />}
        </span>
        <span className="flex flex-col items-start leading-none">
          <span className="text-[12px] font-semibold leading-none">สารบัญ</span>
          <span className="mt-1 text-[10px] font-medium tabular-nums leading-none text-purple-600 dark:text-cyan-400">
            {progress}%
          </span>
        </span>
      </motion.button>

      {/* Desktop TOC Panel */}
      <aside className="hidden 2xl:block">
        <div className="fixed left-6 top-32 z-20 w-72">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex max-h-[calc(100vh-200px)] flex-col rounded-[2.5rem] border border-gray-200/50 bg-white/70 p-1 shadow-2xl backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/80"
          >
            {/* Header - Fixed inside container */}
            <div className="flex items-center gap-3 p-6 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-rose-500 text-white shadow-lg dark:from-zinc-800 dark:to-zinc-700 dark:text-cyan-400">
                <List size={18} />
              </div>
              <h3 className="font-display text-[20px] font-bold leading-7 tracking-[-0.01em] text-gray-800 dark:text-white">
                สารบัญ
              </h3>
            </div>

            {/* Scrollable Heading List - Now captures scroll wheel properly */}
            <nav className="custom-scrollbar flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
              <div className="relative pl-3">
                <div className="absolute left-0 top-0 h-full w-px bg-gray-100 dark:bg-zinc-800" />
                <ul className="space-y-1">
                  {headings.map((heading) => {
                    const isActive = activeId === heading.id;
                    return (
                      <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                        className="relative"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-toc-indicator"
                            className="absolute -left-[13px] top-0 h-full w-1 rounded-full bg-purple-600 shadow-[0_0_12px_rgba(168,85,247,0.5)] dark:bg-cyan-400 dark:shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                          />
                        )}
                        <button
                          onClick={() => scrollToHeading(heading.id)}
                          className={`group flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[14px] leading-5 transition-all ${
                            isActive
                              ? 'bg-purple-50/80 font-bold text-purple-600 dark:bg-zinc-800/90 dark:text-cyan-400'
                              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                          }`}
                        >
                          <ChevronRight
                            size={10}
                            className={`transition-transform duration-300 ${isActive ? 'rotate-90 opacity-100' : 'opacity-30 group-hover:opacity-100'}`}
                          />
                          <span className="truncate">{heading.text}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>

            {/* Reading Progress - Fixed inside container */}
            <div className="mt-2 border-t border-gray-100/50 p-6 pt-0 dark:border-zinc-800">
              <div className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase leading-none tracking-[0.16em] text-gray-400 dark:text-zinc-500">
                <span>Reading</span>
                <span className="font-bold text-purple-600 dark:text-cyan-400">{Math.round(progress)}%</span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-rose-500 dark:from-cyan-400 dark:to-blue-500"
                  style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[150] bg-slate-950/45 2xl:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed inset-x-0 bottom-0 z-[160] flex max-h-[min(82dvh,44rem)] flex-col rounded-t-[28px] bg-white shadow-2xl sm:inset-x-4 sm:bottom-4 sm:rounded-[32px] 2xl:hidden dark:border dark:border-zinc-800 dark:bg-[#09090b]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-toc-title"
            >
              <div className="mx-auto mb-1 mt-3 h-1 w-10 rounded-full bg-gray-200 dark:bg-zinc-800 sm:mt-4" />
              <div className="flex items-center justify-between px-5 py-4 sm:px-7 sm:py-5">
                <h3
                  id="mobile-toc-title"
                  className="font-display text-[20px] font-bold leading-7 tracking-[-0.01em] text-gray-800 sm:text-[22px] dark:text-white"
                >
                  สารบัญ
                </h3>
                <button
                  aria-label="ปิดสารบัญ"
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] sm:px-6 sm:pb-8">
                <ul className="space-y-1.5 sm:space-y-2">
                  {headings.map((heading) => (
                    <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}>
                      <button
                        onClick={() => scrollToHeading(heading.id)}
                        className={`min-h-12 w-full rounded-2xl px-4 py-3 text-left text-[14px] font-semibold leading-[1.45] transition-colors sm:px-5 sm:py-4 sm:text-[15px] ${
                          activeId === heading.id
                            ? 'border border-purple-100 bg-purple-50 text-purple-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-cyan-400'
                            : 'bg-gray-50 text-gray-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
                        }`}
                      >
                        {heading.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
