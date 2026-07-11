import { describe, expect, it } from "vitest";
import { getServiceRegistry } from "@/infrastructure/mocks/service-registry";

describe("AuthService", () => {
  it("logs in, reads current user, and logs out", async () => {
    const { authService } = getServiceRegistry();
    await authService.loginAsDemoUser();
    expect((await authService.getCurrentUser())?.name).toBe("Gabriel");
    await authService.logout();
    expect(await authService.getCurrentUser()).toBeNull();
  });
});
