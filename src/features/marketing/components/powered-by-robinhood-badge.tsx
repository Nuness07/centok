import Image from "next/image";

export function PoweredByRobinhoodBadge() {
  return (
    <div
      className="relative mb-7 inline-flex h-12 w-[330px] items-center justify-center rounded-full"
      aria-label="Powered by Robinhood"
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 330 48" aria-hidden="true">
        <defs>
          <linearGradient id="robinhoodBadgeBorder" x1="0" x2="330" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#9DFF18" />
            <stop offset="0.42" stopColor="#9DFF18" />
            <stop offset="1" stopColor="#9DFF18" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="328" height="46" rx="23" fill="none" stroke="url(#robinhoodBadgeBorder)" strokeWidth="2" />
      </svg>
      <div className="relative inline-flex items-center gap-3 bg-transparent px-5 text-text-dark">
        <span className="text-xs font-black uppercase tracking-[0.08em] text-black">Powered by</span>
        <Image
          src="/robinhood.png"
          alt="Robinhood"
          width={172}
          height={46}
          priority
          className="h-8 w-auto object-contain"
        />
      </div>
    </div>
  );
}
