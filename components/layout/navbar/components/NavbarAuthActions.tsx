import { Button } from "@/components/ui/button";
import { AppNavbarProps } from "@/features/landing/types";
import { NavbarUserMenu } from "./NavbarUserMenu";

type ThemeProps = {
  buttonGhost: string;
};

export const NavbarActions = (
  props: AppNavbarProps & { theme: ThemeProps },
) => {
  if (!props.isLoggedIn) {
    return (
      <div className="hidden md:flex gap-4">
        <Button
          variant="ghost"
          onClick={props.onLoginClick}
          className={props.theme.buttonGhost}
        >
          Login
        </Button>

        <Button onClick={props.onSignUpClick}>Get Started Free</Button>
      </div>
    );
  }

  return <NavbarUserMenu {...props} />;
};
