import type { CategoriesApiResponse } from "@/types/categories";
import type { ApiHandler } from "@/types/common";

import instance from "./axios";

export const fetchCategories: ApiHandler<
  unknown,
  CategoriesApiResponse
> = async () => {
  const res = await instance.get("/categories");
  return res.data;
};
