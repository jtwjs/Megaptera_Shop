import type { ApiHandler } from "@/types/common";
import type * as type from "@/types/order";

import instance from "./axios";

export const fetchOrders: ApiHandler<
  unknown,
  type.OrdersApiResponse
> = async () => {
  const res = await instance.get("/orders");

  return res.data;
};

export const fetchOrderDetail: ApiHandler<
  type.OrderDetailApiRequest,
  type.OrderDetailApiResponse
> = async (req) => {
  const res = await instance.get(`/orders/${req?.orderId}`);

  return res.data;
};
