"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "@/features/landing";
import { Navbar } from "@/components/navbar";

export default function PublicLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const router = useRouter();

  const openLoginModal = useCallback(() => {
    router.push("/login");
  }, [router]);

  const openRegisterModal = useCallback(() => {
    router.push("/register");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar
        className=" mx-auto w-full  p-4 md:p-6 lg:p-8"
        variant="landing"
        onLoginClick={openLoginModal}
        onSignUpClick={openRegisterModal}
      />
      {children}
      {modal}
      <Footer variant="landing" className="p-4 md:p-6 lg:p-8" />
    </div>
  );
}
