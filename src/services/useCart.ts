import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

import * as api from "@/apis/cart";
import type * as type from "@/types/cart";

export const useAddToCart = (
  options?: UseMutationOptions<unknown, AxiosError, type.AddCartApiRequest>
) => {
  return useMutation((req) => api.addProductToCart(req), { ...options });
};

export const useFetchCartList = (): UseQueryResult<type.Cart> => {
  return useQuery(["cart"], api.fetchCartList);
};
