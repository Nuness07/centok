# Implementation Plan: Centok Frontend Demo

**Branch**: `001-centok-frontend-demo` | **Date**: 2026-07-10 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-centok-frontend-demo/spec.md`

## Summary

Centok will be implemented as a frontend-only, deterministic investment demo for Latin American retail investors seeking simpler access to tokenized U.S. equity exposure. The MVP demonstrates the complete presentation path: public landing page, mock login, three-column investment dashboard, Stock Token browsing, asset chart inspection, mock BRL funding through PIX, mock purchase review and confirmation, portfolio mutation, activity history, persistence, and presenter reset.

The application will not connect to live providers during this phase. All behavior will run through typed repositories, services, fixtures, deterministic latency, and versioned browser persistence so later provider integrations can replace mock infrastructure without rewriting page-level experiences.

## Technical Context

**Language/Version**: TypeScript strict mode with React and Next.js App Router.

**Primary Dependencies**: Next.js App Router, React, Tailwind CSS, shadcn/ui primitives, TanStack Query, React Hook Form, Zod, `decimal.js` for decimal-safe calculations, a replaceable financial chart adapter backed initially by `lightweight-charts`, and test tooling for unit/component/end-to-end validation.

**Storage**: Centralized typed mock fixtures plus a versioned browser-storage adapter for demo session persistence. Page and feature components must not access `localStorage` directly.

**Testing**: TypeScript validation, linting, unit tests for financial calculations and domain services, component tests for critical forms and states, end-to-end validation of the primary demo path, and manual presentation-flow verification before release.

**Target Platform**: Responsive web frontend for desktop presentation, common laptop widths, tablet, and mobile browser contexts. Desktop is the primary hackathon presentation target.

**Project Type**: Frontend-only web application.

**Performance Goals**: Primary demo flows feel responsive under deterministic mock latency. Asset switching, funding quotes, purchase quotes, and modal transitions must not appear blocked. The primary flow must not depend on network availability or real-time confirmations.

**Constraints**: Mock-only operation; no live APIs, wallets, smart contracts, RPC providers, payment providers, market-data services, or blockchain confirmations in the hackathon demo. Future provider names may appear only as product-facing infrastructure context or in isolated integration mapping docs.

**Scale/Scope**: Landing page, mock login, authenticated shell, asset browse/detail dashboard, chart ranges, mock funding, mock purchase, portfolio update, activity history, deterministic scenario controls, and resettable persisted state.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Financial simplicity**: PASS. Primary copy and flows use Add funds, Buy, Review order, Portfolio, Activity, and Available balance. Wallets, gas, approvals, networks, and contract details are not required in primary flows.
- **Invisible blockchain infrastructure**: PASS. Future account, funding, liquidity, execution, and settlement providers are represented through simple product actions and hidden behind service boundaries.
- **Deterministic demo**: PASS. All critical presentation paths use typed mock services, fixed fixtures, deterministic latency, predefined scenarios, and resettable local state.
- **Integration-ready architecture**: PASS. UI consumes domain repositories and services. Mock implementations follow the same contracts intended for future production integrations.
- **Typed modular frontend**: PASS. The plan uses strict TypeScript and separates app routes, reusable components, features, domain models, services, repositories, mocks, utilities, and styles.
- **Trustworthy financial interface**: PASS. Funding and purchase include review steps, input amount, conversion rate where applicable, estimated output, fees, totals, remaining balance, and quote expiration.
- **Visual identity**: PASS. Design tokens centralize Centok navy, surface, blue, positive, negative, border, typography, spacing, radius, shadow, breakpoint, and transition values.
- **Accessibility and responsiveness**: PASS. Keyboard navigation, visible focus, semantic controls, modal focus management, reduced-motion support, non-color status cues, and responsive layouts are planned.
- **Explicit product states**: PASS. Idle, loading, empty, ready, reviewing, validating, awaiting payment, submitting, pending, success, error, and expired states are explicitly modeled.
- **Scope discipline**: PASS. Real authentication, KYC, wallet creation, fiat payments, PIX, stablecoin movement, market prices, swaps, smart contracts, settlement, tax, yield, lending, sell orders, custody, and production compliance remain out of scope.

## Project Structure

### Documentation (this feature)

```text
specs/001-centok-frontend-demo/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── domain-services.md
│   └── ui-flows.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── markets/[symbol]/page.tsx
│       ├── portfolio/page.tsx
│       └── activity/page.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   ├── feedback/
│   ├── financial/
│   └── branding/
├── features/
│   ├── auth/
│   ├── assets/
│   ├── charts/
│   ├── funding/
│   ├── trading/
│   ├── portfolio/
│   ├── activity/
│   └── demo/
├── domain/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   ├── calculations/
│   ├── validation/
│   └── errors/
├── infrastructure/
│   ├── mocks/
│   │   ├── fixtures/
│   │   ├── repositories/
│   │   ├── services/
│   │   └── scenarios/
│   ├── storage/
│   └── query/
├── lib/
├── config/
└── styles/

