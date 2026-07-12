"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/cn";

export function Dialog({
  open,
  onOpenChange,
  title,
  children,
  className,
  variant = "light",
  hideHeader = false
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
  hideHeader?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" role="presentation">
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative max-h-[90vh] w-full max-w-xl overflow-auto shadow-panel",
          variant === "dark"
            ? "rounded-[24px] border border-white/[0.08] bg-[#11141A] p-5 text-white"
            : "rounded-lg border border-border-light bg-white p-5 text-text-dark",
          className
        )}
      >
        {hideHeader ? (
          <Button
            variant="ghost"
            className={cn("absolute right-4 top-4 z-10 h-9 w-9 rounded-full p-0", variant === "dark" ? "text-white hover:bg-white/[0.08]" : "text-text-dark")}
            aria-label="Close"
            onClick={() => onOpenChange(false)}
          >
            <X size={18} />
          </Button>
        ) : (
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className={cn("text-lg font-semibold", variant === "dark" ? "text-white" : "text-text-dark")}>{title}</h2>
            <Button variant="ghost" className={cn("h-9 w-9 rounded-full p-0", variant === "dark" ? "text-white hover:bg-white/[0.08]" : "text-text-dark")} aria-label="Close" onClick={() => onOpenChange(false)}>
              <X size={18} />
            </Button>
          </div>
        )}
        {children}
      </section>
    </div>
  );
}
