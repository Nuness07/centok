<!--
Sync Impact Report
Version change: unversioned template -> 1.0.0
Modified principles:
- PRINCIPLE_1_NAME placeholder -> I. Financial Simplicity First
- PRINCIPLE_2_NAME placeholder -> II. Blockchain Infrastructure Must Remain Invisible
- PRINCIPLE_3_NAME placeholder -> III. Deterministic Demo Experience
- PRINCIPLE_4_NAME placeholder -> IV. Integration-Ready Frontend Architecture
- PRINCIPLE_5_NAME placeholder -> V. Typed and Modular Frontend
- Added VI. Trustworthy Financial Interface
- Added VII. Consistent Visual Identity
- Added VIII. Accessible and Responsive by Default
- Added IX. Explicit Product States
- Added X. Scope Discipline
Added sections:
- Frontend Technology Standards
- Mock Data Standards
- Quality Gates
- Initial Visual Direction
Removed sections:
- Placeholder template guidance
Templates requiring updates:
- .specify/templates/plan-template.md: updated
- .specify/templates/spec-template.md: updated
- .specify/templates/tasks-template.md: updated
- .specify/templates/checklist-template.md: updated
- .specify/templates/commands/*.md: not present; no update possible in this repo
Follow-up TODOs: None
-->

# Centok Constitution

## Core Principles

### I. Financial Simplicity First

Every product decision MUST reduce the complexity of accessing tokenized U.S.
equities for traditional retail investors. Users MUST NOT be required to
understand wallets, gas fees, stablecoins, token approvals, smart contracts,
liquidity providers, or blockchain networks to complete the primary product
flows.

The interface MUST use familiar financial language and clearly communicate what
the user is purchasing, how much the user is paying, the estimated quantity
received, applicable fees, transaction status, and relevant risks and
disclosures. Technical blockchain terminology MUST only be shown when it
provides meaningful value to the user.

### II. Blockchain Infrastructure Must Remain Invisible

The product MUST present blockchain infrastructure as an implementation detail,
not as the primary user experience. Actions such as wallet creation, account
abstraction, gas sponsorship, fiat conversion, token swaps, and onchain
settlement MUST be represented through simple product actions such as Add funds,
Buy, Sell, Review order, and View portfolio.

The default experience MUST NOT require manual network selection, contract
addresses, raw calldata, token approvals, or external wallet connections.

### III. Deterministic Demo Experience

The hackathon frontend MUST operate without live APIs, smart contracts, wallets,
RPC providers, or external services. All critical demo flows MUST use
deterministic mock data and MUST remain functional without network access.

The demo MUST include predefined states for an authenticated user, a user with
sufficient funds, a user without sufficient funds, successful funding,
successful purchase, pending transaction, failed transaction, empty portfolio,
and populated portfolio. No primary presentation flow may depend on random
behavior, real-time market data, third-party availability, or blockchain
confirmation times.

### IV. Integration-Ready Frontend Architecture

Although the first release uses mock data, the frontend MUST be structured so
real providers can be integrated later without rewriting page components. UI
components MUST interact with domain-oriented services or repositories instead
of directly accessing mock files.

The mock implementation MUST follow the same interfaces expected from future
production integrations. Page components MUST NOT contain provider-specific
logic for El Dorado, Uniswap, ZeroDev, Robinhood Chain, Morpho, or any future
provider.

Example service boundaries:

```ts
interface AssetRepository {
  listAssets(): Promise<Asset[]>;
  getAsset(symbol: string): Promise<Asset>;
  getPriceHistory(symbol: string): Promise<PricePoint[]>;
}

interface PortfolioRepository {
  getPortfolio(): Promise<Portfolio>;
}

interface OrderService {
  getQuote(input: QuoteRequest): Promise<Quote>;
  submitOrder(input: OrderRequest): Promise<Order>;
}

interface FundingService {
  getFundingQuote(input: FundingQuoteRequest): Promise<FundingQuote>;
  addFunds(input: FundingRequest): Promise<FundingTransaction>;
}
```

### V. Typed and Modular Frontend

The project MUST use TypeScript with strict type checking. The application MUST
separate presentation components, domain models, feature logic, repositories and
services, mock fixtures, application state, design-system primitives, and shared
utilities.

The recommended project organization is:

```text
src/
  app/
  components/
  features/
    auth/
    assets/
    trading/
    funding/
    portfolio/
  domain/
  services/
  repositories/
  mocks/
  lib/
  styles/
```

Reusable components MUST remain independent from specific assets, currencies,
or providers whenever practical. Financial values MUST NOT be represented or
calculated using unsafe floating-point assumptions; formatting and calculation
logic MUST be centralized.

### VI. Trustworthy Financial Interface

The interface MUST prioritize clarity, predictability, and user trust over
visual novelty. Every financial action MUST display a review step before
completion.

Purchase and funding flows MUST display input amount, selected asset or
currency, conversion rate, estimated output, fees, total amount, and quote
expiration when applicable. The UI MUST clearly distinguish estimated values,
confirmed values, available balance, portfolio value, unrealized gain or loss,
and transaction status.

The application MUST NOT use misleading claims such as guaranteed returns,
guaranteed tax savings, direct ownership of underlying shares, or universal
country availability.

### VII. Consistent Visual Identity

The product MUST use a cohesive visual system based on deep navy backgrounds,
white or off-white content surfaces, blue as the primary interactive color,
green and red reserved primarily for financial movement and transaction states,
high-contrast typography, and restrained gradients and visual effects.

The landing page and authenticated application MUST feel like parts of the same
product. The visual language MAY draw inspiration from modern fintech and Web3
products, but MUST NOT directly reproduce another company's layout, branding,
illustrations, or proprietary visual elements.

Design tokens MUST define colors, spacing, typography, border radius, shadows,
breakpoints, and transition durations.

### VIII. Accessible and Responsive by Default

Primary flows MUST remain usable on desktop and common laptop resolutions used
during the presentation. The application MUST also provide a functional
responsive experience for tablets and mobile devices.

Interactive elements MUST support keyboard navigation and visible focus states.
Text, buttons, form controls, financial indicators, and modal dialogs MUST meet
WCAG AA color-contrast targets where the chosen colors apply. Color MUST NOT be
the only mechanism used to communicate positive, negative, success, pending, or
error states.

### IX. Explicit Product States

Every feature MUST account for the complete user state lifecycle. At minimum,
features MUST intentionally design idle, loading, empty, ready, reviewing,
submitting, pending, success, error, and expired states.

Loading, empty, error, and pending states MUST be intentionally designed rather
than left as implementation defaults. Modals MUST preserve context and provide
a clear cancellation or recovery action.

### X. Scope Discipline

The frontend MVP MUST focus on demonstrating the core value proposition:
understand the product through the landing page, enter the application, browse
tokenized U.S. equities, inspect an asset, add mock funds, purchase a mock Stock
Token, and see the resulting position in the portfolio.

The following are explicitly out of scope for the initial frontend: real
authentication, real KYC, live fiat conversion, live blockchain transactions,
live wallet creation, real tax calculations, real yield or lending, real
collateralized borrowing, advanced order types, production custody, and
production compliance decisions.

Out-of-scope functionality MAY be represented visually as "Coming soon", but
MUST NOT interfere with the main demo.

## Frontend Technology Standards

The default frontend stack is Next.js App Router, React, TypeScript, Tailwind
CSS, shadcn/ui, TanStack Query, React Hook Form, and Zod. Additional
dependencies MUST solve a demonstrated requirement and MUST NOT duplicate
capabilities already available in the existing stack.

Market charts MUST be encapsulated behind an application component so the
underlying chart library can be replaced without affecting feature code.

## Mock Data Standards

Mock data MUST be centralized and typed. Fixtures MUST include supported Stock
Tokens, current prices, historical chart data, user balances, portfolio
positions, funding quotes, purchase quotes, and transaction history.

Mocks MUST simulate realistic latency and support predefined success and
failure scenarios. Application components MUST NOT import fixture files
directly; they MUST consume repositories or services. Mock transactions MAY
persist in browser storage so balances and portfolio positions remain updated
throughout the demo session.

A reset mechanism MUST exist for restoring the original demo state before a
presentation.

## Quality Gates

Before a feature is considered complete, it MUST pass TypeScript validation,
pass linting, support required loading, empty, success, and error states, work
with mock services only, remain usable through keyboard navigation, work at the
agreed desktop presentation resolution, avoid console errors, preserve the
visual design system, include tests for critical business and formatting logic,
and avoid direct dependencies on future provider implementations.

The main presentation flow MUST be manually tested from landing page to
completed mock purchase before every release.

## Initial Visual Direction

The initial Centok palette is:

```text
Background:       #07111F
Elevated navy:    #0D1B2A
Surface:          #FFFFFF
Surface muted:    #F4F7FB
Primary blue:     #2563EB
Primary hover:    #1D4ED8
Text dark:        #0B1220
Text muted:       #667085
Positive:         #16A36A
Negative:         #DC3545
Border dark:      #203047
Border light:     #E4EAF2
```

## Governance

This constitution defines the non-negotiable product, architecture, UX, and
quality standards for the Centok frontend. Feature specifications and
implementation plans MUST comply with these principles. When a feature
conflicts with this constitution, the constitution takes precedence unless it is
formally amended.

Changes to core principles require a documented reason, an impact assessment,
an updated version, and team approval. Minor clarifications increment the patch
version. New principles or material expansions increment the minor version.
Breaking changes to existing principles increment the major version.

All feature plans MUST include a Constitution Check before research and after
design. All task lists MUST include validation work for deterministic mock
flows, financial clarity, accessibility, TypeScript validation, linting, and
critical business or formatting logic.

**Version**: 1.0.0 | **Ratified**: 2026-07-10 | **Last Amended**: 2026-07-10


