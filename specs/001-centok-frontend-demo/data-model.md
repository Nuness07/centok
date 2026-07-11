# Data Model: Centok Frontend Demo

**Feature**: Centok Frontend Demo
**Date**: 2026-07-10
**Spec**: [spec.md](./spec.md)

## Modeling Principles

- Financial values are stored as decimal strings, never unsafe floating-point numbers.
- UI components consume repositories and services, not raw fixtures.
- Mock data uses the same domain shapes expected from future integrations.
- Demo state is versioned and resettable.
- Transactions and quotes are deterministic for presentation reliability.

## Entity Relationship Overview

```text
User
  -> DemoState
  -> Balance
  -> Portfolio
      -> PortfolioPosition
          -> Asset
  -> Transaction[]

Asset
  -> PricePoint[] by ChartRange
  -> OrderQuote
  -> Order

FundingQuote
  -> FundingTransaction
  -> Balance mutation
  -> Transaction history

OrderQuote
  -> Order
  -> Balance mutation
  -> Portfolio mutation
  -> Transaction history
```

## Scalar Value Objects

### Currency

Allowed values:

```text
BRL
USD
USDT
```

Validation rules:

- Currency MUST be one of the allowed values.
- BRL is used for funding source amounts.
- USDT is used for demo purchasing balance.
- USD may be used for displayed asset reference prices when needed.

### Money

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| amount | decimal string | Yes | Finite, non-negative unless explicitly representing gain/loss |
| currency | Currency | Yes | Must match the amount context |

Validation rules:

- Amounts MUST parse through the decimal utility.
- Display formatting MUST happen outside the entity.
- Fiat display normally uses two decimal places.
- Token quantities and rates may display additional precision.
- Gain/loss Money values MAY be negative where explicitly allowed.

### Percentage

Fields:

| Field | Type | Rules |
|-------|------|-------|
| value | decimal string or number | Must be finite and formatted centrally |

Validation rules:

- Positive, negative, and zero states MUST be distinguishable by text/icon plus color.
- Percentages used for calculations SHOULD be normalized before display.

## Core Entities

### User

Represents the mock authenticated demo user.

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| id | string | Yes | Stable fixture identifier |
| name | string | Yes | Non-empty display name |
| email | string | Yes | Valid demo email format |
| countryCode | string | Yes | ISO-like country code, default `BR` |
| avatarUrl | string | No | Optional non-sensitive image path or URL |

Relationships:

- One user owns the current demo state.
- Authentication state references the current user or null.

Validation rules:

- No real personal data is required.
- Login uses a predefined demo account.

### Asset

Represents a supported Stock Token exposure.

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| id | string | Yes | Stable internal identifier |
| symbol | string | Yes | Uppercase ticker, unique |
| name | string | Yes | Company name, supports long names |
| logoUrl | string | Yes | Local or bundled asset reference preferred |
| price | Money | Yes | Current mock price |
| changeAmount | Money | Yes | Daily mock price movement |
| changePercentage | decimal string or number | Yes | Daily mock percentage movement |
| description | string | Yes | Short company description |
| status | AssetStatus | Yes | `active`, `unavailable`, or `coming-soon` |
| marketStatus | MarketStatus | Yes | `open`, `closed`, or `available-24-7` |

Allowed initial symbols:

```text
AAPL, AMD, AMZN, GOOGL, META, MSFT, NVDA, TSLA, COIN, NFLX
```

Relationships:

- One asset has price history for each supported chart range.
- Portfolio positions and orders reference assets by id.

Validation rules:

- Active assets can be inspected and purchased.
- Unavailable assets can be displayed but cannot proceed through purchase confirmation.
- Coming-soon assets must not block the primary demo flow.
- Asset search matches symbol and company name.

### PricePoint

Represents one chart datapoint.

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| timestamp | ISO datetime string | Yes | Stable deterministic timestamp |
| value | decimal string | Yes | Non-negative price value |

Relationships:

- Belongs to an asset and chart range.

Validation rules:

- Price history MUST be deterministic.
- Empty or unavailable price history triggers a recoverable chart error state.

### ChartRange

Allowed values:

```text
LIVE, 1D, 5D, 1M, 6M, YTD, 1Y, MAX
```

Validation rules:

- Unsupported ranges must fall back to the default range or show recoverable error.
- Range selection updates only chart data and relevant chart labels.

### Balance

