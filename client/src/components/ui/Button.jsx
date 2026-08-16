import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

const variantStyles = {
  primary:
    "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:text-white",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700",
  outline:
    "border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 dark:bg-zinc-900/80 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800",
  ghost:
    "bg-transparent hover:bg-slate-100 text-slate-700 dark:text-zinc-300 dark:hover:bg-zinc-800/80",
  danger:
    "bg-rose-600 hover:bg-rose-500 text-white shadow-sm shadow-rose-500/20 dark:bg-rose-600 dark:hover:bg-rose-500 dark:text-white",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl",
  icon: "h-9 w-9 p-0 flex items-center justify-center rounded-xl",
};

export const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      isDisabled = false,
      className = "",
      type = "button",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled || isLoading}
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-center font-semibold transition-all duration-150 ease-in-out cursor-pointer select-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 ${
          variantStyles[variant] || variantStyles.primary
        } ${sizeStyles[size] || sizeStyles.md} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

