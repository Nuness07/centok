# Contract: UI Routes and Flow States

**Feature**: Centok Frontend Demo
**Date**: 2026-07-10
**Purpose**: Define user-observable route, layout, and flow contracts for the frontend demo.

## Global UI Rules

- Every primary action must be keyboard reachable.
- Dialogs and drawers must trap focus and provide safe cancellation.
- Status must use text or iconography in addition to color.
- Financial actions must show a review step before completion.
- Demo labels and disclaimers must make simulated data clear.
- Future-only features may appear as coming soon but must not block the primary flow.

## Route Contract: `/`

Purpose: Public landing page.

Required sections:

1. Header with Centok logo, How it works, Why Centok, Security, Log In, and Get Started.
2. Hero explaining tokenized U.S. stock access without usual complexity.
3. Value proposition for simpler access, familiar funding, transparent transactions, and hidden infrastructure.
4. How It Works with Add funds, Choose a company, Confirm investment.
5. Traditional path versus Centok path comparison.
6. Product preview showing asset list, chart, order ticket, or portfolio.
7. Infrastructure section described by user benefits.
8. Security and transparency section.
9. Final CTA.
10. Disclaimer about simulated data, economic exposure, no direct share ownership, and jurisdiction/eligibility limits.

Primary interactions:

- Get Started -> `/login` or mock auth entry.
- Log In -> `/login`.
- See how it works -> scroll to explanation section.

Success state:

- User understands the core value proposition within 15 seconds.

## Route Contract: `/login`

Purpose: Mock authentication.

Required states:

```text
idle
loading
success
error
```

Primary interactions:

- Select demo account -> authenticate and route to `/app`.
- Cancel/back -> return to `/`.

Success state:

- Demo user is authenticated and persisted for reload.

Error state:

- Failed-login scenario shows a recoverable message and retry action.

## Route Contract: `/app`

Purpose: Authenticated dashboard with default selected asset.

Desktop layout:

```text
Application header
Asset list | Selected asset and chart | Order ticket
```

Required header items:

- Logo
- Asset search access
- Available balance
- Add funds action
- Portfolio shortcut
- Activity shortcut
- User menu

Required states:

```text
loading
ready
empty-search
chart-error
asset-unavailable
```

Primary interactions:

- Search/filter assets.
- Select asset.
- Change chart range.
- Open Buy flow.
- Open Add funds flow.
- Navigate to portfolio or activity.
- Open reset confirmation from user/presenter menu.

Success state:

- Asset selection updates chart, price, details, disclosure, and order ticket.

## Route Contract: `/app/markets/[symbol]`

Purpose: Dashboard for a selected asset symbol.

Input:

- `symbol`: uppercase asset ticker.

Behavior:

- Valid active symbol selects the asset and loads deterministic chart data.
- Unknown symbol shows safe not-found or choose-another-asset state.
- Unavailable symbol shows unavailable state and disables purchase confirmation.

## Route Contract: `/app/portfolio`

Purpose: Portfolio overview.

Required states:

```text
loading
empty
populated
error
```

Populated view displays:

- Total portfolio value
- Available balance
- Total invested
- Total gain/loss
- Position list
- Quantity
- Average purchase price
- Current value
- Gain/loss

Empty view displays:

- Message explaining no holdings yet
- Browse markets action

Success state:

- Completed purchases appear after mutation and after reload.

## Route Contract: `/app/activity`

Purpose: Funding and purchase history.

Required states:

```text
loading
empty
populated
error
```

Each activity item displays:

- Transaction type
- Asset when applicable
- Amount
- Status
- Date/time
- Reference identifier

Optional filters:

```text
All
Funding
Purchases
```

Success state:

- Completed, pending, failed, and expired statuses are identifiable without relying on color alone.

## Flow Contract: Funding

Entry points:

- Header Add funds
- Insufficient-funds purchase state
- Empty portfolio CTA

States:

```text
editing
validating
reviewing
awaiting-payment
processing
success
error
expired
```

Step 1 - Input:

- BRL amount
- Estimated USDT received
- PIX payment method
- Exchange rate
- Fee
- Minimum amount
- Quote expiration

Step 2 - Review:

- Source amount
- Exchange rate
- Fee
- Estimated destination amount
- Payment method
- Simulated-values disclaimer

Step 3 - PIX payment:

- Mock QR code or mock payment code
- Payment amount
- Countdown
- Simulate payment action

Step 4 - Processing:

- Pending state
- Duplicate action prevention

Step 5 - Success:

- Funds added
- Updated balance
- Transaction reference
- Return-to-purchase action when applicable

Failure:

- Clear explanation
- Retry action
- Cancel action
- No balance mutation

## Flow Contract: Purchase

Entry points:

- Order ticket Buy action
- Return from funding flow

States:

```text
editing
validating
insufficient-funds
reviewing
submitting
pending
success
error
expired
```

Step 1 - Input:

- Selected asset
- Current mock price
- Amount to invest
- Available balance
- Estimated quantity

Step 2 - Review:

- Company and ticker
- Investment amount
- Current mocked price
- Estimated Stock Token quantity
- Execution fee
- Total
- Remaining balance
- Quote expiration
- Product disclosure

Step 3 - Confirmation:

- User explicitly confirms
- Duplicate clicks are prevented

Step 4 - Pending:

- Staged status such as Preparing order, Executing purchase, Updating portfolio
- Clear simulated status language

Step 5 - Success:

- Purchased asset
- Quantity
- Total invested
- Remaining balance
- Portfolio link
- Transaction reference

Failure:

- Clear explanation
- Retry action
- Cancel action
- No balance or portfolio mutation

Expired quote:

- Quote expired message
- Refresh quote action
- Preserve entered amount

## Flow Contract: Demo Reset

Entry points:

- User menu
- Hidden presenter menu
- Development toolbar

States:

```text
idle
confirming
resetting
success
error
```

Behavior:

1. Ask for confirmation.
2. Clear stored demo state.
3. Restore fixture version.
4. Invalidate relevant queries.
5. Navigate to default dashboard or landing state based on auth fixture.

Safety rules:

- Reset during active modal requires confirmation.
- Reset must complete in less than ten seconds.
- Reset must restore user, balance, portfolio, assets, transactions, scenarios, and purchase context.

## Responsive Contract

Desktop:

- Three-area dashboard: asset list, selected asset/chart, order ticket.

Tablet:

- Asset list may collapse into a drawer or compact panel.
- Chart and order ticket may become two columns.

Mobile:

```text
Selected asset header
Chart
Buy action
Asset list or search
Portfolio summary
```

The mobile flow must still support asset inspection, funding, purchase, portfolio, and activity.

## Accessibility Contract

- All buttons and form controls use semantic elements.
- Inputs have visible labels or accessible names.
- Focus is visible across landing, dashboard, dialogs, and drawers.
- Modal flows trap focus and restore focus on close.
- Escape closes modals only when it is safe to cancel.
- Pending, success, error, and expired states use live regions where appropriate.
- Reduced-motion preferences are respected for non-essential transitions.
- Color is never the only status signal.
