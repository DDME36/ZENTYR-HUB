'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Check, Facebook, Link as LinkIcon } from 'lucide-react';
import { SiLine, SiDiscord } from 'react-icons/si';

interface ShareButtonsProps {
  url?: string;
}

export function ShareButtons({ url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [discordCopied, setDiscordCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const discordUrl = shareUrl + '?v=1'; // Discord ต้องการ query param เพื่อ refresh embed

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(discordUrl);
      setDiscordCopied(true);
      setTimeout(() => setDiscordCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-purple-100/50 bg-gradient-to-r from-purple-50/70 via-pink-50/50 to-blue-50/40 p-5 text-center dark:border-zinc-800/80 dark:bg-gradient-to-r dark:from-zinc-900/90 dark:via-zinc-900/80 dark:to-zinc-900/90 sm:mt-16 sm:rounded-3xl sm:p-8">
      <div className="mb-4 flex items-center justify-center gap-3 sm:mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-rose-500 shadow-lg dark:from-zinc-800 dark:to-zinc-700 sm:h-12 sm:w-12">
          <Share2 size={18} className="text-white dark:text-cyan-400 sm:h-5 sm:w-5" />
        </div>
        <h3 className="text-[20px] font-semibold leading-7 text-gray-800 dark:text-white sm:text-[24px] sm:leading-8">
          แชร์บทความนี้
        </h3>
      </div>
      <p className="mb-6 text-[14px] leading-6 text-gray-600 dark:text-zinc-400 sm:mb-8 sm:text-[16px]">
        ช่วยแชร์ความรู้ให้เพื่อนๆ ได้อ่านกัน
      </p>
      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare('facebook')}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-[14px] font-medium leading-5 text-white shadow-md transition-all hover:bg-blue-700"
        >
          <Facebook size={18} />
          Facebook
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare('line')}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-[14px] font-medium leading-5 text-white shadow-md transition-all hover:bg-green-600"
        >
          <SiLine size={18} />
          LINE
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyDiscord}
          className={`${
            discordCopied ? 'bg-green-600 hover:bg-green-700' : 'bg-[#5865F2] hover:bg-[#4752C4]'
          } flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-[14px] font-medium leading-5 text-white shadow-md transition-all`}
        >
          {discordCopied ? (
            <>
              <Check size={18} />
              คัดลอกแล้ว!
            </>
          ) : (
            <>
              <SiDiscord size={18} />
              Discord
            </>
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyLink}
          className={`${
            copied
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-700 hover:bg-gray-800 dark:bg-zinc-800 dark:hover:bg-zinc-700'
          } flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-[14px] font-medium leading-5 text-white shadow-md transition-all`}
        >
          {copied ? (
            <>
              <Check size={18} />
              คัดลอกแล้ว!
            </>
          ) : (
            <>
              <LinkIcon size={18} />
              คัดลอกลิงก์
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
