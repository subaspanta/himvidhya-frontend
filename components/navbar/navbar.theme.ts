export const getNavbarTheme = (variant: "landing" | "dashboard") => {
  const isLanding = variant === "landing";

  return {
    nav: isLanding
      ? "bg-[var(--surface-dark)] border-[var(--surface-dark-border)] text-[var(--surface-dark-foreground)]"
      : "bg-card border-border text-foreground",

    text: isLanding
      ? "text-[var(--surface-dark-muted)] hover:text-[var(--surface-dark-foreground)]"
      : "text-muted-foreground hover:text-foreground",

    link: isLanding
      ? "text-[var(--surface-dark-muted)] hover:text-white hover:bg-white/10"
      : "text-muted-foreground hover:text-primary hover:bg-accent transition-colors",

    linkActive: isLanding ? "text-white bg-white/10" : "text-primary bg-accent",

    buttonGhost: isLanding
      ? "text-[var(--surface-dark-muted)] hover:text-white hover:bg-white/10"
      : "text-muted-foreground hover:text-foreground hover:bg-muted",
  };
};
