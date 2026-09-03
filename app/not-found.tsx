'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-4">
      <div className="relative z-10 max-w-2xl text-center">
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.h1
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-4 bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 bg-clip-text font-display text-9xl font-black text-transparent"
          >
            404
          </motion.h1>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl sm:p-12 dark:border-zinc-800/80 dark:bg-zinc-900/90 dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          <div className="mb-6">
            <Search className="mx-auto h-16 w-16 text-purple-500 dark:text-cyan-400" />
          </div>

          <h2 className="mb-4 font-display text-3xl font-bold text-gray-800 dark:text-white">
            ไม่พบหน้าที่คุณต้องการ
          </h2>

          <p className="mb-8 text-lg text-gray-600 dark:text-zinc-400">
            หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบ หรือไม่เคยมีอยู่จริง
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-rose-600 to-amber-500 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 dark:from-white dark:via-zinc-100 dark:to-zinc-200 dark:text-zinc-950 dark:shadow-[0_8px_25px_rgba(255,255,255,0.15)]"
            >
              <Home size={20} />
              กลับหน้าแรก
            </Link>

            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white/90 px-8 py-4 font-semibold text-gray-700 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:border-purple-200 hover:text-purple-600 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:text-cyan-400"
            >
              <Search size={20} />
              ดูบทความ
            </Link>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-sm text-gray-500 dark:text-zinc-400"
        >
          <p className="mb-3">หรือลองดูหน้าเหล่านี้:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-gray-100 bg-white/80 px-4 py-2 backdrop-blur-md transition-colors hover:bg-purple-50 hover:text-purple-600 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              หน้าแรก
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-gray-100 bg-white/80 px-4 py-2 backdrop-blur-md transition-colors hover:bg-purple-50 hover:text-purple-600 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              บทความ
            </Link>
            <a
              href="https://github.com/DDME36"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gray-100 bg-white/80 px-4 py-2 backdrop-blur-md transition-colors hover:bg-purple-50 hover:text-purple-600 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
