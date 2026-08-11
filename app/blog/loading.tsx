'use client';

import { motion } from 'framer-motion';
import { SkeletonCard } from '@/components/SkeletonCard';

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-transparent pt-24">
      {/* Centered Hero Skeleton */}
      <div className="relative py-12 sm:py-16">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="rounded-[3rem] border border-white/60 bg-white/50 p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] backdrop-blur-xl">
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mb-6 h-8 w-32 rounded-full bg-gray-100"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                className="mb-4 h-12 w-48 rounded-2xl bg-gray-100"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                className="mb-10 h-5 w-64 rounded-lg bg-gray-50"
              />

              {/* Stats Skeleton */}
              <div className="flex gap-6">
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  className="h-24 w-28 rounded-2xl bg-white"
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="h-24 w-28 rounded-2xl bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton Grid */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 h-12 w-full max-w-md animate-pulse rounded-2xl bg-white/50" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
