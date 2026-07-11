# Tasks: Centok Frontend Demo

**Input**: Design documents from `/specs/001-centok-frontend-demo/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Required by the feature specification and implementation plan for financial calculations, domain services, critical form states, the primary end-to-end demo path, accessibility, and reset behavior.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated as an independent increment after shared foundation work is complete.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel because it touches different files and has no dependency on incomplete work in the same phase.
- **[Story]**: Maps tasks to user stories from `spec.md`.
- Every task includes an exact file path or concrete path list.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the frontend app, tooling, and project skeleton.

- [ ] T001 Create Next.js App Router project entry files in `package.json`, `tsconfig.json`, `next.config.mjs`, `src/app/layout.tsx`, and `src/app/page.tsx`
- [ ] T002 Configure Tailwind CSS and global style entry in `tailwind.config.ts`, `postcss.config.mjs`, and `src/styles/globals.css`
- [ ] T003 [P] Configure linting, formatting, and npm scripts in `eslint.config.mjs`, `prettier.config.mjs`, and `package.json`
- [ ] T004 [P] Configure unit, component, and end-to-end test tooling in `vitest.config.ts`, `playwright.config.ts`, and `tests/setup.ts`
- [ ] T005 [P] Create planned source and test directories with placeholder files in `src/components/.gitkeep`, `src/features/.gitkeep`, `src/domain/.gitkeep`, `src/infrastructure/.gitkeep`, `src/lib/.gitkeep`, `src/config/.gitkeep`, `tests/unit/.gitkeep`, `tests/component/.gitkeep`, and `tests/e2e/.gitkeep`
- [ ] T006 [P] Configure shadcn/ui base integration and class helper in `components.json` and `src/lib/cn.ts`
- [ ] T007 [P] Create application provider shell and query provider in `src/app/providers.tsx` and `src/infrastructure/query/query-provider.tsx`
- [ ] T008 [P] Define route and navigation constants in `src/config/routes.ts` and `src/config/navigation.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build domain contracts, mock infrastructure, shared primitives, and deterministic demo state before user stories begin.

**CRITICAL**: No user story work can begin until this phase is complete.

### Tests for Foundational Infrastructure

- [ ] T009 [P] Add failing unit tests for money formatting and decimal-safe calculations in `tests/unit/financial-calculations.test.ts`
- [ ] T010 [P] Add failing unit tests for storage versioning and demo reset behavior in `tests/unit/demo-storage.test.ts`
- [ ] T011 [P] Add failing contract tests for mock repositories and services in `tests/unit/mock-services-contract.test.ts`

### Domain and Infrastructure Implementation

