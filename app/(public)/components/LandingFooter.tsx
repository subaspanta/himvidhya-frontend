import React from "react";

export const LandingFooter: React.FC = () => {
  return (
    <footer className="w-full px-6 py-6 text-center border-t border-border bg-surface">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} olo. All rights reserved.
      </p>
    </footer>
  );
};
