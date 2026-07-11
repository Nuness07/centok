import type { Asset } from "@/domain/models";
import { AssetLogo } from "@/components/financial/asset-logo";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";
import { PercentageChange } from "@/components/financial/percentage-change";

export function AssetDetail({ asset }: { asset: Asset }) {
  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#D7E4F4] p-5">
        <div className="flex items-center gap-3">
          <AssetLogo symbol={asset.symbol} src={asset.logoUrl} className="h-12 w-12 bg-[#E8EEF8]" />
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">{asset.symbol} / {asset.name.split(",")[0]}</h1>
        <p className="mt-1 font-mono text-sm text-[#6F7A8F]">Tokenized exposure · Handled by Centok</p>
          </div>
        </div>
        <div className="text-right">
          <LocalizedMoneyDisplay money={asset.price} className="items-end" localClassName="block text-3xl font-black text-[#111827]" referenceClassName="text-[#6F7A8F]" />
          <PercentageChange value={asset.changePercentage} className="justify-end" />
        </div>
      </div>
      <div className="grid gap-px bg-[#D7E4F4]">
        <div className="bg-white p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6F7A8F]">Company</p>
          <p className="mt-2 text-sm leading-6 text-[#334155]">{asset.description}</p>
        </div>
      </div>
    </section>
  );
}
