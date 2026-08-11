import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isValidElement, type ReactNode } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts text or React elements to a URL-friendly slug.
 * Supports Thai characters and remains stable across renders.
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u0E00-\u0E7F\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Recursively extracts text content from React children.
 */
export function extractText(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (isValidElement<{ children?: ReactNode }>(children)) {
    return extractText(children.props.children);
  }
  return '';
}
