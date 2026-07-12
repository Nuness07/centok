"use client";

import { ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";

import { Dialog } from "@/components/ui/dialog";
import { useStartDefaultDemo } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/cn";

export function AppEntryButton({
  children = "Get started",
  className,
  onComplete
}: {
  children?: React.ReactNode;
  className?: string;
  onComplete?: () => void;
}) {
  const start = useStartDefaultDemo();
  const [open, setOpen] = useState(false);

  const signIn = () => {
    start.mutate(undefined, {
      onSuccess: () => setOpen(false)
    });
  };

  return (
    <>
      <button
        type="button"
        className={cn("inline-flex items-center justify-center gap-2 rounded-full bg-primary font-bold text-white transition hover:bg-primary-hover disabled:cursor-wait disabled:opacity-75", className)}
        onClick={() => {
          onComplete?.();
          setOpen(true);
        }}
        disabled={start.isPending}
      >
        {start.isPending ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Signing in
          </>
        ) : (
          <>
            {children}
            <ArrowRight size={18} aria-hidden="true" />
          </>
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen} title="Sign in to Centok" className="max-w-md rounded-[28px] p-5 sm:p-6" variant="light" hideHeader>
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            signIn();
          }}
        >
          <div className="rounded-[24px] border border-[#D7E4F4] bg-[#F8FBFF] p-5 pr-12">
            <p className="text-2xl font-black tracking-tight text-[#0B1220]">Welcome back</p>
            <p className="mt-3 text-sm leading-6 text-[#6F7A8F]">
              Access your Centok account to invest in tokenized U.S. stocks with a familiar experience.
            </p>
          </div>

          <button
            type="button"
            onClick={signIn}
            disabled={start.isPending}
            className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-[#D7E4F4] bg-white px-4 text-sm font-black text-[#0B1220] transition hover:bg-[#F6F9FF] disabled:cursor-wait disabled:opacity-70"
          >
            {start.isPending ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <GmailIcon />}
            Continue with Google
          </button>

          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[#8A96AA]">
            <span className="h-px flex-1 bg-[#D7E4F4]" />
            or
            <span className="h-px flex-1 bg-[#D7E4F4]" />
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#0B1220]">Email</span>
            <span className="flex min-h-12 items-center gap-3 rounded-2xl border border-[#D7E4F4] bg-[#F8FBFF] px-4 focus-within:border-primary focus-within:bg-white">
              <Mail size={18} className="shrink-0 text-[#6F7A8F]" aria-hidden="true" />
              <input
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#0B1220] outline-none"
                type="email"
                defaultValue="gabriel@centok.com"
                autoComplete="email"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#0B1220]">Password</span>
            <span className="flex min-h-12 items-center gap-3 rounded-2xl border border-[#D7E4F4] bg-[#F8FBFF] px-4 focus-within:border-primary focus-within:bg-white">
              <Lock size={18} className="shrink-0 text-[#6F7A8F]" aria-hidden="true" />
              <input
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#0B1220] outline-none"
                type="password"
                defaultValue="centok2026"
                autoComplete="current-password"
              />
            </span>
          </label>

          <button
            type="submit"
            disabled={start.isPending}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-black text-white transition hover:bg-primary-hover disabled:cursor-wait disabled:opacity-75"
          >
            {start.isPending ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : null}
            Sign in
          </button>
        </form>
      </Dialog>
    </>
  );
}

function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
      <path d="M4.5 6.5h15v11h-15z" fill="#fff" />
      <path d="M5.2 7.4v9.1h2.5v-6.2L12 13.6l4.3-3.3v6.2h2.5V7.4L12 12.5 5.2 7.4z" fill="#EA4335" />
      <path d="M5.2 7.4 12 12.5l6.8-5.1-.9-1.2L12 10.6 6.1 6.2 5.2 7.4z" fill="#FBBC04" />
      <path d="M4.5 6.5h2.5v11H4.5z" fill="#34A853" />
      <path d="M17 6.5h2.5v11H17z" fill="#4285F4" />
    </svg>
  );
}
