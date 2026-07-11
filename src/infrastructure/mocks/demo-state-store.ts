import type { DemoScenario, DemoState } from "@/domain/models";
import { clearDemoState, readDemoState, structuredCloneSafe, writeDemoState } from "@/infrastructure/storage/demo-storage";
import { stateForScenario } from "./scenarios";

export function getDemoState(): DemoState {
  return readDemoState();
}

export function setDemoState(state: DemoState): DemoState {
  writeDemoState(state);
  notifyStateChange();
  return state;
}

export function updateDemoState(updater: (state: DemoState) => DemoState): DemoState {
  const next = updater(structuredCloneSafe(getDemoState()));
  return setDemoState(next);
}

export function resetDemoState(scenario: DemoScenario = "default"): DemoState {
  clearDemoState();
  return setDemoState(stateForScenario(scenario));
}

export function setDemoScenario(scenario: DemoScenario): DemoState {
  return setDemoState(stateForScenario(scenario));
}

export function notifyStateChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("centok:demo-state-change"));
  }
}
