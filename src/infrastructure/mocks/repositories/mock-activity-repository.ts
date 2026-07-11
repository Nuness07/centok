import type { ActivityRepository } from "@/domain/repositories/activity-repository";
import type { Transaction } from "@/domain/models";
import { getDemoState } from "../demo-state-store";
import { withLatency } from "../mock-runtime";

export class MockActivityRepository implements ActivityRepository {
  listTransactions(): Promise<Transaction[]> {
    return withLatency(
      () => [...getDemoState().transactions].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      240
    );
  }
}
