"use client";

import { LiquidEtherBackground } from "./liquid-ether-background";
import { AppEntryButton } from "./app-entry-button";
import { PoweredByRobinhoodBadge } from "./powered-by-robinhood-badge";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[720px] overflow-hidden bg-white px-4 pb-16 pt-32 text-text-dark md:min-h-[780px] md:px-6 md:pb-20 md:pt-36">
      <LiquidEtherBackground />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <PoweredByRobinhoodBadge />
        <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-normal text-black md:text-7xl lg:text-8xl">
          U.S. stocks. Funded by PIX.
        </h1>
        <p className="mt-8 text-xl font-medium text-[#6f7487] md:text-2xl">Sign up with your email. Deposit in local currency. Invest in NVDA, TSLA, AAPL and more — in minutes.</p>
        <AppEntryButton
          className="mt-10 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-white transition hover:bg-primary-hover"
        >
          Get started
        </AppEntryButton>
      </div>
    </section>
  );
}


