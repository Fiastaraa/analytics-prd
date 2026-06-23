import api from "./api";

export function fetchDashboard() {
  return api.get("/analytics/dashboard");
}

export function fetchThreads() {
  return api.get("/analytics/threads");
}

export function fetchActivity() {
  return api.get("/analytics/activity");
}
