import type { Money } from "./money";
import type { PortfolioPosition } from "./portfolio";
import type { Transaction } from "./transaction";
import type { User } from "./user";

export type DemoScenario =
  | "default"
  | "funded-user"
  | "unfunded-user"
  | "failed-login"
  | "funding-error"
  | "purchase-error"
  | "expired-quote"
  | "chart-error";

export type PurchaseReturnContext = {
  assetSymbol: string;
  amount?: string;
};

export type DemoState = {
  version: number;
  user: User;
  authenticatedUserId: string | null;
  availableBalance: Money;
  positions: PortfolioPosition[];
  transactions: Transaction[];
  scenario: DemoScenario;
  purchaseReturnContext?: PurchaseReturnContext;
};
