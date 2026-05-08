import axios from "axios";
import { env } from "@/env";

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
});

// Response interceptor — unwrap data, forward errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Re-throw so React Query can handle it
    return Promise.reject(error);
  },
);
