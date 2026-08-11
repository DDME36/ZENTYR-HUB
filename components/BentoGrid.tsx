'use client';

import { motion } from 'framer-motion';
import {
  Share2,
  Code,
  User,
  ArrowUpRight,
  BookOpen,
  Bell,
  Music,
  Brain,
  Gamepad2,
  Heart,
  Terminal,
  Mic2,
} from 'lucide-react';
import { Card } from './Card';
import Link from 'next/link';
import { PostSummary } from '@/lib/types';

interface BentoGridProps {
  posts: PostSummary[];
}

export const BentoGrid = ({ posts }: BentoGridProps) => {
  return (
    <>
      <div className="mx-auto grid max-w-6xl auto-rows-[160px] grid-cols-1 gap-4 px-4 py-12 sm:auto-rows-[176px] sm:grid-cols-2 md:auto-rows-[168px] md:grid-cols-4 md:gap-5 lg:gap-6">
        {/* MemoKard - Current flagship */}
        <Card
          href="/blog/MemoKard"
          BgIcon={Brain}
          className="group relative col-span-1 row-span-2 !border-none !bg-gradient-to-br from-emerald-500 to-teal-600 !text-white shadow-[0_8px_30px_rgba(16,185,129,0.25)] sm:col-span-2 md:col-span-2 lg:col-span-2"
          glowColor="rgba(255,255,255,0.2)"
        >
          {/* Soft Shimmer Effect with blur */}
          <div className="shimmer-effect animate-[shimmer_2.5s_ease-out_1]"></div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-start justify-between">
              <div className="mb-2 flex items-center gap-2">
                <Brain className="h-5 w-5 text-emerald-100" />
                <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Featured
                </span>
              </div>
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ArrowUpRight className="text-emerald-100" size={18} />
              </motion.div>
            </div>
            <div className="flex flex-1 items-center py-4 md:py-5">
              <div>
                <h2 className="mb-2 font-display text-lg font-bold sm:text-xl lg:text-2xl">
                  MemoKard
                </h2>
                <p className="max-w-lg text-sm leading-relaxed text-emerald-50">
                  แฟลชการ์ดภาษาไทยแบบ Offline-first พร้อม FSRS, Active Recall และติดตั้งเป็น PWA ได้
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-lg border border-white/25 bg-white/15 px-2.5 py-1 text-xs font-medium">
                    FSRS
                  </span>
                  <span className="rounded-lg border border-white/25 bg-white/15 px-2.5 py-1 text-xs font-medium">
                    Offline-first
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile / work history */}
        <Card
          href="https://satayupongpan.site/"
          BgIcon={User}
          className="col-span-1 row-span-2 !border-none !bg-gradient-to-br from-gray-800 to-gray-900 !text-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] sm:col-span-1"
        >
          <div className="flex h-full flex-col items-center justify-between text-center">
            <div className="relative z-20 mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-gray-600 font-display text-lg font-bold text-gray-300 shadow-inner">
              ME
            </div>
            <div>
              <h3 className="font-display text-sm font-bold uppercase">PROFILE</h3>
              <p className="mt-1 text-xs text-gray-300">Satayu Pongpan</p>
            </div>
            <div className="mt-2 w-full cursor-pointer rounded-xl bg-white py-2 text-xs font-bold text-gray-900 shadow-sm transition-none hover:bg-gray-100">
              ประวัติและผลงาน
            </div>
          </div>
        </Card>

        {/* PUNN Activity Studio */}
        <Card
          href="/blog/PUNNActivityStudio"
          BgIcon={Gamepad2}
          className="col-span-1 row-span-2 !border-none !bg-gradient-to-br from-blue-500 to-indigo-600 !text-white shadow-[0_8px_30px_rgba(59,130,246,0.25)] sm:col-span-1"
        >
          <div className="flex h-full flex-col items-center justify-between text-center">
            <div className="relative z-20 mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 font-display text-white shadow-inner">
              <Gamepad2 size={20} />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold">PUNN Activity</h3>
              <p className="mt-1 text-xs text-blue-50">จำลองสถานะเกมบน Discord</p>
            </div>
            <div className="mt-2 w-full cursor-pointer rounded-xl border border-white/30 bg-white/20 py-2 text-xs font-bold text-white transition-none hover:bg-white/30">
              <span>อ่านบทความ</span>
            </div>
          </div>
        </Card>

        {/* CrimsonVC Studio */}
        <Card
          href="/blog/CrimsonVCStudio"
          BgIcon={Mic2}
          className="col-span-1 row-span-1 !border-none !bg-gradient-to-br from-rose-500 to-red-600 !text-white shadow-[0_8px_30px_rgba(244,63,94,0.24)] sm:col-span-2 sm:!p-5 md:col-span-2"
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="mb-1 flex items-center gap-2">
                <Mic2 className="h-4 w-4 text-rose-100" />
                <span className="rounded-lg border border-white/30 bg-white/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider">
                  AI Audio
                </span>
              </div>
              <ArrowUpRight className="text-rose-100" size={18} />
            </div>
            <div>
              <h3 className="mb-1 font-display text-lg font-bold">CrimsonVC Studio</h3>
              <p className="text-sm leading-snug text-rose-50">
                สตูดิโอ AI Cover, Voice Conversion และฝึกโมเดล RVC ผ่าน Google Colab
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="rounded-lg border border-white/25 bg-white/15 px-2 py-0.5 text-xs font-medium">
                  RVC
                </span>
                <span className="rounded-lg border border-white/25 bg-white/15 px-2 py-0.5 text-xs font-medium">
                  Colab
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* BlockHunter / Smart AI Stock */}
        <Card
          href="https://smartaistock.vercel.app/"
          BgIcon={Bell}
          className="col-span-1 row-span-1 !border-none !bg-gradient-to-br from-indigo-500 to-purple-600 !text-white shadow-[0_8px_30px_rgba(99,102,241,0.25)] sm:col-span-2 sm:!p-5 md:col-span-2"
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="mb-1 flex items-center gap-2">
                <Bell className="h-4 w-4 text-indigo-100" />
                <span className="rounded-lg border border-white/30 bg-white/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider">
                  PWA
                </span>
              </div>
              <ArrowUpRight className="text-indigo-100" size={18} />
            </div>
            <div>
              <h3 className="mb-1 font-display text-lg font-bold">BlockHunter</h3>
              <p className="text-sm leading-snug text-indigo-50">
                วิเคราะห์ Smart Money Concept และแจ้งเตือนเมื่อหุ้นเข้า Order Block
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="rounded-lg border border-white/25 bg-white/15 px-2 py-0.5 text-xs font-medium">
                  Order Blocks
                </span>
                <span className="rounded-lg border border-white/25 bg-white/15 px-2 py-0.5 text-xs font-medium">
                  PWA Ready
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* PurrDrop Project */}
        <Card
          href="https://purrdrop.onrender.com/"
          bgImage="/images/purrdrop.png"
          priority={true}
          className="col-span-1 row-span-1 !border-none !text-white sm:col-span-2 md:col-span-1"
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-white" />
                  <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
                    PWA
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold drop-shadow-md">PurrDrop</h3>
                <p className="text-sm text-white/90 drop-shadow-sm">เว็บแอพส่งไฟล์ P2P</p>
              </div>
              <ArrowUpRight className="text-white/70" size={18} />
            </div>
          </div>
        </Card>

        {/* PUNNTOK */}
        <Card
          href="/blog/PUNNTOK"
          BgIcon={Heart}
          className="col-span-1 row-span-1 !border-none !bg-gradient-to-br from-pink-500 to-rose-600 !text-white shadow-[0_8px_30px_rgba(244,63,94,0.24)]"
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Heart className="mb-2 h-5 w-5 text-pink-50" />
            <h3 className="font-display text-sm font-bold">PUNNTOK</h3>
            <p className="mt-1 text-xs text-pink-50">TikTok LIVE บนเว็บและ PWA</p>
          </div>
        </Card>

        {/* HEARTOPIANO - Piano Game App */}
        <Card
          href="https://www.punn.site/blog/HowToUseHeartopiano"
          BgIcon={Music}
          className="col-span-1 row-span-1 !border-none !bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 !text-white shadow-[0_8px_30px_rgba(236,72,153,0.25)]"
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Music className="mb-2 h-5 w-5 text-pink-50" />
            <h3 className="font-display text-sm font-bold">HEARTOPIANO</h3>
            <p className="mt-1 text-xs text-pink-50">เล่นเปียโนในเกม</p>
          </div>
        </Card>

        {/* GitHub */}
        <Card
          href="https://github.com/DDME36"
          className="col-span-1 row-span-1 !border-none !bg-gray-800 !text-white"
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Code className="mb-2 h-5 w-5 text-gray-400" />
            <h3 className="font-display text-sm font-bold">GitHub</h3>
            <p className="mt-1 text-xs text-gray-400">Open Source</p>
          </div>
        </Card>

        {/* PUNN Discord Script */}
        <Card
          href="/blog/PUNNDiscordScript"
          BgIcon={Terminal}
          className="col-span-1 row-span-1 !border-none !bg-gradient-to-r from-slate-900 to-slate-800 !text-white"
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Terminal className="mb-2 h-5 w-5 text-violet-300" />
            <h3 className="font-display text-sm font-bold">Discord Script</h3>
            <p className="mt-1 text-xs text-slate-300">Launcher สำหรับกิจกรรม Discord</p>
          </div>
        </Card>

        {/* Articles Section - ปรับให้สวยขึ้น */}
        <Card
          BgIcon={BookOpen}
          className="col-span-1 row-span-1 !border-rose-100 bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 sm:col-span-2 sm:!p-6 md:col-span-3 lg:col-span-3"
        >
          <div className="flex h-full flex-col">
            <Link
              href="/blog"
              className="group/header mb-3 flex w-fit items-center gap-2 transition-none hover:opacity-80"
            >
              <div className="rounded-lg bg-gradient-to-r from-rose-400 to-purple-400 p-2">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-display text-base font-bold text-gray-800">บทความล่าสุด</h3>
              <ArrowUpRight
                size={14}
                className="-translate-x-2 text-rose-400 opacity-0 transition-all group-hover/header:translate-x-0 group-hover/header:opacity-100"
              />
            </Link>
            <div className="flex flex-col gap-2 overflow-y-auto">
              {posts.length > 0 ? (
                posts.slice(0, 2).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex w-full items-center gap-2 truncate rounded-lg border border-rose-100/50 px-3 py-2 text-left text-sm font-medium text-gray-700 transition-none hover:border-rose-200 hover:bg-rose-100/50 hover:text-rose-600"
                  >
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-rose-400"></span>
                    <span className="truncate">{post.title}</span>
                  </Link>
                ))
              ) : (
                <div className="py-4 text-center">
                  <div className="mb-2">
                    <BookOpen className="mx-auto h-8 w-8 text-rose-300" />
                  </div>
                  <span className="text-sm italic text-gray-500">ไม่มีบทความล่าสุด</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
