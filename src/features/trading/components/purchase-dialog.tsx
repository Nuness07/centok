"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Asset } from "@/domain/models";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { routes } from "@/config/routes";
import { useOrderQuote } from "../hooks/use-order-quote";
import { useSubmitOrder } from "../hooks/use-submit-order";
import { PurchaseReview } from "./purchase-review";
import { PurchaseError, PurchaseExpired, PurchasePending, PurchaseSuccess } from "./purchase-status";

export function PurchaseDialog({
  open,
  onOpenChange,
  asset,
  amount
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: Asset;
  amount: string;
}) {
  const router = useRouter();
  const quote = useOrderQuote(asset, amount, open && Number(amount) > 0);
  const submit = useSubmitOrder();

  useEffect(() => {
    if (!open) submit.reset();
  }, [open]);

  const message = submit.error instanceof Error ? submit.error.message : "The order could not be completed.";
  const expired = quote.error instanceof Error && quote.error.name === "QuoteExpiredError";
  const readyForReview = quote.data && !submit.isPending && !submit.isSuccess && !submit.isError;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Review order" variant="light">
      {quote.isLoading ? <LoadingState label="Preparing quote" /> : null}
      {!submit.isPending && !submit.isSuccess && quote.isError && expired ? <PurchaseExpired onRefresh={() => quote.refetch()} /> : null}
      {!submit.isPending && !submit.isSuccess && quote.isError && !expired ? <PurchaseError message={quote.error instanceof Error ? quote.error.message : "Could not prepare quote."} onRetry={() => quote.refetch()} /> : null}
      {readyForReview ? (
        <div className="space-y-5">
          <PurchaseReview asset={asset} quote={quote.data} />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" className="rounded-full text-[#6F7A8F]" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button className="rounded-full" onClick={() => submit.mutate(quote.data.id)} disabled={submit.isPending}>Confirm purchase</Button>
          </div>
        </div>
      ) : null}
      {submit.isPending ? <PurchasePending /> : null}
      {submit.isSuccess && quote.data ? (
        <PurchaseSuccess
          asset={asset}
          quote={quote.data}
          transaction={submit.data}
          onViewPortfolio={() => {
            onOpenChange(false);
            router.push(routes.portfolio);
          }}
        />
      ) : null}
      {!submit.isSuccess && submit.isError ? <PurchaseError message={message} onRetry={() => quote.data && submit.mutate(quote.data.id)} /> : null}
    </Dialog>
  );
}
