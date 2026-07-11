import type { TransactionStatus } from "@/domain/models";
import { StatusIndicator } from "@/components/feedback/status-indicator";

export function TransactionStatusBadge({ status }: { status: TransactionStatus }) {
  if (status === "completed") return <StatusIndicator status="success" label="Completed" />;
  if (status === "pending") return <StatusIndicator status="pending" label="Pending" />;
  if (status === "expired") return <StatusIndicator status="expired" label="Expired" />;
  return <StatusIndicator status="error" label="Failed" />;
}
