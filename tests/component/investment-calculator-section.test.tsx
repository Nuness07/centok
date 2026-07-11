import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InvestmentCalculatorSection } from "@/features/marketing/components/investment-calculator-section";
import { renderWithProviders } from "./render-with-providers";

describe("investment calculator section", () => {
  it("renders the default local currency and stock estimate", async () => {
    renderWithProviders(<InvestmentCalculatorSection />);

    expect(screen.getByRole("heading", { name: /See the local cost before opening the app/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount to pay/i)).toHaveValue("500.00");
    expect(await screen.findByText(/Apple Inc\./i)).toBeInTheDocument();
    expect(screen.getByText(/0\.433742/i)).toBeInTheDocument();
    expect(screen.getByText(/Simulated estimate/i)).toBeInTheDocument();
  });

  it("recalculates when the user changes currency and stock token", async () => {
    renderWithProviders(<InvestmentCalculatorSection />);

    await screen.findByText(/Apple Inc\./i);

    fireEvent.change(screen.getByLabelText(/Payment currency/i), { target: { value: "MXN" } });
    expect(screen.getByLabelText(/Amount to pay/i)).toHaveValue("2000.00");

    fireEvent.change(screen.getByLabelText(/Stock token/i), { target: { value: "NVDA" } });

    await waitFor(() => {
      expect(screen.getByText(/NVIDIA Corporation/i)).toBeInTheDocument();
      expect(screen.getByText(/0\.853922/i)).toBeInTheDocument();
    });
  });

  it("inverts the calculator to estimate local payment from stock quantity", async () => {
    renderWithProviders(<InvestmentCalculatorSection />);

    await screen.findByText(/Apple Inc\./i);
    fireEvent.click(screen.getByRole("button", { name: /Invert calculator/i }));
    fireEvent.change(screen.getByLabelText(/Stock token quantity/i), { target: { value: "1" } });

    expect(screen.getByText(/Estimated local payment/i)).toBeInTheDocument();
    expect(screen.getByText(/1,146\.23/i)).toBeInTheDocument();
  });
});
