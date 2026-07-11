export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export async function withLatency<T>(factory: () => T | Promise<T>, ms = 320): Promise<T> {
  if (typeof window !== "undefined") {
    await delay(ms);
  }
  return factory();
}

export function quoteExpired(expiresAt: string): boolean {
  return new Date(expiresAt).getTime() <= Date.now();
}

export function transactionTime(offset = 0): string {
  return new Date(Date.now() + offset).toISOString();
}
