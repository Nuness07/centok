import { describe, expect, it } from "vitest";
import { getServiceRegistry } from "@/infrastructure/mocks/service-registry";

describe("OrderService", () => {
  it("prevents insufficient purchase and mutates funded purchase", async () => {
    const { demoStateService, orderService, portfolioRepository, balanceRepository } = getServiceRegistry();
    await demoStateService.setScenario("funded-user");
    const quote = await orderService.getQuote({
      assetId: "asset-aapl",
      investmentAmount: { amount: "80.00", currency: "USDT" }
    });
    const tx = await orderService.submitOrder({ quoteId: quote.id });
    expect(tx.status).toBe("completed");
    expect((await balanceRepository.getAvailableBalance()).amount).toBe("169.60");
    expect((await portfolioRepository.getPortfolio()).positions).toHaveLength(1);
  });
});
