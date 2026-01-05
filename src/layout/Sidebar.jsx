import React from "react";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png";

const menuConfig = {
  common: [
    { id: "overview", label: "Overview", badge: null },
    { id: "profile", label: "My Profile", badge: null },
  ],
  ADMIN: [
    { id: "users", label: "User Management", badge: "Admin" },
    { id: "roles", label: "Roles & Permissions", badge: null },
    { id: "audit", label: "Audit Logs", badge: null },
  ],
  MANAGER: [
    { id: "planning", label: "Production Planning", badge: null },
    { id: "reports", label: "Reports & Analytics", badge: null },
  ],
  USER: [
    { id: "tasks", label: "My Tasks", badge: null },
    { id: "requests", label: "Requests", badge: null },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const role = user?.role || "USER";
  const email = user?.email || "unknown@crystal.com";

  const sideItems = [...menuConfig.common, ...(menuConfig[role] || [])];

  const handleLogout = () => {
    if (logout) logout();
    window.location.href = "/login";
  };

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/90 backdrop-blur-xl">
      {/* Brand */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-200 dark:border-slate-800/70">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold text-lg shadow-lg shadow-sky-500/40">
           { logo && <img  src = {logo} alt="Logo" className="h-8 w-8" /> }
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">
              Crystal Furnitech
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Production Planning
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-slate-100 px-3 py-2 border border-slate-200 dark:bg-slate-900/80 dark:border-slate-800/80">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Signed in as
          </p>
          <p className="truncate text-[13px] font-medium">{email}</p>
          <span className="inline-flex mt-1 items-center rounded-full border border-sky-500/50 bg-sky-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-sky-700 dark:text-sky-300">
            Role: {role}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {sideItems.map((item) => (
          <button
            key={item.id}
            className="group w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-white transition"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 group-hover:bg-sky-500" />
              {item.label}
            </span>
            {item.badge && (
              <span className="text-[10px] rounded-full px-2 py-0.5 bg-sky-500/10 text-sky-600 border border-sky-500/30 dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/40">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="border-t border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={handleLogout}
          className="text-xs text-red-500 hover:text-red-400 hover:underline underline-offset-4"
        >
          Log out
        </button>
        <span className="text-[10px] text-slate-400">
          v0.1 • Crystal Furnitech
        </span>
      </div>
    </aside>
  );
}
