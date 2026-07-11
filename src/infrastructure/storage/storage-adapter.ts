import { StorageUnavailableError } from "@/domain/errors/domain-errors";

export type StorageAdapter = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

class MemoryStorageAdapter implements StorageAdapter {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }
}

export function createStorageAdapter(): StorageAdapter {
  if (typeof window === "undefined") {
    return new MemoryStorageAdapter();
  }

  try {
    const probe = "centok.storage.probe";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    throw new StorageUnavailableError();
  }
}

export const fallbackStorage = new MemoryStorageAdapter();
