"use client";

import React, { useState } from "react";

interface NavItem {
  id: string;
  icon: string;
  label: string;
  ariaLabel: string;
}

const navItems: NavItem[] = [
  { id: "all-chats", icon: "💬", label: "All chats", ariaLabel: "All chats" },
  { id: "work", icon: "💼", label: "Work", ariaLabel: "Work" },
  { id: "meet", icon: "📋", label: "Meet", ariaLabel: "Meet" },
  { id: "calendar", icon: "📅", label: "Calendar", ariaLabel: "Calendar" },
  { id: "rating", icon: "⭐", label: "Rating", ariaLabel: "Rating" },
  { id: "saved", icon: "🔖", label: "Saved", ariaLabel: "Saved" },
];

export default function AppSidebar() {
  const [activeNav, setActiveNav] = useState("all-chats");

  return (
    <div className="flex flex-col h-full py-4">
      {/* Top Section: Logo */}
      <div className="flex flex-col items-center mb-6 px-2">
        <div className="text-xl font-bold text-alabaster_grey-900 tracking-tight">
          CH
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            className={`relative flex flex-col items-center gap-1 py-2.5 transition-colors ${
              activeNav === item.id
                ? "text-alabaster_grey-900 bg-jet_black-400"
                : "text-jet_black-700 hover:text-alabaster_grey-800 hover:bg-jet_black-300"
            }`}
            aria-label={item.ariaLabel}
            aria-pressed={activeNav === item.id}
          >
            {/* Active indicator bar */}
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

      {/* Bottom Section: Settings & All Chats */}
      <div className="flex flex-col items-center gap-2 pt-4 border-t border-jet_black-600 mx-2">
        {/* Settings */}
        <button
          className="flex flex-col items-center gap-1 py-2 text-jet_black-700 hover:text-alabaster_grey-800 transition-colors w-full"
          aria-label="Settings"
          title="Settings"
        >
          <span className="text-lg">⚙️</span>
          <span className="text-[10px] font-medium">Settings</span>
        </button>

        {/* All Chats indicator */}
        <button
          className="flex flex-col items-center gap-1 py-2 text-jet_black-700 hover:text-alabaster_grey-800 transition-colors w-full"
          aria-label="All chats"
          title="All chats"
        >
          <span className="text-lg">📂</span>
          <span className="text-[10px] font-medium">All chats</span>
        </button>
      </div>
    </div>
  );
}
