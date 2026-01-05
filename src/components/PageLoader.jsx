// src/components/PageLoader.jsx
import React from "react";

export default function PageLoader({ message }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-900/40">
        {/* Spinner */}
        <div className="relative">
          {/* Outer subtle ring */}
          <div className="h-12 w-12 rounded-full border-[3px] border-slate-200 dark:border-slate-700" />

          {/* Gradient spinning arc */}
          <div className="absolute inset-0 rounded-full border-[3px] border-t-sky-500 border-r-sky-400 border-b-transparent border-l-transparent animate-spin" />

          {/* Center dot / logo feel */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-sky-500 shadow-sm shadow-sky-300/70 dark:shadow-sky-900/70" />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
            {message}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Loading your planning workspace…
          </p>
        </div>
      </div>
    </div>
  );
}
