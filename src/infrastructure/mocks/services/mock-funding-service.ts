import type { FundingQuote, Transaction } from "@/domain/models";
import type { FundingQuoteRequest, FundingRequest, FundingService } from "@/domain/services/funding-service";
import { FundingFailedError, QuoteExpiredError } from "@/domain/errors/domain-errors";
import { calculateFundingQuote } from "@/domain/calculations/funding";
import { decimal, toFixed } from "@/lib/decimal";
import { referenceId } from "@/lib/identifiers";
import { getDemoState, updateDemoState } from "../demo-state-store";
import { quoteExpired, transactionTime, withLatency } from "../mock-runtime";

const quoteStore = new Map<string, FundingQuote>();

export class MockFundingService implements FundingService {
  getQuote(input: FundingQuoteRequest): Promise<FundingQuote> {
    return withLatency(() => {
      const state = getDemoState();
      if (state.scenario === "funding-error") {
        throw new FundingFailedError("The simulated funding quote failed.");
      }
      const quote = calculateFundingQuote(input, state.transactions.length + quoteStore.size + 1);
      const finalQuote = state.scenario === "expired-quote" ? { ...quote, expiresAt: "2026-01-01T00:00:00.000Z" } : quote;
      quoteStore.set(finalQuote.id, finalQuote);
      return finalQuote;
    }, 400);
  }

  submitFunding(input: FundingRequest): Promise<Transaction> {
    return withLatency(() => {
      const state = getDemoState();
      const quote = quoteStore.get(input.quoteId);
      if (!quote) throw new QuoteExpiredError("Refresh the funding quote before continuing.");
      if (state.scenario === "funding-error") throw new FundingFailedError();
      if (state.scenario === "expired-quote" || quoteExpired(quote.expiresAt)) throw new QuoteExpiredError();

      const transaction: Transaction = {
        id: referenceId("funding", state.transactions.length + 1),
        type: "funding",
        status: "completed",
        sourceAmount: quote.sourceAmount,
        destinationAmount: quote.destinationAmount,
        amount: quote.destinationAmount,
        createdAt: transactionTime()
      };

      updateDemoState((current) => ({
        ...current,
        availableBalance: {
          amount: toFixed(decimal(current.availableBalance.amount).plus(quote.destinationAmount.amount), 2),
          currency: "USDT"
        },
        transactions: [transaction, ...current.transactions]
      }));

      return transaction;
    }, 1700);
  }
}
