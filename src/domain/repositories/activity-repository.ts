import type { Transaction } from "../models";

export interface ActivityRepository {
  listTransactions(): Promise<Transaction[]>;
}
