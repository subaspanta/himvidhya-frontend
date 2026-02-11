import React from "react";

const features = [
  { id: 1, text: "Instant messaging" },
  { id: 2, text: "Real-time notifications" },
  { id: 3, text: "Simple and intuitive" },
];

export const FeaturesList: React.FC = () => {
  return (
    <div className="space-y-4 max-w-md mx-auto text-left">
      {features.map((feature) => (
        <div key={feature.id} className="flex items-center gap-3">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <span className="text-foreground">{feature.text}</span>
        </div>
      ))}
    </div>
  );
};
