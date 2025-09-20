import { createContext, useContext, useState, useEffect } from "react";
import { getUserById } from "../services/user-services";
import { getCartsByUserId } from "../services/cart-service";
import type { User } from "../types/UserType";
import type { Cart } from "../types/CartType";

type AuthContextType = {
  token: string | null;
  user: User | null;
  cart: Cart | null;
  login: (token: string, userId: number) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);

  const login = async (token: string, userId: number) => {
    // localStorage.setItem("token", token);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId.toString());

    setToken(token);

    try {
      const userData = await getUserById(userId);
      setUser(userData);

      const userCarts = await getCartsByUserId(userId);
      const latestCart = userCarts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];
      setCart(latestCart);
    } catch (error) {
      console.error("Login failed to fetch user or cart:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setCart(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      login(storedToken, Number(storedUserId));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, cart, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};


// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,

// } from "react";
// import type { ReactNode } from "react";
// import { getUserById } from "../services/user-services";
// import { getCartsByUserId } from "../services/cart-service";
// import type { User } from "../types/UserType";
// import type { Cart } from "../types/CartType";

// type AuthContextType = {
//   token: string | null;
//   user: User | null;
//   cart: Cart | null;
//   isLoading: boolean;
//   login: (token: string, userId: number) => Promise<void>;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [token, setToken] = useState<string | null>(null);
//   const [user, setUser] = useState<User | null>(null);
//   const [cart, setCart] = useState<Cart | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const login = async (token: string, userId: number) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("userId", userId.toString());
//     setToken(token);
//     setIsLoading(true);

//     try {
//       const userData = await getUserById(userId);
//       setUser(userData);

//       const userCarts = await getCartsByUserId(userId);
//       const latestCart = userCarts.sort(
//         (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//       )[0];
//       setCart(latestCart);
//     } catch (error) {
//       console.error("Login failed to fetch user or cart:", error);
//       logout(); // fallback to clean state
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     setToken(null);
//     setUser(null);
//     setCart(null);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUserId = localStorage.getItem("userId");

//     if (storedToken && storedUserId) {
//       login(storedToken, Number(storedUserId));
//     } else {
//       setIsLoading(false); // no session to restore
//     }
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{ token, user, cart, isLoading, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
