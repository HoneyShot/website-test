"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type ModalType = "terms" | "privacy" | null;

interface LegalModalContextType {
  activeModal: ModalType;
  openTermsModal: () => void;
  openPrivacyModal: () => void;
  closeModal: () => void;
}

const defaultContextValue: LegalModalContextType = {
  activeModal: null,
  openTermsModal: () => {},
  openPrivacyModal: () => {},
  closeModal: () => {},
};

const LegalModalContext = createContext<LegalModalContextType>(defaultContextValue);

export function LegalModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openTermsModal = () => setActiveModal("terms");
  const openPrivacyModal = () => setActiveModal("privacy");
  const closeModal = () => setActiveModal(null);

  const contextValue = {
    activeModal: mounted ? activeModal : null, // Only use client-side state after hydration
    openTermsModal,
    openPrivacyModal,
    closeModal,
  };

  return (
    <LegalModalContext.Provider value={contextValue}>
      {children}
    </LegalModalContext.Provider>
  );
}

export function useLegalModal() {
  const context = useContext(LegalModalContext);
  return context;
} 