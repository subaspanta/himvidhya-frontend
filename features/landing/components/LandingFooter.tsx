import React from "react";
import Link from "next/link";
import { AppLogo } from "@/features/landing/components/AppLogo";

export const LandingFooter: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#0F172A] to-[#1E293B] px-0 py-10 md:py-12">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row gap-10 md:gap-4 justify-center items-center px-6 md:px-8 text-center">
        {/* Left: Logo, Tagline */}
        <div className="flex-1 min-w-[220px] flex flex-col gap-3 items-center">
          <div className="flex items-center gap-2 mb-1 justify-center">
            <AppLogo size="sm" variant="landing" />
            <span className="sr-only">HimVidya</span>
          </div>
          <div className="text-[16px] text-slate-300 font-normal mb-2">
            Empowering education in the Himalayas through technology and
            community.
          </div>
        </div>

        {/* Platform Links */}
        <div className="flex-1 min-w-[180px] mt-6 md:mt-0 flex flex-col items-center">
          <div className="font-semibold text-white text-[16px] mb-2">
            Platform
          </div>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="#features"
                className="text-slate-300 text-[14px] hover:text-white transition"
              >
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="flex-1 min-w-[180px] mt-6 md:mt-0 flex flex-col items-center">
          <div className="font-semibold text-white text-[16px] mb-2">
            Company
          </div>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="#about"
                className="text-slate-300 text-[14px] hover:text-white transition"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="#contact"
                className="text-slate-300 text-[14px] hover:text-white transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="flex-1 min-w-[180px] mt-6 md:mt-0 flex flex-col items-center">
          <div className="font-semibold text-white text-[16px] mb-2">Legal</div>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/privacy"
                className="text-slate-300 text-[14px] hover:text-white transition"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-slate-300 text-[14px] hover:text-white transition"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full max-w-[1200px] mx-auto mt-8 border-t border-slate-800 pt-4 px-6 md:px-8 flex flex-col md:flex-row items-center justify-center text-[14px] text-slate-500 text-center">
        <div className="mb-2 md:mb-0">
          © 2026 HimVidya Education Technologies Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
