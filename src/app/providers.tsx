"use client";

import { QueryProvider } from "@/infrastructure/query/query-provider";
import { ServiceProvider } from "@/infrastructure/query/service-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ServiceProvider>
      <QueryProvider>{children}</QueryProvider>
    </ServiceProvider>
  );
}
