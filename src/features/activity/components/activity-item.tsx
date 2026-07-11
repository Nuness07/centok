import type { Asset, Transaction } from "@/domain/models";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";
import { formatDateTime } from "@/lib/date";
import { TransactionStatusBadge } from "./transaction-status-badge";

export function ActivityItem({ transaction, asset }: { transaction: Transaction; asset?: Asset }) {
  return (
    <article className="grid gap-3 rounded-[16px] border border-[#D7E4F4] bg-[#F8FBFF] p-4 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:items-center">
      <div>
        <h3 className="font-semibold text-[#111827]">{transaction.type === "funding" ? "PIX funding" : `Purchase ${asset?.symbol ?? "Stock Token"}`}</h3>
        <p className="text-sm text-[#6F7A8F]">{formatDateTime(transaction.createdAt)}</p>
      </div>
      <div>
        <p className="text-xs text-[#6F7A8F]">Amount</p>
        <LocalizedMoneyDisplay money={transaction.amount} localClassName="font-semibold text-[#111827]" referenceClassName="text-[#6F7A8F]" />
      </div>
      <div>
        <p className="text-xs text-[#6F7A8F]">Reference</p>
        <p className="font-mono text-xs text-[#111827]">{transaction.id}</p>
      </div>
      <TransactionStatusBadge status={transaction.status} />
    </article>
  );
}
