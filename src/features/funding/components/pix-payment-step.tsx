import type { FundingQuote } from "@/domain/models";
import { Button } from "@/components/ui/button";

export function PixPaymentStep({ quote, onSimulatePayment }: { quote: FundingQuote; onSimulatePayment: () => void }) {
  return (
    <div className="space-y-4">
      <div className="mx-auto grid h-44 w-44 place-items-center rounded-[20px] border border-[#D7E4F4] bg-[#F8FBFF] text-center text-xs font-semibold text-[#6F7A8F]">
        PIX QR code<br />{quote.id}
      </div>
      <div className="rounded-[16px] border border-[#D7E4F4] bg-white p-3 font-mono text-xs text-[#334155]">
        pix-centok-{quote.id}
      </div>
      <Button className="min-h-12 w-full rounded-full" onClick={onSimulatePayment}>Confirm PIX payment</Button>
    </div>
  );
}