tests/
├── unit/
├── component/
└── e2e/
```

**Structure Decision**: Use a single Next.js frontend application with feature folders for UI workflows, domain folders for business contracts and calculations, and infrastructure folders for replaceable mock implementations. This preserves integration readiness while keeping the hackathon MVP compact.

## Route Structure

```text
/
/login
/app
/app/markets/[symbol]
/app/portfolio
/app/activity
```

- `/`: Landing page with header, hero, value proposition, how it works, comparison, infrastructure explanation, security/trust content, final CTA, and disclaimer.
- `/login`: Mock authentication using a predefined demo account.
- `/app`: Authenticated dashboard with the default selected asset.
- `/app/markets/[symbol]`: Dashboard state for a selected asset.
- `/app/portfolio`: Portfolio overview, positions, and empty state.
- `/app/activity`: Funding and purchase transaction history.

Funding and purchasing should be implemented as dialogs, drawers, or modal routes that preserve the selected asset and purchase context.

## Architecture Overview

```text
Next.js application
  -> app routes and layouts
  -> feature components and hooks
  -> domain repositories, services, validation, and calculations
  -> mock infrastructure implementations
  -> versioned browser storage and deterministic fixtures
```

Provider-specific integration logic for El Dorado, ZeroDev, Uniswap, Rialto, Centok contracts, Robinhood Chain, or Morpho must not appear in page components. Future integrations replace infrastructure implementations behind the same domain service contracts.

## Design System Plan

- Define CSS variables for the Centok palette, typography, spacing, radii, shadows, breakpoints, and transition durations.
- Use deep navy as the authenticated app foundation and white/off-white sections for marketing content.
- Use blue for primary actions, green/red primarily for financial movement and transaction states, and status text/icons alongside color.
- Use tabular numerals for prices and balances where practical.
- Keep cards to individual repeated items, modals, or framed tools; avoid nested cards and decorative page-section cards.

Required primitives and shared components:

```text
Button, Input, CurrencyInput, SearchInput, Select, Tabs, Dialog, Drawer,
Sheet, Tooltip, Badge, Avatar, Skeleton, Toast, EmptyState, ErrorState,
StatusIndicator, MoneyDisplay, PercentageChange, AssetLogo, AssetListItem,
QuoteSummary, TransactionStatus
```

## State Management Plan

- TanStack Query owns async mock-service reads and invalidation for assets, price history, portfolio, balance, quotes, and activity.
- React Hook Form owns funding and purchase form state.
- Zod owns form validation and service input validation.
- URL state owns selected asset symbol and chart range where practical.
- Local component state owns modal steps, tabs, countdown display, and transient visual state.
- A typed storage adapter owns mock authentication, available balance, portfolio, transaction history, incomplete purchase context, scenario, and schema version.

Do not persist loading states, transient errors, quote countdown timers, or animation state.

## Financial Calculation Plan

All financial values are stored as decimal strings and calculated with decimal-safe utilities. Rounding happens only at display or simulated settlement boundaries.

Centralized calculations:

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

Unit tests must cover all calculation functions, rounding rules, invalid amount handling, insufficient funds, quote expiration, and portfolio mutation after purchase.

## Mock Infrastructure Plan

Initial fixtures include demo user, funded and unfunded user states, supported assets, asset descriptions, current prices, historical chart series, available balance, portfolio positions, funding quotes, purchase quotes, transaction history, and scenario controls.

Default demo state:

```text
User: Gabriel, Brazil
Available balance: 5.00 USDT
Portfolio: empty
Default selected asset: AAPL or NVDA
```

Suggested deterministic values:

```text
Funding input: 500.00 BRL
Funding exchange rate: 5.30 BRL per USDT
Funding fee: 5.00 BRL
Estimated received: 93.40 USDT
Purchase amount: 80.00 USDT
Execution fee: 0.40 USDT
```

Mock latency:

```text
General data read: 250-400 ms
Funding quote: 400 ms
Funding processing: 1500-2000 ms
Order quote: 400 ms
Purchase processing: 1500-2000 ms
```

Scenario modes:

```text
default
funded-user
unfunded-user
funding-error
purchase-error
expired-quote
chart-error
```

Error scenarios must activate intentionally and never randomly interrupt the main presentation flow.

## Implementation Phases

### Phase 1 - Project Foundation

Deliver app setup, strict TypeScript, Tailwind, shadcn/ui, linting, formatting, test scripts, base folders, design tokens, app fonts, query provider, decimal utility, storage adapter shell, and initial domain types.

Completion criteria: application renders, type checking passes, linting passes, base layout works, and design tokens are available.

### Phase 2 - Domain and Mock Infrastructure

Deliver domain models, repository interfaces, service interfaces, fixtures, mock repositories, mock funding service, mock order service, mock auth service, local persistence, reset, scenario configuration, deterministic latency, and core financial calculations.

Completion criteria: features can consume services without importing fixtures, state persists across reload, reset restores the original fixture, and financial calculations are unit tested.

### Phase 3 - Landing Page

Deliver header, hero, value proposition, how-it-works section, process comparison, product preview, infrastructure explanation, security/trust section, final CTA, footer/disclaimer, and mobile navigation.

Completion criteria: value proposition is understandable within 15 seconds, CTAs route correctly, page is responsive, and no proprietary reference assets are copied.

### Phase 4 - Authentication and App Shell

Deliver mock login, route protection, authenticated layout, app header, navigation, user menu, logout, and reset entry point.

Completion criteria: login persists, logout returns to landing page, protected pages redirect appropriately, and app shell works at presentation resolution.

### Phase 5 - Market Dashboard

Deliver asset list, search, selected asset state, asset detail header, price display, chart abstraction, time-range selector, asset description, Stock Token disclosure, order ticket, loading states, empty states, and chart error state.

Completion criteria: asset selection updates all dashboard areas, search filters assets, chart range updates mock data, and desktop three-column layout remains stable.

### Phase 6 - Funding Flow

Deliver insufficient-funds prompt, funding amount form, BRL-to-USDT quote, funding review, mock PIX state, pending state, success state, failure state, expired quote state, and return-to-purchase behavior.

Completion criteria: successful funding updates balance and activity, failed funding does not mutate state, and funding entered from purchase returns to the selected asset.

### Phase 7 - Purchase Flow

Deliver amount entry, balance validation, order quote, review screen, quote countdown, explicit confirmation, duplicate-submit protection, pending state, success state, failure state, and expired quote recovery.

Completion criteria: successful purchase updates balance, portfolio, and activity; failed purchase does not mutate state; selected asset remains consistent throughout the flow.

### Phase 8 - Portfolio and Activity

Deliver portfolio summary, position list, empty state, transaction history, transaction status badges, and navigation integrations.

Completion criteria: purchased assets appear correctly, totals match financial calculations, and activity reflects funding and purchase history.

### Phase 9 - Quality and Presentation Polish

Deliver end-to-end demo validation, accessibility review, responsive adjustments, skeletons, error boundaries, reduced-motion support, console-error cleanup, final fixtures, and presenter reset test.

Completion criteria: complete demo flow passes, reset completes in under ten seconds, no primary-flow console errors remain, and the presentation can be repeated reliably.

## Testing Strategy

Unit tests cover currency formatting, decimal calculations, funding quote calculation, purchase quote calculation, remaining balance, portfolio update after purchase, gain/loss calculations, validation schemas, storage versioning, and reset behavior.

Component tests cover asset search, currency input, funding form, purchase form, quote review, insufficient funds, pending state, success state, error state, expired quote state, and reset confirmation.

End-to-end validation covers landing -> login -> dashboard -> select asset -> buy -> insufficient balance -> add funds -> mock PIX payment -> return to order -> confirm purchase -> purchase success -> portfolio -> activity -> reset.

Manual release validation repeats the main presentation path at the agreed desktop presentation resolution and at common laptop widths.

## Accessibility Plan

The implementation must include semantic headings, labeled controls, keyboard-accessible navigation, visible focus states, modal focus trapping, Escape handling where safe, screen-reader status announcements for funding and purchase outcomes, non-color status indicators, sufficient contrast, and reduced-motion compatibility.

## Performance Plan

Landing page: optimize hero media, avoid unnecessary client components, lazy-load below-the-fold sections, prefer CSS effects over heavy animation libraries, and keep fonts/images controlled.

Dashboard: avoid virtualization for the initial small asset list, memoize chart transformations where useful, avoid recomputing financial totals in render loops, use query caching for mock services, and isolate client components.

Targets: fast initial landing render, no visible blocking during asset switching, modal transitions below perceived-delay thresholds, and stable layout without major content shifts.

## Error Handling Plan

Domain error categories:

```text
InsufficientBalance
QuoteExpired
AssetUnavailable
FundingFailed
PurchaseFailed
StorageUnavailable
ChartUnavailable
```

The UI translates domain errors into clear user-facing messages with retry, cancel, refresh quote, add funds, or reset recovery actions. It must not display stack traces, raw JavaScript errors, provider-specific internals, raw contract/network details, or unexplained identifiers.

## Security and Trust Considerations

The demo must never imply that real money is being processed. It must not request wallet credentials, seed phrases, real PIX payments, working deposit addresses, real personal data, or production KYC details. It must not claim production regulatory approval, guaranteed tax reductions, guaranteed returns, direct ownership of shares, or universal jurisdictional availability.

## Future Integration Mapping

```text
MockFundingService -> El Dorado funding implementation
MockAuthService -> embedded wallet and ZeroDev implementation
MockOrderService -> Centok execution contract plus Uniswap/Rialto implementation
MockAssetRepository -> Robinhood Chain/indexer implementation
Portfolio future actions -> Morpho or compatible onchain protocols
```

All mappings are future infrastructure concerns and stay outside page components in the MVP.

## Key Architecture Decisions

### ADR-001 - Frontend-Only Initial MVP

**Decision**: Use local deterministic mock services instead of live integrations.

**Rationale**: Reduces demo risk, keeps presentation deterministic, supports offline execution, and lets product validation proceed before provider integration.

**Alternatives considered**: Live provider prototypes and static-only mock screens. Live providers add reliability risk; static screens fail to prove state mutation and future integration boundaries.

### ADR-002 - Repository and Service Boundaries

**Decision**: UI consumes domain repositories and services rather than fixtures or provider-specific implementations.

**Rationale**: Future providers can replace mocks without rewriting pages, and testing can target domain behavior independently.

**Alternatives considered**: Import fixtures in components. This is faster initially but violates the constitution and makes provider replacement costly.

### ADR-003 - Versioned Browser Persistence

**Decision**: Persist demo account state through a typed storage adapter with schema versioning and reset support.

**Rationale**: Demonstrates realistic state changes, survives reloads, and requires no backend.

**Alternatives considered**: In-memory-only state and unversioned local storage. In-memory state breaks reload scenarios; unversioned storage makes fixture changes brittle.

### ADR-004 - Decimal-Safe Financial Values

**Decision**: Store financial values as strings and calculate with a decimal library.

**Rationale**: Avoids unsafe floating-point behavior and matches financial-domain expectations.

**Alternatives considered**: JavaScript numbers. This is simpler but unsafe for currency, quantity, and fee calculations.

### ADR-005 - Desktop-First Dashboard with Responsive Fallbacks

**Decision**: Optimize the dashboard for a three-area desktop presentation while keeping tablet and mobile flows functional.

**Rationale**: The hackathon demo primarily uses desktop/laptop, and simultaneous asset list, chart, and order ticket visibility supports the pitch.

**Alternatives considered**: Mobile-first single-column dashboard as the only layout. This weakens the presentation experience.

### ADR-006 - Replaceable Chart Adapter

**Decision**: Encapsulate chart rendering behind a Centok chart component and adapter interface.

**Rationale**: Chart library choice can change without affecting assets, dashboard, or trading features.

**Alternatives considered**: Direct chart library calls in dashboard components. This couples feature code to a replaceable visualization dependency.

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Scope exceeds available time | Prioritize landing, dashboard, funding, purchase, portfolio mutation, reset, then activity polish |
| Dashboard feels overloaded | Keep asset metadata concise, use progressive disclosure, and keep the order flow visually dominant |
| Mock data feels unrealistic | Use internally consistent prices, fees, chart series, balances, and transaction history |
| Demo state breaks between presentations | Add reset, storage versioning, default fixtures, and a reset validation step |
| Product appears crypto-native | Use traditional investment language, company-first asset cards, portfolio views, and local-currency entry |
| Claims become legally misleading | Use economic-exposure language and clear jurisdiction/eligibility disclosures |
| Additional dependencies bloat the MVP | Add only dependencies with a direct requirement: decimal arithmetic, chart rendering, and validation/testing |

## Critical Path

```text
Foundation
-> Domain contracts and mock state
-> Dashboard shell
-> Asset selection and chart
-> Funding flow
-> Purchase flow
-> Portfolio mutation
-> Activity history
-> Demo reset
-> Landing page polish
-> End-to-end validation
```

Funding and purchase services must exist before final UI flows. Portfolio mutation must be complete before the purchase flow is considered done.

## MVP Completion Definition

The frontend MVP is complete when the landing page explains Centok, mock login reaches the dashboard, supported Stock Tokens are browsable, a user can inspect an asset chart, an unfunded user can add mock funds, the user can return to the original purchase, the purchase review and confirmation flow completes, pending and success states are shown, balance/portfolio/activity update, state persists after reload, reset restores the demo, the full flow works without live services, and the primary flow has no unhandled errors.

## Post-Design Constitution Check

- Financial simplicity: PASS. The planned UI keeps blockchain terms secondary and uses familiar financial actions.
- Invisible blockchain infrastructure: PASS. Provider mappings remain infrastructure details and are absent from primary flow mechanics.
- Deterministic demo: PASS. Research and design artifacts define fixed fixtures, deterministic latency, scenarios, persistence, and reset.
- Integration-ready architecture: PASS. Contracts isolate repositories, services, UI flows, and mock infrastructure.
- Typed modular frontend: PASS. Data model and project structure provide separated domain, feature, infrastructure, and UI layers.
- Trustworthy financial interface: PASS. Funding and purchase contracts require review, fee, total, remaining balance, estimate, and expiration displays.
- Visual identity: PASS. Design-token requirements preserve the constitution palette and status-color usage.
- Accessibility and responsiveness: PASS. Quickstart and UI contracts include keyboard, focus, modal, responsive, and non-color status validation.
- Explicit states: PASS. Data model and UI contracts define pending, success, error, expired, empty, loading, and reset states.
- Scope discipline: PASS. Out-of-scope real integrations remain future mappings only.

## Complexity Tracking

No constitution violations are introduced. Additional dependencies are justified by demonstrated requirements:

| Dependency | Why Needed | Existing Stack Alternative Rejected Because |
|------------|------------|---------------------------------------------|
| `decimal.js` or equivalent | Decimal-safe currency, fee, and fractional quantity calculations | Native numbers are unsafe for financial arithmetic |
| `lightweight-charts` behind adapter | Financial chart rendering with replaceable implementation | Hand-built charts would add risk and duplicate a specialized capability |
| End-to-end test runner | Validate the critical presentation path across routes and modal flows | Unit/component tests do not prove the complete demo journey |
