"use client";

import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/feedback/empty-state";
import { routes } from "@/config/routes";

export function PortfolioEmptyState() {
  const router = useRouter();
  return (
    <EmptyState
      title="No Stock Token positions yet"
      description="Browse supported U.S. companies and complete a purchase to create a position."
      actionLabel="Browse markets"
      onAction={() => router.push(routes.app)}
    />
  );
}
