'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ZentyrLogoProps {
  className?: string;
  isDark?: boolean;
}

export const ZentyrLogo = ({ className = 'w-9 h-9' }: ZentyrLogoProps) => {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative block shrink-0 select-none transition-transform duration-300 group-hover:scale-105',
        className
      )}
    >
      <Image
        src="/zentyr-logo-light.png"
        alt=""
        width={256}
        height={256}
        unoptimized
        className="absolute inset-0 h-full w-full object-contain dark:hidden"
        priority
      />
      <Image
        src="/zentyr-logo-dark.png"
        alt=""
        width={256}
        height={256}
        unoptimized
        className="absolute inset-0 hidden h-full w-full object-contain dark:block"
        priority
      />
    </span>
  );
};
