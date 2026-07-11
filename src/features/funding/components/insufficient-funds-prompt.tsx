"use client";

import { Button } from "@/components/ui/button";

export function InsufficientFundsPrompt({ onAddFunds }: { onAddFunds: () => void }) {
  return (
    <div className="rounded-md border border-warning/40 bg-warning/10 p-4 text-sm text-text-dark">
      <h3 className="font-semibold text-warning">Add funds to continue</h3>
      <p className="mt-1 text-text-muted">Your current available balance is lower than the estimated total cost.</p>
      <Button className="mt-3" onClick={onAddFunds}>Add funds</Button>
    </div>
  );
}
