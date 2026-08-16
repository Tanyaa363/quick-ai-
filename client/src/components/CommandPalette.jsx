import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, SquarePen, Hash, Image, Eraser, Scissors, FileText, Users, House, CreditCard } from "lucide-react";

const commands = [
  { id: "dashboard", name: "Dashboard", category: "Navigation", path: "/ai", icon: House },
  { id: "article", name: "Write Article", category: "AI Tools", path: "/ai/write-article", icon: SquarePen },
  { id: "titles", name: "Blog Titles", category: "AI Tools", path: "/ai/blog-titles", icon: Hash },
  { id: "image", name: "Generate Images", category: "AI Tools", path: "/ai/generate-images", icon: Image },
  { id: "bg-remove", name: "Remove Background", category: "AI Tools", path: "/ai/remove-background", icon: Eraser },
  { id: "obj-remove", name: "Remove Object", category: "AI Tools", path: "/ai/remove-object", icon: Scissors },
  { id: "resume", name: "Review Resume", category: "AI Tools", path: "/ai/review-resume", icon: FileText },
  { id: "community", name: "Community", category: "Social", path: "/ai/community", icon: Users },
  { id: "pricing", name: "Pricing & Plans", category: "Subscription", path: "/ai/pricing", icon: CreditCard },
];


export const CommandPalette = ({ isOpen, setIsOpen }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-zinc-800">
          <Search className="w-5 h-5 text-slate-400 dark:text-zinc-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search tools... (Esc to close)"
            className="w-full py-4 px-3 bg-transparent text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none text-sm font-semibold"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close command palette"
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-sm font-medium text-slate-500 dark:text-zinc-400">
              No matching tools or actions found.
            </div>
          ) : (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => handleSelect(cmd.path)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950 dark:group-hover:text-indigo-400 transition-colors">
                    <cmd.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-zinc-100">
                      {cmd.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                      {cmd.category}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded">
                  Jump ↵
                </span>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-50 dark:bg-zinc-950/60 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-medium">
          <span>Tip: Use ↑ ↓ to navigate, Enter to select</span>
          <span className="font-mono">QuickAI Search</span>
        </div>
      </div>
    </div>
  );
};

