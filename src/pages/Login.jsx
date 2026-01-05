import React from "react";
import LoginForm from "../components/LoginForm";
import logo from "../assets/logo.png";
import bgVideo from "../assets/Smiles of Comfort.mp4";

export default function Login() {
  
  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      {/* ✅ Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={bgVideo}
        poster={logo} // optional: show logo as thumbnail while loading
        autoPlay
        muted
        loop
        playsInline
      />

      {/* ✅ Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* ✅ Main content */}
      <main className="relative z-10 grid min-h-dvh place-items-center px-4">
        <section className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
          {/* ✅ Logo section */}
          {/* ✅ Header: logo left, text right */}
            <header className="flex items-center justify-between mb-6">
            {/* Logo on the left */}
            <div className="h-10 w-10 sm:h-10 sm:w-10 rounded-full overflow-hidden  shadow-md shadow-black/40 shrink-0">
                <img
                src={logo}
                alt="Crystal Furniture logo"
                className="h-full w-full object-cover"
                />
            </div>

            {/* Text on the right */}
              <p className="hidden sm:block text-white/60 text-xs font-light">
            Sign in to continue
            </p>
            </header>

          {/* Title */}
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="mb-6 text-white/70 text-sm">
            Enter your credentials to access your dashboard.
          </p>

          {/* ✅ Login form */}
          <LoginForm />

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-xs text-white/60">or</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          {/* OAuth buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 hover:bg-white/15 transition"
            >
              Continue with Google
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 hover:bg-white/15 transition"
            >
              Continue with Microsoft
            </button>
          </div>

          {/* Meta */}
          <div className="mt-6 flex items-center justify-between text-xs text-white/70">
            <label className="inline-flex select-none items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/30 bg-white/10"
              />
              Remember me
            </label>
            <a
              href="/forgot"
              className="hover:text-white/90 underline underline-offset-4"
            >
              Forgot password?
            </a>
          </div>
        </section>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/60">
          Protected by enterprise-grade security • © {new Date().getFullYear()}{" "}
          Crystal Furniture
        </p>
      </main>
    </div>
  );
}
