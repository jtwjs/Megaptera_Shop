import {
  useQueryClient,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

import * as api from "@/apis/cart";
import type * as type from "@/types/cart";

const cartKey = ["cart"];

export const useAddToCart = (
  options?: UseMutationOptions<unknown, AxiosError, type.AddCartApiRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation((req) => api.addProductToCart(req), {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(cartKey);
    },
  });
};

export const useFetchCartList = (): UseQueryResult<type.Cart> => {
  return useQuery(cartKey, api.fetchCartList);
};
