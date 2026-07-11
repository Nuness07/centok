"use client";

import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { usePortfolio } from "@/features/portfolio/hooks/use-portfolio";
import { PortfolioEmptyState } from "@/features/portfolio/components/portfolio-empty-state";
import { PortfolioSummary } from "@/features/portfolio/components/portfolio-summary";
import { PositionList } from "@/features/portfolio/components/position-list";

export default function PortfolioPage() {
  const portfolio = usePortfolio();

  return (
    <main className="mx-auto max-w-[1280px] space-y-6 p-4 md:p-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6F7A8F]">Demo account</p>
        <h1 className="mt-2 text-3xl font-black text-[#111827]">Portfolio</h1>
        <p className="mt-1 text-sm text-[#6F7A8F]">Simulated holdings and available balance for the demo account.</p>
      </div>
      {portfolio.isLoading ? <LoadingState label="Loading portfolio" /> : null}
      {portfolio.isError ? <ErrorState title="Portfolio unavailable" description="Reload or reset the demo state." onRetry={() => portfolio.refetch()} /> : null}
      {portfolio.data ? <PortfolioSummary portfolio={portfolio.data} /> : null}
      {portfolio.data && portfolio.data.positions.length === 0 ? <PortfolioEmptyState /> : null}
      {portfolio.data && portfolio.data.positions.length > 0 ? <PositionList positions={portfolio.data.positions} /> : null}
    </main>
  );
}
