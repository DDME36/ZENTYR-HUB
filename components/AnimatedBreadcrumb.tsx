'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface AnimatedBreadcrumbProps {
  items: BreadcrumbItem[];
}

export const AnimatedBreadcrumb = ({ items }: AnimatedBreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href="/"
          className="group flex items-center gap-1 text-gray-500 transition-colors hover:text-purple-600 dark:text-zinc-400 dark:hover:text-white"
        >
          <Home
            size={14}
            className="transition-transform group-hover:scale-110"
            aria-hidden="true"
          />
          <span className="font-medium">หน้าแรก</span>
        </Link>
      </motion.div>

      {items.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: (index + 1) * 0.05 }}
          className="flex items-center gap-2"
        >
          <ChevronRight size={14} className="text-gray-300 dark:text-zinc-700" aria-hidden="true" />

          {index === items.length - 1 ? (
            <span
              className="max-w-[200px] truncate font-semibold text-gray-900 dark:text-white sm:max-w-none"
              aria-current="page"
            >
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="max-w-[150px] truncate font-medium text-gray-500 transition-colors hover:text-purple-600 hover:underline dark:text-zinc-400 dark:hover:text-white sm:max-w-none"
            >
              {item.label}
            </Link>
          )}
        </motion.div>
      ))}
    </nav>
  );
};
