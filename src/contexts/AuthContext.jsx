import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
// FIX 1: Ensure both the reducer function (authReducer) and the state (initialState) are imported.
// FIX 2: Corrected relative path assumption to './authReducer' (assuming it's in the same directory).
import { authReducer, initialState } from "../reducer/authReducer"; 

// FIX 3: Using a hardcoded URL as process.env is often unavailable in client-side environments.
// IMPORTANT: Adjust this URL to match your backend if it's not running on 8080.
const apiUrl = process.env.REACT_APP_API_URL;
/** ---------- Context ---------- */
const AuthContext = createContext(undefined);

/** ---------- Provider ---------- */
export function AuthProvider({ children }) {
  // FIX 4: Use the imported 'authReducer' and 'initialState'
  const [state, dispatch] = useReducer(authReducer, initialState); 

  // Restore session from storage on mount
  useEffect(() => {
    const restoreSession = async () => {
      dispatch({ type: "RESTORE_START" });

      try {
        // Attempt to fetch user details using the HttpOnly cookie
        const res = await fetch(`${apiUrl}/auth/me`, {
          method: "GET",
          credentials: "include", // ⬅️ send cookies (JWT) to backend
        });

        if (!res.ok) {
          // Not logged in (401/403/etc.)
          dispatch({ type: "RESTORE_DONE", user: null });
          return;
        }

        const user = await res.json(); // whatever your backend returns
        dispatch({ type: "RESTORE_DONE", user });
      } catch (err) {
        console.error("Failed to restore session", err);
        dispatch({ type: "RESTORE_DONE", user: null });
      }
    };

    restoreSession();
  }, []); 


  // ---- Public API methods ----
  const login = async (email, password) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ⭐ send / receive cookies
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let text = await res.text();
        throw new Error(text || "Login failed");
      }

      const data = await res.json();
      // backend returns { id, name, email, role, permissions }
      // token is now in HttpOnly cookie – we don't store it in JS state

      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        permissions: data.permissionCodes, // assuming safeBody sends permissionCodes
      };

      // Store ONLY non-sensitive user info (no token)
      localStorage.setItem("authUser", JSON.stringify(user));

      dispatch({ type: "LOGIN_SUCCESS", user, token: null });

      return { ok: true };
    } catch (err) {
      const message = err?.message || "Login failed";
      dispatch({ type: "LOGIN_ERROR", error: message });
      return { ok: false, error: message };
    }
  };


  const logout = async () => {
    // Use a variable to track success to control execution in 'finally' block
    let serverLogoutSuccessful = false; 

    try {
      // 1. Send POST request to the backend logout endpoint.
      const res = await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        credentials: "include", 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        console.log("Server logout successful. JWT cookie cleared by browser.");
        serverLogoutSuccessful = true;
        
      } else {
        console.warn(`Logout request failed with status: ${res.status}.`);
      }

    } catch (e) {
      console.error("Logout request failed due to network error:", e);
    } finally {
      // 5. Clear client-side state and local storage.
      dispatch({ type: "LOGOUT" });
      
      // 6. Redirect the user to the login page.
      if (serverLogoutSuccessful || !serverLogoutSuccessful) {
        // Redirect the user to the login page for security and clean state
        window.location.href = "/"; 
      }
    }
  };

  // 1. Define the context value using useMemo
  const context = useMemo(() => {
    const isAuthenticated = !!state.user;

    return {
      // State and derived state
      ...state,
      isAuthenticated,
      
      // Public methods
      login,
      logout,
    };
  }, [state, login, logout]); 

  // 2. Return the Provider component for AuthProvider
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
}

/** ---------- Hook ---------- */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

/** ---------- Optional: route guard component ---------- */
export function RequireAuth({ children, fallback = null }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null; // or a spinner
  return isAuthenticated ? children : fallback;
}