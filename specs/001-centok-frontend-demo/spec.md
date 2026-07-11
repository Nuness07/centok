# Feature Specification: Centok Frontend Demo

**Feature Branch**: `001-centok-frontend-demo`

**Created**: 2026-07-10

**Status**: Draft

**Input**: User description: "Frontend-only Centok MVP demo for tokenized U.S. equity access, using deterministic mock data and a complete landing-to-purchase journey."

## Product Context

Centok is a consumer-facing investment platform for Latin American retail investors who understand traditional companies, stocks, prices, portfolio value, and investment returns, but do not necessarily understand blockchain infrastructure. The demo must communicate that users can access tokenized U.S. equity exposure, add funds through familiar local payment methods, choose a supported company, purchase a Stock Token through a simple order flow, and view the resulting position in their portfolio.

The initial feature is frontend-only and demo-focused. It must remain stable without live market data, external authentication, payment providers, wallets, smart contracts, blockchain networks, or third-party availability. All visible behavior must be deterministic enough for a live pitch.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the Product from the Landing Page (Priority: P1)

As a potential user, I want to understand what Centok offers so that I can decide whether the platform is relevant to me.

**Why this priority**: The landing page establishes credibility and explains the product before the live demo enters the application.

**Independent Test**: A first-time viewer can explain who Centok is for, what tokenized U.S. stock exposure means at a high level, why the experience is simpler than traditional alternatives, and that blockchain complexity is handled behind the scenes.

**Acceptance Scenarios**:

1. **Given** the user opens the website, **When** the landing page loads, **Then** the user sees a clear headline about accessing tokenized U.S. stocks without the usual complexity.
2. **Given** the user views the hero section, **When** they scan the content, **Then** they see a primary action to start using the product and a secondary action to learn how it works.
3. **Given** the user scrolls through the page, **When** they reach the product explanation, **Then** they see the steps Add funds, Choose a company, and Confirm the investment.
4. **Given** the user compares Centok with traditional alternatives, **When** they view the comparison content, **Then** the page communicates reduced friction, fewer fragmented platforms, and a simpler experience without claiming legal, tax, or regulatory obligations disappear.
5. **Given** the user reaches the infrastructure explanation, **When** they read it, **Then** the page explains that onchain infrastructure powers the product without requiring technical blockchain knowledge.
6. **Given** the user reaches the disclosure content, **When** they read it, **Then** the page clearly states that Stock Tokens provide economic exposure and are not direct ownership of the underlying shares.

---

### User Story 2 - Enter the Application Through a Mock Login (Priority: P1)

As a user, I want to enter the investment dashboard without creating a real account so that I can experience the product during the demonstration.

**Why this priority**: The pitch requires a predictable and fast transition between the landing page and the product experience.

**Independent Test**: The user can access the dashboard through a mock login flow without external authentication.

**Acceptance Scenarios**:

1. **Given** the user is on the landing page, **When** they click Log In or Get Started, **Then** a mock authentication screen or modal is displayed.
2. **Given** the authentication interface is open, **When** the user selects the demo account, **Then** they are redirected to the dashboard.
3. **Given** the user has entered the application, **When** they reload the page in the same demo environment, **Then** their mock authenticated state is preserved.
4. **Given** the user logs out, **When** the logout action completes, **Then** they return to the landing page.

---

### User Story 3 - Browse Supported Stock Tokens (Priority: P1)

As an authenticated user, I want to browse supported tokenized U.S. stocks so that I can choose an asset to inspect or purchase.

**Why this priority**: Asset discovery is the primary entry point into the investment experience.

**Independent Test**: The user can browse, search, and select an asset without initiating a purchase.

**Acceptance Scenarios**:

