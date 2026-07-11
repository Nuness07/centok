import type { DemoScenario } from "../models";

export interface DemoStateService {
  reset(): Promise<void>;
  setScenario(scenario: DemoScenario): Promise<void>;
  getScenario(): Promise<DemoScenario>;
}
