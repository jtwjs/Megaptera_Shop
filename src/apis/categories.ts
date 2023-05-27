import type { CategoryApiResponse } from "@/types/categories";

import instance from "./axios";

export const fetchCategories = async (): Promise<CategoryApiResponse> => {
  const res = await instance.get("/categories");
  return res.data;
};
