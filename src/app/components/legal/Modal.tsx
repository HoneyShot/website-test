"use client";

import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import ClientPortalWrapper from "./ClientPortalWrapper";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Only run effects after component is mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close modal when Escape key is pressed
  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, mounted]);

  // Prevent scrolling of the body when modal is open
  useEffect(() => {
    if (!mounted) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, mounted]);

  // Don't render anything during SSR to avoid hydration issues
  if (!mounted) {
    return null;
  }
  
  // Don't render when modal is closed
  if (!isOpen) {
    return null;
  }

  // Close when clicking outside the modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Map size to class names
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  // Use ClientPortalWrapper to handle client-side portal rendering
  return (
    <ClientPortalWrapper>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div 
          ref={modalRef}
          className={`${sizeClasses[size]} w-full max-h-[90vh] bg-[var(--background)] text-[var(--text-primary)] rounded-lg shadow-xl overflow-hidden transition-all`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--code-bg)] transition-colors"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>
          </div>
          
          {/* Content */}
          <div className="overflow-y-auto px-6 py-4" style={{ maxHeight: "calc(90vh - 8rem)" }}>
            {children}
          </div>
        </div>
      </div>
    </ClientPortalWrapper>
  );
} 