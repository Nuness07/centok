import type { Asset } from "@/domain/models";
import type { ReactNode } from "react";
import { AssetLogo } from "@/components/financial/asset-logo";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";
import { PercentageChange } from "@/components/financial/percentage-change";
import { formatCompactUsd } from "@/lib/market-metrics";

export function AssetDetail({ asset }: { asset: Asset }) {
  const metrics = getAssetMetrics(asset.symbol);

  return (
    <section className="border-b border-[#D7E4F4]">
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-3">
          <AssetLogo symbol={asset.symbol} src={asset.logoUrl} className="h-11 w-11 bg-[#E8EEF8] md:h-12 md:w-12" />
          <div className="min-w-0">
            <h1 className="truncate text-lg font-black leading-tight text-[#111827] md:text-2xl">
              {asset.symbol} / {asset.name.split(",")[0]}
            </h1>
            <p className="mt-1 text-xs font-semibold text-[#6F7A8F] md:text-sm">Stock Token</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-4">
          <Metric
            label="Price"
            value={
              <LocalizedMoneyDisplay
                money={asset.price}
                localClassName="text-2xl font-black leading-none text-[#111827] md:text-3xl"
                referenceClassName="mt-1 text-[11px] text-[#6F7A8F]"
              />
            }
          />
          <Metric label="24h Change" value={<PercentageChange value={asset.changePercentage} className="text-base font-black md:text-lg" />} />
          <Metric label="24h Volume" value={formatCompactUsd(metrics.volume)} />
          <Metric label="Market Cap" value={formatCompactUsd(metrics.marketCap)} />
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold text-[#6F7A8F]">{label}</p>
      <div className="mt-1 text-lg font-black leading-tight text-[#111827]">{value}</div>
    </div>
  );
}

function getAssetMetrics(symbol: string) {
  const seed = symbol.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return {
    volume: (seed % 70) * 1_000_000 + 22_500_000,
    marketCap: (seed % 900) * 1_000_000_000 + 120_000_000_000
  };
}
