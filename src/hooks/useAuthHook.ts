// hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth-service";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
