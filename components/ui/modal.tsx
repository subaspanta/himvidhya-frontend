"use client";

import React, { useEffect, useState, memo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils";
import { FullScreenContainer } from "@/components/layout/FullScreenContainer";

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
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className={cn(
                  "relative w-full max-w-md bg-[#fdf6ee] border border-gray-200 rounded-2xl shadow-2xl pointer-events-auto flex flex-col max-h-[90vh] overflow-hidden ring-1 ring-gray-100/50",
                  className,
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
                      className="text-3xl font-extrabold text-black tracking-tight leading-tight"
                    >
                      {title}
                    </h2>
                  </div>
                )}

                <div
                  className={cn(
                    "px-10 pb-10 overflow-y-auto custom-scrollbar text-gray-700 text-base font-medium",
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
