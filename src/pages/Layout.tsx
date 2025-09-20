import { Outlet, Link } from "react-router-dom";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-300 shadow-sm px-6 py-2">
        <Menubar>
          {/* <MenubarMenu>
            <MenubarTrigger asChild>
              <Link to="/">Users</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Link to="/products">Products</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Link to="/carts">Carts</Link>
            </MenubarTrigger>
          </MenubarMenu> */}
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Link to="/login">Login</Link>
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 py-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-blue-300 text-center py-4">
        <p className="text-gray-700">
          &copy; {new Date().getFullYear()} ReactJS Course. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
