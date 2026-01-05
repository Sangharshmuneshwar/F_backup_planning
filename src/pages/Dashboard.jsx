import React from "react";
import { useAuth } from "../contexts/AuthContext";
import AppLayout from "../layout/AppLayout";
import ImportOrdersButton from "../components/ImportOrdersButton";
import AppFallback from "../components/AppFallback";

function QuickActionCard({ title, description, chip }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 flex flex-col justify-between hover:border-sky-500/60 hover:shadow-sky-100 transition dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-900/60 dark:hover:shadow-sky-900/40">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h2 className="text-sm font-semibold">{title}</h2>
          {chip && (
            <span className="text-[10px] rounded-full px-2 py-0.5 border border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-300">
              {chip}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <button className="mt-4 inline-flex items-center gap-1 text-[11px] text-sky-600 hover:text-sky-500 dark:text-sky-300 dark:hover:text-sky-200">
        Open module
        <span className="text-[13px]">↗</span>
      </button>
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const role = user?.role || "USER";
  const email = user?.email || "unknown@crystal.com";

  return (
    <AppFallback loading={loading} message="Restoring your planning workspace...">
      <AppLayout>
        {/* Header section */}
        <section className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome back,
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">
              {email}
            </h1>
            <p className="mt-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              You are logged in as{" "}
              <span className="font-medium text-sky-600 dark:text-sky-300">
                {role}
              </span>
              . Access your planning tools, reports and daily operations here.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1.5 text-xs md:text-sm text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-200 transition">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              System healthy
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs md:text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 transition">
              📊 View today&apos;s summary
            </button>
            <ImportOrdersButton />
          </div>
        </section>

        {/* Stats row */}
        <section className="grid gap-4 md:grid-cols-3 mb-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Open tasks
            </p>
            <p className="mt-2 text-2xl font-semibold">12</p>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              3 due today • 4 high priority
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Orders in progress
            </p>
            <p className="mt-2 text-2xl font-semibold">7</p>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              2 at cutting • 3 at assembly
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Capacity utilization
            </p>
            <p className="mt-2 text-2xl font-semibold">82%</p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden dark:bg-slate-800">
              <div className="h-full w-[82%] bg-gradient-to-r from-emerald-400 to-sky-500" />
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Within safe production limits
            </p>
          </div>
        </section>

        {/* Role-based quick actions */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {role === "ADMIN" && (
            <>
              <QuickActionCard
                title="Manage Users"
                description="Invite, deactivate and manage access levels for users."
                chip="Admin"
              />
              <QuickActionCard
                title="Define Permissions"
                description="Configure role-based permissions for different modules."
                chip="Security"
              />
            </>
          )}

          {role === "MANAGER" && (
            <>
              <QuickActionCard
                title="Create Production Plan"
                description="Plan upcoming batches, assign lines and track capacity."
                chip="Planning"
              />
              <QuickActionCard
                title="Review Daily Performance"
                description="Compare actual vs planned production for today."
                chip="Reports"
              />
            </>
          )}

          {role === "USER" && (
            <>
              <QuickActionCard
                title="My Worklist"
                description="See all tasks assigned to you across lines and shifts."
                chip="Tasks"
              />
              <QuickActionCard
                title="Request Support"
                description="Raise issues for material, machine or quality support."
                chip="Support"
              />
            </>
          )}

          {/* Common card for all roles */}
          <QuickActionCard
            title="Notifications & Alerts"
            description="Stay on top of delays, approvals, and critical events."
            chip="Common"
          />
        </section>
      </AppLayout>
    </AppFallback>
  );
}
