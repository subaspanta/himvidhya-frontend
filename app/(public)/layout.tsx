import { Footer } from "@/features/landing";
import { Navbar } from "@/components/navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar
        className=" mx-auto w-full h-12 md:p-6 lg:p-8"
        variant="landing"
      />
      {children}
      <Footer variant="landing" className="p-4 md:p-6 lg:p-8" />
    </div>
  );
}
