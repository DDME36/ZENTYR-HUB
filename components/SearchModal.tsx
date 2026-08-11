'use client';

import { useState, useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Tag, CornerDownLeft } from 'lucide-react';
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
    if (query.trim() === '') return posts.slice(0, 5);
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
      {/* Refined Minimal Search Bar */}
      <button
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="group flex w-full items-center gap-3 rounded-2xl border border-rose-100 bg-white/60 px-5 py-3 text-sm text-gray-500 shadow-sm backdrop-blur-md transition-all hover:border-rose-300 hover:bg-white hover:shadow-md sm:max-w-md"
      >
        <Search size={18} className="text-rose-400 transition-transform group-hover:scale-110" />
        <span className="flex-1 text-left font-medium">ค้นหาบทความที่น่าสนใจ...</span>
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
                  className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  className="relative w-full max-w-xl px-4"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="search-dialog-title"
                >
                  <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
                    {/* Input Header */}
                    <div className="flex items-center gap-3 border-b border-gray-100 p-5">
                      <Search size={22} className="text-rose-400" />
                      <h2 id="search-dialog-title" className="sr-only">
                        ค้นหาบทความ
                      </h2>
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="พิมพ์เพื่อค้นหาบทความ..."
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setSelectedIndex(0);
                        }}
                        aria-label="คำค้นหาบทความ"
                        className="flex-1 bg-transparent text-lg font-bold text-gray-800 outline-none placeholder:text-gray-400"
                      />
                      <button
                        onClick={() => setIsOpen(false)}
                        aria-label="ปิดหน้าต่างค้นหา"
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition-colors hover:bg-gray-100 hover:text-rose-500"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Results List */}
                    <div className="scrollbar-hide max-h-[60vh] overflow-y-auto p-2">
                      {query.trim() === '' && (
                        <div className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                          บทความล่าสุด
                        </div>
                      )}

                      {results.length > 0 ? (
                        <div className="space-y-1">
                          {results.map((post, index) => (
                            <Link
                              key={post.id}
                              href={`/blog/${post.slug}`}
                              onClick={() => setIsOpen(false)}
                              onMouseEnter={() => setSelectedIndex(index)}
                              aria-current={index === selectedIndex ? 'true' : undefined}
                              className={`flex items-center gap-4 rounded-2xl px-4 py-4 transition-all ${
                                index === selectedIndex
                                  ? 'bg-rose-50 text-rose-600 shadow-inner'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all ${
                                  index === selectedIndex
                                    ? 'border-rose-200 bg-white shadow-sm'
                                    : 'border-gray-100 bg-gray-50'
                                }`}
                              >
                                <Tag
                                  size={18}
                                  className={
                                    index === selectedIndex ? 'text-rose-500' : 'text-gray-400'
                                  }
                                />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <h4 className="truncate text-sm font-bold sm:text-base">
                                  {post.title}
                                </h4>
                                <p className="truncate text-xs font-medium opacity-50">
                                  {new Date(post.date).toLocaleDateString('th-TH', {
                                    dateStyle: 'long',
                                  })}
                                </p>
                              </div>
                              {index === selectedIndex && (
                                <CornerDownLeft size={16} className="animate-pulse text-rose-400" />
                              )}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
                          <Search size={48} className="mb-4 opacity-10" />
                          <p className="text-sm font-bold">
                            ไม่พบผลลัพธ์สำหรับ &quot;{query}&quot;
                          </p>
                          <p className="mt-1 text-xs font-medium">ลองค้นหาด้วยคำอื่นดูนะครับ</p>
                        </div>
                      )}
                    </div>

                    {/* Minimal Footer */}
                    <div className="flex items-center justify-between border-t border-gray-50 bg-gray-50/50 px-6 py-4">
                      <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <span className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-rose-400" />
                          พบ {results.length} รายการ
                        </span>
                      </div>
                      <div className="text-[10px] font-black tracking-[0.3em] text-rose-500/40">
                        PUNN SEARCH
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
