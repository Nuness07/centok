import { supportedAssets } from "./assets";

export const currentPrices = Object.fromEntries(
  supportedAssets.map((asset) => [asset.symbol, asset.price])
);
