import type { BalanceRepository } from "@/domain/repositories/balance-repository";
import type { Money } from "@/domain/models";
import { getDemoState } from "../demo-state-store";
import { withLatency } from "../mock-runtime";

export class MockBalanceRepository implements BalanceRepository {
  getAvailableBalance(): Promise<Money> {
    return withLatency(() => getDemoState().availableBalance, 220);
  }
}
