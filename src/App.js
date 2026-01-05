import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import { AppProviders } from "./contexts/AppProviders";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard";
import RedirectIfAuth from "./auth/RedirectIfAuth";

function App() {
  return (
    <div className="App">
      <AppProviders>
        <Routes>
          {/* Login route: if already logged in, redirect to /dashboard */}
          <Route
            path="/"
            element={
              <RedirectIfAuth>
                <Login />
              </RedirectIfAuth>
            }
          />

          {/* Protected dashboard route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Default route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProviders>
    </div>
  );
}

export default App;
