import type { ApiHandler } from "@/types/common";
import type { ProductApiRequest, ProductsApiResponse } from "@/types/product";

import instance from "./axios";

export const fetchProducts: ApiHandler<
  ProductApiRequest,
  ProductsApiResponse
> = async (req) => {
  const params = {
    categoryId: req?.categoryId,
  };
  const res = await instance.get("/products", { params });

  return res.data;
};