- [ ] T012 Create domain models in `src/domain/models/money.ts`, `src/domain/models/user.ts`, `src/domain/models/asset.ts`, `src/domain/models/portfolio.ts`, `src/domain/models/quote.ts`, `src/domain/models/transaction.ts`, and `src/domain/models/demo-state.ts`
- [ ] T013 [P] Define domain errors in `src/domain/errors/domain-errors.ts`
- [ ] T014 [P] Define repository contracts in `src/domain/repositories/asset-repository.ts`, `src/domain/repositories/balance-repository.ts`, `src/domain/repositories/portfolio-repository.ts`, and `src/domain/repositories/activity-repository.ts`
- [ ] T015 [P] Define service contracts in `src/domain/services/auth-service.ts`, `src/domain/services/funding-service.ts`, `src/domain/services/order-service.ts`, and `src/domain/services/demo-state-service.ts`
- [ ] T016 Implement decimal helpers and financial formatters in `src/lib/decimal.ts`, `src/lib/currency.ts`, `src/lib/date.ts`, and `src/lib/identifiers.ts`
- [ ] T017 Implement financial calculation functions in `src/domain/calculations/funding.ts`, `src/domain/calculations/orders.ts`, `src/domain/calculations/portfolio.ts`, and `src/domain/calculations/formatting.ts`
- [ ] T018 Implement Zod validation schemas in `src/domain/validation/money-schema.ts`, `src/domain/validation/funding-schema.ts`, `src/domain/validation/order-schema.ts`, and `src/domain/validation/demo-state-schema.ts`
- [ ] T019 [P] Create typed user, balance, and portfolio fixtures in `src/infrastructure/mocks/fixtures/users.ts`, `src/infrastructure/mocks/fixtures/balances.ts`, and `src/infrastructure/mocks/fixtures/portfolios.ts`
- [ ] T020 [P] Create typed asset, price, and history fixtures in `src/infrastructure/mocks/fixtures/assets.ts`, `src/infrastructure/mocks/fixtures/prices.ts`, and `src/infrastructure/mocks/fixtures/price-history.ts`
- [ ] T021 [P] Create typed quote and transaction fixtures in `src/infrastructure/mocks/fixtures/funding-quotes.ts`, `src/infrastructure/mocks/fixtures/order-quotes.ts`, and `src/infrastructure/mocks/fixtures/transactions.ts`
- [ ] T022 [P] Create deterministic scenario fixtures in `src/infrastructure/mocks/scenarios/default.ts`, `src/infrastructure/mocks/scenarios/funded-user.ts`, `src/infrastructure/mocks/scenarios/unfunded-user.ts`, `src/infrastructure/mocks/scenarios/error-scenarios.ts`, and `src/infrastructure/mocks/scenarios/index.ts`
- [ ] T023 Implement versioned storage adapter in `src/infrastructure/storage/storage-adapter.ts` and `src/infrastructure/storage/demo-storage.ts`
- [ ] T024 Implement deterministic latency, clock, and id helpers in `src/infrastructure/mocks/mock-runtime.ts`
- [ ] T025 Implement persisted demo state store in `src/infrastructure/mocks/demo-state-store.ts`
- [ ] T026 Implement mock auth service in `src/infrastructure/mocks/services/mock-auth-service.ts`
- [ ] T027 Implement mock asset and balance repositories in `src/infrastructure/mocks/repositories/mock-asset-repository.ts` and `src/infrastructure/mocks/repositories/mock-balance-repository.ts`
- [ ] T028 Implement mock portfolio and activity repositories in `src/infrastructure/mocks/repositories/mock-portfolio-repository.ts` and `src/infrastructure/mocks/repositories/mock-activity-repository.ts`
- [ ] T029 Implement mock funding service in `src/infrastructure/mocks/services/mock-funding-service.ts`
- [ ] T030 Implement mock order service in `src/infrastructure/mocks/services/mock-order-service.ts`
- [ ] T031 Implement demo state service in `src/infrastructure/mocks/services/mock-demo-state-service.ts`
- [ ] T032 Wire service registry and dependency provider in `src/infrastructure/mocks/service-registry.ts` and `src/infrastructure/query/service-provider.tsx`
- [ ] T033 Create shared UI primitives in `src/components/ui/button.tsx`, `src/components/ui/input.tsx`, `src/components/ui/dialog.tsx`, `src/components/ui/drawer.tsx`, `src/components/ui/tabs.tsx`, `src/components/ui/badge.tsx`, `src/components/ui/skeleton.tsx`, `src/components/ui/tooltip.tsx`, and `src/components/ui/toast.tsx`
- [ ] T034 Create financial display primitives in `src/components/financial/money-display.tsx`, `src/components/financial/percentage-change.tsx`, `src/components/financial/quantity-display.tsx`, and `src/components/financial/quote-summary.tsx`
- [ ] T035 Create feedback and status primitives in `src/components/feedback/empty-state.tsx`, `src/components/feedback/error-state.tsx`, `src/components/feedback/status-indicator.tsx`, and `src/components/feedback/loading-state.tsx`

**Checkpoint**: Domain contracts, fixtures, storage, mock services, calculations, and shared primitives are ready for story implementation.

---

## Phase 3: User Story 1 - Understand the Product from the Landing Page (Priority: P1) MVP

**Goal**: A first-time visitor understands who Centok is for, what it offers, why it is simpler, and what key risks/disclosures apply.

