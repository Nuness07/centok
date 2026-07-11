import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PortfolioSummary } from "@/features/portfolio/components/portfolio-summary";

describe("portfolio view", () => {
  it("shows portfolio summary values", () => {
    render(
      <PortfolioSummary
        portfolio={{
          availableBalance: { amount: "5.00", currency: "USDT" },
          totalInvested: { amount: "0.00", currency: "USDT" },
          currentValue: { amount: "0.00", currency: "USDT" },
          totalGain: { amount: "0.00", currency: "USDT" },
          totalGainPercentage: 0,
          positions: []
        }}
      />
    );
    expect(screen.getByText(/Portfolio value/i)).toBeInTheDocument();
    expect(screen.getAllByText(/0.00 USDT/i).length).toBeGreaterThan(0);
  });
});
