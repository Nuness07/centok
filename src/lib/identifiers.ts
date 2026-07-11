export function referenceId(prefix: string, index: number): string {
  return `${prefix}-${String(index).padStart(4, "0")}`;
}

export function stableId(prefix: string, value: string): string {
  return `${prefix}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}