1. **Given** the user opens the dashboard, **When** the page loads, **Then** a default asset is selected.
2. **Given** the user views the asset list, **When** assets are displayed, **Then** each item includes company logo, ticker, company name, current mock price, percentage change, and a small trend indicator.
3. **Given** the user enters a company name or ticker in search, **When** the query matches an asset, **Then** the list is filtered to matching assets.
4. **Given** the user selects another asset, **When** the selection changes, **Then** the chart, price, company information, and order ticket update.
5. **Given** the asset price increased, **When** the price movement is displayed, **Then** the interface communicates the positive state using color plus text or iconography.
6. **Given** the asset price decreased, **When** the price movement is displayed, **Then** the interface communicates the negative state using color plus text or iconography.
7. **Given** a search has no matches, **When** the filtered list is empty, **Then** an intentional empty state is shown.

---

### User Story 4 - Inspect an Asset (Priority: P1)

As an investor, I want to inspect the selected asset's price and historical movement so that I can make an informed mock purchasing decision.

**Why this priority**: The dashboard must feel like a credible investment product rather than a token swap interface.

**Independent Test**: The selected asset view is useful without requiring the user to complete a transaction.

**Acceptance Scenarios**:

1. **Given** an asset is selected, **When** the asset view loads, **Then** the user sees company name, ticker, current price, daily change, market status, chart, and time range controls.
2. **Given** the user changes the chart time range, **When** a new range is selected, **Then** the displayed mock chart data changes.
3. **Given** the user views the asset details, **When** they inspect the content, **Then** they see a short company description and tokenized asset disclosure.
4. **Given** chart data is loading, **When** the request is in progress, **Then** an intentional loading state is shown.
5. **Given** chart data is unavailable, **When** the error scenario is active, **Then** a recoverable error state is displayed.

---

### User Story 5 - Complete a Purchase with Sufficient Funds (Priority: P1)

As a funded user, I want to purchase a Stock Token through a simple order flow so that I can add the asset to my portfolio.

**Why this priority**: This is the central product demonstration.

**Independent Test**: Starting from the dashboard with sufficient mock funds, the user can complete a purchase and see their balance, portfolio, and activity update.

**Acceptance Scenarios**:

1. **Given** the user has sufficient funds, **When** they click Buy, **Then** the purchase interface opens.
2. **Given** the purchase interface is open, **When** the user enters an amount, **Then** the system shows investment amount, estimated Stock Token quantity, mock conversion rate, fee, total cost, and remaining balance.
3. **Given** the user enters an amount greater than the available balance, **When** validation runs, **Then** confirmation is disabled and an insufficient-balance message is shown.
4. **Given** the user enters a valid amount, **When** they continue, **Then** a review step is displayed before completion.
5. **Given** the review step is displayed, **When** the user reviews the order, **Then** they see selected company, ticker, amount paid, estimated token quantity, price, fees, total, and mock quote expiration.
6. **Given** the user confirms the order, **When** the mock order is submitted, **Then** a pending transaction state is shown.
7. **Given** the mock transaction succeeds, **When** processing completes, **Then** a success state is shown.
8. **Given** the purchase succeeds, **When** the purchase flow closes, **Then** the available balance decreases, the portfolio position increases or is created, and the transaction appears in activity history.

---

### User Story 6 - Add Funds When Balance Is Insufficient (Priority: P1)

As an unfunded user, I want to add funds using a familiar local payment method so that I can continue purchasing an asset.

**Why this priority**: The local funding abstraction is a major part of Centok's value proposition.

**Independent Test**: Starting with an insufficient mock balance, the user can complete a mock BRL funding flow and return to the original purchase context.

**Acceptance Scenarios**:

1. **Given** the user has insufficient funds, **When** they click Buy, **Then** the interface informs them that funds must be added.
2. **Given** the insufficient-funds state is shown, **When** the user clicks Add funds, **Then** the funding flow opens.
3. **Given** the funding flow is open, **When** the default configuration loads, **Then** it displays BRL as the source currency, PIX as the payment method, exchange rate, fees, minimum amount, and estimated destination balance received.
4. **Given** the user enters a BRL amount, **When** the amount changes, **Then** the estimated received amount updates.
5. **Given** the amount is below the mock minimum, **When** validation runs, **Then** the continue action is disabled.
6. **Given** the funding amount is valid, **When** the user continues, **Then** a PIX payment instruction or mock QR-code state is displayed.
7. **Given** the user confirms mock PIX payment, **When** processing begins, **Then** a pending funding state is shown.
8. **Given** the mock funding succeeds, **When** processing completes, **Then** the available balance increases and a funding transaction is recorded.
9. **Given** the user returns to the purchase, **When** the purchase interface is restored, **Then** the previously selected asset and purchase context remain selected.

