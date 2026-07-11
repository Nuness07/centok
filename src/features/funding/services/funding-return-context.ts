import { updateDemoState } from "@/infrastructure/mocks/demo-state-store";

export function saveFundingReturnContext(assetSymbol: string, amount?: string) {
  updateDemoState((state) => ({ ...state, purchaseReturnContext: { assetSymbol, amount } }));
}

export function clearFundingReturnContext() {
  updateDemoState((state) => ({ ...state, purchaseReturnContext: undefined }));
}
