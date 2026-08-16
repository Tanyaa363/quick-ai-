export const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200/90 dark:bg-zinc-800 ${className}`}
      {...props}
    />
  );
};

export const CreationSkeleton = () => (
  <div className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-3">
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-5 w-16" />
    </div>
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-20 w-full" />
  </div>
);