---

### User Story 7 - View Portfolio (Priority: P2)

As an investor, I want to view my holdings and portfolio value so that I can understand my current positions.

**Why this priority**: The portfolio proves that a mock purchase has a persistent result.

**Independent Test**: The user can view the portfolio independently of the purchase flow.

**Acceptance Scenarios**:

1. **Given** the user has no holdings, **When** they open the portfolio, **Then** an empty state encourages them to browse assets.
2. **Given** the user owns Stock Tokens, **When** they open the portfolio, **Then** they see total portfolio value, available balance, total gain or loss, individual positions, quantity, average purchase price, current value, and gain or loss.
3. **Given** the user completes a purchase, **When** they open the portfolio, **Then** the new or updated position is visible.
4. **Given** mock data has changed, **When** the page reloads in the same demo environment, **Then** the portfolio remains updated.

---

### User Story 8 - View Transaction History (Priority: P2)

As a user, I want to view previous funding and purchase transactions so that I can understand what happened in my account.

**Why this priority**: Activity history supports trust by making account changes traceable.

**Independent Test**: The user can open activity history and inspect completed, pending, failed, and expired transactions.

**Acceptance Scenarios**:

1. **Given** the user has completed transactions, **When** they open activity history, **Then** they see transaction type, asset when applicable, amount, status, date and time, and reference identifier.
2. **Given** a transaction is pending, **When** activity history is displayed, **Then** the transaction has a visible pending state.
3. **Given** a transaction failed, **When** activity history is displayed, **Then** the user sees the failure status and a safe retry action where appropriate.

---

### User Story 9 - Reset the Demo (Priority: P1)

As a presenter, I want to restore the demo to its original state so that each presentation begins consistently.

**Why this priority**: Hackathon demos must be repeatable and deterministic.

**Independent Test**: A changed balance, portfolio, authentication state, or activity history can be restored to the original fixture state in one confirmed reset flow.

**Acceptance Scenarios**:

1. **Given** the portfolio or balance has changed, **When** the presenter activates the demo reset action, **Then** all local mock state returns to the original fixture.
2. **Given** the reset is triggered, **When** the action is selected, **Then** a confirmation step appears before data is restored.
3. **Given** the reset completes, **When** the dashboard reloads, **Then** the default user, balance, portfolio, assets, and history are restored.

### Edge Cases

- Invalid investment amount, zero amount, very small fractional quantity, or amount above available balance.
- Funding amount below the minimum threshold or too large for a realistic demo scenario.
- Zero balance, empty portfolio, and empty asset search results.
- Asset unavailable or marked as coming soon.
- Chart loading failure or unavailable chart range.
- Expired funding quote or expired purchase quote before confirmation.
- Duplicate confirmation clicks during funding or purchase processing.
- Page reload during a pending mock funding or purchase transaction.
- Local persistence unavailable in the user's browser.
- Long company names, large monetary values, and small fractional token quantities.
- Reset requested while a modal or pending transaction state is active.
- Modal closed before completion and browser back navigation during a flow.

## Demo Flow *(mandatory presentation path)*

