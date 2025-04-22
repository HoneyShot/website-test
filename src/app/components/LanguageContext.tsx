"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "../locales/en.json";
import tr from "../locales/tr.json";

type Language = "en" | "tr";
type Translations = typeof en;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");

  const translations = lang === "en" ? en : tr;

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Language | null;
    if (storedLang) setLang(storedLang);
  }, []);

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t: translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};


export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

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
        {/* Dil: */}
        {t.language}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => setLang("en")}
          className={`
            px-2 py-1 text-sm rounded-md 
            transition-all duration-300
            ${lang === "en"
              ? "bg-[var(--navy)] text-white"
              : "bg-transparent text-[var(--muted)] border border-[var(--border-color)]"
            }
          `}
          style={{
            transform: isHovered && lang !== "en" ? "scale(1.1)" : "scale(1)"
          }}
        >
          EN
        </button>
        <button
          onClick={() => setLang("tr")}
          className={`
            px-2 py-1 text-sm rounded-md 
            transition-all duration-300
            ${lang === "tr"
              ? "bg-[var(--navy)] text-white"
              : "bg-transparent text-[var(--muted)] border border-[var(--border-color)]"
            }
          `}
          style={{
            transform: isHovered && lang !== "tr" ? "scale(1.1)" : "scale(1)"
          }}
        >
          TR
        </button>
      </div>
    </div>
  );
}