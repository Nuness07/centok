"use client";

import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { CentokLogo } from "@/components/branding/centok-logo";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { appNav } from "@/config/navigation";
import { useAvailableBalance } from "@/features/portfolio/hooks/use-balance";
import { UserMenu } from "@/features/auth/components/user-menu";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/currency";
import { asUsdtReference, convertMoneyForDisplay } from "@/lib/local-money";

export function AppHeader() {
  const balance = useAvailableBalance();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 border-b border-[#DFE8F5] bg-white/90 px-4 py-3 backdrop-blur-xl md:px-6">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        <CentokLogo className="text-text-dark" />
        <nav className="hidden items-center gap-1 rounded-full border border-[#D7E4F4] bg-[#F4F8FF] p-1 md:flex" aria-label="Application navigation">
          {appNav.map((item) => {
            const active = item.href === "/app" ? pathname === "/app" : item.href.startsWith("/app/markets") ? pathname?.startsWith("/app/markets") : pathname === item.href;
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => {
                  if (!active) router.push(item.href);
                }}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-[#0B1220]",
                  active ? "bg-primary text-white" : "text-[#7B869B]"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-[#D7E4F4] bg-[#F7FAFF] px-3 py-2 text-sm md:flex">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#7B869B]">Available</span>
            {balance.isLoading ? <LoadingState label="Loading balance" /> : balance.data ? <AvailableInline amount={balance.data} /> : null}
          </div>
          <Button onClick={() => window.dispatchEvent(new Event("centok:add-funds"))} className="min-h-10 rounded-full px-4">
            <Plus size={16} aria-hidden="true" />
            <span className="hidden sm:inline">Add funds</span>
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

function AvailableInline({ amount }: { amount: { amount: string; currency: "ARS" | "BRL" | "CLP" | "COP" | "MXN" | "PEN" | "USD" | "USDT" } }) {
  const local = convertMoneyForDisplay(amount, "BRL");
  const reference = asUsdtReference(amount);

  return (
    <span className="flex items-baseline gap-2 whitespace-nowrap">
      <span className="font-black text-[#0B1220]">{formatMoney(local)}</span>
      {reference ? (
        <span className="text-xs font-semibold text-[#7B869B]">
          ≈ {formatMoney(reference).replace("USDT", "USD")}
          <sup className="text-[0.65em]">T</sup>
        </span>
      ) : null}
    </span>
  );
}
