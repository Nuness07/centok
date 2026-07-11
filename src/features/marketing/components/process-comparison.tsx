import { ArrowRight, CheckCircle2, CircleDot, XCircle } from "lucide-react";

import { landingCopy } from "@/config/landing";
import { cn } from "@/lib/cn";

export function ProcessComparison() {
  return (
    <section id="why-centok" className="relative overflow-hidden bg-[#F7FAFF] py-24 text-text-dark md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="pointer-events-none absolute bottom-8 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border-light to-transparent lg:block" />
        <div className="pointer-events-none absolute left-1/2 top-20 hidden h-24 w-px -translate-x-1/2 rounded-full bg-primary/45 blur-[1px] [--centok-path-travel:28rem] motion-safe:animate-[centok-path-travel_5.4s_ease-in-out_infinite] lg:block" />

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <PathLane
            label="Traditional path"
            description="More accounts, more handoffs, more room for confusion."
            items={landingCopy.comparison.traditional}
            tone="old"
          />
          <PathLane
            label="Centok path"
            description="One product flow with familiar actions and a clear review step."
            items={landingCopy.comparison.centok}
            tone="centok"
          />
        </div>

        <p className="mx-auto mt-16 max-w-3xl text-center text-sm leading-6 text-text-muted">
          Legal, tax, and eligibility obligations may still apply. The demo only shows a simpler product flow.
        </p>
      </div>
    </section>
  );
}

function PathLane({
  label,
  description,
  items,
  tone
}: {
  label: string;
  description: string;
  items: readonly string[];
  tone: "old" | "centok";
}) {
  const isCentok = tone === "centok";

  return (
    <article className={cn("relative", isCentok ? "lg:pl-12" : "lg:pr-12")}>
      <div className={cn("max-w-md", isCentok ? "lg:ml-auto lg:text-right" : "lg:mr-auto")}>
        <p className={cn("text-sm font-black uppercase tracking-[0.16em]", isCentok ? "text-primary" : "text-text-muted")}>
          {label}
        </p>
        <p className="mt-3 text-base leading-7 text-text-muted">{description}</p>
      </div>

      <ol className={cn("relative mt-10 grid gap-6", isCentok ? "lg:justify-items-end" : "lg:justify-items-start")}>
        <span
          className={cn(
            "absolute bottom-6 top-6 w-px",
            isCentok ? "right-[1.35rem] bg-primary/25 lg:right-6" : "left-[1.35rem] bg-text-muted/20 lg:left-6"
          )}
          aria-hidden="true"
        >
          <span
            className={cn(
              "absolute left-1/2 top-0 h-16 w-[3px] -translate-x-1/2 rounded-full motion-safe:animate-[centok-path-travel_5.4s_ease-in-out_infinite]",
              isCentok ? "bg-primary shadow-[0_0_24px_rgb(37_99_235_/_55%)] [--centok-path-travel:12rem]" : "bg-text-muted/45 [--centok-path-travel:27rem]"
            )}
          />
        </span>

        {items.map((item, index) => (
          <PathStep key={item} item={item} index={index} isCentok={isCentok} total={items.length} />
        ))}
      </ol>
    </article>
  );
}

function PathStep({ item, index, isCentok, total }: { item: string; index: number; isCentok: boolean; total: number }) {
  const Icon = isCentok ? CheckCircle2 : index === total - 1 ? CircleDot : XCircle;

  return (
    <li
      className={cn(
        "relative flex w-full items-center gap-4 motion-safe:animate-[centok-step-rise_700ms_ease-out_both] lg:max-w-[520px]",
        isCentok ? "flex-row-reverse text-right" : "flex-row"
      )}
      style={{ animationDelay: `${index * 130}ms` }}
    >
      <span
        className={cn(
          "z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-[#F7FAFF]",
          isCentok ? "border-primary text-primary shadow-[0_0_0_8px_rgb(37_99_235_/_6%)]" : "border-text-muted/25 text-text-muted"
        )}
      >
        <Icon size={19} aria-hidden="true" />
      </span>

      <span
        className={cn(
          "inline-flex min-h-14 flex-1 items-center justify-between gap-4 rounded-full border border-transparent px-5 py-3 text-sm font-bold transition md:text-base",
          isCentok ? "text-text-dark hover:border-primary/25 hover:text-primary" : "text-text-dark/65 hover:border-text-muted/15 hover:text-text-dark"
        )}
      >
        <span>{item}</span>
        <ArrowRight
          size={17}
          className={cn(
            "shrink-0 motion-safe:animate-[centok-arrow-nudge_1.8s_ease-in-out_infinite]",
            isCentok ? "text-primary" : "text-text-muted/55"
          )}
          aria-hidden="true"
        />
      </span>
    </li>
  );
}
