import type { Currency, Money } from "@/domain/models";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/currency";
import { asUsdtReference, convertMoneyForDisplay } from "@/lib/local-money";

export function LocalizedMoneyDisplay({
  money,
  currency = "BRL",
  className,
  localClassName,
  referenceClassName,
  compact = false,
  hideReference = false
}: {
  money: Money;
  currency?: Currency;
  className?: string;
  localClassName?: string;
  referenceClassName?: string;
  compact?: boolean;
  hideReference?: boolean;
}) {
  const localMoney = convertMoneyForDisplay(money, currency);
  const reference = money.currency === "USDT" || money.currency === "USD" ? asUsdtReference(money) : null;

  return (
    <span className={cn("inline-flex flex-col", className)}>
      <span className={cn("font-tabular", localClassName)}>{formatMoney(localMoney, { compact })}</span>
      {!hideReference && reference ? (
        <span className={cn("mt-0.5 text-[11px] font-semibold leading-none text-[#8E98AA]", referenceClassName)}>
          ≈ {formatMoney(reference).replace("USDT", "USD")}
          <span className="text-[0.7em] leading-none">T</span>
        </span>
      ) : null}
    </span>
  );
}
