"use client";

import { WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AddFundsEntry({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick}>
      <WalletCards size={16} aria-hidden="true" />
      Add funds
    </Button>
  );
}
