import api from './axios';

export type LoginRequest = {
  email: string;
  password: string;
};

export type UserType = {
  id: string;
  email: string;
  username: string;
  full_name: string;
  photo_profile: string | null;
  bio: string | null;
};

export type LoginResponse = {
  success: boolean;
  token: string;
  user: UserType;
};

export async function login(request: LoginRequest) {
  const response = await api.post<LoginResponse>('/auth/login', request);
  return response.data;
}
