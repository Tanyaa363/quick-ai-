import { useState } from "react";
import Markdown from "react-markdown";
import { ChevronDown, ChevronUp, Calendar, Tag } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      onClick={() => setExpanded(!expanded)}
      className="p-4 sm:p-5 text-sm cursor-pointer transition-all duration-200 group hover:border-indigo-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <h3 className="font-bold text-slate-900 dark:text-zinc-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {item.prompt}
          </h3>
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              <span className="capitalize">{item.type}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(item.created_at).toLocaleDateString()}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="primary" className="capitalize hidden sm:inline-flex">
            {item.type}
          </Badge>
          <div className="p-1 rounded-lg text-slate-400 dark:text-zinc-400 group-hover:text-slate-700 dark:group-hover:text-zinc-200 transition-colors">
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-zinc-800 animate-in fade-in duration-200">
          {item.type === "image" ? (
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 max-w-md bg-slate-50 dark:bg-zinc-950 p-2">
              <img
                src={item.content}
                alt={item.prompt}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          ) : (
            <div className="prose dark:prose-invert max-w-none text-sm text-slate-800 dark:text-zinc-200 font-normal leading-relaxed bg-slate-50 dark:bg-zinc-950/80 p-4 rounded-xl border border-slate-200 dark:border-zinc-800">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default CreationItem;


