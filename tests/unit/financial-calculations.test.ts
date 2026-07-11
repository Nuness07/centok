import { describe, expect, it } from "vitest";
import { calculateFundingQuote } from "@/domain/calculations/funding";
import { calculateOrderQuote } from "@/domain/calculations/orders";
import { calculatePortfolioValue } from "@/domain/calculations/portfolio";
import { formatMoney, formatQuantity } from "@/lib/currency";

const balance = { amount: "250.00", currency: "USDT" as const };
const price = { amount: "214.25", currency: "USDT" as const };

describe("financial calculations", () => {
  it("calculates a deterministic BRL to USDT funding quote", () => {
    const quote = calculateFundingQuote({
      sourceAmount: { amount: "500.00", currency: "BRL" },
      destinationCurrency: "USDT",
      paymentMethod: "PIX"
    });
    expect(quote.fee.amount).toBe("5.00");
    expect(quote.destinationAmount.amount).toBe("93.40");
  });

  it("calculates order fee, total, quantity, and remaining balance", () => {
    const quote = calculateOrderQuote({
      assetId: "asset-aapl",
      investmentAmount: { amount: "80.00", currency: "USDT" },
      assetPrice: price,
      availableBalance: balance
    });
    expect(quote.executionFee.amount).toBe("0.40");
    expect(quote.total.amount).toBe("80.40");
    expect(quote.remainingBalance.amount).toBe("169.60");
    expect(quote.estimatedQuantity).toBe("0.37339557");
  });

  it("formats money and fractional quantities consistently", () => {
    expect(formatMoney({ amount: "80", currency: "USDT" })).toBe("80.00 USDT");
    expect(formatQuantity("0.37339557")).toBe("0.373396");
  });

  it("calculates portfolio totals from positions", () => {
    const portfolio = calculatePortfolioValue({
      availableBalance: balance,
      positions: [
        {
          assetId: "asset-aapl",
          quantity: "1",
          averagePrice: price,
          currentValue: { amount: "220.00", currency: "USDT" },
          unrealizedGain: { amount: "5.75", currency: "USDT" },
          unrealizedGainPercentage: 2.68
        }
      ]
    });
    expect(portfolio.currentValue.amount).toBe("220.00");
    expect(portfolio.totalGain.amount).toBe("5.75");
  });
});
