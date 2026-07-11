"use client";

import { demoConfig } from "@/config/demo";
import { decimal } from "@/lib/decimal";
import type { FundingQuote } from "@/domain/models";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";

export function FundingAmountForm({
  amount,
  onAmountChange,
  quote
}: {
  amount: string;
  onAmountChange: (value: string) => void;
  quote?: FundingQuote;
}) {
  const belowMinimum = decimal(amount || 0).lessThan(demoConfig.fundingMinimumBRL);

  return (
    <div className="space-y-3">
      <label className="block rounded-[18px] border border-[#D7E4F4] bg-[#F8FBFF] p-4">
        <span className="mb-4 block text-sm font-bold text-[#111827]">I have</span>
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
      <div className="rounded-[18px] border border-[#D7E4F4] bg-[#F8FBFF] p-4">
        <span className="block text-sm font-bold text-[#111827]">I receive</span>
        <strong className="mt-3 block text-3xl font-black text-[#111827]">
          {quote ? <LocalizedMoneyDisplay money={quote.destinationAmount} localClassName="text-3xl font-black text-[#111827]" referenceClassName="text-[#6F7A8F]" /> : "Estimated balance"}
        </strong>
        <p className="mt-2 text-sm text-[#6F7A8F]">Payment method: PIX</p>
      </div>
      {belowMinimum ? <p className="rounded-2xl border border-warning/20 bg-warning/10 p-3 text-sm font-semibold text-warning">Enter at least {demoConfig.fundingMinimumBRL} BRL to continue.</p> : null}
    </div>
  );
}
