import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "min-h-11 w-full rounded-md border border-border-light bg-white px-3 py-2 text-sm text-text-dark placeholder:text-text-muted focus:border-primary",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
