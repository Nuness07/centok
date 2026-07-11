"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { CentokLogo } from "@/components/branding/centok-logo";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { useStartDefaultDemo } from "../hooks/use-auth";

export function DemoLoginCard() {
  const login = useStartDefaultDemo();

  return (
    <section className="w-full max-w-md rounded-lg border border-border-light bg-white p-6 text-text-dark shadow-panel">
      <CentokLogo className="mb-8 text-text-dark" />
      <div className="mb-6 rounded-md border border-border-light bg-surface-muted p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">G</span>
          <div>
            <h1 className="text-lg font-semibold">Gabriel Demo</h1>
            <p className="text-sm text-text-muted">Brazil-based retail investor profile</p>
          </div>
        </div>
      </div>
      <div className="mb-6 flex items-start gap-2 rounded-md bg-primary/10 p-3 text-sm text-primary">
        <ShieldCheck size={18} aria-hidden="true" />
        <p>No real account, payment, wallet, or blockchain transaction is created in this demo.</p>
      </div>
      {login.isError ? <Toast tone="error">Demo login failed because the failed-login scenario is active.</Toast> : null}
      <Button className="mt-4 w-full" onClick={() => login.mutate()} disabled={login.isPending}>
        {login.isPending ? "Entering demo" : "Continue with demo account"}
        <ArrowRight size={16} aria-hidden="true" />
      </Button>
    </section>
  );
}
