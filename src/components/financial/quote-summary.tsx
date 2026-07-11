import type { Money } from "@/domain/models";
import { cn } from "@/lib/cn";
import { LocalizedMoneyDisplay } from "./localized-money-display";

export function QuoteSummary({
  rows,
  variant = "light"
}: {
  rows: { label: string; value: Money | string; emphasis?: boolean }[];
  variant?: "light" | "dark";
}) {
  return (
    <dl className={cn("rounded-[18px] border p-4 text-sm", variant === "dark" ? "border-[#D7E4F4] bg-white" : "border-border-light bg-white")}>
      {rows.map((row) => (
        <div key={row.label} className={cn("flex items-center justify-between gap-4 border-b py-3 first:pt-0 last:border-0 last:pb-0", variant === "dark" ? "border-[#E3ECF8]" : "border-border-light")}>
          <dt className={variant === "dark" ? "text-[#6F7A8F]" : "text-text-muted"}>{row.label}</dt>
          <dd className={cn("text-right", row.emphasis ? "font-bold" : "font-semibold", variant === "dark" ? "text-[#111827]" : "text-text-dark")}>
            {typeof row.value === "string" ? row.value : <LocalizedMoneyDisplay money={row.value} className="items-end" localClassName="text-current" />}
          </dd>
        </div>
      ))}
    </dl>
  );
}
