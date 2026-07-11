"use client";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/cn";
import { useStartDefaultDemo } from "@/features/auth/hooks/use-auth";

export function DemoEntryButton({
  children = "Get started",
  className,
  onComplete
}: {
  children?: React.ReactNode;
  className?: string;
  onComplete?: () => void;
}) {
  const startDemo = useStartDefaultDemo();

  return (
    <button
      type="button"
      className={cn("inline-flex items-center justify-center gap-2 rounded-full bg-primary font-bold text-white transition hover:bg-primary-hover disabled:cursor-wait disabled:opacity-75", className)}
      onClick={() => {
        onComplete?.();
        startDemo.mutate();
      }}
      disabled={startDemo.isPending}
    >
      {startDemo.isPending ? "Entering demo" : children}
      <ArrowRight size={18} aria-hidden="true" />
    </button>
  );
}
