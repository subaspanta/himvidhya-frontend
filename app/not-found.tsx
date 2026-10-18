import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { AppLogo } from "@/features/landing/components/AppLogo";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-background p-3 sm:p-5 lg:p-6">
      <div className="mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-[1600px] flex-col rounded-2xl bg-card p-3 shadow-elevated sm:min-h-[calc(100dvh-2.5rem)] sm:p-5 lg:min-h-[calc(100dvh-3rem)] lg:p-6">
        <header className="flex h-14 shrink-0 items-center justify-between sm:h-16">
          <Link
            href="/"
            aria-label="Go to HimVidhya home"
            className="inline-flex rounded-lg text-foreground transition-opacity hover:opacity-75"
          >
            <AppLogo size="sm" />
          </Link>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent-subtle hover:text-accent-subtle-foreground"
          >
            <ArrowLeft
              aria-hidden="true"
              weight="bold"
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Home
          </Link>
        </header>

        <main className="relative mt-3 flex flex-1 flex-col overflow-hidden rounded-xl bg-background-secondary sm:mt-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] opacity-35 [mask-image:radial-gradient(ellipse_56%_62%_at_50%_42%,#000_15%,transparent_82%)]"
          />

          <section className="relative flex flex-1 flex-col items-center justify-center px-5 py-12 text-center sm:px-8 sm:py-16">
            <p className="font-sans text-[clamp(7.5rem,23vw,17rem)] leading-[0.72] font-black tracking-[-0.09em] text-foreground">
              4<span className="text-primary">0</span>4
            </p>

            <div className="mt-10 max-w-md sm:mt-14">
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                This page is missing
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                The lesson or class you followed may have moved, or the link is
                no longer available.
              </p>

              <Link
                href="/"
                className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md active:scale-[0.98]"
              >
                <ArrowLeft
                  aria-hidden="true"
                  weight="bold"
                  className="transition-transform group-hover:-translate-x-0.5"
                />
                Return home
              </Link>
            </div>
          </section>

          <footer className="relative grid gap-2 px-5 pb-5 font-mono text-[0.65rem] font-medium tracking-[0.12em] text-muted-foreground sm:grid-cols-3 sm:px-7 sm:pb-7">
            <p>STATUS: PAGE_NOT_FOUND</p>
            <p className="sm:text-center">NEXT: HOME</p>
            <p className="sm:text-right">HIMVIDHYA</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
