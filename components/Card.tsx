'use client';

import { motion, Variants } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  href?: string;
  onClick?: () => void;
  BgIcon?: LucideIcon;
  bgImage?: string;
  priority?: boolean;
}

export const Card = ({
  children,
  className,
  delay = 0,
  href,
  onClick,
  BgIcon,
  bgImage,
  priority = false,
}: CardProps) => {
  const Component = href ? motion.a : motion.div;
  const isExternalLink = typeof href === 'string' && /^https?:\/\//.test(href);
  const [imageLoaded, setImageLoaded] = useState(false);
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 0.985,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <Component
      href={href}
      onClick={onClick}
      target={isExternalLink ? '_blank' : undefined}
      rel={isExternalLink ? 'noopener noreferrer' : undefined}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      whileHover={{
        y: -4,
        scale: 1.008,
        transition: {
          type: 'spring',
          stiffness: 350,
          damping: 22,
        },
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-[2.5rem] border border-gray-100/80 bg-white/80 p-4 text-left shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-[box-shadow,border-color] duration-500 hover:border-white/90 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-8',
        className
      )}
    >
      {/* Background Image with Reveal Effect */}
      {bgImage && (
        <>
          <div
            className={`absolute inset-0 z-0 transition-all duration-1000 ${imageLoaded ? 'scale-100 blur-0' : 'scale-110 blur-xl'}`}
          >
            <Image
              src={bgImage}
              alt="Background"
              fill
              onLoad={() => setImageLoaded(true)}
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100"></div>
        </>
      )}

      {BgIcon && !bgImage && (
        <div className="pointer-events-none absolute -bottom-10 -right-10 z-0 text-current opacity-[0.04] transition-all duration-700 group-hover:-rotate-12 group-hover:scale-110 group-hover:opacity-[0.08]">
          <BgIcon size={240} strokeWidth={1} />
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </Component>
  );
};
