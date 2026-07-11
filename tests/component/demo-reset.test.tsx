import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoResetDialog } from "@/features/demo/components/demo-reset-dialog";
import { renderWithProviders } from "./render-with-providers";

describe("demo reset", () => {
  it("requires explicit confirmation", () => {
    renderWithProviders(<DemoResetDialog open onOpenChange={() => undefined} />);
    expect(screen.getByRole("button", { name: /Reset demo/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });
});
