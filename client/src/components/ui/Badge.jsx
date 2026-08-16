const badgeVariants = {
  primary:
    "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
  secondary:
    "bg-slate-500/10 text-slate-700 dark:text-zinc-300 border border-slate-500/20 dark:border-zinc-700",
  success:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  warning:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  outline:
    "bg-transparent text-slate-700 dark:text-zinc-300 border border-slate-300 dark:border-zinc-700",
};

export const Badge = ({ children, variant = "primary", className = "", ...props }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors ${
        badgeVariants[variant] || badgeVariants.primary
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

