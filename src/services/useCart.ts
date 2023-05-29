import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import * as api from "@/apis/cart";
import type * as type from "@/types/cart";

export const useAddToCart = (
  options?: UseMutationOptions<unknown, AxiosError, type.AddCartApiRequest>
) => {
  return useMutation((req) => api.addProductToCart(req), { ...options });
};
