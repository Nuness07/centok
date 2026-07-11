# Quickstart: Centok Frontend Demo Validation

**Feature**: Centok Frontend Demo
**Date**: 2026-07-10
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)

This guide validates the implemented frontend demo after tasks are generated and completed. It is intentionally written as a run and verification guide, not as implementation instructions.

## Prerequisites

- Node.js installed for the frontend project.
- Project dependencies installed.
- The application configured to use deterministic mock services.
- No live provider credentials are required.
- Browser storage available for persistence scenarios, with fallback behavior tested separately.

## Install and Run

From the repository root after implementation:

```bash
npm install
npm run dev
```

Open the local application URL shown by the dev server.

Expected result:

- The landing page loads without requiring network services.
- No wallet, payment, market-data, or blockchain provider setup is required.

## Validation Commands

Run the static and automated validation suite:

```bash
npm run typecheck
npm run lint
npm run test
npm run test:e2e
```

Expected result:

- Type checking passes.
- Linting passes.
- Unit tests for financial calculations and domain services pass.
- Component tests for funding, purchase, and reset states pass.
- End-to-end demo flow passes.

If exact script names differ after project setup, use the equivalent project scripts and record the mapping in the implementation notes.

## Scenario 1: Landing Page Comprehension

Steps:

1. Open `/`.
2. Review the hero, value proposition, how-it-works section, comparison, infrastructure explanation, and disclaimer.
3. Use the primary CTA.

Expected outcome:

- A first-time viewer can explain that Centok helps Latin American retail investors access tokenized U.S. stock exposure through a simpler financial experience.
- The page does not require wallet, gas, approvals, contract, network, or liquidity knowledge.
- Disclosures state that demo transactions and market data are simulated and Stock Tokens are not direct ownership of underlying shares.

## Scenario 2: Mock Login and App Shell

Steps:

1. Navigate to `/login` from the landing page.
2. Select the demo account.
3. Confirm redirect to `/app`.
4. Reload the page.
5. Log out.

Expected outcome:

- Demo login requires no real account.
- Authenticated state persists after reload.
- Logout returns to the landing page.
- Protected app surfaces are not accessible while logged out.

## Scenario 3: Asset Browsing and Chart Inspection

Steps:

1. Open `/app`.
2. Confirm the default asset is selected.
3. Search for `NVDA` or `Apple`.
4. Select a different asset.
5. Change chart ranges across Live, 1D, 5D, 1M, 6M, YTD, 1Y, and MAX.
6. Activate the chart-error scenario.

Expected outcome:

- Asset list shows logo, ticker, company name, mock price, percentage change, and trend indicator.
- Selection updates price, chart, company description, disclosure, and order ticket.
- Chart range changes deterministic data.
- Chart error state is recoverable.
- Positive and negative movement use text or iconography in addition to color.

## Scenario 4: Insufficient Funds to Funding to Purchase

Steps:

1. Reset demo to the default low-balance state.
2. Select AAPL or NVDA.
3. Open Buy.
4. Enter an amount above available balance.
5. Choose Add funds.
6. Enter `500.00 BRL`.
7. Review exchange rate, fee, estimated USDT, payment method, and quote expiration.
8. Continue to mock PIX instructions.
9. Simulate payment.
10. Confirm funding success.
11. Return to the preserved purchase context.
12. Review the order.
13. Confirm purchase.
14. Observe pending and success states.

Expected outcome:

- Insufficient balance blocks confirmation and routes to funding.
- Funding review displays source amount, destination estimate, exchange rate, fee, payment method, and expiration.
- Successful funding increases available balance and records activity.
- Purchase context preserves selected asset and entered amount where applicable.
- Purchase review displays asset, amount, quantity, price, fee, total, remaining balance, and expiration.
- Successful purchase updates balance, portfolio, and activity.

## Scenario 5: Funded User Direct Purchase

Steps:

1. Activate funded-user scenario.
2. Select a supported active asset.
3. Open Buy.
4. Enter a valid amount within available balance.
5. Continue to review.
6. Confirm purchase.

Expected outcome:

- The flow skips funding.
- Duplicate confirmation is prevented while submitting.
- Pending and success states are shown.
- Balance decreases by the expected total.
- Portfolio position is created or updated with decimal-safe quantity and average price.
- Activity history records the purchase.

## Scenario 6: Failure and Expiration States

Steps:

1. Activate funding-error scenario and submit funding.
2. Activate purchase-error scenario and submit purchase.
3. Activate expired-quote scenario for funding and purchase.
4. Retry or refresh where offered.

Expected outcome:

- Failed funding does not mutate balance.
- Failed purchase does not mutate balance or portfolio.
- Expired quotes require refresh and preserve user-entered values where safe.
- Error messages are clear and do not expose stack traces, provider internals, wallet details, or raw technical identifiers.

## Scenario 7: Portfolio and Activity

Steps:

1. Complete at least one successful funding and purchase.
2. Open `/app/portfolio`.
3. Open `/app/activity`.
4. Reload the page.

Expected outcome:

- Portfolio shows total value, available balance, total invested, total gain/loss, and positions.
- Empty portfolio state appears after reset or empty scenario.
- Activity shows funding and purchase transactions with type, asset when applicable, amount, status, date/time, and reference.
- State remains consistent after reload.

## Scenario 8: Demo Reset

Steps:

1. Complete funding and purchase so state changes.
2. Trigger demo reset from the presenter-safe entry point.
3. Confirm reset.
4. Reload the dashboard.

Expected outcome:

- Reset asks for confirmation.
- Original user, balance, portfolio, assets, activity, scenario, and purchase context are restored.
- Reset completes in less than ten seconds.
- The main presentation flow can be repeated from the same starting state.

## Scenario 9: Responsive and Accessibility Review

Desktop validation:

- Confirm the dashboard shows asset list, selected asset/chart, and order ticket simultaneously.
- Confirm text and financial values do not overlap or overflow.

Tablet validation:

- Confirm asset list can collapse or compact without blocking chart and order ticket use.

Mobile validation:

- Confirm the user can inspect an asset, open Buy, add funds, complete purchase, view portfolio, and view activity in a single-column flow.

Accessibility validation:

- Navigate all primary flows by keyboard.
- Confirm focus indicators are visible.
- Confirm modals trap focus and restore focus on close.
- Confirm Escape closes modals only where safe.
- Confirm pending, success, error, expired, positive, and negative states are identifiable without color alone.
- Confirm reduced-motion preferences are respected for non-essential motion.

## Manual Presentation Script

1. Open the landing page.
2. Explain the Latin American access problem.
3. Show the simplified three-step proposition.
4. Click Get Started.
5. Enter through the demo account.
6. Show the Stock Token asset list.
7. Select Apple or Nvidia.
8. Explain price, chart, and availability.
9. Enter a purchase amount.
10. Show insufficient balance.
11. Add funds.
12. Enter BRL amount.
13. Show PIX and USDT estimate.
14. Simulate payment.
15. Show updated balance.
16. Return automatically to the purchase.
17. Review the Stock Token order.
18. Confirm.
19. Show pending execution state.
20. Show purchase success.
21. Open portfolio.
22. Show the new position.
23. Open activity history.
24. Explain future integration mapping.
25. Reset the demo for the next presentation.

## Pass Criteria

The feature is ready for implementation completion review when:

- All validation commands pass.
- The main demo flow works without live services.
- Funding and purchase review steps show all critical financial information before confirmation.
- Balance, portfolio, and activity update consistently.
- Reset restores the original demo state in less than ten seconds.
- No primary-flow console errors are present.
- The dashboard is usable at the agreed presentation resolution and common laptop widths.
