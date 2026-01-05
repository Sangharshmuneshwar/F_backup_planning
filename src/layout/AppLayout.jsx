import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          {children}
        </div>
      </main>
    </div>
  );
}
