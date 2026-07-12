import { Clock3, CreditCard, Layers, ShieldCheck } from "lucide-react";

export function ValueProposition() {
  const values = [
    { icon: Layers, title: "Fewer fragmented steps", body: "A single flow replaces scattered accounts, transfers, and technical tools." },
    { icon: CreditCard, title: "Familiar local funding", body: "Add funds with a local-payment-style flow before reviewing the investment." },
    { icon: Clock3, title: "Onchain availability", body: "Centok frames settlement benefits without asking users to manage infrastructure." },
    { icon: ShieldCheck, title: "Transparent review", body: "Amounts, fees, estimates, and disclosures appear before confirmation." }
  ];

  return (
    <section id="why-centok" className="bg-white px-4 py-16 text-text-dark md:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold">A familiar investment experience</h2>
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
