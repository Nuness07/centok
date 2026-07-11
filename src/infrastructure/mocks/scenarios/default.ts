import type { DemoState } from "@/domain/models";
import { demoConfig } from "@/config/demo";
import { defaultAvailableBalance } from "../fixtures/balances";
import { initialTransactions } from "../fixtures/transactions";
import { demoUser } from "../fixtures/users";

export const defaultDemoState: DemoState = {
  version: demoConfig.storageVersion,
  user: demoUser,
  authenticatedUserId: null,
  availableBalance: defaultAvailableBalance,
  positions: [],
  transactions: initialTransactions,
  scenario: "default"
};