**Independent Test**: Open `/`, scan the landing page, use the primary CTA, and verify the product explanation, comparison, infrastructure explanation, and disclosure content are visible without entering the app.

### Tests for User Story 1

- [ ] T036 [P] [US1] Add component tests for landing CTA, sections, and disclosure content in `tests/component/landing-page.test.tsx`
- [ ] T037 [P] [US1] Add end-to-end test for landing page comprehension and CTA routing in `tests/e2e/landing.spec.ts`

### Implementation for User Story 1

- [ ] T038 [P] [US1] Create Centok logo and marketing header components in `src/components/branding/centok-logo.tsx` and `src/components/layout/marketing-header.tsx`
- [ ] T039 [P] [US1] Create landing page copy and navigation configuration in `src/config/landing.ts`
- [ ] T040 [P] [US1] Implement hero and product preview sections in `src/features/marketing/components/hero-section.tsx` and `src/features/marketing/components/product-preview.tsx`
- [ ] T041 [P] [US1] Implement value proposition, how-it-works, and comparison sections in `src/features/marketing/components/value-proposition.tsx`, `src/features/marketing/components/how-it-works.tsx`, and `src/features/marketing/components/process-comparison.tsx`
- [ ] T042 [P] [US1] Implement infrastructure, security, final CTA, and disclaimer sections in `src/features/marketing/components/infrastructure-section.tsx`, `src/features/marketing/components/security-section.tsx`, `src/features/marketing/components/final-cta.tsx`, and `src/features/marketing/components/product-disclaimer.tsx`
- [ ] T043 [US1] Assemble the landing page with all required sections in `src/app/page.tsx`
- [ ] T044 [US1] Add responsive mobile navigation drawer and focus handling in `src/components/layout/marketing-header.tsx`
- [ ] T045 [US1] Apply landing responsive spacing, navy/white sections, and reduced-motion-safe transitions in `src/styles/globals.css`
- [ ] T046 [US1] Connect Get Started and Log In actions to mock login routing in `src/app/page.tsx` and `src/config/routes.ts`

**Checkpoint**: User Story 1 is independently testable from `/` without authentication.

---

## Phase 4: User Story 2 - Enter the Application Through a Mock Login (Priority: P1)

**Goal**: A demo user can enter the authenticated dashboard without real account creation and preserve mock auth state after reload.

**Independent Test**: Navigate from landing to `/login`, select the demo account, reach `/app`, reload, then log out back to `/`.

### Tests for User Story 2

- [ ] T047 [P] [US2] Add AuthService contract tests for login, current user, logout, and failed-login scenario in `tests/unit/auth-service.test.ts`
- [ ] T048 [P] [US2] Add mock login component and route tests in `tests/component/mock-login.test.tsx` and `tests/e2e/auth.spec.ts`

### Implementation for User Story 2

- [ ] T049 [US2] Implement auth query hooks and mutations in `src/features/auth/hooks/use-auth.ts` and `src/features/auth/services/auth-queries.ts`
- [ ] T050 [US2] Implement demo login card and login page in `src/features/auth/components/demo-login-card.tsx` and `src/app/login/page.tsx`
- [ ] T051 [US2] Implement authenticated app shell and route protection in `src/app/app/layout.tsx` and `src/components/layout/app-shell.tsx`
- [ ] T052 [US2] Implement user menu and logout action in `src/features/auth/components/user-menu.tsx` and `src/features/auth/services/logout-mutation.ts`

**Checkpoint**: User Story 2 is independently testable with mock authentication only.

---

## Phase 5: User Story 3 - Browse Supported Stock Tokens (Priority: P1)

**Goal**: An authenticated user can browse, search, and select supported Stock Tokens without starting a purchase.

**Independent Test**: Open `/app`, confirm a default asset is selected, search by ticker/name, select another asset, and verify the asset list and selected state update.

### Tests for User Story 3

- [ ] T053 [P] [US3] Add AssetRepository and asset search tests in `tests/unit/asset-repository.test.ts`
- [ ] T054 [P] [US3] Add asset list, search, selected state, and empty-search component tests in `tests/component/asset-list.test.tsx`

