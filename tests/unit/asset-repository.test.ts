import { describe, expect, it } from "vitest";
import { getServiceRegistry } from "@/infrastructure/mocks/service-registry";

describe("AssetRepository", () => {
  it("lists and retrieves supported assets", async () => {
    const { assetRepository } = getServiceRegistry();
    const assets = await assetRepository.listAssets();
    expect(assets.map((asset) => asset.symbol)).toContain("AAPL");
    await expect(assetRepository.getAsset("NVDA")).resolves.toMatchObject({ symbol: "NVDA" });
  });

  it("filters assets by company or ticker semantics", async () => {
    const { assetRepository } = getServiceRegistry();
    const assets = await assetRepository.listAssets();
    expect(assets.filter((asset) => asset.name.toLowerCase().includes("apple"))).toHaveLength(1);
  });
});
