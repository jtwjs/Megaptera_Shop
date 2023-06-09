import {
  useQuery,
  UseQueryResult,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import * as api from "@/apis/order";
import PATH from "@/constants/path";
import * as type from "@/types/order";

import { cartKey } from "./useCart";

export const orderKeys = {
  all: ["order"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
};

export const useFetchOrders = (): UseQueryResult<type.Order[]> => {
  return useQuery(orderKeys.all, api.fetchOrders, {
    select: (res) => res.orders,
  });
};

export const useFetchOrderDetail = (
  orderId: string
): UseQueryResult<type.OrderDetailApiResponse> => {
  const navigate = useNavigate();

  return useQuery(
    orderKeys.detail(orderId),
    () => api.fetchOrderDetail({ orderId }),
    {
      onError: (error: AxiosError) => {
        const status = error.response?.status;
        if (status === 500) {
          alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          navigate(-1);
        }
      },
    }
  );
};

export const useCreateOrder = (
  options?: UseMutationOptions<unknown, AxiosError, type.CreateOrderApiRequest>
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation((req) => api.createOrder(req), {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(cartKey);
      queryClient.invalidateQueries(orderKeys.all);
      navigate(PATH.PAYMENT_COMPLETE, { state: { completeFlag: true } });
    },
  });
};