### Implementation for User Story 3

- [ ] T055 [US3] Implement asset list and selected asset query hooks in `src/features/assets/hooks/use-assets.ts` and `src/features/assets/hooks/use-selected-asset.ts`
- [ ] T056 [US3] Implement asset list, asset item, and search components in `src/features/assets/components/asset-list.tsx`, `src/features/assets/components/asset-list-item.tsx`, and `src/features/assets/components/asset-search.tsx`
- [ ] T057 [US3] Implement dashboard route selection and symbol routing in `src/app/app/page.tsx` and `src/app/app/markets/[symbol]/page.tsx`
- [ ] T058 [US3] Implement authenticated app header with search access, balance, Add funds, Portfolio, Activity, and user menu slots in `src/components/layout/app-header.tsx`
- [ ] T059 [US3] Add positive and negative market movement indicators in `src/components/financial/percentage-change.tsx` and `src/features/assets/components/asset-list-item.tsx`
- [ ] T060 [US3] Add asset list loading, scrolling, unavailable, and empty-search states in `src/features/assets/components/asset-list-states.tsx`

**Checkpoint**: User Story 3 is independently testable from `/app` with mock asset data.

---

## Phase 6: User Story 4 - Inspect an Asset (Priority: P1)

**Goal**: An authenticated user can inspect the selected asset price, chart, range controls, company description, and Stock Token disclosure.

**Independent Test**: Select an asset, change all chart ranges, confirm details update, then activate chart-error scenario and recover.

### Tests for User Story 4

- [ ] T061 [P] [US4] Add price history and chart adapter tests in `tests/unit/chart-data.test.ts`
- [ ] T062 [P] [US4] Add asset detail, chart range, loading, and chart-error component tests in `tests/component/asset-detail-chart.test.tsx`

### Implementation for User Story 4

- [ ] T063 [US4] Implement chart adapter types and initial lightweight chart adapter in `src/features/charts/types/chart.ts` and `src/features/charts/adapters/lightweight-chart-adapter.tsx`
- [ ] T064 [US4] Implement market chart and range selector in `src/features/charts/components/market-chart.tsx` and `src/features/charts/components/chart-range-selector.tsx`
- [ ] T065 [US4] Implement asset detail header, company description, market status, and Stock Token disclosure in `src/features/assets/components/asset-detail.tsx`
- [ ] T066 [US4] Integrate selected asset detail and chart panel in `src/features/assets/components/asset-dashboard-panel.tsx`
- [ ] T067 [US4] Implement chart loading, unavailable, and retry states in `src/features/charts/components/chart-state.tsx`

**Checkpoint**: User Story 4 is independently testable without opening funding or purchase flows.

---

## Phase 7: User Story 5 - Complete a Purchase with Sufficient Funds (Priority: P1)

**Goal**: A funded user can buy a Stock Token through amount entry, review, explicit confirmation, pending state, and success state.

**Independent Test**: Activate funded-user scenario, select an active asset, enter a valid amount, review the order, confirm, and verify balance, portfolio state, and activity data mutate.

### Tests for User Story 5

- [ ] T068 [P] [US5] Add order quote, remaining balance, duplicate-submit, and purchase mutation tests in `tests/unit/order-service.test.ts`
- [ ] T069 [P] [US5] Add purchase form validation and review component tests in `tests/component/purchase-flow.test.tsx`
- [ ] T070 [P] [US5] Add funded-user purchase end-to-end test in `tests/e2e/funded-purchase.spec.ts`

### Implementation for User Story 5

