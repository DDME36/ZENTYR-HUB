'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, PlayCircle } from 'lucide-react';
import { PostSummary } from '@/lib/types';

interface EpisodeListProps {
  episodes: PostSummary[];
  seriesTitle: string;
}

export const EpisodeList = ({ episodes, seriesTitle }: EpisodeListProps) => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Series Header */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ type: 'spring', damping: 22, stiffness: 140 }}
        className="mb-12 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-100/60 bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 text-sm font-semibold">
          <BookOpen size={14} className="text-purple-500" />
          <span className="text-gray-600">Series</span>
        </div>
        <h1 className="mb-4 font-display text-4xl font-black text-gray-800 dark:text-white sm:text-5xl">
          {seriesTitle}
        </h1>
        <p className="text-lg text-gray-600 dark:text-zinc-400">
          {episodes.length} ตอน · เลือกตอนที่ต้องการอ่าน
        </p>
      </motion.div>

      {/* Episodes Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {episodes.map((episode, index) => (
          <motion.div
            key={episode.id}
            initial={{ opacity: 0, y: 24, scale: 0.96, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{
              type: 'spring',
              damping: 22,
              stiffness: 150,
              delay: Math.min(index * 0.06, 0.3),
            }}
          >
            <Link href={`/blog/${episode.slug}`}>
              <motion.div
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="group h-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_4px_20px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:border-purple-100 hover:shadow-[0_16px_40px_rgba(168,85,247,0.12)] dark:border-zinc-800/80 dark:bg-zinc-900/90 dark:hover:border-zinc-700 dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
              >
                {/* Episode Number Badge */}
                <div className="relative">
                  {episode.cover ? (
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900">
                      <Image
                        src={episode.cover}
                        alt={episode.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="dark:via-zinc-850 flex h-48 w-full items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-rose-100 dark:from-zinc-800 dark:to-zinc-800">
                      <BookOpen size={48} className="text-purple-300 dark:text-zinc-600" />
                    </div>
                  )}

                  {/* Episode Number */}
                  {episode.episodeNumber && (
                    <div className="absolute left-4 top-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 font-display text-lg font-black text-white shadow-lg dark:border dark:border-zinc-600 dark:from-zinc-700 dark:to-zinc-900">
                        {episode.episodeNumber}
                      </div>
                    </div>
                  )}

                  {/* Play Icon */}
                  <div className="absolute right-4 top-4">
                    <motion.div
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-purple-600 shadow-lg backdrop-blur-sm transition-all group-hover:bg-purple-500 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-200 dark:group-hover:bg-cyan-500 dark:group-hover:text-black"
                      whileHover={{ scale: 1.15, rotate: 10 }}
                    >
                      <PlayCircle size={20} />
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-3 line-clamp-2 font-display text-lg font-bold leading-snug text-gray-800 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-cyan-400">
                    {episode.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-zinc-500">
                    <Calendar size={12} />
                    <span suppressHydrationWarning>
                      {new Date(episode.date).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-16 mt-12 text-center"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-6 py-3 font-semibold text-gray-700 shadow-md backdrop-blur-md transition-all hover:scale-105 hover:border-purple-200 hover:text-purple-600 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-cyan-400"
        >
          ← กลับไปหน้าบทความ
        </Link>
      </motion.div>
    </div>
  );
};
