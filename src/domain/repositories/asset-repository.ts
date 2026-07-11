import type { Asset, ChartRange, PricePoint } from "../models";

export interface AssetRepository {
  listAssets(): Promise<Asset[]>;
  getAsset(symbol: string): Promise<Asset>;
  getPriceHistory(symbol: string, range: ChartRange): Promise<PricePoint[]>;
}
