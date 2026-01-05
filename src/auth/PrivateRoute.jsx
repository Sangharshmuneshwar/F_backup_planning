// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AppFallback from "../components/AppFallback";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  return (
    <AppFallback loading={loading} message="Checking your access...">
      {user ? (
        children
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </AppFallback>
  );
}
