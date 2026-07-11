# Contract: Domain Services and Repositories

**Feature**: Centok Frontend Demo
**Date**: 2026-07-10
**Purpose**: Define the provider-agnostic contracts consumed by feature UI and implemented first by deterministic mocks.

## Contract Rules

- Feature and page components consume these contracts through hooks or dependency providers.
- Components MUST NOT import fixture files directly.
- Mock implementations MUST satisfy the same contracts expected from future integrations.
- Provider-specific details stay outside page components.
- Methods return promises to preserve async behavior and future integration compatibility.
- All amounts use decimal-string Money values.

## Shared Types

```ts
type Currency = "BRL" | "USD" | "USDT";

type Money = {
  amount: string;
  currency: Currency;
};

type TransactionStatus = "pending" | "completed" | "failed" | "expired";

type TransactionType = "funding" | "purchase";

type DemoScenario =
  | "default"
  | "funded-user"
  | "unfunded-user"
  | "funding-error"
  | "purchase-error"
  | "expired-quote"
  | "chart-error";
```

## AuthService

```ts
interface AuthService {
  getCurrentUser(): Promise<User | null>;
  loginAsDemoUser(): Promise<User>;
  logout(): Promise<void>;
}
```

Behavior:

- `getCurrentUser` returns the persisted demo user or null.
- `loginAsDemoUser` persists the demo authentication state.
- `logout` clears only authentication state unless reset is requested.
- Failed-login scenario returns a recoverable auth error.

## AssetRepository

```ts
type ChartRange = "LIVE" | "1D" | "5D" | "1M" | "6M" | "YTD" | "1Y" | "MAX";

interface AssetRepository {
  listAssets(): Promise<Asset[]>;
  getAsset(symbol: string): Promise<Asset>;
  getPriceHistory(symbol: string, range: ChartRange): Promise<PricePoint[]>;
}
```

Behavior:

- `listAssets` returns the centralized supported asset set.
- `getAsset` resolves by uppercase ticker and fails with an asset-unavailable error when absent.
- `getPriceHistory` returns deterministic series for supported ranges.
- Chart-error scenario returns a recoverable chart error for the selected asset/range.

## BalanceRepository

```ts
interface BalanceRepository {
  getAvailableBalance(): Promise<Money>;
}
```

Behavior:

- Returns the current persisted demo balance.
- Funding and purchase mutations update the balance through service operations, not direct UI writes.

## PortfolioRepository

```ts
interface PortfolioRepository {
  getPortfolio(): Promise<Portfolio>;
}
```

Behavior:

- Returns empty or populated portfolio state.
- Successful purchase creates or updates positions.
- Portfolio totals are derived through centralized calculations.

## FundingService

```ts
type FundingQuoteRequest = {
  sourceAmount: Money;
  destinationCurrency: "USDT";
  paymentMethod: "PIX";
};

type FundingRequest = {
  quoteId: string;
};

interface FundingService {
  getQuote(input: FundingQuoteRequest): Promise<FundingQuote>;
  submitFunding(input: FundingRequest): Promise<FundingTransaction>;
}
```

Behavior:

- `getQuote` validates BRL amount, minimum amount, payment method, and destination currency.
- Quote response includes source amount, estimated USDT, exchange rate, fee, payment method, and expiration.
- Expired-quote scenario returns an expired quote or expires the quote before submission.
- Funding-error scenario makes `submitFunding` return a recoverable failure and must not mutate balance.
- Successful funding increases available balance and appends a funding transaction.

## OrderService

```ts
type OrderQuoteRequest = {
  assetId: string;
  investmentAmount: Money;
};

type SubmitOrderRequest = {
  quoteId: string;
};

interface OrderService {
  getQuote(input: OrderQuoteRequest): Promise<OrderQuote>;
  submitOrder(input: SubmitOrderRequest): Promise<Order>;
}
```

Behavior:

- `getQuote` validates active asset, positive amount, and available balance.
- Insufficient balance returns a typed insufficient-balance result or error that the UI can route to funding.
- Quote response includes investment amount, asset price, estimated quantity, execution fee, total, remaining balance, and expiration.
- `submitOrder` requires an unexpired quote.
- Purchase-error scenario returns a recoverable failure and must not mutate balance or portfolio.
- Successful purchase decreases balance, creates or updates portfolio position, and appends a purchase transaction.
- Duplicate submit attempts must be idempotent for the same pending quote.

## ActivityRepository

```ts
interface ActivityRepository {
  listTransactions(): Promise<Transaction[]>;
}
```

Behavior:

- Returns funding and purchase history in reverse chronological order.
- Includes pending, completed, failed, and expired transaction states.
- Failed transactions include retry metadata only when retry is safe.

## DemoStateService

```ts
interface DemoStateService {
  reset(): Promise<void>;
  setScenario(scenario: DemoScenario): Promise<void>;
  getScenario(): Promise<DemoScenario>;
}
```

Behavior:

- `reset` restores original fixtures for the active/default scenario.
- `setScenario` is presenter/development-only and must not be visible in the normal primary flow.
- Reset invalidates assets, balance, portfolio, activity, auth, and pending context queries.

## StorageAdapter

```ts
interface StorageAdapter<T> {
  read(): Promise<T | null>;
  write(value: T): Promise<void>;
  clear(): Promise<void>;
}
```

Behavior:

- Owns browser storage access.
- Handles schema version checks.
- Falls back gracefully when storage is unavailable.
- Must not leak storage exceptions directly to the UI.

## Query Invalidation Contract

Mutations must invalidate or directly update these views:

| Mutation | Balance | Portfolio | Activity | Purchase Context |
|----------|---------|-----------|----------|------------------|
| Login | No | No | No | No |
| Logout | No | No | No | Clear active UI state |
| Funding success | Yes | Optional | Yes | Preserve if entered from purchase |
| Funding failure | No | No | Yes if transaction recorded | Preserve |
| Purchase success | Yes | Yes | Yes | Clear |
| Purchase failure | No | No | Yes if transaction recorded | Preserve |
| Reset | Yes | Yes | Yes | Clear |

## Error Contract

Domain errors must map to safe user recovery actions:

| Error | User Action |
|-------|-------------|
| InsufficientBalance | Add funds or lower amount |
| QuoteExpired | Refresh quote |
| AssetUnavailable | Choose another asset |
| FundingFailed | Retry or cancel |
| PurchaseFailed | Retry or cancel |
| StorageUnavailable | Continue current session or reset |
| ChartUnavailable | Retry chart or continue without chart |

No contract may expose stack traces, raw provider errors, contract addresses, network selectors, or wallet requirements in the default flow.
