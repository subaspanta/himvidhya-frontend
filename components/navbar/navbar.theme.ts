export const getNavbarTheme = (
  variant: "landing" | "dashboard", // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  return {
    nav: "bg-card border-border text-foreground",

    text: "text-muted-foreground hover:text-foreground",

    link: "text-muted-foreground hover:text-accent-subtle-foreground hover:bg-accent-subtle transition-colors",

    // Full-strength sage clears AA text contrast (white on --accent is
    // ~5:1), so the active state fills solid rather than using the tint.
    linkActive: "text-accent-foreground bg-accent",

    buttonGhost: "text-muted-foreground hover:text-foreground hover:bg-muted",
  };
};
