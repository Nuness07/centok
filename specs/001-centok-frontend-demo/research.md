# Research: Centok Frontend Demo

**Feature**: Centok Frontend Demo
**Date**: 2026-07-10
**Spec**: [spec.md](./spec.md)

## Decision: Build a Frontend-Only Deterministic MVP

**Rationale**: The demo must be reliable during a live pitch, work without network access, avoid provider availability risk, and show stateful product behavior from landing page through completed mock purchase. A frontend-only application with deterministic mock services satisfies the hackathon goal while preserving the product story.

**Alternatives considered**:

- Live provider prototype: rejected because payment, wallet, market-data, and blockchain dependencies would make the presentation brittle.
- Static clickable prototype: rejected because it would not prove balance, portfolio, activity, persistence, pending states, or reset behavior.
- Backend-backed demo: rejected for MVP because it increases setup and deployment scope without improving the core pitch.

## Decision: Use Next.js App Router with Strict TypeScript

**Rationale**: The constitution defines Next.js App Router, React, and TypeScript strict mode as the default frontend stack. App Router supports marketing pages, authenticated layouts, route-level organization, and selective client components. Strict TypeScript supports domain contracts and safer financial/data modeling.

**Alternatives considered**:

- Single-page Vite application: simpler, but diverges from the project standard and reduces route/layout alignment with the planned product.
- Static HTML prototype: too limited for persisted state, modal flows, and typed service boundaries.

## Decision: Use Feature-Based UI plus Domain and Infrastructure Layers

**Rationale**: The spec requires future integration readiness. Keeping features, domain models, services, repositories, mocks, and storage separated prevents page components from importing fixtures or provider-specific code directly.

**Alternatives considered**:

- Component-only organization: rejected because domain contracts and provider boundaries become unclear.
- Provider-first organization: rejected because it exposes implementation details that must remain invisible to users and replaceable later.

## Decision: Use TanStack Query for Mock-Service Reads and Invalidation

**Rationale**: The app has asynchronous mock reads, deterministic latency, cache invalidation after funding/purchase, and reload-sensitive state. TanStack Query provides a consistent shape for current mocks and later provider-backed reads.

**Alternatives considered**:

- Local component state only: rejected because cross-feature invalidation for balance, portfolio, activity, and asset data would become scattered.
- Global store for all data: rejected because server-like async states, errors, stale data, and retries are better modeled by query boundaries.

## Decision: Use React Hook Form and Zod for Funding and Purchase Forms

**Rationale**: Funding and purchase flows need amount validation, minimums, insufficient-balance checks, disabled confirmation states, review steps, and clear error messages. React Hook Form keeps form state isolated, while Zod validates structured inputs consistently.

**Alternatives considered**:

- Hand-rolled validation: rejected because duplicated financial validation would increase risk.
- Browser-only validation: rejected because it cannot express quote expiration, insufficient balance, or decimal-safe domain constraints.

## Decision: Use Decimal-Safe Arithmetic with Decimal Strings

**Rationale**: Money, fees, exchange rates, token quantities, remaining balance, portfolio value, and gain/loss calculations cannot rely on unsafe floating-point behavior. Store amounts as decimal strings and calculate with `decimal.js` or an equivalent decimal library.

**Alternatives considered**:

- JavaScript numbers: rejected because currency and fractional token calculations can produce unsafe precision errors.
- Integer minor units only: useful for fiat, but less ergonomic for fractional Stock Token quantities and exchange rates.

## Decision: Encapsulate Chart Rendering Behind a Replaceable Adapter

**Rationale**: The spec requires multiple chart ranges and credible financial visualization while allowing future replacement of the chart implementation. Use a Centok chart component and adapter boundary, initially backed by a financial-chart-compatible library such as `lightweight-charts`.

**Alternatives considered**:

- Direct library usage in dashboard components: rejected because it couples feature code to a replaceable dependency.
- Hand-built SVG/canvas chart: rejected because it duplicates specialized chart behavior and increases delivery risk.

## Decision: Persist Demo State with a Versioned Storage Adapter

**Rationale**: The demo must preserve authentication, balance, portfolio, transactions, and incomplete purchase context after reload. A typed adapter centralizes storage access, supports storage-unavailable fallback, and allows future schema migrations.

**Alternatives considered**:

- Direct `localStorage` calls from components: rejected because it couples UI to persistence and violates modularity.
- In-memory state only: rejected because reload persistence is a required scenario.
- Cookies: rejected because this is not real authentication and does not need server participation.

## Decision: Use Deterministic Scenario Controls Instead of Random Failures

**Rationale**: The presentation-critical path must be repeatable. Error and expired states are required, but they should activate intentionally through scenarios or hidden presenter controls.

**Alternatives considered**:

- Randomized failures: rejected because they can interrupt a live demo.
- No error scenarios: rejected because the spec and constitution require explicit error, expired, and pending states.

## Decision: Use Desktop-First Dashboard with Responsive Fallbacks

**Rationale**: The hackathon presentation uses desktop/laptop, and the product story benefits from simultaneous asset list, chart, and order ticket visibility. Tablet and mobile remain functional by reorganizing the same content.

**Alternatives considered**:

- Mobile-only layout: rejected because it weakens the presentation experience.
- Separate desktop/mobile feature implementations: rejected because it increases maintenance and risks inconsistent behavior.

## Decision: Validate with Unit, Component, End-to-End, and Manual Presentation Tests

**Rationale**: Financial logic needs unit coverage; funding and purchase forms need component coverage; the full presentation path needs end-to-end validation; and the final hackathon flow needs manual verification at presentation resolution.

**Alternatives considered**:

- Unit tests only: rejected because they do not prove route, modal, persistence, and visual-state integration.
- Manual testing only: rejected because financial calculations and mutation rules are risk-bearing and regress easily.

## Decision: Keep Future Providers in Integration Mapping Only

**Rationale**: El Dorado, ZeroDev, Uniswap, Rialto, Centok contracts, Robinhood Chain, and Morpho are important future boundaries but out of scope for the MVP. The plan documents mapping while keeping primary UI and mock services provider-agnostic.

**Alternatives considered**:

- Provider-specific UI scaffolding now: rejected because it leaks blockchain complexity and may need rewrites.
- Omitting provider mapping entirely: rejected because the architecture must remain integration-ready.

## Resolved Clarifications

No unresolved clarification items remain. The user-provided plan and constitution resolve stack, scope, persistence, chart abstraction, financial calculations, and validation expectations.

