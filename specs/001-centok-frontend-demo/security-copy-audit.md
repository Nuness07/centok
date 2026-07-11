# Security and Copy Audit: Centok Frontend Demo

Date: 2026-07-10

## Reviewed Claims

- The interface uses simulated market data, funding, purchase, portfolio, and activity states.
- The landing page describes Stock Tokens as tokenized economic exposure.
- The product copy does not claim direct ownership of underlying shares.
- The product copy does not promise guaranteed returns, guaranteed tax savings, production regulatory approval, or universal availability.
- Funding language avoids implying that a real PIX payment is created in the demo.
- Purchase language avoids showing wallet addresses, gas fees, approvals, contract addresses, RPC details, or raw transactions in the primary flow.

## Required Disclosures Present

- Demo transactions and market data are simulated.
- Stock Tokens provide economic exposure and are not direct share ownership.
- Availability may depend on jurisdiction and eligibility.
- Review steps show amount, fee, estimate, total, balance impact, and quote expiration where applicable.

## Remaining Production Work

- Legal, tax, custody, eligibility, and risk disclosures require formal review before production launch.
- Provider-specific failure messages must be translated into user-safe domain messages during real integrations.
