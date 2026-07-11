import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoLoginCard } from "@/features/auth/components/demo-login-card";
import { renderWithProviders } from "./render-with-providers";

describe("mock login", () => {
  it("renders the demo account entry point", () => {
    renderWithProviders(<DemoLoginCard />);
    expect(screen.getByText(/Gabriel Demo/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Continue with demo account/i })).toBeInTheDocument();
  });
});
