"use client";

import { useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Asset, ChartRange } from "@/domain/models";
import { MarketChart } from "@/features/charts/components/market-chart";
import { ChartRangeSelector } from "@/features/charts/components/chart-range-selector";
import { AssetDetail } from "./asset-detail";

export function AssetDashboardPanel({
  asset,
  showMobileBack = true,
  onMobileBack
}: Readonly<{ asset: Asset; showMobileBack?: boolean; onMobileBack?: () => void }>) {
  const [range, setRange] = useState<ChartRange>("1D");
  const router = useRouter();

  return (
    <main className="min-h-[650px] overflow-hidden rounded-[20px] border border-[#D7E4F4] bg-white shadow-[0_24px_70px_rgb(11_18_32_/_10%)]">
      <div className="flex items-center justify-between border-b border-[#D7E4F4] p-3 xl:hidden">
        <button
          type="button"
          onClick={() => {
            if (!showMobileBack) return;
            if (onMobileBack) {
              onMobileBack();
              return;
            }
            router.push("/app");
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white disabled:cursor-default disabled:opacity-40"
          aria-label="Back to dashboard"
          disabled={!showMobileBack}
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D7E4F4] bg-[#F6F9FF] text-[#0B1220]" aria-label="Add to watchlist">
          <Star size={18} aria-hidden="true" />
        </button>
      </div>
      <AssetDetail asset={asset} />
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D7E4F4] px-4 py-3">
        <div>
          <h2 className="text-sm font-bold text-[#111827]">{asset.symbol} price history</h2>
          <p className="text-xs text-[#6F7A8F]">Deterministic mock chart</p>
        </div>
        <ChartRangeSelector range={range} onRangeChange={setRange} />
      </div>
      <div className="p-4">
        <MarketChart symbol={asset.symbol} range={range} positive={asset.changePercentage >= 0} />
      </div>
    </main>
  );
}
