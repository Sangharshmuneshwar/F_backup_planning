import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { login, loading, error } = useAuth();
    const navigate = useNavigate();


  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await login(email, password);
      if (res.ok) {
      navigate("/dashboard"); // ⭐ redirect after success
    } 
    if (!res.ok) {
      // handle error (toast, etc.)
     
    }
  };

  return (
 // inside your LoginForm return()
<form onSubmit={onSubmit} className="space-y-4">
  <div className="space-y-1.5">
    <label htmlFor="email" className="text-sm text-white/80">Email</label>
    <input
      id="email"
      name="email"
      type="email"
      placeholder="you@company.com"
      className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 outline-none focus:border-white/40"
    />
  </div>

  <div className="space-y-1.5">
    <label htmlFor="password" className="text-sm text-white/80">Password</label>
    <input
      id="password"
      name="password"
      type="password"
      placeholder="••••••••"
      className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 outline-none focus:border-white/40"
    />
  </div>

  <button
    disabled={loading}
    className="w-full rounded-lg bg-white px-4 py-2 text-gray-900 font-medium hover:bg-white/90 transition disabled:opacity-60"
  >
    {loading ? "Signing in..." : "Sign in"}
  </button>

  {error && <p className="text-red-300 text-sm">{error}</p>}
</form>

  );
}