1. Open the landing page and explain the product problem and value proposition.
2. Click Get Started and enter the dashboard through mock login.
3. Select a well-known company such as Apple or Nvidia.
4. Show the selected asset chart, price, disclosure, and order ticket.
5. Click Buy and demonstrate the insufficient-funds state.
6. Add mock funds through the BRL and PIX funding flow.
7. Return to the preserved purchase context.
8. Review the Stock Token order and confirm the purchase.
9. Show the pending transaction and success states.
10. Open the portfolio and activity history to show the new position, updated balance, and transaction record.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a public landing page that explains Centok's value proposition without requiring Web3 knowledge.
- **FR-002**: The landing page MUST include a clear primary action to start the product journey and a secondary path to learn how the product works.
- **FR-003**: The landing page MUST explain the three-step user process: add funds, choose a supported U.S. company, and confirm the investment.
- **FR-004**: The landing page MUST compare the traditional or fragmented investing path with the simplified Centok experience without implying that tax, legal, or regulatory obligations disappear.
- **FR-005**: The landing page MUST disclose that demo transactions and market data are simulated, Stock Tokens provide economic exposure, and Stock Tokens are not direct ownership of underlying shares.
- **FR-006**: The system MUST provide mock authentication that allows a user to enter the dashboard without creating a real account.
- **FR-007**: The system MUST preserve mock authenticated state in the same demo environment until the user logs out or resets the demo.
- **FR-008**: The authenticated experience MUST include dashboard, portfolio, and activity surfaces.
- **FR-009**: The authenticated header MUST show Centok branding, asset search access, available balance, Add funds action, portfolio shortcut, activity shortcut, and user menu.
- **FR-010**: The dashboard MUST show a searchable list of supported Stock Tokens.
- **FR-011**: The initial supported asset set MUST include AAPL, AMD, AMZN, GOOGL, META, MSFT, NVDA, TSLA, COIN, and NFLX.
- **FR-012**: Each asset list item MUST show logo, ticker, company name, current mock price, percentage change, and a trend indicator.
- **FR-013**: Selecting an asset MUST update the selected asset details, chart, company description, disclosure, and order ticket.
- **FR-014**: The asset view MUST show company name, ticker, current price, daily change, market status, chart, and time range controls.
- **FR-015**: The chart area MUST support Live, 1D, 5D, 1M, 6M, YTD, 1Y, and MAX ranges using deterministic mock data.
- **FR-016**: The asset view MUST include loading and recoverable error states for chart data.
- **FR-017**: The desktop dashboard MUST use three primary areas: asset list, selected asset and chart, and order ticket.
- **FR-018**: The tablet and mobile experiences MUST remain functional, with dashboard content reorganized for narrower screens.
- **FR-019**: The order ticket MUST include Buy as the active action and may show Sell as disabled or coming soon.
- **FR-020**: The primary purchase input MUST use a familiar currency amount rather than requiring the user to enter token quantity.
- **FR-021**: The purchase flow MUST verify available balance before confirmation.
- **FR-022**: The purchase flow MUST display investment amount, estimated Stock Token quantity, current mock price, fee, total, remaining balance, and quote expiration before confirmation.
- **FR-023**: The purchase MUST NOT complete immediately after clicking Buy; the user MUST explicitly confirm the reviewed order.
- **FR-024**: The purchase flow MUST include pending, success, error, and expired quote states.
- **FR-025**: A successful purchase MUST decrease available balance, create or update the portfolio position, and add an activity-history transaction.
- **FR-026**: If the user lacks sufficient balance, the system MUST route them to the Add funds flow while preserving the selected asset and purchase context.
- **FR-027**: The funding flow MUST support a mock BRL funding journey with PIX as the payment method and estimated destination balance received.
- **FR-028**: The funding flow MUST display exchange rate, fees, minimum amount, estimated received amount, and expiration before the user confirms.
- **FR-029**: The funding flow MUST include editing, validating, reviewing, awaiting payment, processing, success, error, and expired states.
- **FR-030**: A successful funding transaction MUST increase available balance and add an activity-history transaction.
- **FR-031**: The portfolio MUST show total portfolio value, available balance, total gain or loss, and individual positions with quantity, average purchase price, current value, and gain or loss.
- **FR-032**: The portfolio MUST provide an intentional empty state when the user has no holdings.
- **FR-033**: Activity history MUST list funding and purchase transactions with type, asset when applicable, amount, status, date and time, and reference identifier.
- **FR-034**: Transaction statuses MUST include pending, completed, failed, and expired.
- **FR-035**: Changed mock authentication, balance, portfolio, incomplete purchase context, and activity state MUST persist in the same demo environment after reload.
- **FR-036**: The system MUST provide a confirmed demo reset action that restores original user, balance, portfolio, assets, and activity state.
- **FR-037**: The demo MUST provide predefined scenarios for funded user, unfunded user, successful funding, successful purchase, pending transaction, failed transaction, empty portfolio, and populated portfolio.
- **FR-038**: The demo MUST provide a non-public or presenter-safe way to activate failed login, failed quote, expired quote, failed funding, failed purchase, unavailable chart, and insufficient-funds scenarios.
- **FR-039**: The primary demo flow MUST remain functional without live network services or real-time market availability.
- **FR-040**: The system MUST present future-only capabilities as non-blocking coming-soon surfaces when they appear.
- **FR-041**: The interface MUST avoid claims of guaranteed returns, guaranteed tax savings, direct ownership of underlying shares, or universal jurisdictional availability.
- **FR-042**: Positive, negative, success, pending, failed, and expired states MUST be communicated with more than color alone.
- **FR-043**: The primary flow MUST support keyboard navigation, visible focus states, labeled form controls, safe modal dismissal, and focus containment inside modal flows.
- **FR-044**: The visual design MUST use Centok's navy, white, blue, green, red, and high-contrast financial identity consistently across landing and authenticated areas.
- **FR-045**: Financial values MUST be displayed consistently and calculated without unsafe rounding visible to the user.
- **FR-046**: User-facing screens MUST consume replaceable product data boundaries rather than depending directly on raw fixture data or future provider details.
- **FR-047**: Future funding, account, liquidity, execution, settlement, and lending providers MUST remain outside the default user experience for this demo.

