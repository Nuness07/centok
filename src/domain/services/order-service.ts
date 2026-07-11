import type { Money, OrderQuote, Transaction } from "../models";

export type OrderQuoteRequest = {
  assetId: string;
  investmentAmount: Money;
};

export type SubmitOrderRequest = {
  quoteId: string;
};

export interface OrderService {
  getQuote(input: OrderQuoteRequest): Promise<OrderQuote>;
  submitOrder(input: SubmitOrderRequest): Promise<Transaction>;
}
