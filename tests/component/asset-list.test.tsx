import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AssetList } from "@/features/assets/components/asset-list";
import { renderWithProviders } from "./render-with-providers";

describe("asset list", () => {
  it("renders search and loading state", () => {
    renderWithProviders(<AssetList selectedSymbol="AAPL" />);
    expect(screen.getByLabelText(/Search company or ticker/i)).toBeInTheDocument();
  });
});
