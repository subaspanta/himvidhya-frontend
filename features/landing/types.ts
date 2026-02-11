export interface AppLogoProps {
  size?: "sm" | "lg";
  className?: string;
}

export interface LandingNavProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}
