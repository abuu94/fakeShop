// src/App.tsx
import React from "react";
import type { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import NoPage from "./pages/NoPage";

import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/ProductPage";
import UserPage from "./pages/UserPage";
import CartsPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import MyCartPage from "./pages/MyCartPAge";
const queryClient = new QueryClient();

const UserOnlyRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth();

  // Example: only allow user with ID 1 (admin) to access
  if (user?.id !== 1) {
    return <Navigate to="/dashboard/products" replace />;
  }

  return children;
};

const ProtectedRoute = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const { token } = useAuth(); // ✅ Ensure this returns a valid token
  return token ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard/products" element={<ProductPage />} />
              <Route path="/dashboard/profile" element={<ProfilePage />} />
              <Route path="/dashboard/mycarts/" element={<MyCartPage />} />
              <Route
                path="users"
                element={
                  <UserOnlyRoute>
                    <UserPage />
                  </UserOnlyRoute>
                }
              />
              <Route
                path="carts"
                element={
                  <UserOnlyRoute>
                    <CartsPage />
                  </UserOnlyRoute>
                }
              />
              <Route path="*" element={<NoPage />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
