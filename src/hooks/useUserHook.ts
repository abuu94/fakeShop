
// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers,getUserById,createUser,updateUser,deleteUser,} from '../services/user-services';
import type { User, UserType } from '../types/UserType';
// import { useUser } from "./useUsers";
import { useUserCarts1,useUserCarts2 } from "./useCartHook";
import { useAuth } from '@/context/AuthContext';

// Fetch all users
export const useUsers = () => {
  return useQuery<UserType>({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });
};

// Fetch a single user by ID
export const useUser = () => {
  const {user} = useAuth();
  return useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => getUserById(user!.id),
    enabled: !!user, // Prevent query if ID is undefined
  });
};
// export const useUser = (id: number) => {
//   return useQuery<User>({
//     queryKey: ['user', id],
//     queryFn: () => getUserById(id),
//     enabled: !!id, // Prevent query if ID is undefined
//   });
// };

// Create a new user
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Update an existing user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, user }: { id: number; user: Partial<Omit<User, 'id'>> }) =>
      updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Delete an user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};


// hakiba haiozi useUserCarts1/useUserCarts1
// Fetch user along with their carts 

export const useUserWithCart = (userId: number) => {
  const userQuery = useUser(userId);
  const cartQuery = useUserCarts1(userId);

  return {
    user: userQuery.data,
    userLoading: userQuery.isLoading,
    userError: userQuery.error,
    carts: cartQuery.data,
    cartLoading: cartQuery.isLoading,
    cartError: cartQuery.error,
  };
};
