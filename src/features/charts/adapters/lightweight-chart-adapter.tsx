"use client";

import type { ChartAdapterProps } from "../types/chart";
import { LocalizedMoneyDisplay } from "@/components/financial/localized-money-display";

export function LightweightChartAdapter({ points, positive }: ChartAdapterProps) {
  const width = 720;
  const height = 340;
  const values = points.map((point) => Number(point.value));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = max - min || 1;
  const path = points
    .map((point, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * width;
      const y = height - ((Number(point.value) - min) / spread) * (height - 24) - 12;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  const latest = points.at(-1)?.value ?? "0";

  return (
    <div className="relative h-[240px] w-full min-w-0 max-w-full overflow-hidden rounded-[14px] border border-[#D7E4F4] bg-[#F8FBFF] p-1 [background-image:linear-gradient(rgb(184_200_224_/_24%)_1px,transparent_1px),linear-gradient(90deg,rgb(184_200_224_/_24%)_1px,transparent_1px)] [background-size:64px_52px] sm:h-[260px] md:h-[380px] md:rounded-[16px] md:p-3 md:[background-size:90px_72px]">
      <svg viewBox={`0 0 ${width} ${height}`} className="block h-full w-full max-w-full" preserveAspectRatio="none" role="img" aria-label="Price history chart">
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={positive ? "#16A36A" : "#DC3545"} stopOpacity="0.16" />
            <stop offset="100%" stopColor={positive ? "#16A36A" : "#DC3545"} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L${width},${height} L0,${height} Z`} fill="url(#chartFill)" />
        <path d={path} fill="none" stroke="#D9CCB0" strokeWidth="2.3" strokeLinecap="round" />
      </svg>
      <span className="absolute right-3 top-3 hidden rounded-full border border-[#D7E4F4] bg-white px-3 py-1 text-xs font-semibold text-[#111827] sm:inline-flex">
        Last <LocalizedMoneyDisplay money={{ amount: latest, currency: "USDT" }} className="inline-flex align-middle" localClassName="text-[#111827]" referenceClassName="hidden" hideReference />
      </span>
    </div>
  );
}
