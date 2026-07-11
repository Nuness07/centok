import type { DemoScenario } from "@/domain/models";

export const demoScenarioOptions: { value: DemoScenario; label: string }[] = [
  { value: "default", label: "Default low balance" },
  { value: "funded-user", label: "Funded user" },
  { value: "unfunded-user", label: "Unfunded user" },
  { value: "funding-error", label: "Funding error" },
  { value: "purchase-error", label: "Purchase error" },
  { value: "expired-quote", label: "Expired quote" },
  { value: "chart-error", label: "Chart error" },
  { value: "failed-login", label: "Failed login" }
];
