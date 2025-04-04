"use client";
import { useEffect, useState } from "react";
import { useLanguage } from '../LanguageContext';

export default function Footer() {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const { t, lang } = useLanguage();

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <>
            <div
                style={{
                    marginTop: "20px",
                    textAlign: "center",
                    color: "var(--muted)",
                    paddingTop: "15px",
                    borderTop: "1px solid var(--border-color)",
                    fontSize: "0.9rem",
                }}
            >
                <p>
                    &copy; <span>{year}</span>{" "}
                    <a
                        id="custom-url-link"
                        href="https://shotnest.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        <strong style={{ color: "var(--color-accent)" }}>Shot Nest</strong>
                    </a>{" "}
                    - {t.footer.copyright}
                </p>
            </div>
        </>
    );

};