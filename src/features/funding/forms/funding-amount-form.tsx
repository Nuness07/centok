"use client";

import { demoConfig } from "@/config/demo";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";
import type { FundingQuote, Money } from "@/domain/models";
import { decimal } from "@/lib/decimal";
import { formatMoney } from "@/lib/currency";

export function FundingAmountForm({
  amount,
  onAmountChange,
  quote,
  purchaseContext
}: {
  amount: string;
  onAmountChange: (value: string) => void;
  quote?: FundingQuote;
  purchaseContext?: { availableBalance?: Money };
}) {
  const belowMinimum = decimal(amount || 0).lessThan(demoConfig.fundingMinimumBRL);
  const fundingAmount: Money = { amount: amount || "0", currency: "BRL" };
  const isPurchaseTopUp = Boolean(purchaseContext?.availableBalance);

  return (
    <div className="space-y-3">
      <label className="block rounded-[18px] border border-[#D7E4F4] bg-[#F8FBFF] p-4">
        <span className="mb-4 block text-sm font-bold text-[#111827]">{isPurchaseTopUp ? "I pay now" : "I have"}</span>
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-[#D7E4F4] bg-white px-3 py-2 text-sm font-bold text-[#111827]">BRL</span>
          <input
            value={amount}
            inputMode="decimal"
            aria-label="BRL amount"
            onChange={(event) => onAmountChange(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-right text-4xl font-black text-[#111827] outline-none placeholder:text-[#6F7A8F]/50"
          />
        </div>
        <span className="mt-3 block text-xs text-[#6F7A8F]">Minimum {demoConfig.fundingMinimumBRL} BRL</span>
      </label>
      {purchaseContext?.availableBalance ? (
        <div className="rounded-[18px] border border-primary/15 bg-primary/5 p-4">
          <p className="text-sm font-bold text-[#111827]">To complete this purchase</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="rounded-2xl bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6F7A8F]">You pay now</p>
              <p className="mt-1 text-lg font-black text-[#111827]">{formatMoney(fundingAmount)}</p>
            </div>
            <span className="text-center text-lg font-black text-primary">+</span>
            <div className="rounded-2xl bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6F7A8F]">Already available</p>
              <LocalizedMoneyDisplay
                money={purchaseContext.availableBalance}
                className="mt-1"
                localClassName="text-lg font-black text-[#111827]"
                referenceClassName="text-[#6F7A8F]"
              />
            </div>
          </div>
        </div>
      ) : null}
      {belowMinimum ? <p className="rounded-2xl border border-warning/20 bg-warning/10 p-3 text-sm font-semibold text-warning">Enter at least {demoConfig.fundingMinimumBRL} BRL to continue.</p> : null}
    </div>
  );
}
