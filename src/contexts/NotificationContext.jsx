import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  memo,
} from "react";

const NotificationContext = createContext(null);
const DEFAULT_DURATION = 3500;

let idCounter = 0;

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    ({ type = "info", title, message, duration = DEFAULT_DURATION } = {}) => {
      const id = ++idCounter;

      const normalizedType =
        type === "success" ||
        type === "error" ||
        type === "warning" ||
        type === "info"
          ? type
          : "info";

      const toast = { id, type: normalizedType, title, message };

      setToasts((prev) => [...prev, toast]);

      if (duration !== null) {
        // auto-remove after duration
        window.setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <NotificationContainer toasts={toasts} onClose={removeToast} />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return ctx;
}

// ========== UI ==========

const typeStyles = {
  success: {
    base: "border-emerald-500/70 bg-emerald-50/90 text-emerald-900 dark:border-emerald-400/70 dark:bg-emerald-900/40 dark:text-emerald-50",
    icon: "✅",
  },
  error: {
    base: "border-rose-500/70 bg-rose-50/90 text-rose-900 dark:border-rose-400/70 dark:bg-rose-900/40 dark:text-rose-50",
    icon: "⚠️",
  },
  info: {
    base: "border-sky-500/70 bg-sky-50/90 text-sky-900 dark:border-sky-400/70 dark:bg-sky-900/40 dark:text-sky-50",
    icon: "ℹ️",
  },
  warning: {
    base: "border-amber-500/70 bg-amber-50/90 text-amber-900 dark:border-amber-400/70 dark:bg-amber-900/40 dark:text-amber-50",
    icon: "⚠️",
  },
};

function NotificationContainer({ toasts, onClose }) {
  if (!toasts.length) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[9999] flex justify-center px-4 sm:justify-end sm:px-6">
      <div className="flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <NotificationToast
            key={toast.id}
            toast={toast}
            onClose={() => onClose(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

const NotificationToast = memo(function NotificationToast({ toast, onClose }) {
  const { type, title, message } = toast;
  const styles = typeStyles[type] || typeStyles.info;

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg shadow-slate-900/10 backdrop-blur-sm",
        "transition-all duration-200 animate-[fadeInUp_0.25s_ease-out]",
        styles.base,
      ].join(" ")}
    >
      <div className="mt-0.5 text-lg">{styles.icon}</div>

      <div className="flex-1">
        {title && (
          <p className="text-xs font-semibold tracking-wide uppercase">
            {title}
          </p>
        )}
        {message && (
          <p className="mt-0.5 text-sm leading-snug text-slate-700 dark:text-slate-100">
            {message}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="ml-2 mt-0.5 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-100"
      >
        ✕
      </button>
    </div>
  );
});
