"use client";

import { HeroSection } from "@/features/landing";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const AuthPageShell = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const openRegister = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("auth", "register");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return <HeroSection onGetStartedClick={openRegister} />;
};
