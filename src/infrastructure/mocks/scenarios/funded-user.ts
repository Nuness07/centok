import type { DemoState } from "@/domain/models";
import { demoConfig } from "@/config/demo";
import { fundedAvailableBalance } from "../fixtures/balances";
import { demoUser } from "../fixtures/users";

export const fundedUserState: DemoState = {
  version: demoConfig.storageVersion,
  user: demoUser,
  authenticatedUserId: demoUser.id,
  availableBalance: fundedAvailableBalance,
  positions: [],
  transactions: [],
  scenario: "funded-user"
};
