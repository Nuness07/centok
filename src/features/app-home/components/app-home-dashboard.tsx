"use client";

import { Plus, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Asset, Money } from "@/domain/models";
import { AssetLogo } from "@/components/financial/asset-logo";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";
import { PercentageChange } from "@/components/financial/percentage-change";
import { LoadingState } from "@/components/feedback/loading-state";
import { routes } from "@/config/routes";
import { useAssets } from "@/features/assets/hooks/use-assets";
import { usePortfolio } from "@/features/portfolio/hooks/use-portfolio";
import { useAvailableBalance } from "@/features/portfolio/hooks/use-balance";
import { QuantityDisplay } from "@/components/financial/quantity-display";
import { decimal, toFixed } from "@/lib/decimal";

export function AppHomeDashboard() {
  const router = useRouter();
  const portfolio = usePortfolio();
  const balance = useAvailableBalance();
  const assets = useAssets();
  const positions = portfolio.data?.positions ?? [];
  const portfolioValue = portfolio.data
    ? {
        amount: toFixed(decimal(portfolio.data.currentValue.amount).plus(portfolio.data.availableBalance.amount), 2),
        currency: "USDT" as const
      }
    : balance.data ?? { amount: "0.00", currency: "USDT" as const };
  const primaryAssets = (assets.data ?? []).slice(0, 6);

  return (
    <main className="mx-auto max-w-[1120px] space-y-7 p-4 md:p-6">
      <section className="rounded-[28px] border border-[#D7E4F4] bg-white p-5 shadow-[0_24px_70px_rgb(11_18_32_/_10%)] md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <LocalizedMoneyDisplay
              money={portfolioValue}
              className="mt-4"
              localClassName="text-5xl font-black leading-none text-[#0B1220] md:text-6xl"
              referenceClassName="mt-2 text-sm text-[#6F7A8F]"
            />
          </div>
        </div>
        <div className="mt-7 grid grid-cols-[1fr_1fr_auto] gap-2">
          <button
            type="button"
            onClick={() => router.push(routes.market("AAPL"))}
            className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-black text-white"
          >
            <TrendingUp size={16} aria-hidden="true" />
            Invest
          </button>
          <button
            type="button"
            onClick={() => globalThis.dispatchEvent(new Event("centok:add-funds"))}
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D7E4F4] bg-[#F4F6FA] px-4 text-sm font-black text-[#0B1220]"
          >
            <Plus size={16} aria-hidden="true" />
            Deposit
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <SectionTitle label="My portfolio" onClick={() => router.push(routes.portfolio)} />
        {portfolio.isLoading || balance.isLoading ? <LoadingState label="Loading portfolio" /> : null}
        <div className="space-y-2">
          {positions.slice(0, 3).map((position) => {
            const asset = assets.data?.find((item) => item.id === position.assetId);
            return (
              <PortfolioRow
                key={position.assetId}
                label={asset?.name ?? position.assetId}
                subtitle={`${asset?.symbol ?? "Stock Token"} · `}
                quantity={position.quantity}
                value={position.currentValue}
                symbol={asset?.symbol ?? "ST"}
                logoUrl={asset?.logoUrl}
              />
            );
          })}
          {balance.data ? (
            <PortfolioRow
              label="Available Balance"
              value={balance.data}
              symbol="US"
              muted
            />
          ) : null}
          {!portfolio.isLoading && positions.length === 0 ? (
            <p className="rounded-[20px] border border-[#D7E4F4] bg-[#F8FBFF] p-4 text-sm text-[#6F7A8F]">
              Your Stocks positions will appear here after the first simulated purchase.
            </p>
          ) : null}
        </div>
      </section>

      <section className="space-y-3">
        <SectionTitle label="Popular assets" onClick={() => router.push(routes.market("AAPL"))} />
        <div className="space-y-2">
          {assets.isLoading ? <LoadingState label="Loading assets" /> : null}
          {primaryAssets.map((asset) => (
            <PopularAssetRow key={asset.id} asset={asset} onClick={() => router.push(`${routes.market(asset.symbol)}?view=detail`)} />
          ))}
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ label, onClick }: Readonly<{ label: string; onClick: () => void }>) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-2 text-left text-lg font-black text-[#111827]">
      {label}
      <span className="text-[#6F7A8F]">›</span>
    </button>
  );
}

function PortfolioRow({
  label,
  subtitle,
  quantity,
  value,
  symbol,
  logoUrl,
  muted
}: Readonly<{
  label: string;
  subtitle?: string;
  quantity?: string;
  value: Money;
  symbol: string;
  logoUrl?: string;
  muted?: boolean;
}>) {
  return (
    <article className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[20px] border border-[#D7E4F4] bg-white p-3">
      <AssetLogo symbol={symbol} src={logoUrl} className="h-11 w-11 bg-[#E8EEF8]" />
      <div className="min-w-0">
        <h3 className="truncate font-bold text-[#111827]">{label}</h3>
        <p className="truncate text-sm text-[#6F7A8F]">
          {subtitle}
          {quantity ? <QuantityDisplay quantity={quantity} /> : null}
        </p>
      </div>
      <LocalizedMoneyDisplay money={value} className="items-end text-right" localClassName="font-black text-[#111827]" referenceClassName="text-[#6F7A8F]" />
    </article>
  );
}

function PopularAssetRow({ asset, onClick }: Readonly<{ asset: Asset; onClick: () => void }>) {
  const companyName = asset.name.split(",")[0];

  return (
    <button type="button" onClick={onClick} className="grid min-h-[76px] w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[20px] border border-[#D7E4F4] bg-white p-3 text-left transition hover:bg-[#F8FBFF]">
      <AssetLogo symbol={asset.symbol} src={asset.logoUrl} className="h-11 w-11 bg-[#E8EEF8]" />
      <span className="min-w-0">
        <span className="block truncate font-bold text-[#111827]">{asset.symbol}</span>
        <span className="block truncate text-sm text-[#6F7A8F]">{companyName}</span>
      </span>
      <span className="self-center text-right">
        <LocalizedMoneyDisplay money={asset.price} className="items-end" localClassName="text-sm font-black text-[#111827]" referenceClassName="hidden" hideReference />
        <PercentageChange value={asset.changePercentage} className="justify-end text-xs" />
      </span>
    </button>
  );
}