Represents the user's available demo purchasing balance.

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| available | Money | Yes | Default currency USDT for purchase flows |
| updatedAt | ISO datetime string | Yes | Updated after funding or purchase |

Relationships:

- Funding increases available balance.
- Purchase decreases available balance.
- Portfolio summary displays available balance.

Validation rules:

- Balance cannot become negative.
- Insufficient balance blocks purchase confirmation and routes to funding.

### Portfolio

Represents the user's holdings summary.

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| availableBalance | Money | Yes | Mirrors Balance for portfolio view |
| totalInvested | Money | Yes | Sum of invested principal |
| currentValue | Money | Yes | Sum of current position values |
| totalGain | Money | Yes | Current value minus invested principal |
| totalGainPercentage | decimal string or number | Yes | Derived percentage |
| positions | PortfolioPosition[] | Yes | Empty allowed |

Relationships:

- Contains zero or more portfolio positions.
- Recomputed after successful purchase and reset.

Validation rules:

- Empty portfolio uses designed empty state.
- Totals must match position values and balance calculations.

### PortfolioPosition

Represents a holding in one Stock Token.

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| assetId | string | Yes | References Asset.id |
| quantity | decimal string | Yes | Non-negative fractional quantity |
| averagePrice | Money | Yes | Average purchase price |
| currentValue | Money | Yes | Quantity multiplied by current mock price |
| unrealizedGain | Money | Yes | May be positive, zero, or negative |
| unrealizedGainPercentage | decimal string or number | Yes | Derived value |

Relationships:

- References exactly one asset.
- Created or updated after successful purchase.

Validation rules:

- Quantity must support small fractional values.
- Existing position average price must be recalculated after additional purchase.
- Current value and gain/loss must use decimal-safe calculations.

## Quote and Transaction Entities

### FundingQuote

Represents a temporary BRL funding estimate.

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| id | string | Yes | Deterministic quote identifier |
| sourceAmount | Money | Yes | BRL amount |
| destinationAmount | Money | Yes | Estimated USDT received |
| exchangeRate | decimal string | Yes | BRL per USDT |
| fee | Money | Yes | BRL fee |
| paymentMethod | string | Yes | Must be `PIX` |
| expiresAt | ISO datetime string | Yes | Must be future when quote is valid |

Validation rules:

- Source amount must meet the mock minimum.
- Destination amount equals `(source amount - fee) / exchange rate` using decimal-safe arithmetic.
- Expired quotes cannot be confirmed.
- Review screen must display all fields relevant to the user.

### FundingTransaction

Represents the result of a funding attempt.

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| id | string | Yes | Stable transaction identifier |
| type | TransactionType | Yes | `funding` |
| status | TransactionStatus | Yes | pending, completed, failed, expired |
| sourceAmount | Money | Yes | BRL amount |
| destinationAmount | Money | Yes | USDT amount when available |
| fee | Money | Yes | BRL fee |
| paymentMethod | string | Yes | `PIX` |
| createdAt | ISO datetime string | Yes | Deterministic timestamp |
| completedAt | ISO datetime string | No | Present when completed |
| reference | string | Yes | User-visible reference |

State transitions:

```text
reviewing -> awaiting-payment -> pending -> completed
reviewing -> expired
awaiting-payment -> expired
pending -> failed
failed -> reviewing via retry
```

Mutation rules:

- Completed funding increases available balance and creates activity history.
- Failed or expired funding does not mutate balance.

### OrderQuote

Represents a temporary purchase estimate.

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| id | string | Yes | Deterministic quote identifier |
| assetId | string | Yes | References Asset.id |
| investmentAmount | Money | Yes | User-entered USDT amount |
| estimatedQuantity | decimal string | Yes | Investment amount divided by asset price after fees as defined by calculation rules |
| assetPrice | Money | Yes | Current mock asset price |
| executionFee | Money | Yes | USDT fee |
| total | Money | Yes | Investment amount plus fee or all-in total by selected rule |
| remainingBalance | Money | Yes | Available balance after total |
| expiresAt | ISO datetime string | Yes | Must be future when quote is valid |

Validation rules:

- Investment amount must be greater than zero.
- Total must not exceed available balance.
- Asset must be active.
- Expired quotes cannot be confirmed.
- Review must show company, ticker, amount, quantity, price, fee, total, remaining balance, and expiration.

### Order

