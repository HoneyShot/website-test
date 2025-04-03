"use client";
import { useState } from "react";
import { FiFacebook, FiGithub, FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6"

export default function DrawerFooter() {
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

    const socialLinks = [
        { name: "twitter", icon: FaXTwitter, color: "#000000", url: "https://twitter.com/" },
        { name: "facebook", icon: FiFacebook, color: "#1877F2", url: "https://facebook.com/yourpage" },
        { name: "instagram", icon: FiInstagram, color: "#E4405F", url: "https://instagram.com/yourprofile" },
        { name: "github", icon: FiGithub, color: "#333333", url: "https://github.com/HoneyShot" }
    ];

    return (
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
    );
}