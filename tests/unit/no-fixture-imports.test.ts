import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["src/app", "src/components", "src/features"];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? files(full) : [full];
  });
}

describe("fixture import boundary", () => {
  it("keeps app, component, and feature code away from raw fixtures", () => {
    const offenders = roots
      .flatMap(files)
      .filter((file) => /\.(ts|tsx)$/.test(file))
      .filter((file) => readFileSync(file, "utf8").includes("infrastructure/mocks/fixtures"));
    expect(offenders).toEqual([]);
  });
});
