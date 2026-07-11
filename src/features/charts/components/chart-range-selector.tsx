import type { ChartRange } from "@/domain/models";
import { chartRanges } from "@/domain/models";
import { cn } from "@/lib/cn";

export function ChartRangeSelector({ range, onRangeChange }: { range: ChartRange; onRangeChange: (range: ChartRange) => void }) {
  const visibleRanges = chartRanges.filter((item) => item !== "LIVE" && item !== "5D" && item !== "YTD");

  return (
    <div className="flex w-full gap-1 overflow-x-auto rounded-full border border-[#D7E4F4] bg-[#F6F9FF] p-1 md:w-auto md:flex-wrap" aria-label="Chart range">
      {visibleRanges.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onRangeChange(item)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-bold transition",
            range === item ? "bg-primary text-white" : "text-[#6F7A8F] hover:bg-white hover:text-[#111827]"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
