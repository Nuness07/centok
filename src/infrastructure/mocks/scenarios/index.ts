import type { DemoScenario, DemoState } from "@/domain/models";
import { defaultDemoState } from "./default";
import { fundedUserState } from "./funded-user";
import { unfundedUserState } from "./unfunded-user";
import { errorScenarioState } from "./error-scenarios";

export function stateForScenario(scenario: DemoScenario = "default"): DemoState {
  if (scenario === "funded-user") return { ...fundedUserState };
  if (scenario === "unfunded-user") return { ...unfundedUserState };
  if (scenario === "default") return { ...defaultDemoState };
  return errorScenarioState(scenario);
}

export { defaultDemoState } from "./default";
