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


// };
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
              <Route path="/dashboard/users" element={<UserPage />} />
              <Route path="/dashboard/products" element={<ProductPage />} />
              <Route path="/dashboard/carts" element={<CartsPage />} />
              <Route path="/dashboard/profile" element={<ProfilePage />} />
              {/* <Route path="/dashboard/mycarts/:id" element={<MyCartPage />} /> */}
              <Route path="/dashboard/mycarts/" element={<MyCartPage />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
