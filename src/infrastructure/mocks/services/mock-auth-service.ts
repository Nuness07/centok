import type { AuthService } from "@/domain/services/auth-service";
import type { User } from "@/domain/models";
import { getDemoState, updateDemoState } from "../demo-state-store";
import { withLatency } from "../mock-runtime";

export class MockAuthService implements AuthService {
  getCurrentUser(): Promise<User | null> {
    return withLatency(() => {
      const state = getDemoState();
      return state.authenticatedUserId ? state.user : null;
    }, 200);
  }

  loginAsDemoUser(): Promise<User> {
    return withLatency(() => {
      const state = getDemoState();
      if (state.scenario === "failed-login") {
        throw new Error("Login is unavailable in the selected workspace mode.");
      }
      updateDemoState((current) => ({ ...current, authenticatedUserId: current.user.id }));
      return state.user;
    }, 300);
  }

  logout(): Promise<void> {
    return withLatency(() => {
      updateDemoState((current) => ({ ...current, authenticatedUserId: null }));
    }, 200);
  }
}
