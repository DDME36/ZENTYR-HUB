'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Minus, Plus, Image as ImageIcon, Maximize2, X, Link as LinkIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import { slugify, extractText, cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';

interface BlogPostContentProps {
  content: string;
}

interface LightboxImage {
  src: string;
  alt: string;
}

const ImageWithReveal = ({
  src,
  alt,
  onImageClick,
}: {
  src: string;
  alt: string;
  onImageClick: (data: LightboxImage) => void;
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative my-7 flex w-full flex-col items-center sm:my-10">
      <div
        onClick={() => loaded && !error && onImageClick({ src, alt })}
        className={`group relative max-w-full cursor-zoom-in overflow-hidden rounded-xl shadow-lg transition-all duration-700 sm:rounded-2xl sm:shadow-2xl ${
          loaded ? 'scale-100' : 'scale-95 bg-gray-100 blur-lg'
        }`}
      >
        {!loaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ImageIcon className="text-gray-300" size={40} />
            </motion.div>
          </div>
        )}

        {error ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-12 text-gray-400">
            <X size={32} />
            <span className="text-sm font-medium">ไม่สามารถโหลดรูปได้</span>
          </div>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              className={`max-h-[75vh] w-auto max-w-full object-contain transition-all duration-700 group-hover:scale-[1.02] ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {/* Hover Zoom Hint */}
            {loaded && (
              <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                <Maximize2 size={12} />
                <span>คลิกเพื่อขยาย</span>
              </div>
            )}
          </>
        )}
      </div>
      {alt && loaded && (
        <span className="mt-4 text-center text-xs font-medium italic tracking-wide text-gray-400">
          — {alt} —
        </span>
      )}
    </div>
  );
};

export const BlogPostContent = ({ content }: BlogPostContentProps) => {
  const { isDark } = useTheme();
  const [fontSize, setFontSize] = useState(17);
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedHeading, setCopiedHeading] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!lightbox) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const copyHeadingLink = async (id: string) => {
    try {
      const url = new URL(window.location.href);
      url.hash = id;
      await navigator.clipboard.writeText(url.toString());
      setCopiedHeading(id);
      setTimeout(() => setCopiedHeading(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Premium Reading Controls */}
      <div className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 2xl:block">
        <motion.div
          role="toolbar"
          aria-label="ตั้งค่าการอ่านบทความ"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-2 rounded-3xl border border-gray-200/50 bg-white/70 p-2 shadow-2xl backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/85"
        >
          <div className="flex flex-col items-center gap-1 p-2">
            <button
              onClick={() => setFontSize((p) => Math.max(p + 1, 20))}
              aria-label="เพิ่มขนาดตัวอักษร"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 transition-all hover:bg-purple-50 hover:text-purple-600 active:scale-95 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              <Plus size={16} />
            </button>
            <div
              aria-live="polite"
              className="py-1 text-[11px] font-bold tabular-nums leading-none text-gray-400 dark:text-zinc-500"
            >
              {fontSize}
            </div>
            <button
              onClick={() => setFontSize((p) => Math.max(p - 1, 16))}
              aria-label="ลดขนาดตัวอักษร"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 transition-all hover:bg-purple-50 hover:text-purple-600 active:scale-95 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              <Minus size={16} />
            </button>
          </div>
          <div className="mx-2 h-px bg-gray-100 dark:bg-zinc-800" />
          <div className="flex justify-center p-2">
            <button
              onClick={copyToClipboard}
              aria-label={copied ? 'คัดลอกลิงก์แล้ว' : 'คัดลอกลิงก์บทความ'}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 transition-all hover:bg-purple-50 hover:text-purple-600 active:scale-95 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Main Content Article Body */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "prose mx-auto !max-w-4xl overflow-hidden rounded-3xl border pb-10 tracking-normal shadow-xl prose-headings:font-display prose-a:no-underline sm:rounded-[40px] sm:pb-14 sm:shadow-2xl md:pb-16 transition-all duration-500",
          isDark
            ? "prose-invert border-zinc-800/80 bg-zinc-900/90 text-zinc-300 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            : "border-gray-100 bg-white/95 text-gray-700 shadow-xl"
        )}
        style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
      >
        <div className="p-4 sm:p-8 md:p-12 lg:p-16">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={{
              img: ({ src, alt }) => (
                <ImageWithReveal
                  src={typeof src === 'string' ? src : ''}
                  alt={alt || ''}
                  onImageClick={(data) => setLightbox(data)}
                />
              ),
              h1: ({ children }) => {
                const id = slugify(extractText(children));
                return (
                  <h1
                    id={id}
                    className="group relative mb-5 mt-11 scroll-mt-[120px] pl-4 text-[28px] font-bold leading-[1.3] tracking-[-0.015em] text-gray-900 sm:mb-7 sm:mt-14 sm:text-[34px] md:text-[38px] dark:text-white"
                  >
                    <span className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-purple-500 to-rose-500 sm:w-1.5 dark:from-cyan-400 dark:to-blue-500" />
                    <span className="flex items-center justify-between">
                      <span>{children}</span>
                      <button
                        onClick={() => copyHeadingLink(id)}
                        aria-label="คัดลอกลิงก์ส่วนนี้"
                        className="ml-3 inline-flex opacity-0 transition-opacity group-hover:opacity-60 hover:!opacity-100"
                      >
                        {copiedHeading === id ? (
                          <Check size={18} className="text-green-500" />
                        ) : (
                          <LinkIcon size={18} className="text-gray-400 hover:text-purple-500 dark:hover:text-cyan-400" />
                        )}
                      </button>
                    </span>
                  </h1>
                );
              },
              h2: ({ children }) => {
                const id = slugify(extractText(children));
                return (
                  <h2
                    id={id}
                    className="group mb-4 mt-10 scroll-mt-[120px] text-[24px] font-semibold leading-[1.35] tracking-[-0.01em] text-gray-800 sm:mb-5 sm:mt-12 sm:text-[28px] md:text-[30px] dark:text-white"
                  >
                    <span className="flex items-center justify-between">
                      <span>{children}</span>
                      <button
                        onClick={() => copyHeadingLink(id)}
                        aria-label="คัดลอกลิงก์หัวข้อนี้"
                        className="ml-3 inline-flex opacity-0 transition-opacity group-hover:opacity-60 hover:!opacity-100"
                      >
                        {copiedHeading === id ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <LinkIcon size={16} className="text-gray-400 hover:text-purple-500 dark:hover:text-cyan-400" />
                        )}
                      </button>
                    </span>
                  </h2>
                );
              },
              h3: ({ children }) => {
                const id = slugify(extractText(children));
                return (
                  <h3
                    id={id}
                    className="group mb-3 mt-8 scroll-mt-[120px] text-[20px] font-semibold leading-[1.4] text-gray-800 sm:mb-4 sm:mt-9 sm:text-[23px] md:text-[24px] dark:text-zinc-100"
                  >
                    <span className="flex items-center justify-between">
                      <span>{children}</span>
                      <button
                        onClick={() => copyHeadingLink(id)}
                        aria-label="คัดลอกลิงก์หัวข้อย่อยนี้"
                        className="ml-3 inline-flex opacity-0 transition-opacity group-hover:opacity-60 hover:!opacity-100"
                      >
                        {copiedHeading === id ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <LinkIcon size={14} className="text-gray-400 hover:text-purple-500 dark:hover:text-cyan-400" />
                        )}
                      </button>
                    </span>
                  </h3>
                );
              },
              strong: ({ children }) => (
                <strong
                  className={cn(
                    'font-bold tracking-tight',
                    isDark ? 'text-white' : 'text-gray-950'
                  )}
                >
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className={cn('italic', isDark ? 'text-zinc-200' : 'text-gray-800')}>
                  {children}
                </em>
              ),
              p: ({ children, node }) => {
                if (node?.children?.some((child) => 'tagName' in child && child.tagName === 'img'))
                  return <>{children}</>;
                return (
                  <p
                    className={cn(
                      'mb-5 break-words text-left font-normal leading-[1.8] sm:mb-6',
                      isDark ? 'text-zinc-300' : 'text-gray-600'
                    )}
                  >
                    {children}
                  </p>
                );
              },
              blockquote: ({ children }) => (
                <blockquote
                  className={cn(
                    'relative my-8 overflow-hidden rounded-2xl border-l-4 p-5 italic sm:my-10 sm:rounded-3xl sm:p-8 md:p-10 transition-all duration-300',
                    isDark
                      ? 'border-cyan-400 bg-zinc-950/80 text-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                      : 'border-purple-400 bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-blue-50/40 text-gray-700 shadow-inner'
                  )}
                >
                  <div
                    className={cn(
                      'mb-2 font-serif text-[32px] leading-none opacity-60 sm:text-[36px]',
                      isDark ? 'text-cyan-400' : 'text-purple-500'
                    )}
                  >
                    “
                  </div>
                  <div className={cn('font-normal leading-[1.75]', isDark ? 'text-zinc-200' : 'text-gray-700')}>
                    {children}
                  </div>
                </blockquote>
              ),
              a: ({ children, href }) => {
                const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);
                return (
                  <a
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'group relative inline font-bold underline underline-offset-4 decoration-2 transition-colors',
                      isDark
                        ? 'text-cyan-400 decoration-cyan-400/50 hover:text-cyan-300 hover:decoration-cyan-300'
                        : 'text-purple-600 decoration-purple-300 hover:text-purple-700 hover:decoration-purple-500'
                    )}
                  >
                    {children}
                  </a>
                );
              },
              ul: ({ children }) => (
                <ul className="my-6 space-y-3 sm:my-8 sm:space-y-4">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)] dark:bg-cyan-400 dark:shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                  <div className={isDark ? 'text-zinc-300' : 'text-gray-600'}>{children}</div>
                </li>
              ),
              code: ({ className, children }) => {
                const match = /language-(\w+)/.exec(className || '');
                const codeString = String(children).replace(/\n$/, '');
                return match ? (
                  <div className="group relative my-8 max-w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-200 sm:my-10 sm:rounded-3xl sm:shadow-2xl">
                    <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyCode(codeString)}
                        className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all backdrop-blur-md active:scale-95 ${
                          copiedCode === codeString
                            ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                        }`}
                      >
                        {copiedCode === codeString ? (
                          <>
                            <Check size={14} className="text-emerald-400" />
                            <span>คัดลอกแล้ว</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} className="text-gray-300" />
                            <span>Copy</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                    <div className="border-b border-white/5 bg-gray-900 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      {match[1]}
                    </div>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      className="!m-0 !overflow-x-auto !bg-gray-900 !p-4 !text-[13px] !leading-6 sm:!p-6 sm:!text-[14px]"
                      showLineNumbers
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code
                    className={cn(
                      'break-words rounded-md px-1.5 py-0.5 font-mono text-[14px] font-semibold leading-6 border',
                      isDark
                        ? 'border-zinc-800 bg-zinc-950 text-cyan-300'
                        : 'border-purple-100 bg-purple-50 text-purple-700'
                    )}
                  >
                    {children}
                  </code>
                );
              },
              table: ({ children }) => (
                <div
                  className={cn(
                    'my-8 max-w-full overflow-x-auto rounded-2xl border',
                    isDark ? 'border-zinc-800 bg-zinc-950/60' : 'border-gray-200 bg-white'
                  )}
                >
                  <table
                    className={cn(
                      'm-0 min-w-[640px] text-[14px] leading-6 sm:text-[15px]',
                      isDark ? 'text-zinc-200' : 'text-gray-800'
                    )}
                  >
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th
                  className={cn(
                    'border-b px-4 py-3 text-left font-bold',
                    isDark
                      ? 'border-zinc-800 text-white bg-zinc-900/80'
                      : 'border-gray-200 text-gray-900 bg-gray-50'
                  )}
                >
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td
                  className={cn(
                    'border-b px-4 py-3',
                    isDark ? 'border-zinc-800/80 text-zinc-300' : 'border-gray-100 text-gray-700'
                  )}
                >
                  {children}
                </td>
              ),
              hr: () => (
                <hr
                  className={cn(
                    'my-10 border-t',
                    isDark ? 'border-zinc-800' : 'border-gray-200'
                  )}
                />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </motion.div>

      {/* Interactive Fullscreen Image Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              className="relative z-10 flex max-h-[90vh] max-w-5xl flex-col items-center overflow-hidden rounded-3xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightbox(null)}
                aria-label="ปิดรูปภาพขนาดเต็ม"
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-110 active:scale-95"
              >
                <X size={20} />
              </button>

              {/* Lightbox Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl ring-1 ring-white/10"
              />

              {/* Caption */}
              {lightbox.alt && (
                <div className="mt-4 rounded-full bg-white/15 px-6 py-2 text-center text-sm font-medium text-white backdrop-blur-md">
                  {lightbox.alt}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
