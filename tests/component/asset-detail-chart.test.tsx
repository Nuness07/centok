import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AssetDetail } from "@/features/assets/components/asset-detail";
import { ChartRangeSelector } from "@/features/charts/components/chart-range-selector";
import { supportedAssets } from "@/infrastructure/mocks/fixtures/assets";

describe("asset detail and chart controls", () => {
  it("shows company details and chart ranges", () => {
    render(
      <>
        <AssetDetail asset={supportedAssets[0]} />
        <ChartRangeSelector range="1D" onRangeChange={() => undefined} />
      </>
    );
    expect(screen.getByText(/Apple Inc/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "MAX" })).toBeInTheDocument();
  });
});
