import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OrderTicket } from "@/features/trading/components/order-ticket";
import { supportedAssets } from "@/infrastructure/mocks/fixtures/assets";
import { renderWithProviders } from "./render-with-providers";

describe("purchase flow", () => {
  it("renders amount entry and sell coming-soon state", () => {
    renderWithProviders(<OrderTicket asset={supportedAssets[0]} onReview={() => undefined} onInsufficientFunds={() => undefined} />);
    expect(screen.getByLabelText(/Amount to invest/i)).toBeInTheDocument();
    expect(screen.getByText(/Sell soon/i)).toBeInTheDocument();
  });
});
