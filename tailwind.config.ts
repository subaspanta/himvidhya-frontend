import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class" as const,
  theme: {
    extend: {
      colors: {
        // Semantic design tokens
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-foreground": "rgb(var(--primary-foreground) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-foreground": "rgb(var(--accent-foreground) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        "background-dark": "rgb(var(--background-dark) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        destructive: "rgb(var(--danger) / <alpha-value>)",
        "destructive-foreground":
          "rgb(var(--primary-foreground) / <alpha-value>)",
        input: "rgb(var(--border) / <alpha-value>)",
        ring: "rgb(var(--accent) / <alpha-value>)",
        card: "rgb(var(--surface) / <alpha-value>)",
        "card-foreground": "rgb(var(--foreground) / <alpha-value>)",
        popover: "rgb(var(--surface) / <alpha-value>)",
        "popover-foreground": "rgb(var(--foreground) / <alpha-value>)",
        secondary: "rgb(var(--muted) / <alpha-value>)",
        "secondary-foreground": "rgb(var(--foreground) / <alpha-value>)",
      },
      spacing: {
        // 8px grid system
        13: "3.25rem",
        15: "3.75rem",
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      fontSize: {
        // Typography scale
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px - Small
        base: "1rem", // 16px - Body
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px - H2 start
        "3xl": "1.75rem", // 28px - H2 end
        "4xl": "2rem", // 32px - H1 start
        "5xl": "2.5rem", // 40px - H1 end
      },
      borderRadius: {
        // 12px border radius system
        DEFAULT: "0.75rem", // 12px - standard
        sm: "0.5rem", // 8px
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
      },
      zIndex: {
        header: "60",
        sidebar: "20",
        overlay: "30",
        modal: "40",
        toast: "50",
      },
      boxShadow: {
        // Subtle shadows
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // Default subtle
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)", // Hover state
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      },
      width: {
        sidebar: "4.5rem",
        conversations: "20rem",
        details: "22rem",
      },
      maxWidth: {
        content: "1200px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "2rem",
        },
      },
      screens: {
        xxl: "160rem",
      },
      fontFamily: {
        // Typography system
        sans: ["Satoshi", "Inter", "system-ui", "sans-serif"], // Body - Satoshi
        heading: ["Satoshi", "Inter", "sans-serif"], // Headings - Satoshi
        mono: [
          "var(--font-jetbrains-mono)",
          "JetBrains Mono",
          "Courier New",
          "monospace",
        ], // Code/Join Code
      },
      lineHeight: {
        tight: "1.25", // For headings
        relaxed: "1.625", // For body text
      },
      letterSpacing: {
        tight: "-0.01em", // For large headings
        normal: "0", // Default
        wide: "0.025em", // For buttons/labels
      },
    },
  },
  plugins: [],
};

export default config;
