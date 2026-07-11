import type { FundingQuote, Money, Transaction } from "../models";

export type FundingQuoteRequest = {
  sourceAmount: Money;
  destinationCurrency: "USDT";
  paymentMethod: "PIX";
};

export type FundingRequest = {
  quoteId: string;
};

export interface FundingService {
  getQuote(input: FundingQuoteRequest): Promise<FundingQuote>;
  submitFunding(input: FundingRequest): Promise<Transaction>;
}
