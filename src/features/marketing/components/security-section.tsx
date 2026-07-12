export function SecuritySection() {
  const points = [
    "Every funding and purchase action includes a review step.",
    "Fees, estimates, quote expiration, and transaction status are visible before confirmation.",
    "Centok never asks for wallet credentials, seed phrases, or manual blockchain actions.",
    "Stock Token disclosures avoid claiming direct ownership of underlying shares."
  ];

  return (
    <section id="security" className="bg-surface-muted px-4 py-16 text-text-dark md:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold">Built around clarity and trust</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {points.map((point) => (
            <div key={point} className="rounded-lg border border-border-light bg-white p-5 text-sm leading-6 text-text-muted">
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
