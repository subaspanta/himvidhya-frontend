import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { getNavbarTheme } from "./navbar.theme";
import { cn } from "@/shared/utils";
import { NavbarLogo } from "./components/NavbarLogo";
import { NavbarLinks } from "./components/NavbarLinks";
import { NavbarActions } from "./components/NavbarAuthActions";
import { MobileToggle } from "./components/NavbarMobileToggle";
import { NavbarMobileMenu } from "./components/NavbarMobileMenu";
import { NavbarProps } from "./navbar.types";

export const Navbar: React.FC<NavbarProps> = ({
  variant = "dashboard",
  navLinks = [],
  className,
  ...props
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const theme = getNavbarTheme(variant);

  // Close mobile menu when pathname changes without using useEffect
  const mobileOpen = useMemo(() => {
    return isMenuOpen;
  }, [pathname]);

  return (
    <nav
      className={cn(
        "relative w-full px-6 py-4 flex justify-between items-center border-b",
        theme.nav,
        className,
      )}
    >
      <NavbarLogo isLoggedIn={props.isLoggedIn} variant={variant} />

      <NavbarLinks links={navLinks} theme={theme} />

      <NavbarActions {...props} theme={theme} />

      <MobileToggle
        open={isMenuOpen}
        setOpen={setIsMenuOpen}
        theme={theme.buttonGhost}
      />

      {/* {isMenuOpen && (
        <NavbarMobileMenu
          links={navLinks}
          setOpen={setIsMenuOpen}
          onLogoutClick={props.onLogoutClick}
          userName={props.userName || ""}
          {...props}
        />
      )} */}
    </nav>
  );
};
