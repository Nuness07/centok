import type { Portfolio } from "@/domain/models";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";
import { PercentageChange } from "@/components/financial/percentage-change";

export function PortfolioSummary({ portfolio }: { portfolio: Portfolio }) {
  const cards = [
    { label: "Portfolio value", value: portfolio.currentValue },
    { label: "Available balance", value: portfolio.availableBalance },
    { label: "Total invested", value: portfolio.totalInvested },
    { label: "Unrealized gain/loss", value: portfolio.totalGain, percentage: portfolio.totalGainPercentage }
  ];

  return (
    <section className="grid gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-[18px] border border-[#D7E4F4] bg-white p-4 shadow-[0_18px_50px_rgb(11_18_32_/_8%)]">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6F7A8F]">{card.label}</p>
          <LocalizedMoneyDisplay money={card.value} className="mt-3" localClassName="text-2xl font-black text-[#111827]" referenceClassName="text-[#6F7A8F]" />
          {typeof card.percentage === "number" ? <PercentageChange value={card.percentage} className="mt-2" /> : null}
        </div>
      ))}
    </section>
  );
}
