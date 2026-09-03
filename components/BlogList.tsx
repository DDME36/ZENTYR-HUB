'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { BookOpen, Calendar, X, ArrowUpRight, AlertCircle, FileText, Search, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchModal } from './SearchModal';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';
import { PostSummary } from '@/lib/types';

interface BlogListProps {
  posts: PostSummary[];
  error: string | null;
}

// Premium Gradient Fallbacks for posts without covers
const coverGradients = [
  'from-rose-400 via-fuchsia-500 to-indigo-500',
  'from-blue-400 via-indigo-500 to-purple-500',
  'from-emerald-400 via-teal-500 to-cyan-500',
  'from-amber-400 via-orange-500 to-rose-500',
  'from-violet-400 via-fuchsia-500 to-pink-500',
  'from-cyan-400 via-blue-500 to-indigo-500',
];

// Helper to deterministically pick a gradient based on post title
const getGradientForPost = (title: string) => {
  const hash = title.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  return coverGradients[Math.abs(hash) % coverGradients.length];
};

// Animation variants with high-end spring curves
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const BlogList = ({ posts, error }: BlogListProps) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const { isDark } = useTheme();

  // Filter out child episodes (only show parent posts and standalone posts)
  const mainPosts = posts.filter((post) => !post.parentSlug);

  // Extract all unique tags from main posts only
  const allTags = ['All', ...Array.from(new Set(mainPosts.flatMap((post) => post.tags)))];

  // Filter posts based on selected tag
  const filteredPosts =
    selectedTag === 'All' ? mainPosts : mainPosts.filter((post) => post.tags.includes(selectedTag));

  return (
    <>
      {/* Hero Section - Soft UI Card */}
      <div className="relative z-10 bg-transparent py-12 sm:py-16">
        {/* Centered Card Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-6xl px-6"
        >
          {/* Floating Card */}
          <div
            className={cn(
              'rounded-3xl border p-8 backdrop-blur-xl transition-all duration-500 sm:p-10',
              isDark
                ? 'border-zinc-800/80 bg-zinc-900/90 shadow-[0_20px_60px_rgba(0,0,0,0.6)]'
                : 'border-white/70 bg-white/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]'
            )}
          >
            <div className="flex flex-col items-center justify-center gap-8 text-center">
              {/* Main Content */}
              <div>
                <motion.div
                  variants={itemVariants}
                  className={cn(
                    'mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all',
                    isDark
                      ? 'border-zinc-700/80 bg-zinc-950/70 text-zinc-300 shadow-sm'
                      : 'border-purple-100/60 bg-gradient-to-r from-purple-50 to-pink-50 text-gray-700 shadow-sm'
                  )}
                >
                  <BookOpen size={14} className={isDark ? 'text-cyan-400' : 'text-purple-600'} />
                  <span className={isDark ? 'text-zinc-300' : 'text-gray-600'}>Zentyr</span>
                  <span className={isDark ? 'font-bold text-cyan-400' : 'font-bold text-purple-600'}>
                    Hub
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className={cn(
                    'mb-3 font-display text-4xl font-black tracking-tight sm:text-5xl transition-colors',
                    isDark ? 'text-white' : 'text-gray-800'
                  )}
                >
                  บทความ
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className={cn(
                    'text-base font-light transition-colors',
                    isDark ? 'text-zinc-400' : 'text-gray-500'
                  )}
                >
                  แชร์ความรู้และประสบการณ์ด้านเทคโนโลยี
                </motion.p>
              </div>

              {/* Stats Cards - Centered */}
              <motion.div
                variants={itemVariants}
                className="mt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
              >
                {/* Stat Card 1 */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className={cn(
                    'flex min-w-[130px] flex-col items-center justify-center rounded-2xl border px-6 py-4 text-center transition-all duration-300',
                    isDark
                      ? 'border-zinc-800 bg-zinc-950/80 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-zinc-700 hover:bg-zinc-900'
                      : 'border-purple-100/60 bg-gradient-to-br from-purple-50 to-purple-100/40 shadow-[0_4px_20px_rgba(168,85,247,0.1)]'
                  )}
                >
                  <div
                    className={cn(
                      'mb-1 text-3xl font-black leading-none transition-colors',
                      isDark ? 'text-white' : 'text-purple-600'
                    )}
                  >
                    {mainPosts.length}
                  </div>
                  <div
                    className={cn(
                      'text-[11px] font-bold uppercase tracking-wider',
                      isDark ? 'text-zinc-400' : 'text-gray-500'
                    )}
                  >
                    บทความ
                  </div>
                </motion.div>

                {/* Stat Card 2 */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className={cn(
                    'flex min-w-[130px] flex-col items-center justify-center rounded-2xl border px-6 py-4 text-center transition-all duration-300',
                    isDark
                      ? 'border-zinc-800 bg-zinc-950/80 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-zinc-700 hover:bg-zinc-900'
                      : 'border-pink-100/60 bg-gradient-to-br from-pink-50 to-pink-100/40 shadow-[0_4px_20px_rgba(244,63,94,0.1)]'
                  )}
                >
                  <div
                    className={cn(
                      'mb-1 text-3xl font-black leading-none transition-colors',
                      isDark ? 'text-white' : 'text-pink-600'
                    )}
                  >
                    {allTags.length - 1}
                  </div>
                  <div
                    className={cn(
                      'text-[11px] font-bold uppercase tracking-wider',
                      isDark ? 'text-zinc-400' : 'text-gray-500'
                    )}
                  >
                    หมวดหมู่
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 sm:py-16">
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl"
          >
            {/* Error Card - Soft UI */}
            <div className="rounded-3xl border border-red-100/50 bg-white p-8 text-center text-red-600 shadow-[0_8px_30px_rgb(239,68,68,0.1)]">
              <div className="mb-4">
                <AlertCircle className="mx-auto h-16 w-16 text-red-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">ไม่สามารถโหลดบทความได้</h3>
              <p className="text-sm text-gray-500">{error}</p>
            </div>
          </motion.div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center"
          >
            {/* Empty State Card */}
            <div
              className={cn(
                'mx-auto max-w-md rounded-3xl border p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
                isDark ? 'border-zinc-800 bg-zinc-900 text-white' : 'border-white/60 bg-white'
              )}
            >
              <div className="mb-6">
                <FileText className="mx-auto h-20 w-20 text-gray-300 dark:text-zinc-700" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-400 dark:text-zinc-300">กำลังเตรียมเนื้อหา</h3>
              <p className="font-light text-gray-500 dark:text-zinc-500">บทความและความรู้ใหม่ๆ กำลังจะมาเร็วๆ นี้</p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Search and Filter Section - Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 space-y-4"
            >
              {/* Integrated Search Bar */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <SearchModal posts={posts} />
                </div>

                {/* Clear Filter Button - Only show when filtered */}
                {selectedTag !== 'All' && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTag('All')}
                    className={cn(
                      'flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-bold shadow-sm transition-all',
                      isDark
                        ? 'border-zinc-800 bg-zinc-900 text-cyan-400 hover:bg-zinc-800'
                        : 'border-purple-100 bg-white text-purple-600 hover:bg-purple-50'
                    )}
                  >
                    <X size={14} />
                    ล้างตัวกรอง
                  </motion.button>
                )}
              </div>

              {/* Filter Card */}
              <div
                className={cn(
                  'overflow-visible rounded-3xl border p-6 backdrop-blur-md transition-all duration-500',
                  isDark
                    ? 'border-zinc-800/80 bg-zinc-900/90 shadow-[0_20px_60px_rgba(0,0,0,0.5)]'
                    : 'border-white/70 bg-white/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]'
                )}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
                    <Sparkles size={16} className="text-purple-600 dark:text-cyan-400" />
                    <span>{filteredPosts.length} บทความ</span>
                    {selectedTag !== 'All' && (
                      <span className="ml-2 rounded-lg bg-purple-50 px-2.5 py-0.5 text-sm font-semibold text-purple-600 dark:bg-zinc-800 dark:text-cyan-400">
                        {selectedTag}
                      </span>
                    )}
                  </h2>
                </div>

                {/* Scrollable Filter Pills with Smooth Active Bubble Slider */}
                <div className="scrollbar-hide -mx-2 overflow-x-auto px-2 pb-2">
                  <div className="flex min-w-max gap-2 py-1">
                    {allTags.map((tag) => {
                      const isActive = selectedTag === tag;
                      return (
                        <motion.button
                          key={tag}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setSelectedTag(tag)}
                          className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-200 ${
                            isActive
                              ? 'text-white'
                              : 'text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white'
                          }`}
                        >
                          {/* Active sliding bubble */}
                          {isActive && (
                            <motion.div
                              layoutId="activeTagBubble"
                              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-rose-600 shadow-[0_4px_16px_rgba(168,85,247,0.35)] dark:from-cyan-500 dark:to-blue-600"
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                              }}
                            />
                          )}
                          {!isActive && (
                            <div className="absolute inset-0 -z-10 rounded-full border border-gray-100 bg-gray-50/90 transition-colors hover:bg-gray-100 dark:border-zinc-800 dark:bg-zinc-800/80 dark:hover:bg-zinc-700" />
                          )}
                          <span className="relative z-10">{tag}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Articles List - 2 Column Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post: PostSummary, index: number) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
                    transition={{
                      duration: 0.65,
                      delay: Math.min(index * 0.05, 0.25),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link href={`/blog/${post.slug}`} aria-label={`อ่านบทความ: ${post.title}`}>
                      <motion.article
                        whileHover={{
                          y: -8,
                          scale: 1.015,
                          transition: {
                            type: 'spring',
                            stiffness: 350,
                            damping: 22,
                          },
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_4px_20px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-400 focus-within:ring-offset-2 hover:border-purple-100 hover:shadow-[0_16px_50px_rgba(0,0,0,0.1)] dark:border-zinc-800/80 dark:bg-zinc-900/90 dark:hover:border-zinc-700 dark:hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
                      >
                        {/* Cover Image with CSS Mask Fade */}
                        <div
                          className="relative h-56 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-64 dark:bg-zinc-800"
                          style={{
                            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                            WebkitMaskImage:
                              'linear-gradient(to bottom, black 60%, transparent 100%)',
                          }}
                        >
                          {post.cover ? (
                            <Image
                              src={post.cover}
                              alt={post.title}
                              fill
                              priority={index < 2}
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 896px"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div
                              className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${getGradientForPost(post.title)} p-6 text-center text-white`}
                            >
                              <div className="mb-3 rounded-full bg-white/20 p-4 shadow-inner backdrop-blur-md">
                                <BookOpen size={32} className="text-white drop-shadow-md" />
                              </div>
                              <span className="font-display text-sm font-bold uppercase tracking-widest text-white/90 drop-shadow-md">
                                ZENTYR
                              </span>
                            </div>
                          )}

                          {/* Arrow Icon - Top Right */}
                          <div className="absolute right-4 top-4 z-20">
                            <motion.div
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-rose-600 group-hover:text-white group-hover:shadow-xl dark:bg-zinc-800 dark:text-zinc-200 dark:group-hover:from-cyan-500 dark:group-hover:to-blue-600"
                              whileHover={{ scale: 1.15, rotate: 45 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ArrowUpRight size={18} />
                            </motion.div>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="relative z-10 flex flex-1 flex-col p-6 pt-2 sm:p-8 sm:pt-4">
                          {/* Date */}
                          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-zinc-400">
                            <Calendar size={12} />
                            <span suppressHydrationWarning>
                              {new Date(post.date).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="mb-4 line-clamp-2 font-display text-lg font-bold leading-snug text-gray-800 transition-colors group-hover:text-purple-600 sm:text-xl dark:text-white dark:group-hover:text-cyan-400">
                            {post.title}
                          </h3>

                          {/* Tags - Pushed to bottom */}
                          <div
                            className="mt-auto flex flex-wrap gap-2"
                            role="list"
                            aria-label="หมวดหมู่"
                          >
                            {post.tags.slice(0, 3).map((tag: string) => (
                              <motion.span
                                key={tag}
                                role="listitem"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-all duration-200 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-cyan-400"
                              >
                                {tag}
                              </motion.span>
                            ))}
                            {post.tags.length > 3 && (
                              <span
                                className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs text-gray-500 dark:border-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-400"
                                aria-label={`และอีก ${post.tags.length - 3} หมวดหมู่`}
                              >
                                +{post.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Results State - Soft UI Card */}
            {filteredPosts.length === 0 && selectedTag !== 'All' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center"
              >
                <div className="mx-auto max-w-md rounded-3xl border border-white/60 bg-white p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="mb-6">
                    <Search className="mx-auto h-20 w-20 text-gray-300" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-400">
                    ไม่พบบทความในหมวดหมู่นี้
                  </h3>
                  <p className="mb-6 font-light text-gray-500">
                    ลองเลือกหมวดหมู่อื่น หรือดูบทความทั้งหมด
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTag('All')}
                    aria-label="ดูบทความทั้งหมด"
                    className="min-h-[48px] rounded-full bg-gradient-to-r from-rose-500 to-purple-500 px-8 py-3 font-semibold text-white shadow-[0_8px_30px_rgb(251,113,133,0.3)] transition-all hover:shadow-[0_12px_40px_rgb(251,113,133,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
                  >
                    ดูบทความทั้งหมด
                  </motion.button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </>
  );
};
