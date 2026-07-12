import { AppEntryButton } from "./app-entry-button";

export function FinalCta() {
  return (
    <section className="bg-white px-4 py-16 text-text-dark md:px-6">
      <div className="mx-auto max-w-7xl rounded-lg bg-background p-8 text-white md:p-10">
        <h2 className="max-w-2xl text-3xl font-semibold">Start investing in minutes.</h2>
        <p className="mt-3 max-w-2xl text-text-muted-dark">Pick a stock, fund with a local payment, and own a piece of the world's biggest companies — without opening a bank account abroad.</p>
        <AppEntryButton className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover">
          Get started
        </AppEntryButton>
      </div>
    </section>
  );
}
