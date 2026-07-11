import { describe, expect, it } from "vitest";
import { getServiceRegistry } from "@/infrastructure/mocks/service-registry";

describe("mock service contracts", () => {
  it("exposes all domain repositories and services", () => {
    const services = getServiceRegistry();
    expect(services.authService.getCurrentUser).toBeTypeOf("function");
    expect(services.assetRepository.listAssets).toBeTypeOf("function");
    expect(services.fundingService.getQuote).toBeTypeOf("function");
    expect(services.orderService.submitOrder).toBeTypeOf("function");
  });
});
