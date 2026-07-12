"use client";

import type { Asset, OrderQuote } from "@/domain/models";
import { QuoteSummary } from "@/components/financial/quote-summary";
import { QuantityDisplay } from "@/components/financial/quantity-display";
import { formatQuantity } from "@/lib/currency";

export function PurchaseReview({ asset, quote }: { asset: Asset; quote: OrderQuote }) {
  return (
    <div className="space-y-4">
      <div className="rounded-[18px] border border-[#D7E4F4] bg-[#F8FBFF] p-4">
        <h3 className="font-semibold text-[#111827]">Review {asset.symbol} Stock Token order</h3>
        <p className="mt-1 text-sm text-[#6F7A8F]">Confirm the order before any balance or portfolio state changes.</p>
      </div>
      <QuoteSummary
        variant="light"
        rows={[
          { label: "Company", value: `${asset.name} (${asset.symbol})` },
          { label: "Amount invested", value: quote.investmentAmount },
          { label: "Price", value: quote.assetPrice },
          { label: "Estimated quantity", value: `${formatQuantity(quote.estimatedQuantity)} ${asset.symbol} Token` },
          { label: "Execution fee", value: quote.executionFee },
          { label: "Total", value: quote.total, emphasis: true },
          { label: "Remaining balance", value: quote.remainingBalance },
          { label: "Quote expires", value: new Date(quote.expiresAt).toLocaleTimeString() }
        ]}
      />
      <p className="text-xs leading-5 text-[#6F7A8F]">
        Stock Tokens provide economic exposure and are not direct ownership of underlying shares.
      </p>
      <p className="sr-only">Estimated quantity: <QuantityDisplay quantity={quote.estimatedQuantity} /></p>
    </div>
  );
}
