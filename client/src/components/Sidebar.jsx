import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  Hash,
  House,
  Image,
  Scissors,
  SquarePen,
  FileText,
  Users,
  LogOut,
  Sparkles,
  CreditCard,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Badge } from "./ui/Badge";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
  { to: "/ai/pricing", label: "Pricing", Icon: CreditCard },
];


const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebar && (
        <div
          onClick={() => setSidebar(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 sm:hidden"
        />
      )}

      <aside
        className={`w-64 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col justify-between max-sm:fixed max-sm:inset-y-0 max-sm:left-0 ${
          sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 shrink-0 h-full`}
      >
        <div className="flex flex-col h-full justify-between p-4">
          <div className="space-y-6">
            {/* User Profile Header */}
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-2xl flex items-center gap-3">
              <img
                src={user?.imageUrl}
                alt={user?.fullName || "User Avatar"}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-bold text-slate-900 dark:text-zinc-100 truncate">
                  {user?.fullName || "User Profile"}
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Badge variant="primary" className="text-[10px] font-bold">
                    Free (10 Limit)
                  </Badge>
                </div>


              </div>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-1">
              <p className="px-3 text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Workspace
              </p>
              {navItems.map(({ to, label, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/ai"}
                  onClick={() => setSidebar(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 flex items-center gap-3 rounded-xl text-sm font-semibold transition-all duration-150 group ${
                      isActive
                        ? "bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white shadow-sm shadow-indigo-500/20"
                        : "text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/80 hover:text-slate-900 dark:hover:text-zinc-100"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                          isActive ? "text-white" : "text-slate-500 dark:text-zinc-400"
                        }`}
                      />
                      <span className="flex-1 truncate">{label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between">
            <button
              onClick={openUserProfile}
              aria-label="Open User Profile"
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors text-left flex-1 min-w-0"
            >
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
              <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300 truncate">
                Account Settings
              </span>
            </button>
            <button
              onClick={signOut}
              aria-label="Sign Out"
              className="p-2 rounded-xl text-slate-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;


