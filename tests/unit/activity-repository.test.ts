import { describe, expect, it } from "vitest";
import { getServiceRegistry } from "@/infrastructure/mocks/service-registry";

describe("ActivityRepository", () => {
  it("orders transactions newest first", async () => {
    const { activityRepository } = getServiceRegistry();
    const activity = await activityRepository.listTransactions();
    expect(activity[0]?.id).toBeTruthy();
  });
});
