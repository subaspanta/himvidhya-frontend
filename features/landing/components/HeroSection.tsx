import React from "react";
import { Button } from "@/shared/ui/button";
import { FeaturesList } from "./FeaturesList";

interface HeroSectionProps {
  onGetStartedClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStartedClick,
}) => {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
          Mitva
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Stay connected with friends and family. Simple, fast, and secure
          messaging.
        </p>

        <FeaturesList />

        <div className="pt-6">
          <Button
            onClick={onGetStartedClick}
            size="lg"
            className="w-full max-w-md h-14 text-lg font-semibold rounded-2xl shadow-2xl"
          >
            Get Started
          </Button>
        </div>

        <p className="text-sm text-muted-foreground pt-4">
          By continuing, you agree to our{" "}
          <span className="text-foreground cursor-not-allowed">Terms</span> &{" "}
          <span className="text-foreground cursor-not-allowed">
            Privacy Policy
          </span>
        </p>
      </div>
    </main>
  );
};
