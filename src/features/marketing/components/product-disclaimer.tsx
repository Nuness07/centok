import { brand } from "@/config/brand";

export function ProductDisclaimer() {
  return (
    <footer className="bg-background px-4 py-8 text-sm leading-6 text-text-muted-dark md:px-6">
      <div className="mx-auto max-w-7xl">
        <p>{brand.legalDisclosure}</p>
        <p className="mt-2">Centok positions provide economic exposure to U.S. company shares and are not direct ownership of the underlying securities.</p>
      </div>
    </footer>
  );
}
