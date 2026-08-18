import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface HeroSectionProps {
  getStartedHref: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  getStartedHref,
}) => {
  return (
    <main className="relative min-h-[88vh] w-full overflow-hidden bg-background flex flex-col items-center justify-center">
      {/* Rule grid — faint, warm-neutral, editorial-page texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

      {/* 2. Content Container */}
      <div className="relative z-10 w-full max-w-[1200px] px-6 py-12 flex flex-col items-center text-center">
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.1]">
          <span className="block mb-2">
            तिम्रो{" "}
            <span className="relative inline-block">
              Batch
              {/* Underline accent */}
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-80"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>{" "}
            को
          </span>
          <span className="text-primary">Chaos</span> अन्त्य
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-foreground-secondary md:text-xl md:leading-relaxed">
          Streamline your classroom management with Nepal&apos;s first
          AI-powered education tool designed for students and teachers in the
          Himalayas.
        </p>

        <div className="mt-10 flex flex-col w-full max-w-md gap-4 sm:flex-row sm:justify-center sm:max-w-none">
          <Button asChild size="lg" className="h-14 px-8 text-base w-full sm:w-auto">
            <Link href={getStartedHref}>
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 text-base font-medium w-full sm:w-auto"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
      </div>
    </main>
  );
};
