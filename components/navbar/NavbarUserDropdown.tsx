import { Bell, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthenticatedProps } from "./navbar.types";

export const NavbarUserDropdown = ({
  userName = "User",
  userEmail,
  avatarUrl,
  notificationCount = 0,
  onLogoutClick,
  onSettingsClick,
  onNotificationClick,
}: AuthenticatedProps) => {
  const initial = userName?.trim()?.[0]?.toUpperCase() || "?";

  return (
    <div className="hidden md:flex items-center gap-4">
      {/* Notifications */}
      <button
        type="button"
        aria-label="Notifications"
        onClick={onNotificationClick}
        className="relative p-2 rounded-full text-muted-foreground hover:bg-accent"
      >
        <Bell className="w-5 h-5" />
        {notificationCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full ring-2 ring-background" />
        )}
      </button>
      <div className="h-8 w-px bg-border" />
      <div className="flex flex-col">
        <span className="font-semibold text-sm text-foreground">
          {userName}
        </span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {userEmail?.split("@")[0] || "user"}
        </span>
      </div>
      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-9 w-9 rounded-full p-0 overflow-hidden"
          >
            <Avatar>
              <AvatarImage src={avatarUrl} alt={userName} />
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{userName}</span>
              <span className="text-xs truncate">{userEmail}</span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={onSettingsClick}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onLogoutClick}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
