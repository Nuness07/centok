import type { Metadata } from "next";
import "@/styles/globals.css";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "Centok | Tokenized U.S. stock access",
  description: "A deterministic frontend demo for simplified tokenized U.S. equity exposure."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
