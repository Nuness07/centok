"use client";

import type { DemoScenario } from "@/domain/models";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { demoScenarioOptions } from "../services/demo-scenarios";
import { useDemoScenario, useSetDemoScenario } from "../hooks/use-demo-state";

export function ScenarioSelector({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const scenario = useDemoScenario();
  const setScenario = useSetDemoScenario();

  const choose = (value: DemoScenario) => {
    setScenario.mutate(value, {
      onSuccess: () => onOpenChange(false)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Demo scenario" variant="dark">
      <div className="grid gap-2">
        {demoScenarioOptions.map((option) => (
          <Button
            key={option.value}
            variant={scenario.data === option.value ? "primary" : "ghost"}
            className="justify-start rounded-full text-white"
            onClick={() => choose(option.value)}
            disabled={setScenario.isPending}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </Dialog>
  );
}
