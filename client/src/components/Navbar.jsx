import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ArrowRight, Moon, Sun, Monitor, Search } from "lucide-react";

import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ onOpenCommandPalette }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const { themeMode, setThemeMode, activeTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 transition-colors">
      <div className="flex items-center justify-between h-16 px-4 sm:px-8 xl:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="QuickAI Logo"
            className="h-8 cursor-pointer hover:opacity-90 transition-opacity"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Search Button (Command Palette Trigger) */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              aria-label="Search tools (Cmd+K)"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-100/80 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 text-xs font-semibold transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="font-mono bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-200 px-1.5 py-0.5 rounded text-[10px]">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Theme Mode Toggle (Light / Dark / System) */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
            <button
              onClick={() => setThemeMode("light")}
              aria-label="Light Mode"
              className={`p-1.5 rounded-lg transition-all ${
                themeMode === "light"
                  ? "bg-white text-amber-500 shadow-sm dark:bg-zinc-700"
                  : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
              }`}
            >
              <Sun className="w-4 h-4" />
            </button>

            <button
              onClick={() => setThemeMode("dark")}
              aria-label="Dark Mode"
              className={`p-1.5 rounded-lg transition-all ${
                themeMode === "dark"
                  ? "bg-white text-indigo-500 shadow-sm dark:bg-zinc-700 dark:text-indigo-400"
                  : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
              }`}
            >
              <Moon className="w-4 h-4" />
            </button>

            <button
              onClick={() => setThemeMode("system")}
              aria-label="System Mode"
              className={`p-1.5 rounded-lg transition-all ${
                themeMode === "system"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                  : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>

          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <button
              onClick={openSignIn}
              className="inline-flex items-center gap-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white dark:bg-indigo-500 dark:hover:bg-indigo-400 px-5 py-2.5 shadow-sm transition-all active:scale-[0.98]"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;


