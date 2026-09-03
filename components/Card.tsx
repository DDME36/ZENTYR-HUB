'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
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
  const bounds = useRef<DOMRect | null>(null);
  const pointerEnabled = useRef(false);

  // Track mouse position with smooth spring physics for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 280, mass: 0.6 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, (val) => {
    if (!bounds.current) return 0;
    const height = bounds.current.height || 200;
    const normalizedY = (val - height / 2) / (height / 2);
    return Math.max(-6, Math.min(6, -normalizedY * 5));
  });

  const rotateY = useTransform(springX, (val) => {
    if (!bounds.current) return 0;
    const width = bounds.current.width || 300;
    const normalizedX = (val - width / 2) / (width / 2);
    return Math.max(-6, Math.min(6, normalizedX * 5));
  });

  function handlePointerEnter(event: PointerEvent<HTMLElement>) {
    pointerEnabled.current =
      event.pointerType === 'mouse' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (pointerEnabled.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      bounds.current = rect;
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    }
  }

  function handlePointerMove({ clientX, clientY }: PointerEvent<HTMLElement>) {
    if (!pointerEnabled.current || !bounds.current) return;

    const { left, top } = bounds.current;
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handlePointerLeave() {
    if (bounds.current) {
      mouseX.set(bounds.current.width / 2);
      mouseY.set(bounds.current.height / 2);
    }
    pointerEnabled.current = false;
    bounds.current = null;
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 32,
      scale: 0.96,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.75,
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
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        y: -6,
        scale: 1.012,
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
