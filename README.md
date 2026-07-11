# Centok

Centok is a consumer-facing investment platform designed to simplify access to tokenized U.S. stocks for Latin American retail investors.

The product provides a familiar investment experience while abstracting the technical complexity of wallets, stablecoins, gas fees, token swaps, smart contracts, and blockchain networks.

> This repository currently contains a frontend-only demonstration. All balances, prices, funding operations, and purchases are simulated.

---

## The Problem

Investing in U.S. markets from Latin America can involve:

- International account opening.
- Complex onboarding processes.
- Currency conversion.
- International transfers.
- Multiple service providers.
- Unclear spreads and fees.
- Limited access outside traditional market hours.

Tokenized stocks introduce new possibilities, but the current Web3 experience often requires users to understand:

- Wallets.
- Gas fees.
- Stablecoins.
- DEXs.
- Token approvals.
- Smart contracts.
- Blockchain networks.

Centok aims to combine the accessibility of a traditional investment platform with the programmability of onchain assets.

---

## The Solution

Centok provides a simple flow:

```text
Add money
→ Choose a tokenized stock
→ Review the investment
→ Confirm the purchase
→ Track the position
```

Behind the scenes, the planned production flow is:

```text
Local fiat currency
    ↓
Manteca
    ↓
USDC or USDT
    ↓
ZeroDev smart account
    ↓
Centok execution contract
    ↓
Uniswap or Rialto
    ↓
Robinhood Stock Token
```

Future versions may allow users to use tokenized stocks in lending, collateral, and yield strategies through protocols such as Morpho.

---

## Current Status

The current version is a deterministic frontend prototype prepared for:

- Hackathon demonstrations.
- Product validation.
- User interviews.
- Pitch presentations.
- Future infrastructure integrations.

The application does not currently process real money or interact with live blockchain contracts.

---

## Demo Flow

The main demonstration flow is:

1. Open the Centok landing page.
2. Understand the product and its value proposition.
3. Enter through the mock login.
4. Browse supported tokenized U.S. stocks.
5. Select an asset and inspect its price chart.
6. Attempt to purchase the asset.
7. Add simulated funds through a BRL-to-USDT PIX flow.
8. Return to the original purchase.
9. Review the order, fees, and estimated quantity.
10. Confirm the simulated transaction.
11. View the updated balance and portfolio position.
12. Review the transaction in the activity history.

---

## Features

### Landing Page

- Product value proposition.
- Explanation of tokenized stocks.
- Simplified investment journey.
- Comparison with fragmented traditional flows.
- Infrastructure overview.
- Security and transparency section.
- Product disclaimers.
- Responsive navigation.

### Investment Dashboard

- Searchable asset list.
- Asset selection.
- Current simulated prices.
- Positive and negative price movement.
- Historical price chart.
- Multiple chart ranges.
- Asset descriptions.
- Tokenized-stock disclosures.
- Three-column desktop layout.

### Mock Funding

- BRL input.
- USDT output estimate.
- Simulated exchange rate.
- Simulated provider fee.
- PIX payment method.
- Mock QR-code flow.
- Pending, success, error, and expired states.

### Mock Purchase

- Investment amount input.
- Available-balance validation.
- Estimated Stock Token quantity.
- Execution-fee breakdown.
- Remaining balance.
- Quote expiration.
- Review and confirmation step.
- Pending, success, error, and expired states.

### Portfolio

- Available balance.
- Total portfolio value.
- Individual positions.
- Average purchase price.
- Current value.
- Simulated gain or loss.
- Empty portfolio state.

### Activity

- Funding transactions.
- Purchase transactions.
- Pending, completed, failed, and expired states.
- Transaction reference identifiers.

### Demo Controls

- Local state persistence.
- Deterministic mock services.
- Demo reset.
- Predefined success and failure scenarios.

---

## Supported Demo Assets

The current mock asset catalogue includes:

- Apple — `AAPL`
- Advanced Micro Devices — `AMD`
- Amazon — `AMZN`
- Alphabet — `GOOGL`
- Meta — `META`
- Microsoft — `MSFT`
- NVIDIA — `NVDA`
- Tesla — `TSLA`
- Coinbase — `COIN`
- Netflix — `NFLX`

