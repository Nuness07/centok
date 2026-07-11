import { DemoEntryButton } from "./demo-entry-button";

export function FinalCta() {
  return (
    <section className="bg-white px-4 py-16 text-text-dark md:px-6">
      <div className="mx-auto max-w-7xl rounded-lg bg-background p-8 text-white md:p-10">
        <h2 className="max-w-2xl text-3xl font-semibold">Run the deterministic Centok demo.</h2>
        <p className="mt-3 max-w-2xl text-text-muted-dark">Enter with the mock account, add funds, buy a Stock Token, and inspect the updated portfolio.</p>
        <DemoEntryButton className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover">
          Get started
        </DemoEntryButton>
      </div>
    </section>
  );
}
