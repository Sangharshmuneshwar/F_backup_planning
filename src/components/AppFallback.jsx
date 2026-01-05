// src/components/AppFallback.jsx
import React from "react";
import PageLoader from "./PageLoader";

export default function AppFallback({ loading, message, children }) {
  if (loading) {
    return <PageLoader message={message} />;
  }

  return <>{children}</>;
}
