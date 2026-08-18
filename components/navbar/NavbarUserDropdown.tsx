import { LogOut } from "lucide-react";
import { cn } from "@/shared/utils";
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
  onLogoutClick,
  tone = "light",
}: AuthenticatedProps & { tone?: "light" | "dark" }) => {
  const initial = userName?.trim()?.[0]?.toUpperCase() || "?";

  return (
    <div className="hidden md:flex items-center gap-4">
      <div className="flex flex-col">
        <span
          className={cn(
            "font-semibold text-sm",
            tone === "dark" ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {userName}
        </span>
        <span
          className={cn(
            "text-xs uppercase tracking-wider",
            tone === "dark"
              ? "text-primary-foreground/70"
              : "text-muted-foreground",
          )}
        >
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

          {onLogoutClick && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogoutClick}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
