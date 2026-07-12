export function SecuritySection() {
  const points = [
    "No technical setup required. If you have an email address, you can invest.",
    "Every action shows the full cost — exchange rate, fee, and total — before you confirm. No hidden charges.",
    "Your holdings are backed by real shares of U.S. companies held in regulated custody by Robinhood Assets Jersey Ltd.",
    "Centok is built on regulated financial infrastructure, operational and audited since July 2026."
  ];

  return (
    <section id="security" className="bg-surface-muted px-4 py-16 text-text-dark md:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold">Built to be trusted.</h2>
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
