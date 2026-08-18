"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils";
import { FullScreenContainer } from "@/components/layout/FullScreenContainer";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeButtonClassName?: string;
}

export const Modal: React.FC<ModalProps> = memo(
  ({ isOpen, onClose, title, children, className, showCloseButton = true }) => {
    const [mounted, setMounted] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
    }, []);

    // Handle body scroll locking
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
      }
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Focus trap + restore: move focus into the dialog on open, cycle Tab
    // within it, and hand focus back to whatever triggered the modal on close.
    useEffect(() => {
      if (!isOpen) return;

      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

      const node = dialogRef.current;
      const focusables = node?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      (focusables?.[0] ?? node)?.focus();

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab" || !dialogRef.current) return;
        const items = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        );
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };

      document.addEventListener("keydown", handleTab);
      return () => {
        document.removeEventListener("keydown", handleTab);
        previouslyFocusedRef.current?.focus();
      };
    }, [isOpen]);

    if (!mounted) return null;

    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return null;

    return createPortal(
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100"
          >
            <FullScreenContainer>
              <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "modal-title" : undefined}
                tabIndex={-1}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className={cn(
                  "relative w-full max-w-md bg-card border border-border rounded-xl shadow-xl pointer-events-auto flex flex-col max-h-[90vh] overflow-hidden focus:outline-none",
                  className,
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Close modal"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}

                {title && (
                  <div className="px-10 pt-10 pb-4">
                    <h2
                      id="modal-title"
                      className="text-3xl font-extrabold text-foreground tracking-tight leading-tight"
                    >
                      {title}
                    </h2>
                  </div>
                )}

                <div
                  className={cn(
                    "px-10 pb-10 overflow-y-auto custom-scrollbar text-foreground text-base font-medium",
                    title ? "pt-2" : "pt-10",
                    !showCloseButton && !title && "pt-10",
                  )}
                >
                  {children}
                </div>
              </motion.div>
            </FullScreenContainer>
          </motion.div>
        )}
      </AnimatePresence>,
      modalRoot,
    );
  },
);

Modal.displayName = "Modal";
