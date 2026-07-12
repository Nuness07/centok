export function InfrastructureSection() {
  const items = [
    ["Instant local funding", "Deposit in your local currency and your balance is available to invest right away. No international transfer, no waiting days for funds to clear."],
    ["Simple sign-up", "Create your account with just an email address. No overseas documentation, no lengthy approval process."],
    ["Real shares in regulated custody", "Every position is backed by actual shares of U.S. companies, held in regulated custody by Robinhood Assets Jersey Ltd."],
    ["Built by El Dorado", "Centok is built by the team behind El Dorado, trusted by over 1 million users for financial services across Latin America."],
    ["Instant settlement", "Your trades settle in seconds — not the two business days you would wait with a traditional broker."],
    ["Centok Earn — coming Q4 2026", "Earn a return on your stock positions while you hold. More details coming soon."]
  ];

  return (
    <section className="bg-background px-4 py-16 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">What makes it possible</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold">Built on regulated infrastructure, wrapped in a simple experience.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map(([title, body]) => (
            <article key={title} className="rounded-lg border border-border-dark bg-elevated p-5">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-muted-dark">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
