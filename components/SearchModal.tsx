'use client';

import { useState, useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Tag, CornerDownLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  date: string;
  cover: string | null;
}

interface SearchModalProps {
  posts: Post[];
}

const subscribeToClient = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const SearchModal = ({ posts }: SearchModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const mounted = useSyncExternalStore(subscribeToClient, getClientSnapshot, getServerSnapshot);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ['title', 'tags'],
        threshold: 0.3,
      }),
    [posts]
  );

  const results = useMemo(() => {
    if (query.trim() === '') return posts.slice(0, 6);
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse, posts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(results.length, 1));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        router.push(`/blog/${results[selectedIndex].slug}`);
        setIsOpen(false);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, router]);

  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 100);
      return () => {
        window.clearTimeout(focusTimer);
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Refined Minimal Search Bar with Keyboard Badge */}
      <button
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-purple-100/60 bg-white/70 px-5 py-3 text-sm text-gray-500 shadow-sm backdrop-blur-md transition-all hover:border-purple-300 hover:bg-white hover:shadow-md sm:max-w-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-850"
      >
        <div className="flex items-center gap-3">
          <Search size={18} className="text-purple-500 transition-transform group-hover:scale-110 dark:text-cyan-400" />
          <span className="text-left font-medium">ค้นหาบทความที่น่าสนใจ...</span>
        </div>
        <kbd className="hidden items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-bold text-gray-400 shadow-xs sm:inline-flex dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-500">
          ⌘K
        </kbd>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] sm:pt-[15vh]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-gray-900/60 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: -15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -15 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  className="relative w-full max-w-xl px-4"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="search-dialog-title"
                >
                  <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/95">
                    {/* Input Header */}
                    <div className="flex items-center gap-3 border-b border-gray-100 p-5 dark:border-zinc-800">
                      <Search size={22} className="text-purple-600 dark:text-cyan-400" />
                      <h2 id="search-dialog-title" className="sr-only">
                        ค้นหาบทความ
                      </h2>
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="พิมพ์ชื่อเรื่อง หรือคีย์เวิร์ดที่ต้องการ..."
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setSelectedIndex(0);
                        }}
                        aria-label="คำค้นหาบทความ"
                        className="flex-1 bg-transparent text-lg font-bold text-gray-800 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-zinc-500"
                      />
                      <button
                        onClick={() => setIsOpen(false)}
                        aria-label="ปิดหน้าต่างค้นหา"
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition-colors hover:bg-purple-50 hover:text-purple-600 active:scale-95 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Results List with Stagger */}
                    <div className="scrollbar-hide max-h-[60vh] overflow-y-auto p-2">
                      {query.trim() === '' && (
                        <div className="flex items-center gap-1.5 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                          <Sparkles size={12} className="text-purple-500 dark:text-cyan-400" />
                          บทความแนะนำ & ล่าสุด
                        </div>
                      )}

                      {results.length > 0 ? (
                        <div className="space-y-1">
                          {results.map((post, index) => (
                            <motion.div
                              key={post.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.03 }}
                            >
                              <Link
                                href={`/blog/${post.slug}`}
                                onClick={() => setIsOpen(false)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                aria-current={index === selectedIndex ? 'true' : undefined}
                                className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all ${
                                  index === selectedIndex
                                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 shadow-sm dark:from-zinc-800 dark:to-zinc-800 dark:text-cyan-400'
                                    : 'text-gray-700 hover:bg-gray-50 dark:text-zinc-300 dark:hover:bg-zinc-800/60'
                                }`}
                              >
                                <div
                                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all ${
                                    index === selectedIndex
                                      ? 'border-purple-200 bg-white text-purple-500 shadow-sm dark:border-zinc-700 dark:bg-zinc-700 dark:text-cyan-400'
                                      : 'border-gray-100 bg-gray-50 text-gray-400 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-500'
                                  }`}
                                >
                                  <Tag size={18} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                  <h4 className="truncate text-sm font-bold sm:text-base">
                                    {post.title}
                                  </h4>
                                  <p className="truncate text-xs font-medium text-gray-400 dark:text-zinc-500">
                                    {new Date(post.date).toLocaleDateString('th-TH', {
                                      dateStyle: 'long',
                                    })}
                                  </p>
                                </div>
                                {index === selectedIndex && (
                                  <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    className="flex items-center text-xs font-bold text-purple-600 dark:text-cyan-400"
                                  >
                                    <CornerDownLeft size={16} />
                                  </motion.div>
                                )}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 dark:text-zinc-500">
                          <Search size={48} className="mb-4 opacity-10" />
                          <p className="text-sm font-bold text-gray-700 dark:text-zinc-200">
                            ไม่พบผลลัพธ์สำหรับ &quot;{query}&quot;
                          </p>
                          <p className="mt-1 text-xs font-medium text-gray-400 dark:text-zinc-500">ลองค้นหาด้วยคำอื่นดูนะครับ</p>
                        </div>
                      )}
                    </div>

                    {/* Keycap Helpers in Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/70 px-6 py-3.5 text-xs text-gray-500 dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5">
                          <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold shadow-xs dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                            ↑↓
                          </kbd>
                          <span>เลือก</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold shadow-xs dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                            ↵
                          </kbd>
                          <span>เปิด</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold shadow-xs dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                            ESC
                          </kbd>
                          <span>ปิด</span>
                        </span>
                      </div>
                      <div className="font-display text-[10px] font-black tracking-widest text-purple-500/50 dark:text-cyan-400/60">
                        ZENTYR SEARCH
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
