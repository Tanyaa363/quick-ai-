export const Card = ({ children, className = "", ...props }) => (
  <div
    className={`bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 text-slate-900 dark:text-zinc-100 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`p-6 pb-4 flex flex-col gap-1 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "", ...props }) => (
  <h3
    className={`text-lg font-bold text-slate-900 dark:text-zinc-100 tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-sm text-slate-600 dark:text-zinc-400 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = "", ...props }) => (
  <div
    className={`p-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-zinc-800/80 mt-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

