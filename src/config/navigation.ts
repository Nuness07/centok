import { routes } from "./routes";

export const marketingNav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Why Centok", href: "#why-centok" },
  { label: "Security", href: "#security" }
] as const;

export const appNav = [
  { label: "Home", href: routes.app },
  { label: "Markets", href: routes.market("AAPL") },
  { label: "Portfolio", href: routes.portfolio },
  { label: "Activity", href: routes.activity }
] as const;
