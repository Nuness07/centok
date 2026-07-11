import { describe, expect, it } from "vitest";
import { createPriceHistory } from "@/infrastructure/mocks/fixtures/price-history";

describe("chart data", () => {
  it("generates deterministic range data", () => {
    const oneDay = createPriceHistory("AAPL", "1D");
    const max = createPriceHistory("AAPL", "MAX");
    expect(oneDay).toHaveLength(28);
    expect(max.length).toBeGreaterThan(oneDay.length);
  });
});
