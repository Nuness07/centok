import { describe, expect, it } from "vitest";

import { calculateInvestmentPreview, calculateInvestmentPreviewFromQuantity } from "@/domain/calculations/investment-preview";

const applePrice = { amount: "214.25", currency: "USDT" as const };
const nvidiaPrice = { amount: "126.88", currency: "USDT" as const };
const netflixPrice = { amount: "682.35", currency: "USDT" as const };

describe("investment preview calculations", () => {
  it("calculates the default BRL to AAPL estimate", () => {
    const preview = calculateInvestmentPreview({
      sourceAmount: { amount: "500.00", currency: "BRL" },
      assetId: "asset-aapl",
      assetPrice: applePrice
    });

    expect(preview.exchangeRate).toBe("5.30");
    expect(preview.localFundingFee.amount).toBe("5.00");
    expect(preview.convertedUsdt.amount).toBe("93.40");
    expect(preview.executionFee.amount).toBe("0.47");
    expect(preview.investmentAmount.amount).toBe("92.93");
    expect(preview.estimatedQuantity).toBe("0.4337421");
  });

  it("uses the selected local currency rate and selected asset price", () => {
    const preview = calculateInvestmentPreview({
      sourceAmount: { amount: "2000.00", currency: "MXN" },
      assetId: "asset-nvda",
      assetPrice: nvidiaPrice
    });

    expect(preview.exchangeRate).toBe("18.20");
    expect(preview.localFundingFee.amount).toBe("18.20");
    expect(preview.convertedUsdt.amount).toBe("108.89");
    expect(preview.estimatedQuantity).toBe("0.85392228");
  });

  it("does not produce negative output when the amount is below the local fee", () => {
    const preview = calculateInvestmentPreview({
      sourceAmount: { amount: "3.00", currency: "BRL" },
      assetId: "asset-aapl",
      assetPrice: applePrice
    });

    expect(preview.netLocalAmount.amount).toBe("0.00");
    expect(preview.convertedUsdt.amount).toBe("0.00");
    expect(preview.executionFee.amount).toBe("0.00");
    expect(preview.estimatedQuantity).toBe("0");
  });

  it("keeps very small fractional quantities visible", () => {
    const preview = calculateInvestmentPreview({
      sourceAmount: { amount: "1000.00", currency: "CLP" },
      assetId: "asset-nflx",
      assetPrice: netflixPrice
    });

    expect(preview.convertedUsdt.amount).toBe("0.05");
    expect(preview.estimatedQuantity).toBe("0.00007675");
  });

  it("calculates the local payment required for a selected quantity", () => {
    const preview = calculateInvestmentPreviewFromQuantity({
      quantity: "1",
      currency: "BRL",
      assetId: "asset-aapl",
      assetPrice: applePrice
    });

    expect(preview.sourceAmount.amount).toBe("1146.23");
    expect(preview.convertedUsdt.amount).toBe("215.33");
    expect(preview.executionFee.amount).toBe("1.08");
    expect(preview.investmentAmount.amount).toBe("214.25");
    expect(preview.estimatedQuantity).toBe("1");
  });

  it("does not charge local fees for a zero quantity estimate", () => {
    const preview = calculateInvestmentPreviewFromQuantity({
      quantity: "0",
      currency: "BRL",
      assetId: "asset-aapl",
      assetPrice: applePrice
    });

    expect(preview.sourceAmount.amount).toBe("0.00");
    expect(preview.localFundingFee.amount).toBe("0.00");
    expect(preview.estimatedQuantity).toBe("0");
  });
});
