"use client";

import { useMemo, useState } from "react";
import type { TransactionType } from "@/domain/models";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/feedback/empty-state";
import { cn } from "@/lib/cn";
import { useAssets } from "@/features/assets/hooks/use-assets";
import { useActivity } from "../hooks/use-activity";
import { ActivityItem } from "./activity-item";

export function ActivityHistory() {
  const [filter, setFilter] = useState<TransactionType | "all">("all");
  const activity = useActivity();
  const assets = useAssets();
  const assetById = new Map((assets.data ?? []).map((asset) => [asset.id, asset]));
  const transactions = useMemo(
    () => (activity.data ?? []).filter((transaction) => filter === "all" || transaction.type === filter),
    [activity.data, filter]
  );

  return (
    <section className="rounded-[20px] border border-[#D7E4F4] bg-white p-4 shadow-[0_24px_70px_rgb(11_18_32_/_8%)]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-[#111827]">Transaction history</h2>
        <div className="flex rounded-full border border-[#D7E4F4] bg-[#F8FBFF] p-1">
          {(["all", "funding", "purchase"] as const).map((item) => (
            <Button key={item} variant="ghost" className={cn("min-h-8 rounded-full border-0 px-3 text-xs", filter === item ? "bg-primary text-white hover:bg-primary" : "text-[#6F7A8F] hover:bg-white hover:text-[#111827]")} onClick={() => setFilter(item)}>
              {item === "all" ? "All" : item === "funding" ? "Funding" : "Purchases"}
            </Button>
          ))}
        </div>
      </div>
      {transactions.length === 0 ? (
        <EmptyState title="No matching activity" description="Funding and purchase transactions will appear here." />
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <ActivityItem key={transaction.id} transaction={transaction} asset={transaction.assetId ? assetById.get(transaction.assetId) : undefined} />
          ))}
        </div>
      )}
    </section>
  );
}