- [ ] T071 [US5] Implement order quote and submit hooks in `src/features/trading/hooks/use-order-quote.ts` and `src/features/trading/hooks/use-submit-order.ts`
- [ ] T072 [US5] Implement order ticket with Buy tab and disabled Sell coming-soon state in `src/features/trading/components/order-ticket.tsx`
- [ ] T073 [US5] Implement purchase amount form with balance validation in `src/features/trading/forms/purchase-amount-form.tsx`
- [ ] T074 [US5] Implement purchase review step with fees, total, remaining balance, quote expiration, and disclosure in `src/features/trading/components/purchase-review.tsx`
- [ ] T075 [US5] Implement purchase pending, success, error, and expired states in `src/features/trading/components/purchase-status.tsx`
- [ ] T076 [US5] Wire successful purchase mutation, query invalidation, and duplicate-submit protection in `src/features/trading/services/purchase-mutation.ts`
- [ ] T077 [US5] Integrate order ticket and purchase dialog into dashboard layout in `src/features/assets/components/asset-dashboard-layout.tsx`

**Checkpoint**: User Story 5 is independently testable with the funded-user scenario.

---

## Phase 8: User Story 6 - Add Funds When Balance Is Insufficient (Priority: P1)

**Goal**: An unfunded user can add mock BRL funds through PIX and return to the original purchase context.

**Independent Test**: Start from low balance, attempt Buy, open Add funds, complete mock PIX funding, return to the original selected asset, and continue purchase review.

### Tests for User Story 6

- [ ] T078 [P] [US6] Add funding quote, minimum amount, failure, expiration, and balance mutation tests in `tests/unit/funding-service.test.ts`
- [ ] T079 [P] [US6] Add funding amount, review, PIX, pending, success, error, and expired component tests in `tests/component/funding-flow.test.tsx`
- [ ] T080 [P] [US6] Add insufficient-funds to funding to restored purchase end-to-end test in `tests/e2e/insufficient-funds-funding.spec.ts`

### Implementation for User Story 6

- [ ] T081 [US6] Implement funding quote and submit hooks in `src/features/funding/hooks/use-funding-quote.ts` and `src/features/funding/hooks/use-submit-funding.ts`
- [ ] T082 [US6] Implement insufficient-funds prompt and funding entry component in `src/features/funding/components/insufficient-funds-prompt.tsx` and `src/features/funding/components/add-funds-entry.tsx`
- [ ] T083 [US6] Implement BRL funding amount form with minimum validation and USDT estimate in `src/features/funding/forms/funding-amount-form.tsx`
- [ ] T084 [US6] Implement funding review step with exchange rate, fee, estimate, payment method, and expiration in `src/features/funding/components/funding-review.tsx`
- [ ] T085 [US6] Implement mock PIX instructions, pending, success, error, and expired states in `src/features/funding/components/pix-payment-step.tsx` and `src/features/funding/components/funding-status.tsx`
- [ ] T086 [US6] Preserve and restore purchase context around funding detours in `src/features/funding/services/funding-return-context.ts`
- [ ] T087 [US6] Integrate Add funds entry points in `src/components/layout/app-header.tsx`, `src/features/trading/components/order-ticket.tsx`, and `src/features/funding/components/add-funds-dialog.tsx`

**Checkpoint**: User Story 6 is independently testable with the default low-balance scenario.

---

## Phase 9: User Story 9 - Reset the Demo (Priority: P1)

**Goal**: A presenter can restore deterministic fixture state before each live presentation.

**Independent Test**: Change balance/portfolio/auth/activity state, trigger reset, confirm, reload, and verify the original fixture state is restored in under ten seconds.

### Tests for User Story 9

- [ ] T088 [P] [US9] Add DemoStateService reset and scenario tests in `tests/unit/demo-state-service.test.ts`
- [ ] T089 [P] [US9] Add reset confirmation and scenario selector component tests in `tests/component/demo-reset.test.tsx`
- [ ] T090 [P] [US9] Add end-to-end reset test after funding and purchase mutations in `tests/e2e/demo-reset.spec.ts`

### Implementation for User Story 9

