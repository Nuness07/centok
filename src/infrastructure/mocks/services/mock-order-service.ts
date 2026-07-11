import type { OrderQuote, Transaction } from "@/domain/models";
import type { OrderQuoteRequest, OrderService, SubmitOrderRequest } from "@/domain/services/order-service";
import { InsufficientBalanceError, PurchaseFailedError, QuoteExpiredError } from "@/domain/errors/domain-errors";
import { calculateOrderQuote } from "@/domain/calculations/orders";
import { calculatePositionAfterPurchase } from "@/domain/calculations/portfolio";
import { decimal, toFixed } from "@/lib/decimal";
import { referenceId } from "@/lib/identifiers";
import { supportedAssets } from "../fixtures/assets";
import { getDemoState, updateDemoState } from "../demo-state-store";
import { quoteExpired, transactionTime, withLatency } from "../mock-runtime";

const quoteStore = new Map<string, OrderQuote>();

export class MockOrderService implements OrderService {
  getQuote(input: OrderQuoteRequest): Promise<OrderQuote> {
    return withLatency(() => {
      const state = getDemoState();
      if (state.scenario === "purchase-error") {
        throw new PurchaseFailedError("The simulated order quote failed.");
      }
      const asset = supportedAssets.find((item) => item.id === input.assetId || item.symbol === input.assetId);
      if (!asset) throw new Error("Unsupported asset.");
      const quote = calculateOrderQuote({
        assetId: asset.id,
        investmentAmount: input.investmentAmount,
        assetPrice: asset.price,
        availableBalance: state.availableBalance,
        index: state.transactions.length + quoteStore.size + 1
      });
      const finalQuote = state.scenario === "expired-quote" ? { ...quote, expiresAt: "2026-01-01T00:00:00.000Z" } : quote;
      quoteStore.set(finalQuote.id, finalQuote);
      return finalQuote;
    }, 420);
  }

  submitOrder(input: SubmitOrderRequest): Promise<Transaction> {
    return withLatency(() => {
      const state = getDemoState();
      const quote = quoteStore.get(input.quoteId);
      if (!quote) throw new QuoteExpiredError("Refresh the order quote before continuing.");
      if (state.scenario === "purchase-error") throw new PurchaseFailedError();
      if (state.scenario === "expired-quote" || quoteExpired(quote.expiresAt)) throw new QuoteExpiredError();
      if (decimal(quote.total.amount).greaterThan(state.availableBalance.amount)) {
        throw new InsufficientBalanceError();
      }

      const asset = supportedAssets.find((item) => item.id === quote.assetId);
      if (!asset) throw new Error("Unsupported asset.");

      const transaction: Transaction = {
        id: referenceId("purchase", state.transactions.length + 1),
        type: "purchase",
        status: "completed",
        assetId: quote.assetId,
        amount: quote.total,
        destinationAmount: { amount: quote.estimatedQuantity, currency: "USD" },
        createdAt: transactionTime()
      };

      updateDemoState((current) => ({
        ...current,
        availableBalance: {
          amount: toFixed(decimal(current.availableBalance.amount).minus(quote.total.amount), 2),
          currency: "USDT"
        },
        positions: calculatePositionAfterPurchase({
          positions: current.positions,
          assetId: quote.assetId,
          quantity: quote.estimatedQuantity,
          investmentAmount: quote.investmentAmount,
          assetPrice: quote.assetPrice,
          asset
        }),
        transactions: [transaction, ...current.transactions],
        purchaseReturnContext: undefined
      }));

      return transaction;
    }, 1800);
  }
}
