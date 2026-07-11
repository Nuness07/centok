import { describe, expect, it } from "vitest";
import { getServiceRegistry } from "@/infrastructure/mocks/service-registry";

describe("FundingService", () => {
  it("quotes and submits a mock funding transaction", async () => {
    const { demoStateService, fundingService, balanceRepository } = getServiceRegistry();
    await demoStateService.reset();
    const quote = await fundingService.getQuote({
      sourceAmount: { amount: "500.00", currency: "BRL" },
      destinationCurrency: "USDT",
      paymentMethod: "PIX"
    });
    const tx = await fundingService.submitFunding({ quoteId: quote.id });
    expect(tx.status).toBe("completed");
    expect((await balanceRepository.getAvailableBalance()).amount).toBe("98.40");
  });
});
