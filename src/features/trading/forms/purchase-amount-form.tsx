"use client";

import type { Asset, Money } from "@/domain/models";
import { AssetLogo } from "@/components/financial/asset-logo";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";
import { QuantityDisplay } from "@/components/financial/quantity-display";
import { decimal, toPlain } from "@/lib/decimal";
import { investmentPreviewRates } from "@/domain/calculations/investment-preview";

export function PurchaseAmountForm({
  asset,
  amount,
  onAmountChange,
  availableBalance,
  error
}: {
  asset: Asset;
  amount: string;
  onAmountChange: (value: string) => void;
  availableBalance: Money;
  error?: string;
}) {
  const brlRate = investmentPreviewRates.BRL.exchangeRate;
  const investmentUsdt = decimal(amount || 0).div(brlRate);
  const quantity = decimal(amount || 0).greaterThan(0)
    ? toPlain(investmentUsdt.div(asset.price.amount), 8)
    : "0";
  const fee = investmentUsdt.mul("0.005");

  return (
    <div className="space-y-3">
      <section className="min-w-0 overflow-hidden rounded-[18px] border border-[#D7E4F4] bg-[#F8FBFF] p-3 sm:p-4">
        <div className="mb-4 flex min-w-0 items-start justify-between gap-3">
          <span className="text-sm font-bold text-[#111827]">Pay</span>
          <span className="min-w-0 text-right text-xs font-semibold text-[#6F7A8F]">
            Balance:{" "}
            <LocalizedMoneyDisplay
              money={availableBalance}
              className="inline-flex max-w-[130px] align-top"
              localClassName="truncate text-[#334155]"
              referenceClassName="truncate text-[#6F7A8F]"
            />
          </span>
        </div>
        <div className="flex min-w-0 items-center justify-between gap-3">
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#D7E4F4] bg-white px-3 py-2 text-sm font-bold text-[#111827]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-black text-white">U</span>
            {" "}BRL
          </span>
          <input
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            inputMode="decimal"
            aria-label="Amount to invest in BRL"
            className="min-w-0 flex-1 bg-transparent text-right text-3xl font-black text-[#111827] outline-none placeholder:text-[#6F7A8F]/50 sm:text-4xl"
            placeholder="0.00"
          />
        </div>
      </section>

      <section className="min-w-0 overflow-hidden rounded-[18px] border border-[#D7E4F4] bg-[#F8FBFF] p-3 sm:p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="text-sm font-bold text-[#111827]">Receive</span>
          <span className="text-xs font-semibold text-[#6F7A8F]">Estimated</span>
        </div>
        <div className="flex min-w-0 items-center justify-between gap-3">
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#D7E4F4] bg-white px-3 py-2 text-sm font-bold text-[#111827]">
            <AssetLogo symbol={asset.symbol} src={asset.logoUrl} className="h-6 w-6 bg-[#E8EEF8] text-[9px]" />
            {asset.symbol}
          </span>
          <div className="min-w-0 text-right">
            <p className="max-w-[170px] truncate text-2xl font-black text-[#111827] sm:max-w-none sm:text-3xl"><QuantityDisplay quantity={quantity} /></p>
            <p className="mt-1 text-xs font-semibold text-[#6F7A8F]">{asset.symbol} Stock Token</p>
          </div>
        </div>
      </section>

      <dl className="min-w-0 overflow-hidden rounded-[18px] border border-[#D7E4F4] bg-white p-3 text-sm sm:p-4">
        <div className="flex min-w-0 justify-between gap-3 border-b border-[#E3ECF8] pb-3">
          <dt className="shrink-0 text-[#6F7A8F]">1 {asset.symbol}</dt>
          <dd className="min-w-0 text-right font-semibold text-[#111827]"><LocalizedMoneyDisplay money={asset.price} className="items-end" localClassName="truncate text-[#111827]" referenceClassName="truncate text-[#6F7A8F]" /></dd>
        </div>
        <div className="flex min-w-0 justify-between gap-3 border-b border-[#E3ECF8] py-3">
          <dt className="shrink-0 text-[#6F7A8F]">Execution fee</dt>
          <dd className="min-w-0 text-right font-semibold text-[#111827]"><LocalizedMoneyDisplay money={{ amount: fee.toFixed(2), currency: "USDT" }} className="items-end" localClassName="truncate text-[#111827]" referenceClassName="truncate text-[#6F7A8F]" /></dd>
        </div>
        <div className="flex min-w-0 justify-between gap-3 pt-3">
          <dt className="shrink-0 text-[#6F7A8F]">Estimated total</dt>
          <dd className="min-w-0 text-right font-semibold text-[#111827]"><LocalizedMoneyDisplay money={{ amount: investmentUsdt.plus(fee).toFixed(2), currency: "USDT" }} className="items-end" localClassName="truncate text-[#111827]" referenceClassName="truncate text-[#6F7A8F]" /></dd>
        </div>
      </dl>
      {error ? <p className="rounded-2xl border border-negative/20 bg-negative/10 p-3 text-sm font-semibold text-negative">{error}</p> : null}
    </div>
  );
}
