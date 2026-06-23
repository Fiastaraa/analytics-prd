import { useEffect } from "react";
import api from "../services/api";
import { getToken } from "../utils/storage";

export default function useAuthInterceptor() {
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, []);
}
