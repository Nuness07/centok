import type { Money } from "@/domain/models";
import { formatMoney } from "@/lib/currency";
import { cn } from "@/lib/cn";

export function MoneyDisplay({ money, className }: { money: Money; className?: string }) {
  return <span className={cn("font-tabular", className)}>{formatMoney(money)}</span>;
}
