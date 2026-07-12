import { BadgeDollarSign, Building2, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Fund your account",
    icon: BadgeDollarSign,
    body: "Deposit in your local currency using a familiar payment method. Funds are ready to invest straight away — no international transfer, no waiting days."
  },
  {
    number: "02",
    title: "Pick a stock",
    icon: Building2,
    body: "Browse NVDA, TSLA, AAPL, MSFT and more. Available 24 hours a day, including after U.S. market hours. No delays, no restrictions."
  },
  {
    number: "03",
    title: "Review and confirm",
    icon: CheckCircle2,
    body: "See the exact cost in local currency, the exchange rate, and any fees before confirming. Settlement is instant."
  }
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#080A0F] px-4 py-24 text-white md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">How it works</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#F5F7FB] md:text-6xl">
            Three steps to your first U.S. stock.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#9AA4B5] md:text-lg">
            We handle everything behind the scenes. You just deposit, pick, and confirm.
          </p>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="group flex min-h-[360px] flex-col justify-between rounded-[24px] border border-white/[0.06] bg-[#121419] p-7 transition hover:border-primary/35 hover:bg-[#151922] md:p-8">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold uppercase tracking-[0.12em] text-primary">Step {step.number}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <step.icon size={22} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-10 text-3xl font-semibold leading-tight text-[#F5F7FB] md:text-4xl">{step.title}</h3>
              </div>
              <div>
                <p className="mb-5 text-7xl font-black leading-none text-primary/18 md:text-8xl">{step.number}</p>
                <p className="text-base leading-7 text-[#8E98AA]">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
