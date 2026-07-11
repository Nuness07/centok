import { describe, expect, it } from "vitest";
import { demoConfig } from "@/config/demo";
import { readDemoState, writeDemoState } from "@/infrastructure/storage/demo-storage";
import { resetDemoState, setDemoScenario } from "@/infrastructure/mocks/demo-state-store";
import { fundedAvailableBalance } from "@/infrastructure/mocks/fixtures/balances";

describe("demo storage", () => {
  it("persists state by schema version", () => {
    const state = readDemoState();
    writeDemoState({ ...state, authenticatedUserId: state.user.id, availableBalance: fundedAvailableBalance });
    expect(readDemoState().availableBalance.amount).toBe("250.00");
  });

  it("falls back when version is invalid", () => {
    localStorage.setItem(demoConfig.storageKey, JSON.stringify({ version: 0 }));
    expect(readDemoState().version).toBe(demoConfig.storageVersion);
  });

  it("resets to the original low-balance fixture", () => {
    setDemoScenario("funded-user");
    const reset = resetDemoState();
    expect(reset.availableBalance.amount).toBe("5.00");
    expect(reset.positions).toHaveLength(0);
  });
});
