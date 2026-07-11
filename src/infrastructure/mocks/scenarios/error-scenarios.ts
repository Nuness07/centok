import type { DemoScenario, DemoState } from "@/domain/models";
import { defaultDemoState } from "./default";

export function errorScenarioState(scenario: DemoScenario): DemoState {
  return {
    ...defaultDemoState,
    authenticatedUserId: defaultDemoState.user.id,
    scenario
  };
}
