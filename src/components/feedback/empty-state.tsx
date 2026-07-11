import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-[18px] border border-dashed border-[#C9D8EE] bg-white p-6 text-center text-[#111827] shadow-[0_18px_50px_rgb(11_18_32_/_6%)]">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-[#6F7A8F]">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-4 rounded-full" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
