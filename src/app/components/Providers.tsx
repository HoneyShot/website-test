"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./AuthContext";
import { LanguageProvider } from "./LanguageContext";
import { PageProvider } from "./PageContext";
import { LegalModalProvider } from "./legal/LegalModalContext";
import dynamic from "next/dynamic";

// Import LegalModals with dynamic import to avoid SSR
const LegalModals = dynamic(() => import("./legal/LegalModals"), {
  ssr: false, // This ensures the component is only loaded on the client side
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <LanguageProvider>
          <PageProvider>
            <LegalModalProvider>
              {children}
              <LegalModals />
            </LegalModalProvider>
          </PageProvider>
        </LanguageProvider>
      </AuthProvider>
    </SessionProvider>
  );
} 