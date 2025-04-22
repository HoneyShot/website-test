"use client";
import { useState, useEffect } from "react";
import { FiFacebook, FiGithub, FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { useLanguage } from "../LanguageContext";
import { useLegalModal } from "../legal/LegalModalContext";

export default function DrawerFooter() {
    const [mounted, setMounted] = useState(false);
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
    const { t } = useLanguage();
    const { openTermsModal, openPrivacyModal } = useLegalModal();

    useEffect(() => {
        setMounted(true);
    }, []);

    const socialLinks = [
        { name: "twitter", icon: FaXTwitter, color: "var(--x-twitter)", url: "https://twitter.com/" },
        { name: "facebook", icon: FiFacebook, color: "var(--facebook)", url: "https://facebook.com/" },
        { name: "instagram", icon: FiInstagram, color: "var(--instagram)", url: "https://instagram.com/" },
        { name: "github", icon: FiGithub, color: "var(--foreground)", url: "https://github.com/HoneyShot" }
    ];

    // Don't render during SSR to avoid hydration mismatches
    if (!mounted) {
        return null;
    }

    return (
        <>
            {/* Legal Links */}
            <div className="w-full border-t px-4 py-3 flex justify-center gap-4" style={{ borderColor: "var(--border-color)" }}>
                <button
                    onClick={openTermsModal}
                    className="text-xs text-[var(--muted)] hover:text-[var(--text-primary)]"
                >
                    {t.auth.termsOfService}
                </button>
                <span className="text-xs text-[var(--muted)]">•</span>
                <button
                    onClick={openPrivacyModal}
                    className="text-xs text-[var(--muted)] hover:text-[var(--text-primary)]"
                >
                    {t.auth.privacyPolicy}
                </button>
            </div>
            
            {/* Social Links */}
            <div
                className="w-full border-t px-4 py-3 flex justify-center gap-4"
                style={{ borderColor: "var(--border-color)" }}
            >
                {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-transform duration-300"
                            style={{ 
                                color: social.color,
                                transform: hoveredIcon === social.name ? "scale(1.3) translateY(-2px)" : "scale(1)",
                            }}
                            aria-label={social.name}
                            onMouseEnter={() => setHoveredIcon(social.name)}
                            onMouseLeave={() => setHoveredIcon(null)}
                        >
                            <Icon size={20} className="transition-all duration-300" />
                        </a>
                    );
                })}
            </div>
        </>
    );
}