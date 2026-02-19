"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AppLogo } from "@/features/landing/components/AppLogo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Settings, Menu, X } from "lucide-react";
import { cn } from "@/shared/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface AppNavbarProps {
  variant?: "landing" | "dashboard";
  navLinks?: NavLink[];
  isLoggedIn: boolean;
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
  onLogoutClick?: () => void;
  onSettingsClick?: () => void;
  onNotificationClick?: () => void;
  userEmail?: string;
  userName?: string;
  userRole?: "student" | "teacher";
  avatarUrl?: string; // Expecting a full URL or path
  notificationCount?: number;
  className?: string;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({
  variant = "dashboard",
  navLinks = [],
  isLoggedIn,
  onLoginClick,
  onSignUpClick,
  onLogoutClick,
  onSettingsClick,
  onNotificationClick,
  userEmail,
  userName = "User",
  userRole,
  avatarUrl,
  notificationCount = 0,
  className,
}) => {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLanding = variant === "landing";

  // Base styles
  const navClasses = cn(
    "w-full px-6 py-4 flex justify-between items-center transition-colors duration-300",
    isLanding
      ? "bg-[#0F172A] border-b border-slate-800 text-white"
      : "bg-white border-b border-slate-200 text-slate-900",
    className,
  );

  const textClasses = isLanding
    ? "text-slate-300 hover:text-white"
    : "text-slate-600 hover:text-slate-900";

  return (
    <nav className={navClasses}>
      {/* 1. Logo Section */}
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="flex items-center gap-0 transition-opacity hover:opacity-90"
        >
          <div>
            <AppLogo
              size="lg"
              className="flex"
              variant={isLanding ? "landing" : "dashboard"}
            />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                textClasses,
                link.active && (isLanding ? "text-white" : "text-blue-600"),
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* 2. Actions / Auth Section */}
      <div className="hidden md:flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <Button
              variant="ghost"
              onClick={onLoginClick}
              className={cn(
                "font-medium",
                isLanding
                  ? "text-slate-300 hover:text-white hover:bg-white/10"
                  : "text-slate-700 hover:text-slate-900",
              )}
            >
              Login
            </Button>
            <Button
              onClick={onSignUpClick}
              className={cn(
                "font-semibold shadow-sm transition-all hover:shadow-md",
                isLanding
                  ? "bg-blue-600 hover:bg-blue-700 text-white border-none"
                  : "bg-blue-600 hover:bg-blue-700 text-white",
              )}
            >
              Get Started Free
            </Button>
          </>
        ) : (
          <>
            {/* Authenticated State Actions */}

            {/* Notification Icon */}
            <button
              onClick={onNotificationClick}
              className={cn(
                "relative p-2 rounded-full transition-colors",
                isLanding
                  ? "hover:bg-white/10 text-slate-300"
                  : "hover:bg-slate-100 text-slate-600",
              )}
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Profile Dropdown */}
            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full ml-2 p-0 overflow-hidden border border-slate-200 hover:bg-slate-100"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={avatarUrl} alt={userName} />
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                        {userName?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground w-full truncate">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={onSettingsClick}
                    className="cursor-pointer"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={onLogoutClick}
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "p-2 rounded-md transition-colors",
            isLanding
              ? "text-slate-300 hover:text-white"
              : "text-slate-700 hover:text-slate-900",
          )}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Content (Basic implementation) */}
      {mobileMenuOpen && (
        <div
          className={cn(
            "absolute top-full left-0 w-full p-4 flex flex-col gap-4 border-b shadow-xl md:hidden z-50",
            isLanding
              ? "bg-[#0F172A] border-slate-800 text-white"
              : "bg-white border-slate-200 text-slate-900",
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="py-2 text-sm font-medium hover:opacity-80"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-slate-200/20 my-2"></div>
          {!isLoggedIn ? (
            <div className="flex flex-col gap-3">
              <Button
                variant="ghost"
                onClick={onLoginClick}
                className="justify-start"
              >
                Login
              </Button>
              <Button onClick={onSignUpClick}>Get Started Free</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <span className="text-xs text-muted-foreground px-2">
                Signed in as {userName}
              </span>
              <Button
                variant="ghost"
                onClick={onLogoutClick}
                className="justify-start text-red-500"
              >
                Log out
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
