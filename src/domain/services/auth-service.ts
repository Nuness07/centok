import type { User } from "../models";

export interface AuthService {
  getCurrentUser(): Promise<User | null>;
  loginAsDemoUser(): Promise<User>;
  logout(): Promise<void>;
}
