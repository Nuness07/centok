"use client";

import { useEffect, useState } from "react";
import { BarChart3, Home, List, Wallet } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import { AddFundsDialog } from "@/features/funding/components/add-funds-dialog";
import { cn } from "@/lib/cn";
import { AppHeader } from "./app-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useCurrentUser();
  const [fundingOpen, setFundingOpen] = useState(false);

  useEffect(() => {
    if (!user.isLoading && !user.data) {
      router.replace(`${routes.login}?next=${encodeURIComponent(pathname ?? routes.app)}`);
    }
  }, [pathname, router, user.data, user.isLoading]);

  useEffect(() => {
    const openFunding = () => setFundingOpen(true);
    window.addEventListener("centok:add-funds", openFunding);
    return () => window.removeEventListener("centok:add-funds", openFunding);
  }, []);

  if (user.isLoading || !user.data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FAFF] p-6">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#D7E4F4] border-t-primary" aria-label="Loading" />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAFF] text-[#0B1220] [background-image:radial-gradient(circle_at_10%_0%,rgb(37_99_235_/_10%),transparent_26rem)]">
      <AppHeader />
      <div className="pb-24 md:pb-0">{children}</div>
      <AddFundsDialog open={fundingOpen} onOpenChange={setFundingOpen} />
      <MobileAppNav />
    </div>
  );
}

function MobileAppNav() {
  const pathname = usePathname();
  const router = useRouter();
  const items = [
    { label: "Home", href: routes.app, icon: Home },
    { label: "Trade", href: routes.market("AAPL"), icon: BarChart3 },
    { label: "Portfolio", href: routes.portfolio, icon: Wallet },
    { label: "Activity", href: routes.activity, icon: List }
  ];

  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 rounded-full border border-[#D7E4F4] bg-white/95 p-1 shadow-[0_18px_60px_rgb(11_18_32_/_12%)] backdrop-blur-xl md:hidden" aria-label="Mobile app navigation">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.href === routes.app ? pathname === routes.app : item.href.startsWith("/app/markets") ? pathname?.startsWith("/app/markets") : pathname === item.href;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                if (pathname !== item.href) router.push(item.href);
              }}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-full text-[11px] font-bold transition",
                active ? "bg-primary text-white" : "text-[#7B869B]"
              )}
            >
              <Icon size={16} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
