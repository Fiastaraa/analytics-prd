import api from "./api";

export function fetchProfile() {
  return api.get("/profile/me");
}
