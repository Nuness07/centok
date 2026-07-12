"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { CentokLogo } from "@/components/branding/centok-logo";
import { Button } from "@/components/ui/button";
import { marketingNav } from "@/config/navigation";
import { AppEntryButton } from "@/features/marketing/components/app-entry-button";
import { cn } from "@/lib/cn";

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  const nav = (
    <>
      {marketingNav.map((item, index) => (
        <a
          key={item.href}
          ref={index === 0 ? firstLinkRef : undefined}
          href={item.href}
          className="px-1 py-2 text-sm font-semibold text-text-dark transition hover:text-primary"
          onClick={() => setOpen(false)}
        >
          {item.label}
        </a>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent px-4 py-4 transition-all duration-300 md:px-6",
        scrolled && "border-border-light bg-white/80 py-3 shadow-soft backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <CentokLogo className="text-text-dark" />
        <nav className="hidden items-center gap-9 md:flex" aria-label="Marketing navigation">
          {nav}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <AppEntryButton
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-border-light bg-white/35 px-6 py-3 text-sm font-bold text-text-dark transition hover:bg-white"
          >
            Sign in
          </AppEntryButton>
          <AppEntryButton
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition hover:bg-primary-hover"
          >
            Get started
          </AppEntryButton>
        </div>
        <Button
          variant="secondary"
          className="h-11 w-11 rounded-full border-border-light bg-white/50 p-0 md:hidden"
          aria-label="Open navigation"
          onClick={() => setOpen(true)}
        >
          <Menu size={18} />
        </Button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 bg-white p-4 text-text-dark md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="flex items-center justify-between">
            <CentokLogo className="text-text-dark" />
            <Button variant="secondary" className="h-11 w-11 rounded-full p-0" aria-label="Close navigation" onClick={() => setOpen(false)}>
              <X size={18} />
            </Button>
          </div>
          <nav className="mt-8 grid gap-2" aria-label="Mobile marketing navigation">
            {nav}
          </nav>
          <div className="mt-8 grid gap-3">
            <AppEntryButton
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-border-light px-4 py-3 text-sm font-bold text-text-dark"
              onComplete={() => setOpen(false)}
            >
              Sign in
            </AppEntryButton>
            <AppEntryButton
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-bold text-white"
              onComplete={() => setOpen(false)}
            >
              Get started
            </AppEntryButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}

