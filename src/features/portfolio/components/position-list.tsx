"use client";

import type { PortfolioPosition } from "@/domain/models";
import { AssetLogo } from "@/components/financial/asset-logo";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";
import { PercentageChange } from "@/components/financial/percentage-change";
import { QuantityDisplay } from "@/components/financial/quantity-display";
import { useAssets } from "@/features/assets/hooks/use-assets";

export function PositionList({ positions }: { positions: PortfolioPosition[] }) {
  const assets = useAssets();
  const assetById = new Map((assets.data ?? []).map((asset) => [asset.id, asset]));

  return (
    <section className="rounded-[20px] border border-white/[0.08] bg-[#11141A]/95 p-4 shadow-[0_24px_70px_rgb(0_0_0_/_18%)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Positions</h2>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-bold text-[#8E98AA]">{positions.length} holdings</span>
      </div>
      <div className="space-y-3">
        {positions.map((position) => {
          const asset = assetById.get(position.assetId);
          return (
            <article key={position.assetId} className="grid gap-3 rounded-[16px] border border-white/[0.08] bg-white/[0.035] p-4 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:items-center">
              <div className="flex items-center gap-3">
                <AssetLogo symbol={asset?.symbol ?? "ST"} src={asset?.logoUrl} className="h-10 w-10 bg-white" />
                <div>
                  <h3 className="font-semibold text-white">{asset?.name ?? position.assetId}</h3>
                  <p className="text-sm text-[#8E98AA]">{asset?.symbol ?? "Stock Token"}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#8E98AA]">Quantity</p>
                <p className="font-semibold text-white"><QuantityDisplay quantity={position.quantity} /></p>
              </div>
              <div>
                <p className="text-xs text-[#8E98AA]">Current value</p>
                <LocalizedMoneyDisplay money={position.currentValue} localClassName="font-semibold text-white" />
              </div>
              <div>
                <p className="text-xs text-[#8E98AA]">Gain/loss</p>
                <LocalizedMoneyDisplay money={position.unrealizedGain} localClassName="font-semibold text-white" />
                <PercentageChange value={position.unrealizedGainPercentage} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
