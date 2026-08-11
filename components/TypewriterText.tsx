'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  className?: string;
}

export const TypewriterText = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 2000,
  className = '',
}: TypewriterTextProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState(texts[0] || '');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (texts.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const text = texts[currentTextIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < text.length) {
            setCurrentText(text.slice(0, currentText.length + 1));
          } else {
            // Finished typing completely, wait then start deleting
            return; // Don't set timeout, wait for delayBetween
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(text.slice(0, currentText.length - 1));
          } else {
            // Finished deleting, move to next text
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    // When finished typing, wait delayBetween before deleting
    if (!isDeleting && currentText.length === text.length) {
      const delayTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetween);
      return () => clearTimeout(delayTimeout);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className={`inline-grid ${className}`}>
      <span className="sr-only">{texts[0] || ''}</span>
      {texts.map((text) => (
        <span
          key={text}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 whitespace-nowrap"
        >
          {text}
          <span className="ml-1 inline-block h-[1em] w-0.5 align-middle" />
        </span>
      ))}
      <span aria-hidden="true" className="col-start-1 row-start-1 whitespace-nowrap">
        {currentText}
        <span className="ml-1 inline-block h-[1em] w-0.5 animate-pulse bg-current align-middle motion-reduce:hidden" />
      </span>
    </span>
  );
};
