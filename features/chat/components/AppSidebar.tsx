"use client";

import { useEffect, useMemo, useState } from "react";
import LogoutButton from "@/features/chat/components/LogoutButton";

export interface NavItem {
  id: string;
  icon: string;
  label: string;
  ariaLabel?: string;
}

export interface FooterItem {
  id: string;
  icon: string;
  label: string;
  ariaLabel?: string;
  onClick?: () => void;
}

type Props = {
  navItems: NavItem[];
  footerItems?: FooterItem[];
  initialActiveId?: string;
  onNavChange?: (id: string) => void;
};

export default function AppSidebar({
  navItems = [],
  footerItems = [],
  initialActiveId,
  onNavChange,
}: Props) {
  const defaultActive = useMemo(
    () => initialActiveId ?? navItems[0]?.id ?? "",
    [initialActiveId, navItems],
  );
  const [activeNav, setActiveNav] = useState(defaultActive);

  useEffect(() => {
    // If current active no longer exists, pick first or empty
    if (!navItems.find((n) => n.id === activeNav)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveNav(initialActiveId ?? navItems[0]?.id ?? "");
    }
  }, [navItems, activeNav, initialActiveId]);

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    onNavChange?.(id);
  };

  return (
    <div className="flex flex-col h-full py-4">
      <div className="flex flex-col items-center mb-6 px-2">
        <div className="text-xl font-bold text-alabaster_grey-900 tracking-tight">
          CH
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`relative flex flex-col items-center gap-1 py-2.5 transition-colors ${
              activeNav === item.id
                ? "text-alabaster_grey-900 bg-jet_black-400"
                : "text-jet_black-700 hover:text-alabaster_grey-800 hover:bg-jet_black-300"
            }`}
            aria-label={item.ariaLabel ?? item.label}
            aria-pressed={activeNav === item.id}
          >
            {activeNav === item.id && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-majorelle_blue-500 rounded-r-full" />
            )}
            <span className="text-lg">{item.icon}</span>
            <span className="text-[10px] font-medium leading-tight">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-2 pt-4 border-t border-jet_black-600 mx-2">
        {footerItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="flex flex-col items-center gap-1 py-2 text-jet_black-700 hover:text-alabaster_grey-800 transition-colors w-full"
            aria-label={item.ariaLabel ?? item.label}
            title={item.label}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}

        <LogoutButton showLabel variant="ghost" />
      </div>
    </div>
  );
}
