import type { Asset } from "@/domain/models";

const ASSET_LOGOS = {
  AAPL: "https://cdn.simpleicons.org/apple/000000?viewbox=auto",
  AMD: "https://cdn.simpleicons.org/amd/ED1C24?viewbox=auto",
  AMZN: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128",
  GOOGL: "https://cdn.simpleicons.org/google/4285F4?viewbox=auto",
  META: "https://cdn.simpleicons.org/meta/0866FF?viewbox=auto",
  MSFT: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=128",
  NVDA: "https://cdn.simpleicons.org/nvidia/76B900?viewbox=auto",
  TSLA: "https://cdn.simpleicons.org/tesla/CC0000?viewbox=auto",
  COIN: "https://cdn.simpleicons.org/coinbase/0052FF?viewbox=auto",
  NFLX: "https://cdn.simpleicons.org/netflix/E50914?viewbox=auto"
} as const;

export const supportedAssets: Asset[] = [
  {
    id: "asset-aapl",
    symbol: "AAPL",
    name: "Apple Inc.",
    logoUrl: ASSET_LOGOS.AAPL,
    price: { amount: "314.25", currency: "USDT" },
    changeAmount: { amount: "2.84", currency: "USDT" },
    changePercentage: 1.34,
    description: "Apple designs consumer devices, software, and services used by hundreds of millions of customers globally.",
    status: "active",
    marketStatus: "available-24-7"
  },
  {
    id: "asset-amd",
    symbol: "AMD",
    name: "Advanced Micro Devices, Inc.",
    logoUrl: ASSET_LOGOS.AMD,
    price: { amount: "156.42", currency: "USDT" },
    changeAmount: { amount: "-1.82", currency: "USDT" },
    changePercentage: -1.15,
    description: "AMD develops high-performance processors and graphics technologies for PCs, data centers, and embedded markets.",
    status: "active",
    marketStatus: "available-24-7"
  },
  {
    id: "asset-amzn",
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    logoUrl: ASSET_LOGOS.AMZN,
    price: { amount: "191.60", currency: "USDT" },
    changeAmount: { amount: "1.12", currency: "USDT" },
    changePercentage: 0.59,
    description: "Amazon operates global ecommerce, logistics, advertising, streaming, and cloud infrastructure businesses.",
    status: "active",
    marketStatus: "available-24-7"
  },
  {
    id: "asset-googl",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    logoUrl: ASSET_LOGOS.GOOGL,
    price: { amount: "178.35", currency: "USDT" },
    changeAmount: { amount: "-0.68", currency: "USDT" },
    changePercentage: -0.38,
    description: "Alphabet is the parent company of Google, YouTube, Android, cloud services, and AI research businesses.",
    status: "active",
    marketStatus: "available-24-7"
  },
  {
    id: "asset-meta",
    symbol: "META",
    name: "Meta Platforms, Inc.",
    logoUrl: ASSET_LOGOS.META,
    price: { amount: "503.20", currency: "USDT" },
    changeAmount: { amount: "5.47", currency: "USDT" },
    changePercentage: 1.10,
    description: "Meta operates social platforms, messaging products, advertising tools, and long-term immersive computing initiatives.",
    status: "active",
    marketStatus: "available-24-7"
  },
  {
    id: "asset-msft",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    logoUrl: ASSET_LOGOS.MSFT,
    price: { amount: "437.10", currency: "USDT" },
    changeAmount: { amount: "3.14", currency: "USDT" },
    changePercentage: 0.72,
    description: "Microsoft provides cloud infrastructure, productivity software, operating systems, gaming, and enterprise AI services.",
    status: "active",
    marketStatus: "available-24-7"
  },
  {
    id: "asset-nvda",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    logoUrl: ASSET_LOGOS.NVDA,
    price: { amount: "126.88", currency: "USDT" },
    changeAmount: { amount: "4.22", currency: "USDT" },
    changePercentage: 3.44,
    description: "NVIDIA builds accelerated computing hardware, software, and AI infrastructure for data centers and developers.",
    status: "active",
    marketStatus: "available-24-7"
  },
  {
    id: "asset-tsla",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    logoUrl: ASSET_LOGOS.TSLA,
    price: { amount: "246.70", currency: "USDT" },
    changeAmount: { amount: "-5.86", currency: "USDT" },
    changePercentage: -2.32,
    description: "Tesla designs electric vehicles, energy storage products, charging infrastructure, and automation technology.",
    status: "active",
    marketStatus: "available-24-7"
  },
  {
    id: "asset-coin",
    symbol: "COIN",
    name: "Coinbase Global, Inc.",
    logoUrl: ASSET_LOGOS.COIN,
    price: { amount: "225.15", currency: "USDT" },
    changeAmount: { amount: "6.52", currency: "USDT" },
    changePercentage: 2.98,
    description: "Coinbase provides digital asset trading, custody, payments, and infrastructure products for consumers and institutions.",
    status: "active",
    marketStatus: "available-24-7"
  },
  {
    id: "asset-nflx",
    symbol: "NFLX",
    name: "Netflix, Inc.",
    logoUrl: ASSET_LOGOS.NFLX,
    price: { amount: "682.35", currency: "USDT" },
    changeAmount: { amount: "-3.75", currency: "USDT" },
    changePercentage: -0.55,
    description: "Netflix operates a global streaming entertainment service with original and licensed films, series, and games.",
    status: "active",
    marketStatus: "available-24-7"
  }
];
