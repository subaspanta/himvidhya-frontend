import { SetStateAction, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FullScreenContainer } from "../FullScreenContainer";

export const rand = () => Math.floor(Math.random() * 20) - 10;

export function NewModal({
  showModal,
  onClickAway,
  children,
  btnTop = "2%",
  btnRight = "1%",
  btnLeft,
  disableCrossBtn = false,
  width = "w-96",
  height,
  theme = "dark",
  ...rest
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsBrowser(true);

    function escapeAction(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClickAway();
      }
    }

    if (showModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", escapeAction);

      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", escapeAction);
      };
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [onClickAway, showModal]);

  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-transparent";
  const heightClass = height || "auto";

  const modal = (
    <AnimatePresence>
      {showModal && (
        <FullScreenContainer>
          <motion.div
            ref={ref}
            initial={{ y: 1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 1000, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative ${width} ${bgClass} rounded-lg p-6 bg-white shadow-lg`}
            style={{ height: heightClass }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
            }}
            {...rest}
          >
            {!disableCrossBtn && (
              <ModalCross
                onClick={onClickAway}
                btnTop={btnTop}
                btnRight={btnRight}
                btnLeft={btnLeft}
              />
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
}

function ModalCross({
  btnTop,
  btnRight,
  btnLeft,
  onClick,
}: {
  btnTop?: string;
  btnLeft?: string;
  btnRight?: string;
  onClick: () => void;
}) {
  return (
    <button
      className="absolute outline-none bg-none cursor-pointer border-none z-10 text-2xl text-gray-600 hover:text-gray-900"
      style={{
        top: btnTop,
        right: btnRight,
        left: btnLeft,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* <Icon type="cross" /> */}×
    </button>
  );
}

type ModalProps = {
  showModal: boolean;
  children: React.ReactNode;
  onClickAway: () => void;
  disableCrossBtn?: boolean;
  width?: string;
  btnTop?: string;
  btnRight?: string;
  btnLeft?: string;
  theme?: "transparent" | "dark";
  height?: string;
  [x: string]: unknown;
};