- [ ] T091 [US9] Implement demo state hooks and scenario query helpers in `src/features/demo/hooks/use-demo-state.ts` and `src/features/demo/services/demo-scenarios.ts`
- [ ] T092 [US9] Implement reset confirmation dialog in `src/features/demo/components/demo-reset-dialog.tsx`
- [ ] T093 [US9] Add reset action to user menu and presenter-safe entry point in `src/features/auth/components/user-menu.tsx` and `src/features/demo/components/presenter-menu.tsx`
- [ ] T094 [US9] Implement development-only scenario selector in `src/features/demo/components/scenario-selector.tsx`
- [ ] T095 [US9] Clear modal context, purchase context, and query caches during reset in `src/features/demo/services/reset-mutation.ts`

**Checkpoint**: User Story 9 is independently testable from a mutated demo state.

---

## Phase 10: User Story 7 - View Portfolio (Priority: P2)

**Goal**: A user can view empty or populated holdings, total value, available balance, and gain/loss.

**Independent Test**: Open `/app/portfolio` before and after a mock purchase, verify empty/populated states, reload, and confirm persisted portfolio data remains consistent.

### Tests for User Story 7

- [ ] T096 [P] [US7] Add portfolio repository, totals, position update, and gain/loss tests in `tests/unit/portfolio-repository.test.ts`
- [ ] T097 [P] [US7] Add portfolio summary, empty state, and position list component tests in `tests/component/portfolio-view.test.tsx`

### Implementation for User Story 7

- [ ] T098 [US7] Implement portfolio query hooks in `src/features/portfolio/hooks/use-portfolio.ts`
- [ ] T099 [US7] Implement portfolio summary and position list components in `src/features/portfolio/components/portfolio-summary.tsx` and `src/features/portfolio/components/position-list.tsx`
- [ ] T100 [US7] Implement empty portfolio state and browse markets CTA in `src/features/portfolio/components/portfolio-empty-state.tsx`
- [ ] T101 [US7] Implement portfolio route page in `src/app/app/portfolio/page.tsx`
- [ ] T102 [US7] Connect portfolio query invalidation to purchase and reset mutations in `src/features/portfolio/services/portfolio-invalidation.ts`

**Checkpoint**: User Story 7 is independently testable from `/app/portfolio`.

---

## Phase 11: User Story 8 - View Transaction History (Priority: P2)

**Goal**: A user can inspect funding and purchase activity with statuses, amounts, timestamps, and references.

**Independent Test**: Complete funding and purchase, open `/app/activity`, verify transaction details and statuses, activate failed/pending scenarios, and reload.

### Tests for User Story 8

- [ ] T103 [P] [US8] Add activity repository ordering, status, and retry metadata tests in `tests/unit/activity-repository.test.ts`
- [ ] T104 [P] [US8] Add activity list, status badge, and filter component tests in `tests/component/activity-history.test.tsx`

### Implementation for User Story 8

- [ ] T105 [US8] Implement activity query hooks in `src/features/activity/hooks/use-activity.ts`
- [ ] T106 [US8] Implement transaction status and activity item components in `src/features/activity/components/transaction-status-badge.tsx` and `src/features/activity/components/activity-item.tsx`
- [ ] T107 [US8] Implement activity history list and optional filters in `src/features/activity/components/activity-history.tsx`
- [ ] T108 [US8] Implement activity route page and mutation integration in `src/app/app/activity/page.tsx` and `src/features/activity/services/activity-invalidation.ts`

**Checkpoint**: User Story 8 is independently testable from `/app/activity`.

---

## Phase 12: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete demo, close accessibility/responsive gaps, and prepare repeatable presentation delivery.

