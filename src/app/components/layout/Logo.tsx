'use client';

import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="var(--color-primary)" />
        <path
          d="M16 8L23 19H9L16 8Z"
          fill="white"
        />
        <path
          d="M16 24L9 14H23L16 24Z"
          fill="rgba(255, 255, 255, 0.7)"
        />
      </svg>
      <span className="hidden md:block bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-transparent bg-clip-text fluid-text">
        DevPortfolio
      </span>
    </Link>
  );
} 