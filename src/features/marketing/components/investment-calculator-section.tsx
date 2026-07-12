"use client";

import { ChevronDown, ChevronsUpDown, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";

import { landingCalculatorDefaults, landingPaymentCurrencies, type LandingPaymentCurrency } from "@/config/landing-calculator";
import { calculateInvestmentPreview, calculateInvestmentPreviewFromQuantity, investmentPreviewRates } from "@/domain/calculations/investment-preview";
import type { Asset } from "@/domain/models";
import { AssetLogo } from "@/components/financial/asset-logo";
import { useAssets } from "@/features/assets/hooks/use-assets";
import { cn } from "@/lib/cn";
import { formatMoney, formatQuantity } from "@/lib/currency";
import { AppEntryButton } from "./app-entry-button";

type CalculatorMode = "local-to-stock" | "stock-to-local";

const currencyFlags: Record<LandingPaymentCurrency, string> = {
  ARS: "https://flagcdn.com/w80/ar.png",
  BRL: "https://flagcdn.com/w80/br.png",
  CLP: "https://flagcdn.com/w80/cl.png",
  COP: "https://flagcdn.com/w80/co.png",
  MXN: "https://flagcdn.com/w80/mx.png",
  PEN: "https://flagcdn.com/w80/pe.png"
};

const pickerClassName = "relative w-full min-w-0 md:w-[300px] md:min-w-[300px] md:max-w-[300px]";

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
            See exactly what you would pay.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#9AA4B5] md:text-lg">
            Enter an amount in your local currency and pick a stock. Centok shows the estimated exchange rate, fees, and how many shares you would receive.
          </p>
          <AppEntryButton
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-bold text-white transition hover:bg-primary-hover"
          >
            Try it in the demo
          </AppEntryButton>
        </div>

        <div className="w-full min-w-0 overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#11141A] p-3 shadow-[0_28px_90px_rgb(0_0_0_/_34%)] sm:p-4 md:rounded-[32px] md:p-6 lg:max-w-[620px] lg:justify-self-end">
          <div className="mb-5 flex items-center justify-between gap-4 px-1">
            <div>
              <p className="text-base font-bold text-white">Calculator</p>
              <p className="mt-1 text-sm text-[#8E98AA]">Estimate</p>
            </div>
            <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-primary">
              Offline
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
                  <AssetSelect assets={activeAssets} value={selectedAsset?.symbol ?? ""} selectedAsset={selectedAsset} onChange={setSymbol} isLoading={assets.isLoading} />
                  <input
                    aria-label="Stock token quantity"
                    inputMode="decimal"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    className="min-w-0 max-w-full bg-transparent text-left text-[2rem] font-black leading-none text-white outline-none placeholder:text-white/30 sm:text-3xl md:w-full md:text-right md:text-4xl lg:text-[2.75rem]"
                    placeholder="0"
                  />
                </div>
              )}
            </CalculatorPanel>

            <button
              type="button"
              aria-label="Invert calculator"
              onClick={toggleMode}
              className="absolute left-1/2 top-[calc(50%-2rem)] z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#080A0F] text-white shadow-[0_16px_40px_rgb(0_0_0_/_34%)] transition hover:border-primary/40 hover:text-primary sm:h-14 sm:w-14"
            >
              <ChevronsUpDown size={22} aria-hidden="true" />
            </button>

            <CalculatorPanel label="I want">
              {mode === "local-to-stock" ? (
                <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <AssetSelect assets={activeAssets} value={selectedAsset?.symbol ?? ""} selectedAsset={selectedAsset} onChange={setSymbol} isLoading={assets.isLoading} />
                  <div className="min-w-0 max-w-full text-left md:text-right" aria-live="polite">
                    <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[2rem] font-black leading-none text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                      {preview ? formatQuantity(preview.estimatedQuantity) : "---"}
                    </p>
                    <p className="mt-2 truncate text-sm font-semibold text-[#8E98AA]">{selectedAsset ? `${selectedAsset.symbol} shares` : "Shares"}</p>
                  </div>
                </div>
              ) : (
                <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <CurrencySelect value={currency} onChange={handleCurrencyChange} />
                  <div className="min-w-0 max-w-full text-left md:text-right" aria-live="polite">
                    <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[2rem] font-black leading-none text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
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
    <div className="min-w-0 rounded-[22px] border border-white/[0.06] bg-[#171B22] p-4 md:rounded-[24px] md:p-6">
      <p className="mb-4 text-sm font-bold text-[#B5BECF]">{label}</p>
      {children}
    </div>
  );
}

