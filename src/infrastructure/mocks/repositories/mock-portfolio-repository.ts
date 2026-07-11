import type { PortfolioRepository } from "@/domain/repositories/portfolio-repository";
import type { Portfolio } from "@/domain/models";
import { calculatePortfolioValue } from "@/domain/calculations/portfolio";
import { getDemoState } from "../demo-state-store";
import { withLatency } from "../mock-runtime";

export class MockPortfolioRepository implements PortfolioRepository {
  getPortfolio(): Promise<Portfolio> {
    return withLatency(() => {
      const state = getDemoState();
      return calculatePortfolioValue({
        availableBalance: state.availableBalance,
        positions: state.positions
      });
    }, 260);
  }
}
