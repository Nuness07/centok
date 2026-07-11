"use client";

import { ChevronDown, ChevronsUpDown, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";

import { landingCalculatorDefaults, landingPaymentCurrencies, type LandingPaymentCurrency } from "@/config/landing-calculator";
import { calculateInvestmentPreview, calculateInvestmentPreviewFromQuantity, investmentPreviewRates } from "@/domain/calculations/investment-preview";
import type { Asset } from "@/domain/models";
import { useAssets } from "@/features/assets/hooks/use-assets";
import { cn } from "@/lib/cn";
import { formatMoney, formatQuantity } from "@/lib/currency";
import { DemoEntryButton } from "./demo-entry-button";

type CalculatorMode = "local-to-stock" | "stock-to-local";

export function InvestmentCalculatorSection() {
  const assets = useAssets();
  const [mode, setMode] = useState<CalculatorMode>("local-to-stock");
  const [currency, setCurrency] = useState<LandingPaymentCurrency>(landingCalculatorDefaults.currency);
  const [amount, setAmount] = useState(landingCalculatorDefaults.amount);
  const [quantity, setQuantity] = useState("1");
  const [symbol, setSymbol] = useState(landingCalculatorDefaults.symbol);

  const activeCurrency = landingPaymentCurrencies.find((item) => item.currency === currency) ?? landingPaymentCurrencies[0];
  const activeAssets = useMemo(() => assets.data?.filter((asset) => asset.status === "active") ?? [], [assets.data]);
  const selectedAsset = activeAssets.find((asset) => asset.symbol === symbol) ?? activeAssets[0];

  const preview = useMemo(() => {
    if (!selectedAsset) return null;

    if (mode === "stock-to-local") {
      return calculateInvestmentPreviewFromQuantity({
        quantity: normalizeAmount(quantity),
        currency,
        assetId: selectedAsset.id,
        assetPrice: selectedAsset.price
      });
    }

    return calculateInvestmentPreview({
      sourceAmount: { amount: normalizeAmount(amount), currency },
      assetId: selectedAsset.id,
      assetPrice: selectedAsset.price
    });
  }, [amount, currency, mode, quantity, selectedAsset]);

  function handleCurrencyChange(nextCurrency: LandingPaymentCurrency) {
    const nextOption = landingPaymentCurrencies.find((item) => item.currency === nextCurrency) ?? landingPaymentCurrencies[0];
    setCurrency(nextCurrency);
    if (mode === "local-to-stock") {
      setAmount(nextOption.defaultAmount);
    }
  }

  function toggleMode() {
    if (mode === "local-to-stock") {
      if (preview) setQuantity(preview.estimatedQuantity);
      setMode("stock-to-local");
      return;
    }

    if (preview) setAmount(preview.sourceAmount.amount);
    setMode("local-to-stock");
  }

  return (
    <section className="bg-[#080A0F] px-4 pb-24 text-white md:px-6 md:pb-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Estimate your first purchase</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#F5F7FB] md:text-6xl">
            See the local cost before opening the app.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#9AA4B5] md:text-lg">
            Pick a local currency and a supported U.S. company. Centok shows a simulated conversion, fees, and the estimated Stock Token amount.
          </p>
          <DemoEntryButton
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-bold text-white transition hover:bg-primary-hover"
          >
            Start with this estimate
          </DemoEntryButton>
        </div>

        <div className="w-full rounded-[32px] border border-white/[0.08] bg-[#11141A] p-4 shadow-[0_28px_90px_rgb(0_0_0_/_34%)] md:p-6 lg:max-w-[620px] lg:justify-self-end">
          <div className="mb-5 flex items-center justify-between gap-4 px-1">
            <div>
              <p className="text-base font-bold text-white">Calculator</p>
              <p className="mt-1 text-sm text-[#8E98AA]">Simulated quote</p>
            </div>
            <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-primary">
              Offline mock
            </span>
          </div>

          <div className="relative grid gap-3">
            <CalculatorPanel label="I have">
              {mode === "local-to-stock" ? (
                <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <CurrencySelect value={currency} onChange={handleCurrencyChange} />
                  <input
                    aria-label="Amount to pay"
                    inputMode="decimal"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    className="min-w-0 max-w-full bg-transparent text-left text-3xl font-black leading-none text-white outline-none placeholder:text-white/30 md:w-full md:text-right md:text-4xl lg:text-[2.75rem]"
                    placeholder="0.00"
                  />
                </div>
              ) : (
                <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <AssetSelect assets={activeAssets} value={selectedAsset?.symbol ?? ""} onChange={setSymbol} isLoading={assets.isLoading} />
                  <input
                    aria-label="Stock token quantity"
                    inputMode="decimal"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    className="min-w-0 max-w-full bg-transparent text-left text-3xl font-black leading-none text-white outline-none placeholder:text-white/30 md:w-full md:text-right md:text-4xl lg:text-[2.75rem]"
                    placeholder="0"
                  />
                </div>
              )}
            </CalculatorPanel>

            <button
              type="button"
              aria-label="Invert calculator"
              onClick={toggleMode}
              className="absolute left-1/2 top-[calc(50%-2.25rem)] z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#080A0F] text-white shadow-[0_16px_40px_rgb(0_0_0_/_34%)] transition hover:border-primary/40 hover:text-primary"
            >
              <ChevronsUpDown size={22} aria-hidden="true" />
            </button>

            <CalculatorPanel label="I want">
              {mode === "local-to-stock" ? (
                <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <AssetSelect assets={activeAssets} value={selectedAsset?.symbol ?? ""} onChange={setSymbol} isLoading={assets.isLoading} />
                  <div className="min-w-0 max-w-full text-left md:text-right" aria-live="polite">
                    <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-3xl font-black leading-none text-white md:text-4xl lg:text-[2.75rem]">
                      {preview ? formatQuantity(preview.estimatedQuantity) : "---"}
                    </p>
                    <p className="mt-2 truncate text-sm font-semibold text-[#8E98AA]">{selectedAsset ? `${selectedAsset.symbol} Stock Token` : "Stock Token"}</p>
                  </div>
                </div>
              ) : (
                <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <CurrencySelect value={currency} onChange={handleCurrencyChange} />
                  <div className="min-w-0 max-w-full text-left md:text-right" aria-live="polite">
                    <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-3xl font-black leading-none text-white md:text-4xl lg:text-[2.75rem]">
                      {preview ? formatMoney(preview.sourceAmount) : "---"}
                    </p>
                    <p className="mt-2 truncate text-sm font-semibold text-[#8E98AA]">Estimated local payment</p>
                  </div>
                </div>
              )}
            </CalculatorPanel>
          </div>

          <QuoteBreakdown preview={preview} asset={selectedAsset} currency={currency} paymentMethod={activeCurrency.paymentMethod} mode={mode} />
        </div>
      </div>
    </section>
  );
}

function CalculatorPanel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-white/[0.06] bg-[#171B22] p-5 md:p-6">
      <p className="mb-4 text-sm font-bold text-[#B5BECF]">{label}</p>
      {children}
    </div>
  );
}

