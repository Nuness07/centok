import type { Asset, OrderQuote, Transaction } from "@/domain/models";
import { Button } from "@/components/ui/button";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";
import { QuantityDisplay } from "@/components/financial/quantity-display";
import { StatusIndicator } from "@/components/feedback/status-indicator";

export function PurchasePending() {
  return (
    <output className="space-y-3">
      <StatusIndicator status="pending" label="Purchase pending" />
      <ol className="space-y-2 text-sm text-[#6F7A8F]">
        <li>Preparing order</li>
        <li>Executing simulated purchase</li>
        <li>Updating portfolio</li>
      </ol>
    </output>
  );
}

export function PurchaseSuccess({ asset, quote, transaction, onViewPortfolio }: { asset: Asset; quote: OrderQuote; transaction: Transaction; onViewPortfolio: () => void }) {
  return (
    <div className="space-y-4">
      <StatusIndicator status="success" label="Purchase completed" />
      <p className="text-sm text-[#6F7A8F]">You purchased an estimated <QuantityDisplay quantity={quote.estimatedQuantity} /> {asset.symbol} Token.</p>
      <p className="text-sm text-[#6F7A8F]">Total paid: <LocalizedMoneyDisplay money={quote.total} className="inline-flex align-middle" localClassName="text-[#334155]" referenceClassName="text-[#6F7A8F]" />.</p>
      <p className="font-mono text-xs text-[#6F7A8F]">Reference: {transaction.id}</p>
      <Button className="rounded-full" onClick={onViewPortfolio}>View portfolio</Button>
    </div>
  );
}

export function PurchaseError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="space-y-4">
      <StatusIndicator status="error" label="Purchase failed" />
      <p className="text-sm text-[#6F7A8F]">{message}</p>
      <Button variant="ghost" className="rounded-full text-[#6F7A8F]" onClick={onRetry}>Retry</Button>
    </div>
  );
}

export function PurchaseExpired({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="space-y-4">
      <StatusIndicator status="expired" label="Quote expired" />
      <p className="text-sm text-[#6F7A8F]">Refresh the quote to continue with the same amount.</p>
      <Button className="rounded-full" onClick={onRefresh}>Refresh quote</Button>
    </div>
  );
}
