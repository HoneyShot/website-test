"use client";

import { createContext, useContext, ReactNode, useState } from "react";

type PageType = "normal" | "notFound";

interface PageContextType {
  pageType: PageType;
  setPageType: (type: PageType) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
  const [pageType, setPageType] = useState<PageType>("normal");

  return (
    <PageContext.Provider value={{ pageType, setPageType }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
} 