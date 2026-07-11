import type { ChartRange } from "@/domain/models";
import { chartRanges } from "@/domain/models";
import { cn } from "@/lib/cn";

export function ChartRangeSelector({ range, onRangeChange }: { range: ChartRange; onRangeChange: (range: ChartRange) => void }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-full border border-[#D7E4F4] bg-[#F6F9FF] p-1" aria-label="Chart range">
      {chartRanges.map((item) => (
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
