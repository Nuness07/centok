"use client";

import { useState } from "react";
import { ArrowLeft, ChartLine, Flame, Maximize, Star } from "lucide-react";
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
    <main className="min-h-[650px] w-full min-w-0 max-w-full overflow-hidden rounded-[18px] border border-[#D7E4F4] bg-white shadow-[0_24px_70px_rgb(11_18_32_/_10%)] md:rounded-[20px]">
      <div className="flex items-center justify-between border-b border-[#D7E4F4] px-3 py-2 xl:hidden">
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
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white disabled:cursor-default disabled:opacity-40"
          aria-label="Back to dashboard"
          disabled={!showMobileBack}
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D7E4F4] bg-[#F6F9FF] text-[#0B1220]" aria-label="Add to watchlist">
          <Star size={16} aria-hidden="true" />
        </button>
      </div>
      <AssetDetail asset={asset} />
      <div className="flex items-center justify-between gap-2 border-b border-[#D7E4F4] bg-[#F8FBFF] px-3 py-2">
        <div className="flex min-w-0 items-center gap-2 text-sm font-black text-[#111827]">
          <span>{range}</span>
          <span className="h-5 w-px bg-[#D7E4F4]" aria-hidden="true" />
          <ChartLine size={17} aria-hidden="true" />
          <span className="hidden sm:inline">Indicators</span>
        </div>
        <div className="flex items-center gap-2 text-[#6F7A8F]">
          <Flame size={17} aria-hidden="true" />
          <Maximize size={17} aria-hidden="true" />
        </div>
      </div>
      <div className="min-w-0 overflow-hidden border-b border-[#D7E4F4] p-2 md:p-4">
        <MarketChart symbol={asset.symbol} range={range} positive={asset.changePercentage >= 0} />
      </div>
      <div className="min-w-0 overflow-hidden border-b border-[#D7E4F4] px-2 py-3 md:px-4">
        <ChartRangeSelector range={range} onRangeChange={setRange} />
      </div>
      <section className="p-4">
        <h2 className="text-base font-black text-[#111827]">About</h2>
        <p className="mt-2 text-sm leading-6 text-[#334155]">{asset.description}</p>
      </section>
    </main>
  );
}
