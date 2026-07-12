import Link from "next/link";
import { routes } from "@/config/routes";

export default function NotFound() {
  return (
    <main className="centok-shell flex min-h-screen items-center justify-center p-6">
      <section className="max-w-md rounded-lg border border-border-dark bg-elevated p-6 text-white">
        <h1 className="text-xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm text-text-muted-dark">Return to the Centok entry point.</p>
        <Link href={routes.home} className="mt-4 inline-flex min-h-10 items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Go home</Link>
      </section>
    </main>
  );
}
