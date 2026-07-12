import { Clock3, CreditCard, Layers, ShieldCheck } from "lucide-react";

export function ValueProposition() {
  const values = [
    { icon: Clock3, title: "Trade around the clock", body: "44% of S&P 500 earnings are announced after U.S. market hours. With Centok, you can act the moment the news breaks — not the next morning." },
    { icon: CreditCard, title: "Fund with a local payment", body: "Deposit in local currency the same way you pay for anything else. No international wire transfer, no hidden exchange fees." },
    { icon: Layers, title: "No bank account abroad", body: "Sign up with your email in minutes. No overseas brokerage account, no lengthy documentation, no weeks of waiting for approval." },
    { icon: ShieldCheck, title: "See every fee upfront", body: "The exchange rate, fee, and total cost appear before you confirm. You always know exactly what you are paying." }
  ];

  return (
    <section id="why-centok" className="bg-white px-4 py-16 text-text-dark md:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold">Why Centok?</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {values.map((item) => (
            <article key={item.title} className="rounded-lg border border-border-light bg-white p-5">
              <item.icon className="text-primary" size={22} aria-hidden="true" />
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