### Centok Constitution Requirements *(mandatory)*

- **CCR-001**: Primary flows MUST use familiar financial language and MUST NOT require users to understand wallets, gas, token approvals, smart contracts, liquidity providers, or blockchain networks.
- **CCR-002**: The feature MUST run with deterministic mock data boundaries and MUST NOT depend on live external systems, smart contracts, wallets, payment providers, or market-data services.
- **CCR-003**: User-facing pages MUST be able to switch from mock data to future real integrations without rewriting the main page experience.
- **CCR-004**: Any funding or purchase action MUST include a review step showing input amount, selected asset or currency, conversion rate when applicable, estimated output, fees, total, and quote expiration when applicable.
- **CCR-005**: The feature MUST account for relevant idle, loading, empty, ready, reviewing, submitting, pending, success, error, and expired states.
- **CCR-006**: Financial values MUST use centralized formatting and calculation rules, avoiding unsafe floating-point assumptions in visible balances, quotes, fees, and quantities.
- **CCR-007**: The UI MUST support keyboard navigation, visible focus states, responsive presentation layouts, and non-color status indicators.

### Key Entities *(include if feature involves data)*

- **User**: The mock authenticated person using the demo; includes name, email, country, and optional avatar.
- **Asset**: A supported tokenized U.S. equity exposure; includes ticker, company name, logo, current mock price, movement, description, market status, and availability status.
- **Money**: A currency-denominated amount shown to users; supports BRL, USD, and USDT values where relevant to funding and purchase transparency.
- **Price Point**: A dated price value used to display historical asset movement for a selected range.
- **Balance**: The user's available purchasing balance for the demo.
- **Portfolio**: The user's aggregate holdings, value, available balance, and gain or loss summary.
- **Portfolio Position**: A user's holding in one Stock Token; includes asset, quantity, average purchase price, current value, and unrealized gain or loss.
- **Funding Quote**: A temporary funding estimate; includes source amount, estimated received amount, exchange rate, fee, payment method, and expiration.
- **Funding Transaction**: A record of an attempted or completed funding action; includes amount, status, time, and reference identifier.
- **Order Quote**: A temporary purchase estimate; includes selected asset, investment amount, estimated quantity, asset price, fee, total, remaining balance, and expiration.
- **Order**: A submitted mock purchase; includes selected asset, amount, estimated or confirmed quantity, status, and transaction reference.
- **Transaction**: A funding or purchase history item; includes type, status, asset when applicable, amount, creation time, and reference identifier.
- **Demo State**: The current deterministic scenario for authentication, balance, portfolio, activity, pending operations, failures, and reset behavior.

