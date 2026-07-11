"use client";

import { Button } from "@/components/ui/button";

export default function AppErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-[900px] p-6">
      <section className="dark-panel rounded-lg p-6">
        <h1 className="text-xl font-semibold text-white">App state could not load</h1>
        <p className="mt-2 text-sm text-text-muted-dark">Reset the demo or retry this page.</p>
        <Button className="mt-4" onClick={reset}>Retry</Button>
      </section>
    </main>
  );
}
