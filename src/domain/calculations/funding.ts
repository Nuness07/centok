import type { FundingQuoteRequest } from "@/domain/services/funding-service";
import type { FundingQuote } from "@/domain/models";
import { decimal, toFixed } from "@/lib/decimal";
import { minutesFromNow } from "@/lib/date";
import { referenceId } from "@/lib/identifiers";

export function calculateFundingQuote(input: FundingQuoteRequest, index = 1): FundingQuote {
  const exchangeRate = decimal("5.30");
  const fee = decimal("5.00");
  const source = decimal(input.sourceAmount.amount);
  const net = DecimalMax(source.minus(fee), "0");
  const destination = net.div(exchangeRate);

  return {
    id: referenceId("funding-quote", index),
    sourceAmount: { amount: toFixed(source, 2), currency: "BRL" },
    destinationAmount: { amount: toFixed(destination, 2), currency: input.destinationCurrency },
    exchangeRate: exchangeRate.toFixed(2),
    fee: { amount: fee.toFixed(2), currency: "BRL" },
    paymentMethod: input.paymentMethod,
    expiresAt: minutesFromNow(5)
  };
}

function DecimalMax(value: import("decimal.js").default, min: string) {
  return value.lessThan(min) ? decimal(min) : value;
}
