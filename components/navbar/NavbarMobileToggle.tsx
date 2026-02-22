import { Menu, X } from "lucide-react";

export const MobileToggle = ({
  open,
  setOpen,
  theme,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
}) => (
  <button
    aria-label="Toggle menu"
    aria-expanded={open}
    onClick={() => setOpen((prev) => !prev)}
    className="md:hidden p-2"
  >
    {open ? <X /> : <Menu />}
  </button>
);
