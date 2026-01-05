import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function TopBar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const role = user?.role || "USER";



  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex items-center gap-2">
        <div className="md:hidden h-8 w-8 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold text-base">
          CF
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Dashboard
          </span>
          <span className="text-sm font-medium">{role}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="text-xs flex items-center gap-1 rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition"
        >
          {isDark ? "🌙 Dark" : "☀️ Light"}
        </button>

        <button
          onClick={logout}
          className="text-xs text-red-500 border border-red-500/60 rounded-full px-3 py-1 hover:bg-red-500/10"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
