// services/auth-service.ts
import { post } from "../utils/http";

type LoginPayload = {
  username: string;
  password: string;
};

type LoginResponse = {
  user: any;
  token: string;
};

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await post<LoginResponse>("https://fakestoreapi.com/auth/login", payload);
  return response;
};
