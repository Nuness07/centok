import { EmptyState } from "@/components/feedback/empty-state";
import { LoadingState } from "@/components/feedback/loading-state";

export function AssetListLoading() {
  return <LoadingState label="Loading Stock Tokens" />;
}

export function AssetListEmpty() {
  return (
    <EmptyState
      title="No matching Stock Tokens"
      description="Try another ticker or company name from the supported list."
    />
  );
}
