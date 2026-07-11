import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";

export function ChartLoadingState() {
  return <LoadingState label="Loading chart data" />;
}

export function ChartErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Chart temporarily unavailable"
      description="This mock scenario is showing the recoverable chart error state."
      onRetry={onRetry}
    />
  );
}
