import type { AddCartApiRequest } from "@/types/cart";
import type { ApiHandler } from "@/types/common";

import instance from "./axios";

export const addProductToCart: ApiHandler<AddCartApiRequest, void> = async (
  req
) => {
  instance.post("/cart/line-items", req);
};
