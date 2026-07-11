import { describe, expect, it } from "vitest";
import { getServiceRegistry } from "@/infrastructure/mocks/service-registry";

describe("PortfolioRepository", () => {
  it("returns empty portfolio totals from default fixture", async () => {
    const { demoStateService, portfolioRepository } = getServiceRegistry();
    await demoStateService.reset();
    const portfolio = await portfolioRepository.getPortfolio();
    expect(portfolio.positions).toHaveLength(0);
    expect(portfolio.availableBalance.amount).toBe("5.00");
  });
});
