export function InfrastructureSection() {
  const items = [
    ["Local funding", "Future El Dorado-style funding integration can power BRL to balance conversion."],
    ["Smart account", "Future account abstraction can keep wallets and gas behind simple product actions."],
    ["Protected execution", "Future Centok execution logic can protect quote review and settlement behavior."],
    ["Onchain liquidity", "Future Uniswap or Rialto routing can support Stock Token purchases behind the scenes."],
    ["Transparent settlement", "Future Robinhood Chain settlement can be surfaced as clear transaction status."],
    ["Future utility", "Collateral and lending concepts remain out of scope for this MVP and can be marked coming soon." ]
  ];

  return (
    <section className="bg-background px-4 py-16 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Infrastructure stays invisible</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold">Complex execution can sit behind familiar financial actions.</h2>
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
