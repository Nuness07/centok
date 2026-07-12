import { ArrowRight, Building2, CreditCard, LineChart } from "lucide-react";

export function ProductPreview() {
  return (
    <div className="rounded-lg border border-border-light bg-white p-4 shadow-panel" aria-label="Centok product preview">
      <div className="rounded-md bg-background p-4 text-white">
        <div className="mb-4 flex items-center justify-between border-b border-border-dark pb-3">
          <span className="font-semibold">Centok</span>
          <span className="rounded bg-primary px-2 py-1 text-xs font-semibold">Available 24/7</span>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { icon: CreditCard, label: "Add funds", value: "PIX to balance" },
            { icon: Building2, label: "Choose company", value: "AAPL, NVDA, MSFT" },
            { icon: LineChart, label: "Review order", value: "Fees and estimate" }
          ].map((item, index) => (
            <div key={item.label} className="rounded-md border border-border-dark bg-elevated p-3">
              <item.icon size={18} className="text-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold">{item.label}</p>
              <p className="mt-1 text-xs text-text-muted-dark">{item.value}</p>
              {index < 2 ? <ArrowRight className="mt-3 text-text-muted-dark" size={16} aria-hidden="true" /> : null}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-md bg-white p-4 text-text-dark">
          <div className="flex items-center justify-between text-sm">
            <span>Apple Stock Token</span>
            <strong>80.00 USDT</strong>
          </div>
          <div className="mt-3 h-24 rounded bg-surface-muted" />
        </div>
      </div>
    </div>
  );
}
