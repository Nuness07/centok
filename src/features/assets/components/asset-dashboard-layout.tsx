"use client";

import { useEffect, useState } from "react";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { demoConfig } from "@/config/demo";
import { AddFundsDialog } from "@/features/funding/components/add-funds-dialog";
import { saveFundingReturnContext, clearFundingReturnContext } from "@/features/funding/services/funding-return-context";
import { OrderTicket } from "@/features/trading/components/order-ticket";
import { PurchaseDialog } from "@/features/trading/components/purchase-dialog";
import { useSelectedAsset } from "../hooks/use-selected-asset";
import { AssetDashboardPanel } from "./asset-dashboard-panel";
import { AssetList } from "./asset-list";

export function AssetDashboardLayout({ symbol = demoConfig.defaultSymbol, startInDetail = false }: Readonly<{ symbol?: string; startInDetail?: boolean }>) {
  const normalizedSymbol = symbol.toUpperCase();
  const [activeSymbol, setActiveSymbol] = useState(normalizedSymbol);
  const [mobileView, setMobileView] = useState<"list" | "detail">(startInDetail ? "detail" : "list");
  const asset = useSelectedAsset(activeSymbol);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [fundingOpen, setFundingOpen] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState<string>(demoConfig.defaultPurchaseAmountUSDT);
  const [fundingAmountBRL, setFundingAmountBRL] = useState<string>(demoConfig.defaultFundingAmountBRL);
  const [returnToPurchase, setReturnToPurchase] = useState(false);

  useEffect(() => {
    setActiveSymbol(normalizedSymbol);
    setMobileView(startInDetail ? "detail" : "list");
  }, [normalizedSymbol, startInDetail]);

  useEffect(() => {
    const closeFlows = () => {
      setPurchaseOpen(false);
      setFundingOpen(false);
      setReturnToPurchase(false);
    };
    globalThis.addEventListener("centok:close-flows", closeFlows);
    return () => {
      globalThis.removeEventListener("centok:close-flows", closeFlows);
    };
  }, []);

  if (asset.isLoading) {
    return (
      <div className="mx-auto max-w-[1480px] p-4 md:p-6">
        <LoadingState label="Loading selected asset" />
      </div>
    );
  }

  if (asset.isError || !asset.data) {
    return (
      <div className="mx-auto max-w-[1480px] p-4 md:p-6">
        <ErrorState title="Asset unavailable" description="Choose another supported Stock Token." onRetry={() => asset.refetch()} />
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1480px] gap-4 p-4 md:p-6 xl:grid-cols-[270px_minmax(0,1fr)_360px]">
      <div className={mobileView === "list" ? "xl:hidden" : "hidden"}>
        <AssetList
          selectedSymbol={asset.data.symbol}
          onSelectAsset={(selectedAsset) => {
            setActiveSymbol(selectedAsset.symbol);
            setMobileView("detail");
          }}
        />
      </div>
      <div className="hidden xl:block">
        <AssetList selectedSymbol={asset.data.symbol} />
      </div>
      <div className={mobileView === "detail" ? "xl:hidden" : "hidden"}>
        <AssetDashboardPanel
          asset={asset.data}
          showMobileBack
          onMobileBack={() => setMobileView("list")}
        />
      </div>
      <div className="hidden xl:block">
        <AssetDashboardPanel asset={asset.data} />
      </div>
      <div className="hidden xl:block">
        <OrderTicket
          asset={asset.data}
          onReview={(amount) => {
            setPurchaseAmount(amount);
            setPurchaseOpen(true);
          }}
          onInsufficientFunds={(amount, fundingAmount) => {
            setPurchaseAmount(amount);
            setFundingAmountBRL(fundingAmount);
            setReturnToPurchase(true);
            saveFundingReturnContext(asset.data.symbol, amount);
            setFundingOpen(true);
          }}
        />
      </div>
      {mobileView === "detail" ? (
        <div className="xl:hidden">
          <OrderTicket
            asset={asset.data}
            onReview={(amount) => {
              setPurchaseAmount(amount);
              setPurchaseOpen(true);
            }}
            onInsufficientFunds={(amount, fundingAmount) => {
              setPurchaseAmount(amount);
              setFundingAmountBRL(fundingAmount);
              setReturnToPurchase(true);
              saveFundingReturnContext(asset.data.symbol, amount);
              setFundingOpen(true);
            }}
          />
        </div>
      ) : null}
      <PurchaseDialog
        open={purchaseOpen}
        onOpenChange={setPurchaseOpen}
        asset={asset.data}
        amount={purchaseAmount}
      />
      <AddFundsDialog
        open={fundingOpen}
        onOpenChange={setFundingOpen}
        initialAmountBRL={fundingAmountBRL}
        onComplete={() => {
          if (returnToPurchase) {
            clearFundingReturnContext();
            setPurchaseOpen(true);
          }
        }}
      />
    </div>
  );
}
