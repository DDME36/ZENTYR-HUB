'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, Code2, Rocket, Zap, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

const researchTopics = [
  {
    name: 'ปัญญาประดิษฐ์',
    icon: Brain,
    color: 'text-white',
    bg: 'from-purple-500 to-violet-600',
    shadow: 'shadow-[0_8px_25px_-4px_rgba(147,51,234,0.28)] hover:shadow-[0_16px_35px_-4px_rgba(147,51,234,0.42)]',
  },
  {
    name: 'เว็บเทคโนโลยี',
    icon: Code2,
    color: 'text-white',
    bg: 'from-blue-500 to-cyan-600',
    shadow: 'shadow-[0_8px_25px_-4px_rgba(59,130,246,0.28)] hover:shadow-[0_16px_35px_-4px_rgba(59,130,246,0.42)]',
  },
  {
    name: 'ประสิทธิภาพ',
    icon: Zap,
    color: 'text-white',
    bg: 'from-amber-400 to-orange-500',
    shadow: 'shadow-[0_8px_25px_-4px_rgba(245,158,11,0.28)] hover:shadow-[0_16px_35px_-4px_rgba(245,158,11,0.42)]',
  },
  {
    name: 'นวัตกรรม',
    icon: Sparkles,
    color: 'text-white',
    bg: 'from-pink-500 to-rose-600',
    shadow: 'shadow-[0_8px_25px_-4px_rgba(244,63,94,0.28)] hover:shadow-[0_16px_35px_-4px_rgba(244,63,94,0.42)]',
  },
  {
    name: 'คลาวด์และเดฟออปส์',
    icon: Rocket,
    color: 'text-white',
    bg: 'from-sky-500 to-blue-600',
    shadow: 'shadow-[0_8px_25px_-4px_rgba(14,165,233,0.28)] hover:shadow-[0_16px_35px_-4px_rgba(14,165,233,0.42)]',
  },
  {
    name: 'ระบบข้อมูล',
    icon: Database,
    color: 'text-white',
    bg: 'from-indigo-500 to-purple-600',
    shadow: 'shadow-[0_8px_25px_-4px_rgba(99,102,241,0.28)] hover:shadow-[0_16px_35px_-4px_rgba(99,102,241,0.42)]',
  },
];

interface TechStackMarqueeProps {
  isDark?: boolean;
}

export const TechStackMarquee = ({ isDark = false }: TechStackMarqueeProps) => {
  return (
    <section className="relative overflow-visible bg-transparent py-10 sm:py-14">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center"
        >
          <h2
            className={cn(
              'mb-2 font-display text-2xl font-bold sm:text-3xl transition-colors duration-500',
              isDark ? 'text-white' : 'text-gray-800'
            )}
          >
            สแต็กเทคโนโลยี & ความเชี่ยวชาญ
          </h2>
          <p
            className={cn(
              'font-light transition-colors duration-500',
              isDark ? 'text-zinc-400' : 'text-gray-500'
            )}
          >
            เครื่องมือ โมเดล AI และสถาปัตยกรรมระบบที่เราใช้งานจริงในการสร้างสรรค์ซอฟต์แวร์
          </p>
        </motion.div>

        {/* Scrolling Content */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <ul className="sr-only">
            {researchTopics.map((topic) => (
              <li key={topic.name}>{topic.name}</li>
            ))}
          </ul>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {researchTopics.map((topic) => {
              const Icon = topic.icon;

              return (
                <div
                  key={topic.name}
                  className={cn(
                    'group relative overflow-hidden rounded-3xl p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 sm:p-6',
                    isDark
                      ? 'border border-white/90 bg-white text-zinc-950 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.5)]'
                      : `bg-gradient-to-br ${topic.bg} ${topic.shadow} border-none`
                  )}
                >
                  <div
                    className={cn(
                      'absolute -bottom-4 -right-4 transition-opacity duration-300',
                      isDark
                        ? 'text-zinc-300/60 opacity-60 group-hover:opacity-80'
                        : 'text-white/30 opacity-20 group-hover:opacity-35'
                    )}
                  >
                    <Icon size={100} strokeWidth={1.5} />
                  </div>

                  <div className="relative z-10 flex min-h-24 flex-col items-center justify-center gap-3">
                    <div className={cn('text-3xl drop-shadow-sm', isDark ? 'text-zinc-900' : topic.color)}>
                      <Icon strokeWidth={2.2} />
                    </div>
                    <span
                      className={cn(
                        'text-center font-sans text-sm leading-tight',
                        isDark
                          ? 'font-black tracking-tight text-zinc-950'
                          : 'font-bold text-white drop-shadow-sm'
                      )}
                    >
                      {topic.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
