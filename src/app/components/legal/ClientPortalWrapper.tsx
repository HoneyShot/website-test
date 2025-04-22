"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ClientPortalWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR or before hydration is complete
  if (!mounted) {
    return null;
  }

  // Only create a portal once we're running in the browser
  return createPortal(children, document.body);
} 