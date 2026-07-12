"use client";

import { useState } from "react";
import { LogOut, RotateCcw, SlidersHorizontal, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useCurrentUser, useLogout } from "../hooks/use-auth";
import { DemoResetDialog } from "@/features/demo/components/demo-reset-dialog";
import { useDemoScenario, useSetDemoScenario } from "@/features/demo/hooks/use-demo-state";
import { demoScenarioOptions } from "@/features/demo/services/demo-scenarios";

export function UserMenu() {
  const user = useCurrentUser();
  const logout = useLogout();
  const scenario = useDemoScenario();
  const setScenario = useSetDemoScenario();
  const [resetOpen, setResetOpen] = useState(false);
  const [scenarioOpen, setScenarioOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-2">
      <Button
        variant="ghost"
        className="hidden h-10 w-10 rounded-full border border-[#D7E4F4] bg-[#F7FAFF] p-0 text-[#6F7A8F] hover:bg-[#EEF4FE] hover:text-[#0B1220] md:inline-flex"
        onClick={() => setScenarioOpen((open) => !open)}
        aria-label="Open workspace settings"
        aria-expanded={scenarioOpen}
      >
        <SlidersHorizontal size={16} aria-hidden="true" />
      </Button>
      {scenarioOpen ? (
        <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-64 rounded-[18px] border border-[#D7E4F4] bg-white p-2 shadow-[0_24px_70px_rgb(11_18_32_/_14%)]">
          <div className="px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6F7A8F]">Workspace mode</p>
          </div>
          <div className="grid gap-1">
            {demoScenarioOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "rounded-full px-3 py-2 text-left text-sm font-semibold transition hover:bg-[#EEF4FE] hover:text-[#0B1220]",
                  scenario.data === option.value ? "bg-primary text-white" : "text-[#6F7A8F]"
                )}
                onClick={() =>
                  setScenario.mutate(option.value, {
                    onSuccess: () => setScenarioOpen(false)
                  })
                }
                disabled={setScenario.isPending}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <Button variant="ghost" className="h-10 w-10 rounded-full border border-[#D7E4F4] bg-[#F7FAFF] p-0 text-[#6F7A8F] hover:bg-[#EEF4FE] hover:text-[#0B1220]" onClick={() => setResetOpen(true)} aria-label="Reset workspace">
        <RotateCcw size={16} aria-hidden="true" />
      </Button>
      <Button variant="ghost" className="min-h-10 rounded-full border border-[#D7E4F4] bg-[#F7FAFF] px-3 text-[#0B1220] hover:bg-[#EEF4FE]" onClick={() => logout.mutate()} disabled={logout.isPending}>
        <UserCircle size={16} aria-hidden="true" />
        <span className="hidden md:inline">{user.data?.name ?? "User"}</span>
        <LogOut size={16} aria-hidden="true" />
      </Button>
      <DemoResetDialog open={resetOpen} onOpenChange={setResetOpen} />
    </div>
  );
}
