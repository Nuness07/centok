"use client";

import { useState } from "react";
import Decimal from "decimal.js";
import type { Asset, Money } from "@/domain/models";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabButton } from "@/components/ui/tabs";
import { decimal } from "@/lib/decimal";
import { investmentPreviewRates } from "@/domain/calculations/investment-preview";
import { demoConfig } from "@/config/demo";
import { useAvailableBalance } from "@/features/portfolio/hooks/use-balance";
import { PurchaseAmountForm } from "../forms/purchase-amount-form";

export function OrderTicket({
  asset,
  onReview,
  onInsufficientFunds
}: {
  asset: Asset;
  onReview: (amount: string) => void;
  onInsufficientFunds: (purchaseAmountUSDT: string, fundingAmountBRL: string, availableBalance: Money) => void;
}) {
  const [amount, setAmount] = useState(decimal("80.00").mul(investmentPreviewRates.BRL.exchangeRate).toFixed(2));
  const [error, setError] = useState<string | undefined>();
  const balance = useAvailableBalance();
  const availableBalance = balance.data ?? { amount: "0.00", currency: "USDT" as const };

  const review = () => {
    const value = decimal(amount || 0);
    if (value.lessThanOrEqualTo(0)) {
      setError("Enter an amount greater than zero.");
      return;
    }
    const investmentUsdt = value.div(investmentPreviewRates.BRL.exchangeRate);
    const total = investmentUsdt.mul("1.005");
    if (total.greaterThan(availableBalance.amount)) {
      const shortfallUsdt = total.minus(availableBalance.amount);
      const fundingAmountBRL = shortfallUsdt
        .mul(investmentPreviewRates.BRL.exchangeRate)
        .plus(investmentPreviewRates.BRL.localFundingFee)
        .toDecimalPlaces(2, Decimal.ROUND_CEIL)
        .toFixed(2);
      const requiredFundingAmountBRL = decimal(fundingAmountBRL).lessThan(demoConfig.fundingMinimumBRL)
        ? demoConfig.fundingMinimumBRL
        : fundingAmountBRL;
      setError("Add funds to continue with this purchase.");
      onInsufficientFunds(investmentUsdt.toFixed(2), requiredFundingAmountBRL, availableBalance);
      return;
    }
    setError(undefined);
    onReview(investmentUsdt.toFixed(2));
  };

  return (
    <aside className="min-h-0 w-full min-w-0 max-w-full overflow-hidden rounded-[20px] border border-[#D7E4F4] bg-white p-3 shadow-[0_24px_70px_rgb(11_18_32_/_10%)] sm:p-4 xl:min-h-[650px]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#111827]">Buy</h2>
          <p className="text-xs text-[#6F7A8F]">Stock Token order</p>
        </div>
        <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D7E4F4] bg-[#F6F9FF] text-[#6F7A8F]" aria-label="Order settings">
          <SlidersHorizontal size={16} aria-hidden="true" />
        </button>
      </div>
      <Tabs className="mb-4 rounded-full border border-[#D7E4F4] bg-[#F6F9FF] p-1">
        <TabButton active>Buy</TabButton>
        <TabButton disabled aria-disabled="true">Sell soon</TabButton>
      </Tabs>
      <PurchaseAmountForm
        asset={asset}
        amount={amount}
        onAmountChange={(value) => {
          setAmount(value);
          setError(undefined);
        }}
        availableBalance={availableBalance}
        error={error}
      />
      <Button className="mt-5 min-h-12 w-full rounded-full" onClick={review} disabled={balance.isLoading}>
        Review order <ArrowRight size={16} aria-hidden="true" />
      </Button>
      <p className="mt-4 text-xs leading-5 text-[#6F7A8F]">
        Review always appears before purchase. No wallet, gas, or token approval is required.
      </p>
    </aside>
  );
}
