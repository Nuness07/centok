import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TransactionStatusBadge } from "@/features/activity/components/transaction-status-badge";

describe("activity history", () => {
  it("shows non-color transaction status labels", () => {
    render(<TransactionStatusBadge status="failed" />);
    expect(screen.getByText(/Failed/i)).toBeInTheDocument();
  });
});
