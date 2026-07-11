import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { formatPercentage } from "@/lib/currency";
import { cn } from "@/lib/cn";

export function PercentageChange({ value, className }: { value: number; className?: string }) {
  const positive = value > 0;
  const negative = value < 0;
  const Icon = positive ? ArrowUpRight : negative ? ArrowDownRight : Minus;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-tabular text-sm font-semibold",
        positive && "text-positive",
        negative && "text-negative",
        !positive && !negative && "text-text-muted-dark",
        className
      )}
      aria-label={positive ? "Positive change" : negative ? "Negative change" : "No change"}
    >
      <Icon size={14} aria-hidden="true" />
      {formatPercentage(value)}
    </span>
  );
}