Asset prices and historical series are simulated and must not be interpreted as live market data.

---

## Technology Stack

- [Next.js](https://nextjs.org/) with App Router
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- Decimal-safe financial calculations
- Browser local storage for demo persistence
- GitHub Spec Kit for specification-driven development

---

## Architecture

The frontend is structured to keep user-interface components independent from infrastructure providers.

```text
Next.js Pages and Layouts
        ↓
Feature Components
        ↓
Domain Services and Repositories
        ↓
Mock Implementations
        ↓
Typed Fixtures and Local Storage
```

Page components must not directly import mock fixtures or provider-specific implementations.

The initial mock services are designed to be replaced later without rewriting the main user interface.

```text
MockFundingService
→ Manteca integration

MockAccountService
→ ZeroDev integration

MockOrderService
→ Centok contract + Uniswap or Rialto

MockBlockchainRepository
→ Robinhood Chain RPC and indexing

MockYieldService
→ Morpho integration
```

---

## Planned Onchain Architecture

The proposed production architecture includes:

### Smart Account

ZeroDev may be used for:

- Embedded wallet creation.
- Account abstraction.
- Gas sponsorship.
- Batched transactions.
- Simplified user authentication.

### Funding

Manteca may be used for:

- Local currency funding.
- BRL payments.
- Fiat-to-USDC or fiat-to-USDT conversion.
- Settlement into the user’s smart account.

### Purchase Execution

The Centok execution contract may provide:

- Supported-asset validation.
- Approved-router validation.
- Slippage protection.
- Quote expiration.
- Recipient protection.
- Execution events.
- Non-custodial settlement.

### Liquidity

Uniswap or Rialto may provide liquidity for swaps between:

```text
USDC or USDT
→ Robinhood Stock Token
```

### Settlement

Robinhood Chain is the planned blockchain environment for Stock Token settlement.

### Future Lending and Yield

Morpho may be used to support future capabilities such as:

- Supplying Stock Tokens to lending markets.
- Using Stock Tokens as collateral.
- Borrowing stablecoins without selling the position.
- Earning interest when borrowing demand exists.

---

## Project Structure

```text
src/
├── app/
│   ├── (marketing)/
│   ├── login/
│   └── app/
│       ├── markets/
│       ├── portfolio/
│       └── activity/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── financial/
│   ├── feedback/
│   └── branding/
│
├── features/
│   ├── auth/
│   ├── assets/
│   ├── charts/
│   ├── funding/
│   ├── trading/
│   ├── portfolio/
│   ├── activity/
│   └── demo/
│
├── domain/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   ├── calculations/
│   ├── validation/
│   └── errors/
│
├── infrastructure/
│   ├── mocks/
│   ├── storage/
│   └── query/
│
├── config/
├── lib/
└── styles/
```

---

## Getting Started

### Requirements

- Node.js 20 or newer.
- `pnpm`, `npm`, or `yarn`.

The project examples below use `pnpm`.

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/centok.git
cd centok
pnpm install
```

### Development

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

### Production Build

```bash
pnpm build
pnpm start
```

### Type Checking

```bash
pnpm typecheck
```

### Linting

```bash
pnpm lint
```

### Tests

```bash
pnpm test
```

### End-to-End Tests

```bash
pnpm test:e2e
```

The exact scripts may vary according to the current `package.json`.

---

## Environment Variables

The frontend-only demo should not require production credentials.

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

Possible future variables:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_DEMO_MODE=true

MANTECA_API_URL=
MANTECA_API_KEY=

ZERODEV_PROJECT_ID=
ZERODEV_BUNDLER_URL=
ZERODEV_PAYMASTER_URL=

ROBINHOOD_CHAIN_RPC_URL=

CENTOK_EXECUTION_CONTRACT_ADDRESS=

UNISWAP_ROUTER_ADDRESS=
RIALTO_API_URL=

MORPHO_CONTRACT_ADDRESS=
```

Never commit real API keys, private keys, wallet seed phrases, or production credentials.

---

## Demo Data

The application uses typed mock fixtures for:

- User information.
- Asset prices.
- Historical price data.
- Available balance.
- Portfolio positions.
- Funding quotes.
- Purchase quotes.
- Transaction history.

Mock data should only be accessed through domain repositories and service interfaces.

Components must not import fixture files directly.

---

## Financial Calculations

Financial values must not rely on unsafe JavaScript floating-point arithmetic.

Values should be stored as decimal strings and processed through a decimal-safe library.

Examples of centralized calculations:

```text
calculateFundingQuote
calculateOrderQuote
calculateRemainingBalance
calculatePositionAfterPurchase
calculatePortfolioValue
calculateUnrealizedGain
formatMoney
formatQuantity
formatPercentage
```

---

## Design Direction

Centok uses a modern fintech visual identity based on:

- Deep navy backgrounds.
- White and off-white surfaces.
- Blue primary actions.
- Green and red financial indicators.
- High-contrast typography.
- Restrained gradients.
- Rounded geometric elements.

Suggested primary colors:

```text
Background Navy:       #07111F
Elevated Navy:         #0D1B2A
Surface White:         #FFFFFF
Surface Muted:         #F4F7FB
Primary Blue:          #2563EB
Primary Blue Hover:    #1D4ED8
Dark Text:             #0B1220
Muted Text:            #667085
Positive:              #16A36A
Negative:              #DC3545
Dark Border:           #203047
Light Border:          #E4EAF2
```

---

## Roadmap

### Phase 1 — Frontend Demo

- Landing page.
- Mock login.
- Investment dashboard.
- Asset chart.
- Mock PIX funding.
- Mock Stock Token purchase.
- Portfolio.
- Activity history.
- Demo reset.

### Phase 2 — Wallet and Account Abstraction

- Embedded user authentication.
- ZeroDev smart account.
- Gas sponsorship.
- User-operation tracking.

### Phase 3 — Live Blockchain Data

- Robinhood Chain RPC integration.
- Stock Token balances.
- Transaction indexing.
- Contract metadata.
- Price feeds.

### Phase 4 — Fiat Funding

- Manteca API integration.
- KYC and eligibility.
- PIX funding.
- Fiat-to-stablecoin settlement.
- Payment-status monitoring.

### Phase 5 — Stock Token Purchase

- Centok execution contract.
- Uniswap or Rialto integration.
- Slippage validation.
- Quote validation.
- Transaction monitoring.

### Phase 6 — Lending and Yield

- Morpho market integration.
- Stock Token supply.
- Stablecoin borrowing.
- Collateral management.
- Yield and risk dashboard.
- Liquidation-risk monitoring.

---

## Product Principles

Centok follows these principles:

1. Financial simplicity comes before blockchain terminology.
2. Users should not need to understand Web3 to complete the main flow.
3. Every financial action must include a clear review step.
4. Fees must be visible before confirmation.
5. Mock infrastructure must be replaceable by real providers.
6. Financial calculations must be deterministic and decimal-safe.
7. The product must not describe Stock Tokens as direct ownership of shares.
8. The demo must never imply that real funds are being processed.

---

## Disclaimer

Centok is currently an experimental prototype.

The current application:

- Uses simulated market data.
- Uses simulated balances.
- Uses simulated funding transactions.
- Uses simulated Stock Token purchases.
- Does not process real money.
- Does not provide investment, legal, accounting, or tax advice.

Stock Tokens are tokenized instruments designed to provide economic exposure to referenced assets. They may not represent direct legal ownership of the underlying shares.

Availability, eligibility, regulatory treatment, fees, and risks may vary by jurisdiction.

Nothing in this repository should be interpreted as a promise of guaranteed returns, guaranteed liquidity, guaranteed tax advantages, or unrestricted availability.

---


1. Create a feature branch.

```bash
git checkout -b feature/feature-name
```

2. Implement the feature according to the project specification and constitution.

3. Run the quality checks.

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

4. Open a pull request with:

- A clear summary.
- Screenshots or recordings when relevant.
- Testing instructions.
- Known limitations.
- Specification references.

---

## License

Copyright © 2026 Gabriel Nunes. All rights reserved.

Centok is proprietary software. No permission is granted to use,
copy, modify, distribute, sublicense, or sell any part of this project
without prior written authorization.

See the [LICENSE](./LICENSE) file for details.

---

## Team

Centok is being developed as a product-validation project focused on making tokenized U.S. equity exposure more accessible to Latin American investors.