import { brand } from "@/config/brand";

export function ProductDisclaimer() {
  return (
    <footer className="bg-background px-4 py-8 text-sm leading-6 text-text-muted-dark md:px-6">
      <div className="mx-auto max-w-7xl">
        <p>{brand.legalDisclosure}</p>
        <p className="mt-2">Market data, transactions, funding, balances, and portfolio results are simulated for a frontend-only hackathon presentation.</p>
      </div>
    </footer>
  );
}
