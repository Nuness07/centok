"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="centok-shell flex min-h-screen items-center justify-center p-6">
      <section className="max-w-md rounded-lg border border-border-dark bg-elevated p-6 text-white">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-text-muted-dark">{error.message || "The demo encountered an unexpected error."}</p>
        <Button className="mt-4" onClick={reset}>Try again</Button>
      </section>
    </main>
  );
}
