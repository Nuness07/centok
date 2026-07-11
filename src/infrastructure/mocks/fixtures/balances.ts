import type { Money } from "@/domain/models";

export const defaultAvailableBalance: Money = { amount: "5.00", currency: "USDT" };
export const fundedAvailableBalance: Money = { amount: "250.00", currency: "USDT" };
export const unfundedAvailableBalance: Money = { amount: "0.00", currency: "USDT" };
