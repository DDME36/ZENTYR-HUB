'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  Variants,
} from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PointerEvent, useRef, useState } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  href?: string;
  onClick?: () => void;
  BgIcon?: LucideIcon;
  bgImage?: string;
  priority?: boolean;
  glowColor?: string;
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
  glowColor = 'rgba(255, 255, 255, 0.15)',
}: CardProps) => {
  const Component = href ? motion.a : motion.div;
  const isExternalLink = typeof href === 'string' && /^https?:\/\//.test(href);
  const [imageLoaded, setImageLoaded] = useState(false);
  const bounds = useRef<DOMRect | null>(null);
  const pointerEnabled = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  // Track mouse position with spring physics for smoother movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 500 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  function handlePointerEnter(event: PointerEvent<HTMLElement>) {
    pointerEnabled.current =
      !shouldReduceMotion &&
      event.pointerType === 'mouse' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    bounds.current = pointerEnabled.current ? event.currentTarget.getBoundingClientRect() : null;
  }

  function handlePointerMove({ clientX, clientY }: PointerEvent<HTMLElement>) {
    if (!pointerEnabled.current || !bounds.current) return;

    const { left, top } = bounds.current;
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handlePointerLeave() {
    pointerEnabled.current = false;
    bounds.current = null;
  }

  const cursorGlow = useMotionTemplate`
    radial-gradient(
      400px circle at ${springX}px ${springY}px,
      ${glowColor},
      transparent 80%
    )
  `;

  const variants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
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
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
      whileHover={{
        y: -10,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 25,
        },
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white/70 p-4 text-left shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] sm:p-8',
        className
      )}
    >
      {/* Interactive Cursor Glow Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-30 rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: cursorGlow }}
      />

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
        <div className="pointer-events-none absolute -bottom-10 -right-10 z-0 text-current opacity-[0.04] transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110">
          <BgIcon size={240} strokeWidth={1} />
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </Component>
  );
};
