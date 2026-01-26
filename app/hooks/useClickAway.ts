import { useEffect, RefObject } from "react";

export const useClickAway = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click target is outside the ref
      // and also check if it's not part of a portal (like dropdown menus)
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // Additional check: make sure the target is still in the document
        // This prevents false positives when clicking on React portals
        if (document.contains(event.target as Node)) {
          callback();
        }
      }
    };

    // Use a small delay to ensure React has finished rendering
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
