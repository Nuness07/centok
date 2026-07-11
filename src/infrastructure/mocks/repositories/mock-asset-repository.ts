import type { AssetRepository } from "@/domain/repositories/asset-repository";
import type { Asset, ChartRange, PricePoint } from "@/domain/models";
import { AssetUnavailableError } from "@/domain/errors/domain-errors";
import { supportedAssets } from "../fixtures/assets";
import { createPriceHistory } from "../fixtures/price-history";
import { getDemoState } from "../demo-state-store";
import { withLatency } from "../mock-runtime";

export class MockAssetRepository implements AssetRepository {
  listAssets(): Promise<Asset[]> {
    return withLatency(() => supportedAssets, 280);
  }

  getAsset(symbol: string): Promise<Asset> {
    return withLatency(() => {
      const asset = supportedAssets.find((item) => item.symbol.toLowerCase() === symbol.toLowerCase());
      if (!asset) throw new AssetUnavailableError("This Stock Token is not supported in the demo.");
      return asset;
    }, 260);
  }

  getPriceHistory(symbol: string, range: ChartRange): Promise<PricePoint[]> {
    return withLatency(() => {
      if (getDemoState().scenario === "chart-error") {
        throw new Error("Chart data is unavailable in this scenario.");
      }
      return createPriceHistory(symbol, range);
    }, 360);
  }
}
