'use client';

import { useState } from 'react';
import { Copy, Check, Minus, Plus, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { slugify, extractText } from '@/lib/utils';

interface BlogPostContentProps {
  content: string;
}

const ImageWithReveal = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative my-7 flex w-full flex-col items-center sm:my-10">
      <div
        className={`relative max-w-full overflow-hidden rounded-xl shadow-lg transition-all duration-700 sm:rounded-2xl sm:shadow-2xl ${loaded ? 'scale-100' : 'scale-95 bg-gray-100 blur-lg'}`}
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
            <XIcon size={32} />
            <span className="text-sm font-medium">ไม่สามารถโหลดรูปได้</span>
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`max-h-[75vh] w-auto max-w-full object-contain transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
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

const XIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const BlogPostContent = ({ content }: BlogPostContentProps) => {
  const [fontSize, setFontSize] = useState(17);
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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

  return (
    <>
      {/* Premium Reading Controls */}
      <div className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 2xl:block">
        <motion.div
          role="toolbar"
          aria-label="ตั้งค่าการอ่านบทความ"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-2 rounded-3xl border border-gray-200/50 bg-white/70 p-2 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col items-center gap-1 p-2">
            <button
              onClick={() => setFontSize((p) => Math.min(p + 1, 20))}
              aria-label="เพิ่มขนาดตัวอักษร"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 transition-all hover:bg-rose-50 hover:text-rose-500"
            >
              <Plus size={16} />
            </button>
            <div
              aria-live="polite"
              className="py-1 text-[11px] font-bold tabular-nums leading-none text-gray-400"
            >
              {fontSize}
            </div>
            <button
              onClick={() => setFontSize((p) => Math.max(p - 1, 16))}
              aria-label="ลดขนาดตัวอักษร"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 transition-all hover:bg-rose-50 hover:text-rose-500"
            >
              <Minus size={16} />
            </button>
          </div>
          <div className="mx-2 h-px bg-gray-100" />
          <div className="flex justify-center p-2">
            <button
              onClick={copyToClipboard}
              aria-label={copied ? 'คัดลอกลิงก์แล้ว' : 'คัดลอกลิงก์บทความ'}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 transition-all hover:bg-purple-50 hover:text-purple-600"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose mx-auto !max-w-4xl overflow-hidden rounded-3xl border border-gray-100 bg-white/95 pb-10 tracking-normal text-gray-700 shadow-xl prose-headings:font-display prose-a:no-underline sm:rounded-[40px] sm:pb-14 sm:shadow-2xl md:pb-16"
        style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
      >
        <div className="p-4 sm:p-8 md:p-12 lg:p-16">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={{
              img: ({ src, alt }) => (
                <ImageWithReveal src={typeof src === 'string' ? src : ''} alt={alt || ''} />
              ),
              h1: ({ children }) => {
                const id = slugify(extractText(children));
                return (
                  <h1
                    id={id}
                    className="relative mb-5 mt-11 scroll-mt-[120px] pl-4 text-[28px] font-bold leading-[1.3] tracking-[-0.015em] text-gray-900 sm:mb-7 sm:mt-14 sm:text-[34px] md:text-[38px]"
                  >
                    <span className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-rose-400 to-purple-500 sm:w-1.5" />
                    {children}
                  </h1>
                );
              },
              h2: ({ children }) => {
                const id = slugify(extractText(children));
                return (
                  <h2
                    id={id}
                    className="mb-4 mt-10 scroll-mt-[120px] text-[24px] font-semibold leading-[1.35] tracking-[-0.01em] text-gray-800 sm:mb-5 sm:mt-12 sm:text-[28px] md:text-[30px]"
                  >
                    {children}
                  </h2>
                );
              },
              h3: ({ children }) => {
                const id = slugify(extractText(children));
                return (
                  <h3
                    id={id}
                    className="mb-3 mt-8 scroll-mt-[120px] text-[20px] font-semibold leading-[1.4] text-gray-800 sm:mb-4 sm:mt-9 sm:text-[23px] md:text-[24px]"
                  >
                    {children}
                  </h3>
                );
              },
              p: ({ children, node }) => {
                if (node?.children?.some((child) => 'tagName' in child && child.tagName === 'img'))
                  return <>{children}</>;
                return (
                  <p className="mb-5 break-words text-left font-normal leading-[1.8] text-gray-600 sm:mb-6">
                    {children}
                  </p>
                );
              },
              blockquote: ({ children }) => (
                <blockquote className="my-8 rounded-2xl border-l-0 bg-gradient-to-br from-rose-50/70 to-purple-50/70 p-5 italic shadow-inner sm:my-10 sm:rounded-3xl sm:p-8 md:p-10">
                  <div className="mb-2 font-serif text-[32px] leading-none text-rose-500 opacity-50 sm:text-[36px]">
                    “
                  </div>
                  <div className="font-normal leading-[1.75] text-gray-600">{children}</div>
                </blockquote>
              ),
              a: ({ children, href }) => {
                const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);
                return (
                  <a
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="group relative inline-block font-semibold text-rose-600"
                  >
                    {children}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-rose-400 transition-all duration-300 group-hover:w-full" />
                  </a>
                );
              },
              ul: ({ children }) => (
                <ul className="my-6 space-y-3 sm:my-8 sm:space-y-4">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  <div className="text-gray-600">{children}</div>
                </li>
              ),
              code: ({ className, children }) => {
                const match = /language-(\w+)/.exec(className || '');
                const codeString = String(children).replace(/\n$/, '');
                return match ? (
                  <div className="group relative my-8 max-w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-200 sm:my-10 sm:rounded-3xl sm:shadow-2xl">
                    <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
                      <button
                        onClick={() => copyCode(codeString)}
                        className="rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
                      >
                        {copiedCode === codeString ? (
                          <Check size={14} className="text-green-400" />
                        ) : (
                          'Copy'
                        )}
                      </button>
                    </div>
                    <div className="border-b border-white/5 bg-gray-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
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
                  <code className="break-words rounded-md bg-rose-50 px-1.5 py-0.5 font-mono text-[14px] font-semibold leading-6 text-rose-700">
                    {children}
                  </code>
                );
              },
              table: ({ children }) => (
                <div className="my-8 max-w-full overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="m-0 min-w-[640px] text-[14px] leading-6 sm:text-[15px]">
                    {children}
                  </table>
                </div>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </motion.div>
    </>
  );
};
