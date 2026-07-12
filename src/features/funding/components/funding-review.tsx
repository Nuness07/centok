import type { FundingQuote } from "@/domain/models";
import { QuoteSummary } from "@/components/financial/quote-summary";
import { formatMoney } from "@/lib/currency";

export function FundingReview({ quote }: { quote: FundingQuote }) {
  return (
    <div className="space-y-4">
      <div className="rounded-[18px] border border-[#D7E4F4] bg-[#F8FBFF] p-4">
        <h3 className="font-semibold text-[#111827]">Review PIX funding</h3>
        <p className="mt-1 text-sm text-[#6F7A8F]">This conversion credits your available balance after confirmation.</p>
      </div>
      <QuoteSummary
        variant="light"
        rows={[
          { label: "You pay", value: quote.sourceAmount },
          { label: "Exchange rate", value: `${quote.exchangeRate} BRL per digital dollar` },
          { label: "Provider fee", value: quote.fee },
          { label: "Payment method", value: quote.paymentMethod },
          { label: "Estimated received", value: formatMoney(quote.destinationAmount), emphasis: true },
          { label: "Quote expires", value: new Date(quote.expiresAt).toLocaleTimeString() }
        ]}
      />
    </div>
  );
}
