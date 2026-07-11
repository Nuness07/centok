import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FundingAmountForm } from "@/features/funding/forms/funding-amount-form";
import { sampleFundingQuote } from "@/infrastructure/mocks/fixtures/funding-quotes";

describe("funding flow", () => {
  it("shows BRL input, USDT estimate, and PIX method", () => {
    render(<FundingAmountForm amount="500.00" onAmountChange={() => undefined} quote={sampleFundingQuote} />);
    expect(screen.getByLabelText(/BRL amount/i)).toBeInTheDocument();
    expect(screen.getByText(/93.40 USDT/i)).toBeInTheDocument();
    expect(screen.getByText(/PIX/i)).toBeInTheDocument();
  });
});
