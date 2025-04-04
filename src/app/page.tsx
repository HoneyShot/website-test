'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from './components/LanguageContext';

export default function Home() {
  const { t, lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle client-side rendering for animations
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid rendering until client-side to prevent hydration issues
  }

  return (
    <main className="flex flex-col min-h-screen px-4 md:px-8 py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mb-16 mt-12 md:mt-24">
        <h1 
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-transparent bg-clip-text fluid-text"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          {t.landing.title}
        </h1>
        <p 
          className="text-xl md:text-2xl max-w-3xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--muted)] via-[var(--navy)] to-[var(--color-primary)] fluid-text"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.2s'
          }}
        >
          {t.landing.subtitle}
        </p>
        
        <div
  className="w-24 h-1 my-8 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] fluid-divider"
  style={{
    opacity: mounted ? 1 : 0,
    width: mounted ? '6rem' : '0',
    transition: 'all 0.8s ease-out 0.4s'
  }}
></div>
      </section>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Portfolio Card */}
        <Link href="/portfolio" passHref>
          <div 
            className="group relative overflow-hidden rounded-xl border border-[var(--border-color)] p-6 h-80 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all duration-300"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-out 0.5s'
            }}
            onMouseEnter={() => setIsAnimating(true)}
            onMouseLeave={() => setIsAnimating(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            
            <div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {t.landing.portfolioCard.title}
              </h2>
              <p className="text-[var(--muted)]">
                {t.landing.portfolioCard.description}
              </p>
            </div>
            
            <div className="flex items-center mt-4">
              <span className="text-[var(--color-primary)] font-medium group-hover:translate-x-1 transition-transform duration-300">
                {t.landing.portfolioCard.cta} →
              </span>
            </div>
          </div>
        </Link>

        {/* Blog Card */}
        <Link href="/blogs" passHref>
          <div 
            className="group relative overflow-hidden rounded-xl border border-[var(--border-color)] p-6 h-80 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all duration-300"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-out 0.6s'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy)] to-[var(--navy-hover)] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            
            <div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-[var(--navy)] transition-colors duration-300">
                {t.landing.blogCard.title}
              </h2>
              <p className="text-[var(--muted)]">
                {t.landing.blogCard.description}
              </p>
            </div>
            
            <div className="flex items-center mt-4">
              <span className="text-[var(--navy)] font-medium group-hover:translate-x-1 transition-transform duration-300">
                {t.landing.blogCard.cta} →
              </span>
            </div>
          </div>
        </Link>

        {/* Contact Card */}
        <Link href="/contact" passHref>
          <div 
            className="group relative overflow-hidden rounded-xl border border-[var(--border-color)] p-6 h-80 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all duration-300"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-out 0.7s'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            
            <div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                {t.landing.contactCard.title}
              </h2>
              <p className="text-[var(--muted)]">
                {t.landing.contactCard.description}
              </p>
            </div>
            
            <div className="flex items-center mt-4">
              <span className="text-[var(--color-accent)] font-medium group-hover:translate-x-1 transition-transform duration-300">
                {t.landing.contactCard.cta} →
              </span>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
