"use client";
import { useEffect, useState } from "react";
import { useLanguage } from '../LanguageContext';
import { useLegalModal } from '../legal/LegalModalContext';

export default function Footer() {
    const [mounted, setMounted] = useState(false);
    const [year, setYear] = useState<number>(2023); // Use a static value for SSR
    const { t, lang } = useLanguage();
    const { openTermsModal, openPrivacyModal } = useLegalModal();

    useEffect(() => {
        setMounted(true);
        setYear(new Date().getFullYear());
    }, []);

    // Use a simplified version for SSR to avoid hydration mismatches
    if (!mounted) {
        return (
            <footer className="mt-12 border-t border-[var(--border-color)] py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div>
                            <p className="text-sm text-[var(--muted)]">
                                &copy; 2023 Shot Nest - {t.footer.copyright}
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="mt-12 border-t border-[var(--border-color)] py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div>
                        <p className="text-sm text-[var(--muted)]">
                            &copy; <span>{year}</span>{" "}
                            <a
                                id="custom-url-link"
                                href="https://shotnest.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-[var(--color-accent)] hover:underline"
                            >
                                Shot Nest
                            </a>{" "}
                            - {t.footer.copyright}
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <button
                            onClick={openTermsModal}
                            className="text-sm text-[var(--muted)] hover:text-[var(--text-primary)] hover:underline"
                        >
                            {t.auth.termsOfService}
                        </button>
                        <button
                            onClick={openPrivacyModal}
                            className="text-sm text-[var(--muted)] hover:text-[var(--text-primary)] hover:underline"
                        >
                            {t.auth.privacyPolicy}
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};