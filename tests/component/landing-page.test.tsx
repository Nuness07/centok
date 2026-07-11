import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { renderWithProviders } from "./render-with-providers";

describe("landing page", () => {
  it("shows CTA, product sections, and disclosure", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole("heading", { name: /Buy U\.S\. Stocks without bureaucracy/i })).toBeInTheDocument();
    expect(screen.getByText(/A new way to use Stocks/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Powered by Robinhood/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Get started/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /See the local cost before opening the app/i })).toBeInTheDocument();
    expect(screen.getByText(/Stock Tokens provide economic exposure/i)).toBeInTheDocument();
  });
});


