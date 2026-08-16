import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X, ChevronRight, Search, Sun, Moon, Monitor } from "lucide-react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { CommandPalette } from "../components/CommandPalette";
import { SignIn, useUser } from "@clerk/clerk-react";
import { useTheme } from "../context/ThemeContext";

const routeNames = {
  "/ai": "Dashboard",
  "/ai/write-article": "Write Article",
  "/ai/blog-titles": "Blog Titles",
  "/ai/generate-images": "Generate Images",
  "/ai/remove-background": "Remove Background",
  "/ai/remove-object": "Remove Object",
  "/ai/review-resume": "Review Resume",
  "/ai/community": "Community",
  "/ai/pricing": "Pricing & Plans",
};


const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const { user } = useUser();
  const { themeMode, setThemeMode } = useTheme();

  const currentRouteName = routeNames[location.pathname] || "Workspace";

  return user ? (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors overflow-hidden">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebar(!sidebar)}
            aria-label="Toggle Sidebar Navigation"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 sm:hidden transition-colors"
          >
            {sidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="QuickAI Logo"
            className="cursor-pointer h-7"
          />

          {/* Breadcrumb Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-zinc-400 ml-4 border-l border-slate-200 dark:border-zinc-800 pl-4">
            <span>Workspace</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-zinc-100 font-bold">
              {currentRouteName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Command Palette Trigger Button */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            aria-label="Search tools (Cmd+K)"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 hover:border-slate-400 dark:hover:border-zinc-600 text-xs font-semibold transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Search commands...</span>
            <kbd className="hidden sm:inline font-mono bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-200 px-1.5 py-0.5 rounded text-[10px]">
              ⌘K
            </kbd>
          </button>

          {/* Dark Mode Theme Selector */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
            <button
              onClick={() => setThemeMode("light")}
              aria-label="Light Mode"
              className={`p-1.5 rounded-lg transition-all ${
                themeMode === "light"
                  ? "bg-white text-amber-500 shadow-sm dark:bg-zinc-700"
                  : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100"
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
                  : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100"
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
                  : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100"
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <main className="flex-1 min-w-0 bg-slate-50 dark:bg-zinc-950 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Command Palette Spotlight Search */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        setIsOpen={setIsCommandPaletteOpen}
      />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-zinc-950">
      <SignIn />
    </div>
  );
};

export default Layout;


