"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { demoConfig } from "@/config/demo";
import { decimal } from "@/lib/decimal";
import { useFundingQuote } from "../hooks/use-funding-quote";
import { useSubmitFunding } from "../hooks/use-submit-funding";
import { FundingAmountForm } from "../forms/funding-amount-form";
import { FundingReview } from "./funding-review";
import { PixPaymentStep } from "./pix-payment-step";
import { FundingError, FundingExpired, FundingPending, FundingSuccess } from "./funding-status";

type Step = "entry" | "review" | "pix";

export function AddFundsDialog({
  open,
  onOpenChange,
  onComplete
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}) {
  const [amount, setAmount] = useState<string>(demoConfig.defaultFundingAmountBRL);
  const [step, setStep] = useState<Step>("entry");
  const valid = decimal(amount || 0).greaterThanOrEqualTo(demoConfig.fundingMinimumBRL);
  const quote = useFundingQuote(amount, open && valid);
  const submit = useSubmitFunding();
  const expired = quote.error instanceof Error && quote.error.name === "QuoteExpiredError";

  useEffect(() => {
    const closeFlows = () => {
      setStep("entry");
      onOpenChange(false);
    };
    globalThis.addEventListener("centok:close-flows", closeFlows);
    return () => globalThis.removeEventListener("centok:close-flows", closeFlows);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) {
      setStep("entry");
      submit.reset();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Add funds" variant="light">
      {step === "entry" ? (
        <div className="space-y-5">
          <FundingAmountForm amount={amount} onAmountChange={setAmount} quote={quote.data} />
          {quote.isError && !expired ? <FundingError message={quote.error instanceof Error ? quote.error.message : "Could not prepare quote."} onRetry={() => quote.refetch()} /> : null}
          <div className="flex justify-end gap-3">
            <Button variant="ghost" className="rounded-full text-[#6F7A8F]" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button className="rounded-full" disabled={!valid || quote.isLoading || !quote.data} onClick={() => setStep("review")}>Continue</Button>
          </div>
        </div>
      ) : null}
      {step === "review" && quote.isLoading ? <LoadingState label="Preparing funding review" /> : null}
      {step === "review" && quote.isError && expired ? <FundingExpired onRefresh={() => quote.refetch()} /> : null}
      {step === "review" && quote.data ? (
        <div className="space-y-5">
          <FundingReview quote={quote.data} />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" className="rounded-full text-[#6F7A8F]" onClick={() => setStep("entry")}>Back</Button>
            <Button className="rounded-full" onClick={() => setStep("pix")}>Continue to PIX</Button>
          </div>
        </div>
      ) : null}
      {step === "pix" && quote.data && !submit.isPending && !submit.isSuccess && !submit.isError ? (
        <PixPaymentStep quote={quote.data} onSimulatePayment={() => submit.mutate(quote.data.id)} />
      ) : null}
      {submit.isPending ? <FundingPending /> : null}
      {submit.isError ? (
        <FundingError
          message={submit.error instanceof Error ? submit.error.message : "The funding failed."}
          onRetry={() => quote.data && submit.mutate(quote.data.id)}
        />
      ) : null}
      {submit.isSuccess && quote.data ? (
        <FundingSuccess
          quote={quote.data}
          transaction={submit.data}
          onContinue={() => {
            onOpenChange(false);
            onComplete?.();
          }}
        />
      ) : null}
    </Dialog>
  );
}