- [ ] T109 [P] Add complete landing-to-login-to-funding-to-purchase-to-portfolio-to-activity end-to-end test in `tests/e2e/primary-demo.spec.ts`
- [ ] T110 [P] Add keyboard, focus, modal, and non-color status accessibility checks in `tests/e2e/accessibility.spec.ts`
- [ ] T111 [P] Add responsive viewport checks for desktop, laptop, tablet, and mobile in `tests/e2e/responsive.spec.ts`
- [ ] T112 Add app error, not-found, and loading boundaries in `src/app/error.tsx`, `src/app/not-found.tsx`, `src/app/loading.tsx`, and `src/app/app/error.tsx`
- [ ] T113 Add reduced-motion rules and final skeleton polish in `src/styles/globals.css`, `src/components/feedback/loading-state.tsx`, and `src/components/ui/skeleton.tsx`
- [ ] T114 Add an import-boundary lint guard or test preventing page/components from importing raw fixtures in `tests/unit/no-fixture-imports.test.ts`
- [ ] T115 [P] Add security, claims, and disclosure copy audit notes in `specs/001-centok-frontend-demo/security-copy-audit.md`
- [ ] T116 [P] Add manual presentation checklist and reset rehearsal notes in `specs/001-centok-frontend-demo/presentation-checklist.md`
- [ ] T117 Record quickstart validation results in `specs/001-centok-frontend-demo/quickstart-validation.md`
- [ ] T118 Fix final typecheck, lint, unit, component, and e2e failures in `package.json`, `tests/unit/financial-calculations.test.ts`, `tests/component/purchase-flow.test.tsx`, and `tests/e2e/primary-demo.spec.ts`
- [ ] T119 Verify no primary-flow console errors and record findings in `specs/001-centok-frontend-demo/quickstart-validation.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: No dependencies.
- **Phase 2 Foundational**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 US1 Landing**: Depends on Phase 2.
- **Phase 4 US2 Mock Login**: Depends on Phase 2; can run after US1 routing config exists, or in parallel if route constants are stable.
- **Phase 5 US3 Asset Browse**: Depends on Phase 2 and benefits from US2 app shell.
- **Phase 6 US4 Asset Inspection**: Depends on US3 selected asset state.
- **Phase 7 US5 Purchase**: Depends on Phase 2 and US3 selected asset state; can be completed before funding by using funded-user scenario.
- **Phase 8 US6 Funding**: Depends on Phase 2 and integrates with US5 purchase context.
- **Phase 9 US9 Reset**: Depends on Phase 2 and can run after any mutation flow exists.
- **Phase 10 US7 Portfolio**: Depends on Phase 2 and receives richer validation after US5 purchase mutation.
- **Phase 11 US8 Activity**: Depends on Phase 2 and receives richer validation after US5/US6 mutations.
- **Phase 12 Polish**: Depends on selected story phases required for the release target.

### User Story Completion Order

```text
US1 Landing
-> US2 Mock Login
-> US3 Browse Supported Stock Tokens
-> US4 Inspect an Asset
-> US5 Purchase with Sufficient Funds
-> US6 Add Funds When Insufficient
-> US9 Reset the Demo
-> US7 View Portfolio
-> US8 View Transaction History
-> Polish and Presentation Validation
```

### Story Dependency Graph

```text
Foundation
├── US1 Landing
├── US2 Mock Login
│   └── US3 Browse Assets
│       ├── US4 Inspect Asset
│       ├── US5 Purchase
│       │   ├── US7 Portfolio
│       │   └── US8 Activity
│       └── US6 Funding
│           ├── US5 Purchase continuation
│           └── US8 Activity
└── US9 Reset
    └── Polish validation
