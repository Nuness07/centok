import type { Transaction } from "@/domain/models";

export const initialTransactions: Transaction[] = [
  {
    id: "txn-demo-failed-0001",
    type: "funding",
    status: "failed",
    sourceAmount: { amount: "40.00", currency: "BRL" },
    destinationAmount: { amount: "0.00", currency: "USDT" },
    amount: { amount: "40.00", currency: "BRL" },
    createdAt: "2026-07-10T13:40:00.000Z"
  }
];
