import type { DemoScenario } from "@/domain/models";
import type { DemoStateService } from "@/domain/services/demo-state-service";
import { getDemoState, resetDemoState, setDemoScenario } from "../demo-state-store";
import { withLatency } from "../mock-runtime";

export class MockDemoStateService implements DemoStateService {
  reset(): Promise<void> {
    return withLatency(() => {
      resetDemoState("default");
    }, 280);
  }

  setScenario(scenario: DemoScenario): Promise<void> {
    return withLatency(() => {
      setDemoScenario(scenario);
    }, 280);
  }

  getScenario(): Promise<DemoScenario> {
    return withLatency(() => getDemoState().scenario, 160);
  }
}
