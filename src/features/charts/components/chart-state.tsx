import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";

export function ChartLoadingState() {
  return <LoadingState label="Loading chart data" />;
}

export function ChartErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Chart temporarily unavailable"
      description="Chart data is temporarily unavailable. Try another range or reload the page."
      onRetry={onRetry}
    />
  );
}
