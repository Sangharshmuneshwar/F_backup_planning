// src/context/AppProviders.jsx
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";

import { NotificationProvider } from "./NotificationContext";

export function AppProviders({ children }) {
  return (
      <ThemeProvider>
            <AuthProvider>
            <NotificationProvider>{children}</NotificationProvider>
            </AuthProvider>
      </ThemeProvider>

  );
}
