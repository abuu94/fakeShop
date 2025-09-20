// src/pages/Dashboard.tsx
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { useUsers } from "../hooks/useUserHook";
import { useProducts } from "../hooks/useProductHook";
import { useCarts } from "../hooks/useCartHook";
import { SummaryChart } from "./SummaryChart";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { data: users = [] } = useUsers();
  const { data: products = [] } = useProducts();
  const { data: carts = [] } = useCarts();

  const summaryData = [
    ...(user?.id === 1 ? [{ label: "Users", count: users.length }] : []),
    { label: "Products", count: products.length },
    ...(user?.id === 1 ? [{ label: "Carts", count: carts.length }] : []),
  ];

  // const summaryData = [
  //   { label: "Users", count: users.length },
  //   { label: "Products", count: products.length },
  //   { label: "Carts", count: carts.length },
  // ];
  // const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <nav className="flex gap-4 px-6 py-3 bg-gray-100 border-b">
        {user && (
          <>
            <span className="text-gray-700">Welcome, {user.id}</span>
            <Link
              to="/dashboard/products"
              className="text-blue-600 hover:underline"
            >
              Products
            </Link>
            <Link
              to="/dashboard/profile"
              className="text-blue-600 hover:underline"
            >
              My Profile
            </Link>
            <Link
              to="/dashboard/mycarts/"
              className="text-blue-600 hover:underline"
            >
              My Cart{" "}
            </Link>
            {/* <Link to={`/dashboard/mycarts/${user.id}`} className="text-blue-600 hover:underline">My Cart (by ID)</Link>
          <Link to={`/dashboard/profile/${user.id}`} className="text-blue-600 hover:underline">My New Profile</Link> */}
          </>
        )}

        {user?.id === 1 && (
          <>
            <span className="text-gray-700"> (Admin Access)</span>
            <Link
              to="/dashboard/users"
              className="text-blue-600 hover:underline"
            >
              All Users
            </Link>
            <Link
              to="/dashboard/carts"
              className="text-blue-600 hover:underline"
            >
              All Carts
            </Link>
          </>
        )}

        {/* {user?.id !== 1 && (
          <>
          <span className="text-gray-700"> (Standard Admin User)</span>
        <Link to="/dashboard/users" className="text-blue-600 hover:underline">
         All Users
        </Link>
       
        <Link to="/dashboard/carts" className="text-blue-600 hover:underline">
        All  Carts
        </Link>
          
          </>
          
        )} */}

        {/* <Link
          to={`/dashboard/mycarts/${user?.id ?? ""}`}
          className="text-blue-600 hover:underline"
        >
          My Cart
        </Link> */}
      </nav>

      <main className="p-6">
        <SummaryChart data={summaryData} />
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
