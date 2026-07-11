import { BadgeDollarSign, Building2, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Add money",
    icon: BadgeDollarSign,
    body: "Fund your account using your local currency and a familiar payment method. We handle the conversion behind the scenes."
  },
  {
    number: "02",
    title: "Choose a stock",
    icon: Building2,
    body: "Browse supported U.S. companies, check their prices and choose how much exposure you want."
  },
  {
    number: "03",
    title: "Review and confirm",
    icon: CheckCircle2,
    body: "See the estimated amount of tokenized stock you will receive, the applicable fees and the final total before confirming."
  }
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#080A0F] px-4 py-24 text-white md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">How it works</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#F5F7FB] md:text-6xl">
            Invest in tokenized U.S. stocks through a simple and familiar experience.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#9AA4B5] md:text-lg">
            A tokenized stock is a digital asset designed to track the value of a U.S. company’s shares, while giving you access to onchain benefits without the usual technical complexity.
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
