
import {get,post,put,del} from '../utils/http';
import type {User,UserType} from '../types/UserType';

export const getAllUsers = async (): Promise<UserType> => {
  const response = await get<UserType>('/users');
  return response;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await get<User>(`/users/${id}`);
  return response;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await post<User>('/users', user);
  return response;
};

export const updateUser = async (
  id: number,
  user: Partial<Omit<User, 'id'>>
): Promise<User> => {
  const response = await put<User>(`/users/${id}`, user);
  return response;
};

export const deleteUser = async (id: number): Promise<User> => {
  const response = await del<User>(`/users/${id}`);
  return response;
};
