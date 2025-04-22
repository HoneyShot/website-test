"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import { useLegalModal } from "./LegalModalContext";
import Modal from "./Modal";

export default function LegalModals() {
  // Use this to ensure we only render these modals on the client side
  const [isMounted, setIsMounted] = useState(false);
  const { activeModal, closeModal } = useLegalModal();
  const { t } = useLanguage();
  const terms = t.legal.termsOfService;
  const privacy = t.legal.privacyPolicy;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Terms of Service Modal */}
      <Modal 
        isOpen={activeModal === "terms"} 
        onClose={closeModal}
        title={terms.title}
        size="lg"
      >
        <div className="space-y-6">
          <p className="text-sm italic text-[var(--text-secondary)]">
            {terms.lastUpdated}
          </p>
          
          <div className="mb-6">
            <p className="text-lg text-[var(--text-primary)]">{terms.introduction}</p>
          </div>

          <div className="space-y-6">
            {terms.sections.map((section, index) => (
              <div key={index} className="rounded-lg bg-[var(--card-bg)] p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-[var(--text-primary)]">
                  {section.title}
                </h2>
                <p className="text-[var(--text-secondary)]">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal 
        isOpen={activeModal === "privacy"} 
        onClose={closeModal}
        title={privacy.title}
        size="lg"
      >
        <div className="space-y-6">
          <p className="text-sm italic text-[var(--text-secondary)]">
            {privacy.lastUpdated}
          </p>
          
          <div className="mb-6">
            <p className="text-lg text-[var(--text-primary)]">{privacy.introduction}</p>
          </div>

          <div className="space-y-6">
            {privacy.sections.map((section, index) => (
              <div key={index} className="rounded-lg bg-[var(--card-bg)] p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-[var(--text-primary)]">
                  {section.title}
                </h2>
                <p className="text-[var(--text-secondary)]">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
} 