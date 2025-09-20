// lib/http.ts
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from "axios";


const instance = axios.create({
  baseURL: 'https://fakestoreapi.com', // 🔁 Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
  // Optional: Add interceptors here for auth, logging, etc.

  // Example interceptor for adding auth token
  // instance.interceptors.request.use(config => {  
  //   const token = getAuthTokenSomehow();
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return config;
  // }, error => {
  //   return Promise.reject(error);
  // });
  
});

// Generic GET
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await instance.get(url, config);
  return response.data;
};

// Generic POST
export const post = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await instance.post(url, data, config);
  return response.data;
};

// Generic PUT
export const put = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await instance.put(url, data, config);
  return response.data;
};

// Generic DELETE
export const del = async <T = void>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await instance.delete(url, config);
  return response.data;
};
