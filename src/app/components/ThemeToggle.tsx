// src/components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useLanguage } from "./LanguageContext";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isHovered, setIsHovered] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        // Load initial theme
        const stored = localStorage.getItem("theme") as "light" | "dark" | null;
        if (stored) {
            setTheme(stored);
            document.documentElement.classList.toggle("dark", stored === "dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
    };

    return (
        <div
            className="flex items-center justify-between w-full px-4 py-3 border-t"
            style={{ borderColor: "var(--border-color)" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span 
                className="text-sm transition-all duration-300"
                style={{ 
                    color: "var(--muted)",
                    transform: isHovered ? "scale(1.05)" : "scale(1)"
                }}
            >
                {t.theme}:
            </span>
            <button
                onClick={toggleTheme}
                className={`
                    text-white p-2 rounded-md 
                    transition-all duration-300
                    flex items-center justify-center
                `}
                style={{
                    backgroundColor: "var(--navy)",
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
                aria-label="Toggle Theme"
            >
                {theme === "light" ? (
                    <FiMoon size={18} style={{ transform: "rotate(270deg)" }} className={`transition-transform duration-450 ${isHovered ? "rotate-360" : ""}`} />
                ) : (
                    <FiSun size={18} className={`transition-transform duration-750 ${isHovered ? "rotate-180" : ""}`} />
                )}
            </button>
        </div>
    );
}