## Explicit Demo States *(mandatory for primary flows)*

- **Authenticated user**: A demo user can enter the dashboard and remain logged in after reload in the same demo environment.
- **Sufficient funds**: The user has enough available balance to proceed directly from Buy to purchase review and confirmation.
- **Insufficient funds**: The user lacks enough balance and is guided to Add funds without losing the selected asset or purchase context.
- **Successful funding**: A mock PIX funding flow increases available balance and records a funding transaction.
- **Successful purchase**: A confirmed purchase updates balance, portfolio, and activity history.
- **Pending transaction**: Funding or purchase shows an intentional in-progress state before resolving.
- **Failure/Error**: Login, quote, funding, purchase, and chart failures show recoverable states and safe next actions.
- **Expired**: Funding and purchase quotes can expire and require refresh before confirmation.
- **Empty**: Empty portfolio and empty search results use designed empty states with clear recovery actions.
- **Populated portfolio**: Existing and newly purchased positions show quantity, value, and gain or loss.
- **Reset**: The presenter can restore the original deterministic demo state after confirmation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new user can describe Centok's target user and core value proposition within 15 seconds of viewing the landing page.
- **SC-002**: A presenter can move from landing page to dashboard in no more than three primary interactions.
- **SC-003**: A user can find and select one supported asset in under 30 seconds using browse or search.
- **SC-004**: A funded user can complete a mock purchase in no more than five primary interactions after selecting an asset.
- **SC-005**: An unfunded user can add mock funds and complete the original purchase without restarting asset selection.
- **SC-006**: A completed mock purchase updates available balance, portfolio, and activity history consistently in 100% of demo runs.
- **SC-007**: The main demo flow remains functional when live network services are unavailable.
- **SC-008**: The original demo state can be restored in less than ten seconds after reset confirmation.
- **SC-009**: All critical financial information is visible before the user confirms funding or purchase.
- **SC-010**: No default flow requires the user to understand blockchain-specific terminology to complete the task.
- **SC-011**: The primary dashboard flow remains usable at the agreed desktop presentation resolution and common laptop widths.
- **SC-012**: The mobile experience allows asset inspection, funding, purchase, portfolio review, and activity review without blocking the core journey.
- **SC-013**: Positive, negative, pending, success, failed, and expired states are identifiable without relying on color alone.
- **SC-014**: The landing page, dashboard, funding flow, purchase flow, portfolio, activity, and reset action can be demonstrated without unhandled errors.
- **SC-015**: Future provider integrations can replace the mock data source without changing the user-facing journey described in this specification.

## Assumptions

- The primary audience is Latin American retail investors familiar with traditional investing concepts but unfamiliar with blockchain operations.
- The demo language defaults to clear English product copy for the hackathon presentation unless a later feature localizes the experience.
- Desktop is the primary presentation environment, while tablet and mobile must remain functional for core flows.
- The demo can show BRL as the source currency and USDT as the destination balance currency where transparency requires it, while keeping technical terminology secondary.
- The initial demo does not require real eligibility, tax, or jurisdiction checks; disclosures explain that availability may vary.
- Price movements, chart history, balances, portfolio positions, quotes, and transaction outcomes are deterministic demo data.
- Mock state persists only for the current demo environment and can be fully reset by the presenter.
- Future funding, account, liquidity, execution, settlement, and lending providers are integration targets, not dependencies of the initial demo.

## Out of Scope *(mandatory)*

- Real authentication
- Real KYC or AML checks
- Real wallet creation
- Real account abstraction
- Real fiat payments
- Real PIX transactions
- Real stablecoin transfers
- Real market prices
- Real liquidity routing or swaps
- Real smart contract interactions
- Real blockchain settlement
- Real tax calculations
- Real yield, lending, or collateralized borrowing
- Real sell orders
- Advanced order types
- Production custody
- Production compliance decisions

