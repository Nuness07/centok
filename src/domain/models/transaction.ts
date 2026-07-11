import type { Money } from "./money";

export type TransactionType = "funding" | "purchase";
export type TransactionStatus = "pending" | "completed" | "failed" | "expired";

export type Transaction = {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  assetId?: string;
  sourceAmount?: Money;
  destinationAmount?: Money;
  amount: Money;
  createdAt: string;
};
