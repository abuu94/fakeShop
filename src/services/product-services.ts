
import {get,post,put,del} from '../utils/http';
import type {Product,ProductType} from '../types/ProductType';

export const getAllProducts = async (): Promise<ProductType> => {
  const response = await get<ProductType>('/products');
  return response;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await get<Product>(`/products/${id}`);
  return response;
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await post<Product>('/products', product);
  return response;
};

export const updateProduct = async (
  id: number,
  product: Partial<Omit<Product, 'id'>>
): Promise<Product> => {
  const response = await put<Product>(`/products/${id}`, product);
  return response;
};

export const deleteProduct = async (id: number): Promise<Product> => {
  const response = await del<Product>(`/products/${id}`);
  return response;
};
