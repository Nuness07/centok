import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";

export function StatusIndicator({
  status,
  label
}: {
  status: "success" | "pending" | "error" | "expired" | "ready";
  label: string;
}) {
  const Icon = status === "success" ? CheckCircle2 : status === "error" || status === "expired" ? XCircle : Clock3;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-sm px-2 py-1 text-xs font-semibold",
        status === "success" && "bg-positive/10 text-positive",
        status === "pending" && "bg-warning/10 text-warning",
        status === "error" && "bg-negative/10 text-negative",
        status === "expired" && "bg-negative/10 text-negative",
        status === "ready" && "bg-primary/10 text-primary"
      )}
    >
      <Icon size={14} aria-hidden="true" />
      {label}
    </span>
  );
}
