"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Asset } from "@/domain/models";
import { routes } from "@/config/routes";
import { useAssets } from "../hooks/use-assets";
import { AssetListItem } from "./asset-list-item";
import { AssetSearch, filterAssets } from "./asset-search";
import { AssetListEmpty, AssetListLoading } from "./asset-list-states";

export function AssetList({ selectedSymbol, onSelectAsset }: Readonly<{ selectedSymbol: string; onSelectAsset?: (asset: Asset) => void }>) {
  const router = useRouter();
  const assets = useAssets();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => filterAssets(assets.data ?? [], query), [assets.data, query]);

  const selectAsset = (asset: Asset) => {
    if (onSelectAsset) {
      onSelectAsset(asset);
      return;
    }
    router.push(routes.market(asset.symbol));
  };

  return (
    <aside className="flex min-h-0 flex-col rounded-[20px] border border-[#D7E4F4] bg-white p-3 shadow-[0_24px_70px_rgb(11_18_32_/_10%)] xl:min-h-[650px]">
      <div className="mb-3 px-2 pt-2">
        <h2 className="text-xs font-black uppercase tracking-[0.18em] text-[#6F7A8F]">Markets</h2>
        <p className="mt-1 text-sm font-semibold text-[#111827]">Stock Tokens</p>
      </div>
      <AssetSearch query={query} onQueryChange={setQuery} />
      <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1">
        {assets.isLoading ? <AssetListLoading /> : null}
        {!assets.isLoading && filtered.length === 0 ? <AssetListEmpty /> : null}
        {filtered.map((asset) => (
          <AssetListItem
            key={asset.id}
            asset={asset}
            selected={asset.symbol === selectedSymbol}
            onSelect={selectAsset}
          />
        ))}
      </div>
    </aside>
  );
}
