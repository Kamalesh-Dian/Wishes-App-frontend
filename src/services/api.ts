import axios from "axios";
import { auth } from "../services/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Check if demo user is active in auth storage
    try {
      const stored = localStorage.getItem("auth-storage");
      if (stored) {
        const parsed = JSON.parse(stored);
        const demoToken = parsed.state?.user?.demoToken;
        if (demoToken) {
          config.headers.Authorization = `Bearer ${demoToken}`;
        }
      }
    } catch {
      // ignore
    }
  }

  return config;
});

export default api;
