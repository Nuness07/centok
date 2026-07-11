import { cn } from "@/lib/cn";

export function Tabs({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex rounded-full bg-[#F6F9FF] p-1", className)}>{children}</div>;
}

export function TabButton({ active, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "flex-1 rounded-full px-3 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-45",
        active ? "bg-primary text-white" : "text-[#6F7A8F] hover:bg-white hover:text-[#111827]"
      )}
      {...props}
    >
      {children}
    </button>
  );
}
