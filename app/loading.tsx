'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  const skeletonItems = [
    { className: 'col-span-1 row-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2' }, // PUNN INVESTING
    { className: 'col-span-1 row-span-2 sm:col-span-1' }, // Founder
    { className: 'col-span-1 row-span-2 sm:col-span-1' }, // Compact project card
    { className: 'col-span-1 row-span-1 sm:col-span-2 md:col-span-2' }, // MemoKard
    { className: 'col-span-1 row-span-1 sm:col-span-2 md:col-span-2' }, // Smart AI Stock
  ];

  return (
    <div className="min-h-screen bg-transparent pt-24">
      {/* Hero Skeleton Area */}
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mx-auto mb-6 h-8 w-48 rounded-full bg-gray-100"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          className="mx-auto mb-4 h-16 w-full max-w-lg rounded-2xl bg-gray-100"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          className="mx-auto h-6 w-64 rounded-lg bg-gray-50"
        />
      </div>

      {/* Bento Grid Skeleton */}
      <div className="mx-auto grid max-w-6xl auto-rows-[160px] grid-cols-1 gap-4 px-4 py-12 sm:auto-rows-[180px] sm:grid-cols-2 md:grid-cols-4 lg:gap-6">
        {skeletonItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            className={`rounded-[2.5rem] border border-gray-100 bg-white/50 ${item.className}`}
          />
        ))}
      </div>
    </div>
  );
}