function CurrencySelect({ value, onChange }: { value: LandingPaymentCurrency; onChange: (currency: LandingPaymentCurrency) => void }) {
  const [open, setOpen] = useState(false);
  const active = landingPaymentCurrencies.find((item) => item.currency === value) ?? landingPaymentCurrencies[0];

  return (
    <div className={pickerClassName}>
      <button
        type="button"
        aria-label="Payment currency"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex w-full min-w-0 items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 text-left transition hover:bg-white/[0.09]"
      >
        <FlagIcon currency={active.currency} />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-white">{active.currency}</span>
          <span className="block truncate text-xs text-[#8E98AA]">{active.name}</span>
        </span>
        <ChevronDown className={cn("ml-auto shrink-0 text-white transition", open && "rotate-180")} size={17} aria-hidden="true" />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-72 overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#0D1118] p-1 shadow-[0_24px_70px_rgb(0_0_0_/_45%)]">
          {landingPaymentCurrencies.map((item) => (
            <button
              key={item.currency}
              type="button"
              className={cn(
                "grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/[0.08]",
                item.currency === value && "bg-primary/15"
              )}
              onClick={() => {
                onChange(item.currency);
                setOpen(false);
              }}
            >
              <FlagIcon currency={item.currency} className="h-8 w-8" />
              <span className="min-w-0">
                <span className="block text-sm font-bold text-white">{item.currency}</span>
                <span className="block truncate text-xs text-[#8E98AA]">{item.name}</span>
              </span>
              <span className="text-xs font-bold text-[#8E98AA]">{item.paymentMethod}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FlagIcon({ currency, className }: { currency: LandingPaymentCurrency; className?: string }) {
  return (
    <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white", className)}>
      <img
        src={currencyFlags[currency]}
        alt={`${currency} flag`}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </span>
  );
}

function AssetSelect({
  assets,
  value,
  selectedAsset,
  onChange,
  isLoading
}: {
  assets: Asset[];
  value: string;
  selectedAsset?: Asset;
  onChange: (symbol: string) => void;
  isLoading: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={pickerClassName}>
      <button
        type="button"
        aria-label="Stock token"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        disabled={isLoading || assets.length === 0}
        className="inline-flex w-full min-w-0 items-center gap-3 rounded-2xl bg-white/[0.06] px-3 py-3 text-left transition hover:bg-white/[0.09] disabled:cursor-wait disabled:opacity-70 sm:px-4"
      >
        <AssetLogo
          symbol={value || "--"}
          src={selectedAsset?.logoUrl}
          className="h-9 w-9 bg-white"
        />
        {isLoading ? (
          <span className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 text-[#111827]">
            <Loader2 size={14} className="animate-spin" aria-hidden="true" />
          </span>
        ) : null}
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-white">{value || "Loading"}</span>
          <span className="block truncate text-xs text-[#8E98AA]">
            {selectedAsset?.name ?? assets.find((asset) => asset.symbol === value)?.name ?? "Supported stock"}
          </span>
        </span>
        <ChevronDown className={cn("ml-auto shrink-0 text-white transition", open && "rotate-180")} size={17} aria-hidden="true" />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-80 overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#0D1118] p-1 shadow-[0_24px_70px_rgb(0_0_0_/_45%)]">
          {assets.map((asset) => (
            <button
              key={asset.id}
              type="button"
              className={cn(
                "grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/[0.08]",
                asset.symbol === value && "bg-primary/15"
              )}
              onClick={() => {
                onChange(asset.symbol);
                setOpen(false);
              }}
            >
              <AssetLogo symbol={asset.symbol} src={asset.logoUrl} className="h-8 w-8 bg-white" />
              <span className="min-w-0">
                <span className="block text-sm font-bold text-white">{asset.symbol}</span>
                <span className="block truncate text-xs text-[#8E98AA]">{asset.name}</span>
              </span>
              <span className={cn("text-xs font-bold", asset.changePercentage >= 0 ? "text-positive" : "text-negative")}>
                {asset.changePercentage > 0 ? "+" : ""}{asset.changePercentage.toFixed(2)}%
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
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
    { label: "Exchange rate", value: `1 USD = ${formatMoney({ amount: investmentPreviewRates[currency].exchangeRate, currency })}` },
    { label: "Local fee", value: preview ? formatMoney(preview.localFundingFee) : "---" },
    { label: mode === "stock-to-local" ? "Amount required" : "Amount after conversion", value: preview ? formatMoney(preview.convertedUsdt) : "---" },
    { label: "Share price", value: asset ? formatMoney(asset.price) : "---" },
    { label: "Execution fee", value: preview ? formatMoney(preview.executionFee) : "---" }
  ];

  return (
    <div className="mt-5 min-w-0 rounded-[24px] border border-white/[0.06] bg-white/[0.04] p-4 md:p-5">
      <div className="grid gap-3 md:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="flex min-w-0 items-center justify-between gap-3 border-b border-white/[0.06] py-2 last:border-0 md:last:border-b">
            <span className="shrink-0 text-sm text-[#8E98AA]">{row.label}</span>
            <span className={cn("min-w-0 truncate text-right text-sm font-bold text-white", row.label === "Amount after conversion" && "text-primary")}>{row.value}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-[#8E98AA]">
        Estimate only. Final values appear before confirmation in the app.
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
