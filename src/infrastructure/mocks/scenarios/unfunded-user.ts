import type { DemoState } from "@/domain/models";
import { demoConfig } from "@/config/demo";
import { unfundedAvailableBalance } from "../fixtures/balances";
import { demoUser } from "../fixtures/users";

export const unfundedUserState: DemoState = {
  version: demoConfig.storageVersion,
  user: demoUser,
  authenticatedUserId: demoUser.id,
  availableBalance: unfundedAvailableBalance,
  positions: [],
  transactions: [],
  scenario: "unfunded-user"
};
