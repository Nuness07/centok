import type { Asset, Transaction } from "@/domain/models";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";
import { formatDateTime } from "@/lib/date";
import { TransactionStatusBadge } from "./transaction-status-badge";

export function ActivityItem({ transaction, asset }: { transaction: Transaction; asset?: Asset }) {
  return (
    <article className="grid gap-3 rounded-[16px] border border-white/[0.08] bg-white/[0.035] p-4 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:items-center">
      <div>
        <h3 className="font-semibold text-white">{transaction.type === "funding" ? "PIX funding" : `Purchase ${asset?.symbol ?? "Stock Token"}`}</h3>
        <p className="text-sm text-[#8E98AA]">{formatDateTime(transaction.createdAt)}</p>
      </div>
      <div>
        <p className="text-xs text-[#8E98AA]">Amount</p>
        <LocalizedMoneyDisplay money={transaction.amount} localClassName="font-semibold text-white" />
      </div>
      <div>
        <p className="text-xs text-[#8E98AA]">Reference</p>
        <p className="font-mono text-xs text-white">{transaction.id}</p>
      </div>
      <TransactionStatusBadge status={transaction.status} />
    </article>
  );
}
