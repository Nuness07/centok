"use client";

import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { useResetDemoState } from "../hooks/use-demo-state";

export function DemoResetDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const reset = useResetDemoState();

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Reset demo state" variant="light">
      <div className="space-y-4">
        <p className="text-sm text-[#6F7A8F]">
          This restores the original demo user, low balance, empty portfolio, transaction fixtures, and default scenario.
        </p>
        {reset.isSuccess ? <Toast tone="success">Demo state restored.</Toast> : null}
        {reset.isError ? <Toast tone="error">Reset failed. Try again.</Toast> : null}
        <div className="flex justify-end gap-3">
          <Button variant="ghost" className="rounded-full text-[#6F7A8F]" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            className="rounded-full"
            disabled={reset.isPending}
            onClick={() =>
              reset.mutate(undefined, {
                onSuccess: () => {
                  globalThis.dispatchEvent(new Event("centok:close-flows"));
                  onOpenChange(false);
                }
              })
            }
          >
            {reset.isPending ? "Resetting" : "Reset demo"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
