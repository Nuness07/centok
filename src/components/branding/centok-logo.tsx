import Link from "next/link";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";

export function CentokLogo({ className, markOnly = false }: { className?: string; markOnly?: boolean }) {
  const invertForDark = className?.includes("text-white");

  return (
    <Link href={routes.home} className={cn("inline-flex items-center", className)} aria-label="Centok home">
      <svg
        viewBox={markOnly ? "0 0 260 204" : "0 0 1680 204"}
        className={cn(markOnly ? "h-9 w-12" : "h-9 w-[150px]", invertForDark && "invert")}
        role="img"
        aria-label="Centok"
      >
        <image href="/centok.png" x="-404" y="-212" width="2508" height="627" preserveAspectRatio="xMinYMin meet" />
      </svg>
    </Link>
  );
}
