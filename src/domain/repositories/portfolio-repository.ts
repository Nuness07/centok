import type { Portfolio } from "../models";

export interface PortfolioRepository {
  getPortfolio(): Promise<Portfolio>;
}
