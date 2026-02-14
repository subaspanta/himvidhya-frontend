"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AppLogo } from "@/features/landing/components/AppLogo";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppNavbarProps {
  isLoggedIn: boolean;
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
  onLogoutClick?: () => void;
  onSettingsClick?: () => void;
  onNotificationClick?: () => void;
  userEmail?: string;
  userName?: string;
  userRole?: "student" | "teacher";
  avatarUrl?: string;
  notificationCount?: number;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({
  isLoggedIn,
  onLoginClick,
  onSignUpClick,
  onLogoutClick,
  onSettingsClick,
  onNotificationClick,
  userEmail = "user@example.com",
  userName = "User",
  userRole = "student",
  avatarUrl,
  notificationCount = 0,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-surface border-b border-border">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <AppLogo size="sm" />
      </div>

      {/* Auth Section */}
      <div className="flex items-center gap-3">
        {!isLoggedIn ? (
          <>
            <Button
              variant="ghost"
              onClick={onLoginClick}
              className="font-medium"
            >
              Login
            </Button>
            <Button onClick={onSignUpClick} size="lg" className="shadow-lg">
              Sign Up
            </Button>
          </>
        ) : (
          <>
            {/* Notification Icon */}
            <button
              onClick={onNotificationClick}
              className="relative p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Bell className="w-5 h-5 text-foreground" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
              )}
            </button>

            {/* Account Dropdown */}
            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-muted transition-colors border border-border">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-foreground">
                        {userName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {userRole === "teacher"
                          ? "Teacher Account"
                          : "Student Account"}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt={userName}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-semibold text-primary-foreground">
                          {userName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem disabled>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{userName}</span>
                      <span className="text-xs text-muted-foreground">
                        {userEmail}
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onSettingsClick}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={onLogoutClick}
                    className="text-danger"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default AppNavbar;
