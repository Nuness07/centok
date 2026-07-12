"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function AssetLogo({
  symbol,
  src,
  className,
  imageClassName,
  showRobinhoodBadge = true
}: {
  symbol: string;
  src?: string;
  className?: string;
  imageClassName?: string;
  showRobinhoodBadge?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  useEffect(() => {
    setFailed(false);
  }, [src, symbol]);

  return (
    <span className={cn("relative flex shrink-0 items-center justify-center overflow-visible rounded-full bg-white text-xs font-black text-[#0B1220]", className)}>
      <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
        {showImage ? (
          <img
            src={src}
            alt={`${symbol} logo`}
            className={cn("h-[62%] w-[62%] object-contain", imageClassName)}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          symbol.slice(0, 2)
        )}
      </span>
      {showRobinhoodBadge ? (
        <span className="absolute -bottom-[6%] -right-[6%] flex h-[42%] w-[42%] items-center justify-center rounded-full bg-[#C8FF00] ring-2 ring-white">
          <img src="/robinhood-icon.png" alt="" className="h-[70%] w-[70%] object-contain" loading="lazy" />
        </span>
      ) : null}
    </span>
  );
}
