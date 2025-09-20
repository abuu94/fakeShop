// hooks/useCartHooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCarts,
  getCartById,
  getCartsByUserId,
  createCart,
  updateCart,
  deleteCart,
} from "../services/cart-service";
import type { Cart } from "../types/CartType";
import { useAuth } from "@/context/AuthContext";


// 🔒 Fetch all carts for the logged-in user
export const useMyCarts = () => {
  const { user } = useAuth();

  return useQuery<Cart[]>({
    queryKey: ["myCarts", user?.id],
    queryFn: () => getCartsByUserId(user!.id),
    enabled: !!user?.id,
  });
};

// 🔒 Fetch the latest cart for the logged-in user
export const useMyLatestCart = () => {
  const { user } = useAuth();

  return useQuery<Cart>({
    queryKey: ["myLatestCart", user?.id],
    queryFn: async () => {
      const carts = await getCartsByUserId(user!.id);
      return carts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    },
    enabled: !!user?.id,
  });
};

// 🔒 Fetch a single cart by ID (use cautiously)
export const useCartById = (id: number) => {
  return useQuery<Cart>({
    queryKey: ["cart", id],
    queryFn: () => getCartById(id),
    enabled: !!id,
  });
};

// ✅ Create a new cart
export const useCreateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCart,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["myCarts", variables.userId] });
    },
  });
};


// ✅ Update an existing cart
export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      cart,
    }: {
      id: number;
      cart: Partial<Omit<Cart, "id" | "__v">>;
    }) => updateCart(id, cart),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cart", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["myCarts"] });
    },
  });
};


// ✅ Delete a cart
export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCart,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["cart", id] });
      queryClient.invalidateQueries({ queryKey: ["myCarts"] });
    },
  });
};

// Fetch all carts
export const useCarts = () => {
  return useQuery({
    queryKey: ["carts"],
    queryFn: getAllCarts,
  });
};

// // Fetch a single cart by ID
// export const useCart = (id: number) => {
//   return useQuery({
//     queryKey: ["cart", id],
//     queryFn: () => getCartById(id),
//     enabled: !!id,
//   });
// };


// // Fetch all carts for a specific user  Hii nyongeza
export const useUserCarts1 = (userId: number) => {
  return useQuery<Cart[]>({
    queryKey: ["userCarts", userId],
    queryFn: () => getCartsByUserId(userId),
    enabled: !!userId,
  });
};

// // Fetch the latest cart for a specific user hii nyongeza
// export const useLatestUserCart = (userId: number) => {
//   return useQuery<Cart>({
//     queryKey: ["latestUserCart", userId],
//     queryFn: async () => {
//       const carts = await getCartsByUserId(userId);
//       return carts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
//     },
//     enabled: !!userId,
//   });
// };

// // Create a new cart
// export const useCreateCart = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createCart,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["carts"] });
//     },
//   });
// };

// // Update an existing cart
// export const useUpdateCart = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({
//       id,
//       cart,
//     }: {
//       id: number;
//       cart: Partial<Omit<Cart, "id" | "__v">>;
//     }) => updateCart(id, cart),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["carts"] });
//     },
//   });
// };

// // Delete a cart
// export const useDeleteCart = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteCart,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["carts"] });
//     },
//   });
// };


// // Fetch carts for a specific user
export const useUserCarts2 = (userId: number) => {
  return useQuery({
    queryKey: ["userCarts", userId],
    queryFn: async () => {
      const allCarts = await getAllCarts();
      return allCarts.filter((cart) => cart.userId === userId);
    },
    enabled: !!userId, // Prevent query if userId is falsy
  });
};