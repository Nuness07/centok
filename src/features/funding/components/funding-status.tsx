import type { FundingQuote, Transaction } from "@/domain/models";
import { Button } from "@/components/ui/button";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";
import { StatusIndicator } from "@/components/feedback/status-indicator";

export function FundingPending() {
  return (
    <output className="space-y-3">
      <StatusIndicator status="pending" label="Funding pending" />
      <p className="text-sm text-[#6F7A8F]">Confirming the PIX payment and updating your available balance.</p>
    </output>
  );
}

export function FundingSuccess({ quote, transaction, onContinue }: { quote: FundingQuote; transaction: Transaction; onContinue: () => void }) {
  return (
    <div className="space-y-4">
      <StatusIndicator status="success" label="Funds added" />
      <p className="text-sm text-[#6F7A8F]">Added <LocalizedMoneyDisplay money={quote.destinationAmount} className="inline-flex align-middle" localClassName="text-[#334155]" referenceClassName="text-[#6F7A8F]" /> to your available balance.</p>
      <p className="font-mono text-xs text-[#6F7A8F]">Reference: {transaction.id}</p>
      <Button className="rounded-full" onClick={onContinue}>Continue</Button>
    </div>
  );
}

export function FundingError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="space-y-4">
      <StatusIndicator status="error" label="Funding failed" />
      <p className="text-sm text-[#6F7A8F]">{message}</p>
      <Button variant="ghost" className="rounded-full text-[#6F7A8F]" onClick={onRetry}>Retry</Button>
    </div>
  );
}

export function FundingExpired({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="space-y-4">
      <StatusIndicator status="expired" label="Funding quote expired" />
      <p className="text-sm text-[#6F7A8F]">Refresh the quote to continue with the same BRL amount.</p>
      <Button className="rounded-full" onClick={onRefresh}>Refresh quote</Button>
    </div>
  );
}
