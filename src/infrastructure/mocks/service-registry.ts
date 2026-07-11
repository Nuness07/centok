import type { ActivityRepository } from "@/domain/repositories/activity-repository";
import type { AssetRepository } from "@/domain/repositories/asset-repository";
import type { BalanceRepository } from "@/domain/repositories/balance-repository";
import type { PortfolioRepository } from "@/domain/repositories/portfolio-repository";
import type { AuthService } from "@/domain/services/auth-service";
import type { DemoStateService } from "@/domain/services/demo-state-service";
import type { FundingService } from "@/domain/services/funding-service";
import type { OrderService } from "@/domain/services/order-service";
import { MockActivityRepository } from "./repositories/mock-activity-repository";
import { MockAssetRepository } from "./repositories/mock-asset-repository";
import { MockBalanceRepository } from "./repositories/mock-balance-repository";
import { MockPortfolioRepository } from "./repositories/mock-portfolio-repository";
import { MockAuthService } from "./services/mock-auth-service";
import { MockDemoStateService } from "./services/mock-demo-state-service";
import { MockFundingService } from "./services/mock-funding-service";
import { MockOrderService } from "./services/mock-order-service";

export type ServiceRegistry = {
  authService: AuthService;
  assetRepository: AssetRepository;
  balanceRepository: BalanceRepository;
  portfolioRepository: PortfolioRepository;
  activityRepository: ActivityRepository;
  fundingService: FundingService;
  orderService: OrderService;
  demoStateService: DemoStateService;
};

let registry: ServiceRegistry | null = null;

export function getServiceRegistry(): ServiceRegistry {
  registry ??= {
    authService: new MockAuthService(),
    assetRepository: new MockAssetRepository(),
    balanceRepository: new MockBalanceRepository(),
    portfolioRepository: new MockPortfolioRepository(),
    activityRepository: new MockActivityRepository(),
    fundingService: new MockFundingService(),
    orderService: new MockOrderService(),
    demoStateService: new MockDemoStateService()
  };

  return registry;
}
