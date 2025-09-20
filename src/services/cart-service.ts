// services/cart-services.ts
import { get, post, put, del } from "../utils/http";
import type { Cart, CartType } from "../types/CartType";

// Fetch all carts
export const getAllCarts = async (): Promise<CartType> => {
  const response = await get<CartType>("/carts");
  return response;
};

// Fetch a single cart by ID
export const getCartById = async (id: number): Promise<Cart> => {
  const response = await get<Cart>(`/carts/${id}`);
  return response;
};

// ✅ Fetch carts for a specific user hii nyongeza
export const getCartsByUserId = async (userId: number): Promise<Cart[]> => {
  const response = await get<Cart[]>(`/carts/user/${userId}`);
  return response;
};

// Create a new cart
export const createCart = async (
  cart: Omit<Cart, "id" | "__v">
): Promise<Cart> => {
  const response = await post<Cart>("/carts", cart);
  return response;
};

// Update an existing cart
export const updateCart = async (
  id: number,
  cart: Partial<Omit<Cart, "id" | "__v">>
): Promise<Cart> => {
  const response = await put<Cart>(`/carts/${id}`, cart);
  return response;
};

// Delete a cart
export const deleteCart = async (id: number): Promise<Cart> => {
  const response = await del<Cart>(`/carts/${id}`);
  return response;
};