```

### Parallel Opportunities

- Setup tasks T003-T008 can run in parallel after T001-T002 are clear.
- Foundational test tasks T009-T011 can run in parallel.
- Domain contracts T013-T015 can run in parallel after T012 starts.
- Fixture tasks T019-T022 can run in parallel.
- Shared primitive tasks T033-T035 can run in parallel.
- US1 section component tasks T038-T042 can run in parallel.
- US3 test tasks T053-T054 can run in parallel with asset hook/component implementation once contracts exist.
- US5, US6, US7, and US8 tests can be written in parallel after Phase 2 contracts are complete.
- Polish validation tasks T109-T117 can run in parallel once the corresponding flows exist.

---

## Parallel Execution Examples

### User Story 1

```bash
Task T036: Add component tests for landing CTA and disclosure in tests/component/landing-page.test.tsx
Task T037: Add landing e2e test in tests/e2e/landing.spec.ts
Task T040: Implement hero and product preview in src/features/marketing/components/
Task T041: Implement value and comparison sections in src/features/marketing/components/
Task T042: Implement infrastructure and disclaimer sections in src/features/marketing/components/
```

### User Story 3

```bash
Task T053: Add AssetRepository tests in tests/unit/asset-repository.test.ts
Task T054: Add asset list component tests in tests/component/asset-list.test.tsx
Task T056: Implement asset list/search components in src/features/assets/components/
Task T060: Implement asset list loading and empty states in src/features/assets/components/asset-list-states.tsx
```

### User Story 5

```bash
Task T068: Add order service tests in tests/unit/order-service.test.ts
Task T069: Add purchase component tests in tests/component/purchase-flow.test.tsx
Task T071: Implement order hooks in src/features/trading/hooks/
Task T074: Implement purchase review in src/features/trading/components/purchase-review.tsx
Task T075: Implement purchase status states in src/features/trading/components/purchase-status.tsx
```

### User Story 6

```bash
Task T078: Add funding service tests in tests/unit/funding-service.test.ts
Task T079: Add funding component tests in tests/component/funding-flow.test.tsx
Task T081: Implement funding hooks in src/features/funding/hooks/
Task T083: Implement funding amount form in src/features/funding/forms/funding-amount-form.tsx
Task T085: Implement PIX and funding status states in src/features/funding/components/
```

### User Stories 7 and 8

```bash
Task T096: Add portfolio repository tests in tests/unit/portfolio-repository.test.ts
Task T097: Add portfolio component tests in tests/component/portfolio-view.test.tsx
Task T103: Add activity repository tests in tests/unit/activity-repository.test.ts
Task T104: Add activity component tests in tests/component/activity-history.test.tsx
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 Setup.
2. Complete Phase 2 Foundational infrastructure.
3. Complete Phase 3 User Story 1 and validate the public landing page.
4. For the presentation MVP, continue through US2, US3, US4, US6, US5, US7, US8, and US9 because the required demo path spans authentication, dashboard, funding, purchase, portfolio, activity, and reset.

### Incremental Delivery

1. Landing page explains Centok and routes to login.
2. Mock login enters the app shell.
3. Dashboard supports asset browsing and inspection.
4. Funded-user purchase path works.
5. Insufficient-funds funding path restores purchase context.
6. Portfolio and activity reflect mutations.
7. Reset restores deterministic presentation state.
8. Final polish validates accessibility, responsiveness, console cleanliness, and quickstart scenarios.

### Validation Gates

- After Phase 2: run unit tests for calculations, storage, and mock service contracts.
- After each user story: run that story's unit/component/e2e tests and manually validate the independent test criteria.
- Before release: run `npm run typecheck`, `npm run lint`, `npm run test`, `npm run test:e2e`, and the manual presentation script from `quickstart.md`.

---

## Independent Test Criteria Summary

- **US1**: Landing page communicates target user, tokenized U.S. stock exposure, simplified process, hidden infrastructure, and disclosures.
- **US2**: Mock login reaches `/app`, persists after reload, and logout returns to `/`.
- **US3**: Asset list loads, filters, shows movement states, handles empty search, and updates selected asset.
- **US4**: Selected asset detail, chart ranges, loading state, and chart error recovery work without purchase.
- **US5**: Funded user completes reviewed purchase and sees balance, portfolio data, and activity mutation.
- **US6**: Low-balance user adds mock BRL funds through PIX and returns to the original purchase context.
- **US7**: Portfolio shows empty and populated states and persists after reload.
- **US8**: Activity history shows funding and purchase entries across completed, pending, failed, and expired states.
- **US9**: Reset confirms, restores fixtures, clears transient context, and completes in under ten seconds.

## Notes

- Tests are included because the spec and plan explicitly require validation of financial logic, service contracts, forms, primary flow, accessibility, and reset.
- Every user story phase is independently testable after Phase 2, though the full hackathon demo requires the P1 chain plus portfolio and activity.
- Page and feature components must not import raw fixtures directly; use domain repositories and services.
- Financial calculations must use decimal-safe utilities and central formatting.
- Provider-specific implementation details remain out of page components.
