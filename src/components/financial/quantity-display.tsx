import { formatQuantity } from "@/lib/currency";

export function QuantityDisplay({ quantity }: { quantity: string }) {
  return <span className="font-tabular">{formatQuantity(quantity)}</span>;
}
