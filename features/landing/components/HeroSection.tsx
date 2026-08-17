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
    <main className="relative min-h-[88vh] w-full overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#1E293B] flex flex-col items-center justify-center">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Mountain Silhouette (CSS/SVG Shapes) */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] opacity-[0.15] z-0 pointer-events-none select-none">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-full text-white fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      {/* Grid Pattern (Optional for extra tech feel) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

      {/* 2. Content Container */}
      <div className="relative z-10 w-full max-w-[1200px] px-6 py-12 flex flex-col items-center text-center">
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.1]">
          <span className="block mb-2">
            तिम्रो{" "}
            <span className="text-white relative inline-block">
              Batch
              {/* Underline accent */}
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-blue-600 opacity-80"
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
            Chaos
          </span>{" "}
          अन्त्य
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-slate-300 md:text-xl md:leading-relaxed">
          Streamline your classroom management with Nepal&apos;s first
          AI-powered education tool designed for students and teachers in the
          Himalayas.
        </p>

        <div className="mt-10 flex flex-col w-full max-w-md gap-4 sm:flex-row sm:justify-center sm:max-w-none">
          <Button
            asChild
            size="lg"
            className="h-14 px-8 text-base font-semibold bg-[#1E40AF] hover:bg-[#1E3A8A] text-white rounded-xl shadow-[0_0_20px_-5px_rgba(30,64,175,0.5)] hover:shadow-[0_0_25px_-5px_rgba(30,64,175,0.6)] transition-all duration-300 w-full sm:w-auto"
          >
            <Link href={getStartedHref}>
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 text-base font-medium border-slate-700 bg-white/5 text-white hover:bg-white/10 hover:text-white rounded-xl backdrop-blur-sm w-full sm:w-auto"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        {/* E. Trust / Social Proof */}
        {/* <div className="mt-12 flex items-center justify-center gap-4 text-sm text-slate-400">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <Avatar key={i} className="border-2 border-[#0F172A] w-8 h-8">
                <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 10}`} />
                <AvatarFallback className="bg-slate-300 text-slate-700 text-xs">
                  U{i}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p>
            Trusted by <span className="font-bold text-white">2,000+</span>{" "}
            students across Nepal
          </p>
        </div> */}
      </div>
    </main>
  );
};