function CurrencySelect({ value, onChange }: { value: LandingPaymentCurrency; onChange: (currency: LandingPaymentCurrency) => void }) {
  const active = landingPaymentCurrencies.find((item) => item.currency === value) ?? landingPaymentCurrencies[0];

  return (
    <label className="relative inline-flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-2xl bg-white/[0.06] px-4 py-3 text-left md:w-[270px] md:max-w-[270px]">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-black text-white">{active.currency}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-white">{active.currency}</span>
        <span className="block truncate text-xs text-[#8E98AA]">{active.name}</span>
      </span>
      <ChevronDown className="ml-auto shrink-0 text-white" size={17} aria-hidden="true" />
      <select
        aria-label="Payment currency"
        value={value}
        onChange={(event) => onChange(event.target.value as LandingPaymentCurrency)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {landingPaymentCurrencies.map((item) => (
          <option key={item.currency} value={item.currency} className="bg-[#11141A] text-white">
            {item.currency}
          </option>
        ))}
      </select>
    </label>
  );
}

function AssetSelect({
  assets,
  value,
  onChange,
  isLoading
}: {
  assets: Asset[];
  value: string;
  onChange: (symbol: string) => void;
  isLoading: boolean;
}) {
  return (
    <label className="inline-flex w-full min-w-0 items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 text-left md:w-auto md:max-w-[270px]">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-black text-text-dark">
        {isLoading ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : value || "--"}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold text-white">{value || "Loading"}</span>
        <span className="block max-w-[12rem] truncate text-xs text-[#8E98AA]">
          {assets.find((asset) => asset.symbol === value)?.name ?? "Supported stock"}
        </span>
      </span>
      <select
        aria-label="Stock token"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={isLoading || assets.length === 0}
        className="ml-auto min-w-0 bg-transparent text-sm font-bold text-white outline-none disabled:opacity-50"
      >
        {assets.map((asset) => (
          <option key={asset.id} value={asset.symbol} className="bg-[#11141A] text-white">
            {asset.symbol}
          </option>
        ))}
      </select>
    </label>
  );
}

function QuoteBreakdown({
  preview,
  asset,
  currency,
  paymentMethod,
  mode
}: {
  preview: ReturnType<typeof calculateInvestmentPreview> | null;
  asset?: Asset;
  currency: LandingPaymentCurrency;
  paymentMethod: string;
  mode: CalculatorMode;
}) {
  const rows = [
    { label: "Payment method", value: paymentMethod },
    { label: "Exchange rate", value: `1 USDT = ${formatMoney({ amount: investmentPreviewRates[currency].exchangeRate, currency })}` },
    { label: "Local fee", value: preview ? formatMoney(preview.localFundingFee) : "---" },
    { label: mode === "stock-to-local" ? "USDT required" : "USDT after conversion", value: preview ? formatMoney(preview.convertedUsdt) : "---" },
    { label: "Stock Token price", value: asset ? formatMoney(asset.price) : "---" },
    { label: "Execution fee", value: preview ? formatMoney(preview.executionFee) : "---" }
  ];

  return (
    <div className="mt-5 rounded-[24px] border border-white/[0.06] bg-white/[0.04] p-5">
      <div className="grid gap-3 md:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 border-b border-white/[0.06] py-2 last:border-0 md:last:border-b">
            <span className="text-sm text-[#8E98AA]">{row.label}</span>
            <span className={cn("text-right text-sm font-bold text-white", row.label === "USDT after conversion" && "text-primary")}>{row.value}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-[#8E98AA]">
        Simulated estimate. Final values appear before confirmation in the app.
      </p>
    </div>
  );
}

function normalizeAmount(value: string): string {
  const cleaned = value.replace(/,/g, ".").replace(/[^\d.]/g, "");
  const [whole, ...fraction] = cleaned.split(".");
  const decimalPlaces = fraction.join("");
  return decimalPlaces ? `${whole || "0"}.${decimalPlaces}` : whole || "0";
}
