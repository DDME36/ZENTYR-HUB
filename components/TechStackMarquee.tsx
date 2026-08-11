'use client';

import { motion, useInView } from 'framer-motion';
import { Brain, Sparkles, Code2, Rocket, Zap, Database } from 'lucide-react';
import { useRef } from 'react';

const researchTopics = [
  { name: 'ปัญญาประดิษฐ์', icon: Brain, color: 'text-white', bg: 'from-purple-500 to-violet-600' },
  { name: 'เว็บเทคโนโลยี', icon: Code2, color: 'text-white', bg: 'from-blue-500 to-cyan-600' },
  { name: 'ประสิทธิภาพ', icon: Zap, color: 'text-white', bg: 'from-amber-400 to-orange-500' },
  { name: 'นวัตกรรม', icon: Sparkles, color: 'text-white', bg: 'from-pink-500 to-rose-600' },
  { name: 'คลาวด์และเดฟออปส์', icon: Rocket, color: 'text-white', bg: 'from-sky-500 to-blue-600' },
  { name: 'ระบบข้อมูล', icon: Database, color: 'text-white', bg: 'from-indigo-500 to-purple-600' },
];

export const TechStackMarquee = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: '200px 0px' });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent py-12 sm:py-16">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="mb-2 font-display text-2xl font-bold text-gray-800 sm:text-3xl">
            สิ่งที่เราศึกษาวิจัย
          </h2>
          <p className="font-light text-gray-500">เทคโนโลยีและความรู้ใหม่ๆ ที่เรากำลังสำรวจ</p>
        </motion.div>

        {/* Scrolling Content - Single Row */}
        <div className="relative">
          <ul className="sr-only">
            {researchTopics.map((topic) => (
              <li key={topic.name}>{topic.name}</li>
            ))}
          </ul>
          {/* Single Row - Pure CSS Smooth Scroll (GPU Accelerated) */}
          <div
            className="flex overflow-hidden py-4"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <div
              aria-hidden="true"
              className="animate-marquee-slow flex"
              style={{
                animationPlayState: isInView ? 'running' : 'paused',
                willChange: isInView ? 'transform' : 'auto',
              }}
            >
              {[0, 1].map((groupIndex) => (
                <div
                  key={groupIndex}
                  aria-hidden={groupIndex === 1}
                  className="flex shrink-0 gap-4 pr-4"
                >
                  {researchTopics.map((topic) => {
                    const Icon = topic.icon;

                    return (
                      <div
                        key={`${groupIndex}-${topic.name}`}
                        className={`flex-shrink-0 bg-gradient-to-br ${topic.bg} group relative overflow-hidden rounded-2xl border-none p-6 shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl`}
                      >
                        <div className="absolute -bottom-4 -right-4 text-white/40 opacity-20 transition-opacity group-hover:opacity-30">
                          <Icon size={120} strokeWidth={1.5} />
                        </div>

                        <div className="relative z-10 flex w-36 flex-col items-center gap-3">
                          <div
                            className={`text-4xl ${topic.color} drop-shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
                          >
                            <Icon strokeWidth={2} />
                          </div>
                          <span className="text-center font-sans text-sm font-bold leading-tight text-white drop-shadow-md">
                            {topic.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
