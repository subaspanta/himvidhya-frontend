export const getNavbarTheme = (variant: "landing" | "dashboard") => {
  const isLanding = variant === "landing";

  return {
    nav: isLanding
      ? "bg-[#0F172A] border-slate-800 text-white"
      : "bg-white border-slate-200 text-slate-900",

    text: isLanding
      ? "text-slate-300 hover:text-white"
      : "text-slate-600 hover:text-slate-900",

    // Link styles used by NavbarLinks component
    // For dashboard variant: default muted text, hover -> blue bg + blue text, active -> blue bg + blue text
    link: isLanding
      ? "text-slate-300 hover:text-white"
      : "text-slate-600 hover:text-blue-600 hover:bg-blue-100 transition-colors",

    linkActive: isLanding ? "text-white" : "text-blue-600 bg-blue-100",

    buttonGhost: isLanding
      ? "text-slate-300 hover:text-white hover:bg-white/10"
      : "text-slate-700 hover:text-slate-900",
  };
};
