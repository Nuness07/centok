import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => {
    const styles: Record<ButtonVariant, string> = {
      primary: "bg-primary text-white hover:bg-primary-hover",
      secondary: "border border-border-light bg-white text-text-dark hover:bg-surface-muted",
      ghost: "text-inherit hover:bg-white/10",
      danger: "bg-negative text-white hover:brightness-95"
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
          styles[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
