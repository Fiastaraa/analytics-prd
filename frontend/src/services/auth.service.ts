import api from "./api";
import { saveToken } from "../utils/storage";

export async function login(email: string, password: string) {
  const response = await api.post("/auth/login", { email, password });
  await saveToken(response.data.token);
  return response.data;
}