Represents a submitted mock purchase.

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| id | string | Yes | Stable order identifier |
| quoteId | string | Yes | References OrderQuote.id |
| assetId | string | Yes | References Asset.id |
| status | TransactionStatus | Yes | pending, completed, failed, expired |
| investmentAmount | Money | Yes | User investment amount |
| confirmedQuantity | decimal string | No | Present after successful purchase |
| executionFee | Money | Yes | USDT fee |
| total | Money | Yes | Total debited |
| createdAt | ISO datetime string | Yes | Deterministic timestamp |
| completedAt | ISO datetime string | No | Present when completed |
| reference | string | Yes | User-visible reference |

State transitions:

```text
reviewing -> submitting -> pending -> completed
reviewing -> expired
submitting -> failed
pending -> failed
failed -> reviewing via retry
```

Mutation rules:

- Completed purchase decreases available balance, creates or updates a portfolio position, and creates activity history.
- Failed or expired purchase does not mutate balance or portfolio.
- Duplicate confirmation must not create duplicate orders.

### Transaction

Unified activity history item.

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| id | string | Yes | Stable identifier |
| type | TransactionType | Yes | funding or purchase |
| status | TransactionStatus | Yes | pending, completed, failed, expired |
| assetId | string | No | Required for purchase, omitted for funding |
| sourceAmount | Money | No | Present when helpful for funding |
| destinationAmount | Money | No | Present when helpful for funding |
| amount | Money | Yes | Primary amount shown in activity list |
| fee | Money | No | Present when available |
| createdAt | ISO datetime string | Yes | Display timestamp |
| reference | string | Yes | User-visible reference |

Validation rules:

- Pending, completed, failed, and expired states must be visually distinct without relying only on color.
- Failed transactions may expose retry only where retry is safe.

## Demo State Entities

### AuthState

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| userId | string or null | Yes | Null when logged out |
| authenticatedAt | ISO datetime string | No | Present when logged in |

### DemoScenario

Allowed values:

```text
default
funded-user
unfunded-user
funding-error
purchase-error
expired-quote
chart-error
```

Validation rules:

- Scenario failures activate intentionally, never randomly.
- Default scenario must support the core presentation path.

### DemoState

Fields:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| schemaVersion | number | Yes | Used for migrations and reset |
| auth | AuthState | Yes | Current mock authentication state |
| scenario | DemoScenario | Yes | Current deterministic scenario |
| balance | Balance | Yes | Current available balance |
| portfolio | Portfolio | Yes | Current portfolio state |
| transactions | Transaction[] | Yes | Activity history |
| selectedAssetSymbol | string | No | Preserved selected asset |
| incompletePurchaseContext | object | No | Preserves asset and amount after funding detour |
| updatedAt | ISO datetime string | Yes | Last mutation time |

Validation rules:

- Reset replaces current state with the original fixture for the selected scenario.
- Storage-unavailable fallback must keep the current in-memory session usable.
- Pending transactions after reload resolve deterministically or remain visible with a safe recovery state.

## State Lifecycle Summary

### Funding Flow

```text
idle -> editing -> validating -> reviewing -> awaiting-payment -> processing -> success
idle -> editing -> validating -> error
reviewing -> expired
processing -> error
success -> ready
```

### Purchase Flow

```text
idle -> editing -> validating -> reviewing -> submitting -> pending -> success
editing -> insufficient-funds -> funding-flow -> reviewing
reviewing -> expired
submitting -> error
pending -> error
success -> ready
```

### Chart Flow

```text
idle -> loading -> ready
loading -> error
error -> loading via retry
```

### Reset Flow

```text
idle -> confirming -> resetting -> success -> ready
confirming -> idle via cancel
resetting -> error
```

## Fixture Requirements

Required centralized fixtures:

- Demo user
- Funded user state
- Unfunded user state
- Supported assets
- Asset descriptions
- Current prices
- Price history for all chart ranges
- Available balance
- Empty portfolio
- Populated portfolio
- Funding quotes
- Purchase quotes
- Transaction history
- Scenario states

## Derived Calculations

- Funding destination amount
- Funding fee display
- Order execution fee
- Estimated Stock Token quantity
- Remaining balance
- Portfolio position average price after purchase
- Portfolio current value
- Unrealized gain/loss amount and percentage
- Total portfolio value
- Activity display amounts

All derived calculations must have deterministic unit tests.
