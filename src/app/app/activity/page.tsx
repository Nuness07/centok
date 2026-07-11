"use client";

import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { useActivity } from "@/features/activity/hooks/use-activity";
import { ActivityHistory } from "@/features/activity/components/activity-history";

export default function ActivityPage() {
  const activity = useActivity();

  return (
    <main className="mx-auto max-w-[1280px] space-y-6 p-4 md:p-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6F7A8F]">Account ledger</p>
        <h1 className="mt-2 text-3xl font-black text-[#111827]">Activity</h1>
        <p className="mt-1 text-sm text-[#6F7A8F]">Simulated funding and Stock Token purchase records.</p>
      </div>
      {activity.isLoading ? <LoadingState label="Loading activity" /> : null}
      {activity.isError ? <ErrorState title="Activity unavailable" description="Reload or reset the demo state." onRetry={() => activity.refetch()} /> : <ActivityHistory />}
    </main>
  );
}
