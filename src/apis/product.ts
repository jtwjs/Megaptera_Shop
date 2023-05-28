import type { ApiHandler } from "@/types/common";
import type * as type from "@/types/product";

import instance from "./axios";

export const fetchProducts: ApiHandler<
  type.ProductApiRequest,
  type.ProductsApiResponse
> = async (req) => {
  const params = {
    categoryId: req?.categoryId,
  };
  const res = await instance.get("/products", { params });

  return res.data;
};

export const fetchProductDetail: ApiHandler<
  type.ProductDetailApiRequest,
  type.ProductDetail
> = async (req) => {
  const res = await instance.get(`/products/${req?.productId}`);

  return res.data;
};
