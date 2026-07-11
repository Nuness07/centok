"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function AssetLogo({
  symbol,
  src,
  className,
  imageClassName
}: {
  symbol: string;
  src?: string;
  className?: string;
  imageClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span className={cn("flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-xs font-black text-[#0B1220]", className)}>
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
  );
}
