"use client";

import { ArrowRight, Loader2 } from "lucide-react";

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

  return (
    <button
      type="button"
      className={cn("inline-flex items-center justify-center gap-2 rounded-full bg-primary font-bold text-white transition hover:bg-primary-hover disabled:cursor-wait disabled:opacity-75", className)}
      onClick={() => {
        onComplete?.();
        start.mutate();
      }}
      disabled={start.isPending}
    >
      {start.isPending ? (
        <>
          <Loader2 size={18} className="animate-spin" aria-hidden="true" />
          Loading
        </>
      ) : (
        <>
          {children}
          <ArrowRight size={18} aria-hidden="true" />
        </>
      )}
    </button>
  );
}
