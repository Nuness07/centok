import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./tests/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        elevated: "var(--background-elevated)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "text-dark": "var(--text-dark)",
        "text-light": "var(--text-light)",
        "text-muted": "var(--text-muted)",
        "text-muted-dark": "var(--text-muted-dark)",
        positive: "var(--positive)",
        negative: "var(--negative)",
        warning: "var(--warning)",
        "border-dark": "var(--border-dark)",
        "border-light": "var(--border-light)"
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)"
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        panel: "var(--shadow-panel)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
