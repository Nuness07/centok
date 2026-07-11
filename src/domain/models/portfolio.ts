import type { Money } from "./money";

export type PortfolioPosition = {
  assetId: string;
  quantity: string;
  averagePrice: Money;
  currentValue: Money;
  unrealizedGain: Money;
  unrealizedGainPercentage: number;
};

export type Portfolio = {
  availableBalance: Money;
  totalInvested: Money;
  currentValue: Money;
  totalGain: Money;
  totalGainPercentage: number;
  positions: PortfolioPosition[];
};
