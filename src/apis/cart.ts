import type * as type from "@/types/cart";
import type { ApiHandler } from "@/types/common";

import instance from "./axios";

export const addProductToCart: ApiHandler<
  type.AddCartApiRequest,
  void
> = async (req) => {
  instance.post("/cart/line-items", req);
};

export const fetchCartList: ApiHandler<unknown, type.Cart> = async () => {
  const res = await instance.get("/cart");

  return res.data;
};
