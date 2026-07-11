import { describe, expect, it } from "vitest";
import { getServiceRegistry } from "@/infrastructure/mocks/service-registry";

describe("DemoStateService", () => {
  it("sets scenarios and resets default state", async () => {
    const { demoStateService, balanceRepository } = getServiceRegistry();
    await demoStateService.setScenario("funded-user");
    expect(await demoStateService.getScenario()).toBe("funded-user");
    expect((await balanceRepository.getAvailableBalance()).amount).toBe("250.00");
    await demoStateService.reset();
    expect((await balanceRepository.getAvailableBalance()).amount).toBe("5.00");
  });
});
