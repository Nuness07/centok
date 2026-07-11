import { render } from "@testing-library/react";
import { AppProviders } from "@/app/providers";

export function renderWithProviders(ui: React.ReactElement) {
  return render(<AppProviders>{ui}</AppProviders>);
}
