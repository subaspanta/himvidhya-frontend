import { NavbarUserMenu } from "./NavbarUserMenu";
import { GuestProps, AuthenticatedProps } from "../navbar.types";

type ThemeProps = { buttonGhost: string };

type NavbarActionsProps = (GuestProps | AuthenticatedProps) & {
  theme: ThemeProps;
};

export const NavbarActions = (props: NavbarActionsProps) => {
  if (!props.isLoggedIn) {
    return null; // Guest: Login/Register are shown as links in NavbarLinks
  }

  return <NavbarUserMenu {...props} />;
};
