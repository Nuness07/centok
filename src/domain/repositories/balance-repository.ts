import type { Money } from "../models";

export interface BalanceRepository {
  getAvailableBalance(): Promise<Money>;
}
