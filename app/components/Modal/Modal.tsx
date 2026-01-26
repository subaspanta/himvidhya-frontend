import { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import usePreventBodyScroll from "@/app/hooks/usePreventBodyScroll";
import { AnimatePresence, motion } from "framer-motion";
import { FullScreenContainer } from "../FullScreenContainer";
import { useClickAway } from "@/app/hooks/useClickAway";

interface ModalProps {
  isModal: boolean;
  onModalCross: () => void;
  children: React.ReactNode;
  dismissOnOutsideClick?: boolean;
  buttonStyle?: React.CSSProperties;
  className?: string;
  showCross?: boolean;
  style?: React.CSSProperties;
}

const Modal = memo(function Modal({
  isModal,
  onModalCross,
  children,
  dismissOnOutsideClick = true,
  buttonStyle,
  className,
  showCross = true,
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useClickAway(ref, () => {
    if (dismissOnOutsideClick) onModalCross();
  });
  const [isBrowser, setIsBrowser] = useState(false);
  usePreventBodyScroll({ prevent: isModal });
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsBrowser(true);
    return () => {
      setIsBrowser(false);
    };
  }, []);

  const modal = (
    <AnimatePresence>
      {isModal && (
        <FullScreenContainer>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            ref={ref}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className={`fixed bg-white flex justify-center items-center m-auto rounded ${className}`}
          >
            {showCross && (
              <button
                className="absolute outline-none bg-none cursor-pointer border-none z-10"
                style={{
                  top: buttonStyle?.top || "2%",
                  right: buttonStyle?.right || "1%",
                }}
                onClick={onModalCross}
              >
                {/* <Icon
                  type="cross"
                  style={{
                    height: "20px",
                    width: "20px",
                    cursor: "pointer",
                  }}
                /> */}
                <span className="text-2xl cursor-pointer">×</span>
              </button>
            )}
            {children}
          </motion.div>
        </FullScreenContainer>
      )}
    </AnimatePresence>
  );

  if (isBrowser) {
    const modalRoot = document.querySelector("#modal-root");
    if (!modalRoot) return null;
    return createPortal(modal, modalRoot);
  } else {
    return null;
  }
});

export { Modal };
