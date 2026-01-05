import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function RedirectIfAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    // Already logged in → go to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children; // show login page
}

export default RedirectIfAuth;
