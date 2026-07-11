import { AssetDashboardLayout } from "@/features/assets/components/asset-dashboard-layout";

export default function MarketPage({ params, searchParams }: Readonly<{ params: { symbol: string }; searchParams?: { view?: string | string[] } }>) {
  const view = Array.isArray(searchParams?.view) ? searchParams?.view[0] : searchParams?.view;
  return <AssetDashboardLayout symbol={params.symbol} startInDetail={view === "detail"} />;
}
