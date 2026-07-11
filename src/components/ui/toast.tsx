import { cn } from "@/lib/cn";

export function Toast({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "success" | "error" }) {
  return (
    <div
      role="status"
      className={cn(
        "rounded-md border px-3 py-2 text-sm",
        tone === "success" && "border-positive/30 bg-positive/10 text-positive",
        tone === "error" && "border-negative/30 bg-negative/10 text-negative",
        tone === "default" && "border-border-light bg-surface-muted text-text-dark"
      )}
    >
      {children}
    </div>
  );
}
