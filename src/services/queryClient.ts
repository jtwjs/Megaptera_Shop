import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

function queryErrorHandler(error: unknown): void {
  console.error(error);
  const message = axios.isAxiosError(error)
    ? error.response?.data.message
    : "error connecting to server";
  if (typeof window !== undefined) {
    alert(message);
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      cacheTime: 1000 * 60 * 15,
      retry: 0,
      onError: (err) => queryErrorHandler(err),
    },
    mutations: {
      onError: (err) => queryErrorHandler(err),
    },
  },
});

export default queryClient;
