export const routes = {
  home: "/",
  login: "/login",
  app: "/app",
  market: (symbol: string) => `/app/markets/${symbol}`,
  portfolio: "/app/portfolio",
  activity: "/app/activity"
} as const;
