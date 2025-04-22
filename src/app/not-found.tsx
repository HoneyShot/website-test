"use client";

import Link from "next/link";
import { useLanguage } from "./components/LanguageContext";
import { usePageContext } from "./components/PageContext";
import { FaHome, FaSearch, FaEnvelope, FaExclamationTriangle } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function NotFound() {
  const { t } = useLanguage();
  const { setPageType } = usePageContext();
  const [randomNum, setRandomNum] = useState(404);

  // Set page type to notFound when this component mounts
  useEffect(() => {
    setPageType("notFound");

    // Reset to normal when unmounting
    return () => {
      setPageType("normal");
    };
  }, [setPageType]);

  // Generate animated random numbers for visual effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let counter = 0;
    
    interval = setInterval(() => {
      setRandomNum(Math.floor(Math.random() * 900) + 100);
      counter++;
      
      if (counter > 20) {
        clearInterval(interval);
        setRandomNum(404);
      }
    }, 80);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-4 py-16 text-[var(--text-primary)]">
      <div className="max-w-2xl text-center">
        {/* Animated 404 Number */}
        <div className="mb-6 flex items-center justify-center">
          <h1 className="font-mono text-8xl font-bold text-emerald-600 sm:text-9xl">
            {randomNum}
          </h1>
          <FaExclamationTriangle className="ml-4 h-12 w-12 animate-pulse text-amber-500 sm:h-16 sm:w-16" />
        </div>
        
        {/* Main content */}
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          {t.notFound.title}
        </h2>
        <h3 className="mb-6 text-lg font-semibold text-[var(--text-secondary)] sm:text-xl">
          {t.notFound.subtitle}
        </h3>
        <p className="mb-8 text-[var(--text-secondary)]">
          {t.notFound.description}
        </p>
        
        {/* Back to home button */}
        <Link 
          href="/"
          className="mb-10 inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <FaHome className="mr-2" />
          {t.notFound.backToHome}
        </Link>
        
        {/* Helpful suggestions */}
        <div className="mx-auto mt-8 max-w-md rounded-lg border border-gray-200 bg-[var(--background-secondary)] p-6 dark:border-gray-700">
          <h4 className="mb-4 font-semibold">{t.notFound.suggestions}</h4>
          <ul className="space-y-2 text-left text-[var(--text-secondary)]">
            <li className="flex items-center">
              <span className="mr-2 text-emerald-600">→</span>
              {t.notFound.checkUrl}
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-emerald-600">→</span>
              <Link href="/" className="text-emerald-600 underline hover:text-emerald-500">
                {t.notFound.visitHomepage}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-emerald-600">→</span>
              <span className="flex items-center">
                <FaSearch className="mr-1" />
                {t.notFound.searchSite}
              </span>
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-emerald-600">→</span>
              <Link href="/contact" className="flex items-center text-emerald-600 underline hover:text-emerald-500">
                <FaEnvelope className="mr-1" />
                {t.notFound.contactSupport}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 