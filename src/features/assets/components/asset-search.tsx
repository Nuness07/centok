"use client";

import type { Asset } from "@/domain/models";
import { Input } from "@/components/ui/input";

export function AssetSearch({ query, onQueryChange }: { query: string; onQueryChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="sr-only">Search supported Stock Tokens</span>
      <Input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search company or ticker"
        aria-label="Search company or ticker"
        className="h-11 rounded-2xl border-[#D7E4F4] bg-[#F8FBFF] text-sm text-[#111827] placeholder:text-[#6F7A8F]"
      />
    </label>
  );
}

export function filterAssets(assets: Asset[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return assets;
  return assets.filter(
    (asset) => asset.symbol.toLowerCase().includes(normalized) || asset.name.toLowerCase().includes(normalized)
  );
}
