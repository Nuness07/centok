import type { Asset } from "@/domain/models";
import { AssetLogo } from "@/components/financial/asset-logo";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";
import { PercentageChange } from "@/components/financial/percentage-change";
import { cn } from "@/lib/cn";

export function AssetListItem({
  asset,
  selected,
  onSelect
}: Readonly<{
  asset: Asset;
  selected: boolean;
  onSelect: (asset: Asset) => void;
}>) {
  return (
    <button
      type="button"
      onClick={() => onSelect(asset)}
      className={cn(
        "grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border p-3 text-left transition",
        selected ? "border-primary/55 bg-[#EFF4FF]" : "border-[#D7E4F4] bg-white hover:bg-[#F8FBFF]"
      )}
      aria-pressed={selected}
    >
      <AssetLogo symbol={asset.symbol} src={asset.logoUrl} className={cn("h-10 w-10", selected ? "bg-white" : "bg-[#E8EEF8]")} />
      <span className="min-w-0">
        <span className="block text-sm font-bold leading-tight text-[#111827]">{asset.symbol}</span>
        <span className="block truncate text-xs text-[#6F7A8F]">{asset.name}</span>
        <LocalizedMoneyDisplay
          money={asset.price}
          className="mt-1 items-start"
          localClassName="block text-[1.15rem] font-bold leading-tight text-[#111827]"
          referenceClassName="hidden"
          hideReference
        />
      </span>
      <span className="self-center text-right">
        <PercentageChange value={asset.changePercentage} className="justify-end text-sm" />
      </span>
    </button>
  );
}
