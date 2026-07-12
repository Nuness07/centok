"use client";

import { useEffect, useRef } from "react";
import { useStartDefaultDemo } from "@/features/auth/hooks/use-auth";

export default function LoginPage() {
  const started = useRef(false);
  const start = useStartDefaultDemo();

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    start.mutate();
  }, [start]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7FAFF] p-6">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#D7E4F4] border-t-primary" aria-label="Loading" />
    </main>
  );
}
