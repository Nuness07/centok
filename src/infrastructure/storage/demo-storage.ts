import type { DemoState } from "@/domain/models";
import { demoConfig } from "@/config/demo";
import { demoStateSchema } from "@/domain/validation/demo-state-schema";
import { defaultDemoState } from "@/infrastructure/mocks/scenarios";
import { createStorageAdapter, fallbackStorage } from "./storage-adapter";

function adapter() {
  try {
    return createStorageAdapter();
  } catch {
    return fallbackStorage;
  }
}

export function readDemoState(): DemoState {
  const raw = adapter().getItem(demoConfig.storageKey);
  if (!raw) return structuredCloneSafe(defaultDemoState);

  try {
    const parsed = JSON.parse(raw);
    const result = demoStateSchema.safeParse(parsed);
    if (!result.success || result.data.version !== demoConfig.storageVersion) {
      return structuredCloneSafe(defaultDemoState);
    }
    return result.data as DemoState;
  } catch {
    return structuredCloneSafe(defaultDemoState);
  }
}

export function writeDemoState(state: DemoState): void {
  adapter().setItem(demoConfig.storageKey, JSON.stringify(state));
}

export function clearDemoState(): void {
  adapter().removeItem(demoConfig.storageKey);
}

export function structuredCloneSafe<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
