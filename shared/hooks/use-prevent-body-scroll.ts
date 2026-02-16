import { useEffect } from "react";

interface UsePreventBodyScrollProps {
  prevent: boolean;
}

const usePreventBodyScroll = ({ prevent }: UsePreventBodyScrollProps) => {
  useEffect(() => {
    if (prevent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [prevent]);
};

export default usePreventBodyScroll;
