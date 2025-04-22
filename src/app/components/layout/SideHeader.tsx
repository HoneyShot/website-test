// src/components/SideHeader.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DrawerFooter from "./DrawerFooter";
import ThemeToggle from "../ThemeToggle";
import { useLanguage, default as LanguageToggle } from "../LanguageContext";
import AuthNav from "./AuthNav";
import { usePageContext } from "../PageContext";

export default function SideHeader() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [drawerExpanded, setDrawerExpanded] = useState(false);
  const { t } = useLanguage();
  const { pageType } = usePageContext();

  // Only run client-side code after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleHover = (item: string) => {
    setHovered(item);
    setDrawerExpanded(true); // simulate container "blowing"
  };

  const resetHover = () => {
    setHovered(null);
    setDrawerExpanded(false);
  };

  // Navigation items with their corresponding paths
  const navItems = [
    { key: "Dashboard", path: "/" },
    { key: "Portfolio", path: "/portfolio" },
    { key: "Blog", path: "/blogs" },
    { key: "Contact", path: "/contact" }
  ];

  // Don't show the menu button on 404 pages
  const showMenuButton = pageType !== "notFound";

  // Render a minimal version during SSR to avoid hydration mismatches
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Toggle Button - Hidden on 404 pages */}
      {showMenuButton && (
        <button
          onClick={() => setOpen(true)}
          className={`
            fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg text-white
            transition-all duration-500 ease-in-out
            ${open ? "translate-x-[100vw] -translate-y-24 opacity-0 pointer-events-none" : "translate-x-0 translate-y-0 opacity-100"}
          `}
          style={{
            backgroundColor: "var(--color-primary)",
          }}
        >
          ☰ {t.menu}
        </button>
      )}

      {/* Off-canvas drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full shadow-xl z-40
          transition-all duration-500 ease-in-out
          transform
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
        style={{
          width: drawerExpanded ? "20rem" : "18rem", // controlled via state
          backgroundColor: "var(--background)",
          color: "var(--color-primary)",
        }}
      >
        <div
          className="flex justify-between items-center p-4 border-b"
          style={{ borderColor: "var(--border-color)" }}
        >
          <h2 className="text-lg font-semibold">Quick Panel</h2>
          <button
            onClick={() => setOpen(false)}
            className={`
              text-3xl 
              p-2 
              rounded-full 
              transition-all 
              text-[var(--navy)]
              duration-500 
              hover:scale-175 
              hover:rotate-90 
              hover:text-[var(--navy-hover)]
              focus:outline-none
            `}
            aria-label="Close Drawer"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col items-center relative mt-8">
          <nav>
            <ul className="space-y-6 text-center">
              {navItems.map((item) => (
                <li
                  key={item.key}
                  onMouseEnter={() => handleHover(item.key)}
                  onMouseLeave={resetHover}
                  className="text-lg font-medium cursor-pointer transition-transform duration-300 hover:scale-200 hover:z-50"
                >
                  <Link href={item.path} onClick={() => setOpen(false)}>
                    {t.SideHeader[item.key as keyof typeof t.SideHeader]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Auth Navigation */}
        <div className="mt-8 px-4 py-2 border-t" style={{ borderColor: "var(--border-color)" }}>
          <AuthNav />
        </div>

        {/* Footer section with toggles and social icons */}
        <div className="absolute bottom-0 w-full">
          {/* Toggles Container */}
          <div className="flex flex-col w-full">
            {/* Theme and Language toggles - moved here from middle of component */}
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Social Icons */}
          <DrawerFooter />
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 backdrop-blur-sm bg-black/10 z-30"
        />
      )}
    </>
  );
}


