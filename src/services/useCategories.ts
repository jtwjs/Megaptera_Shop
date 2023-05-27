import { useQuery, UseQueryResult } from "@tanstack/react-query";

import * as api from "@/apis/categories";
import * as type from "@/types/categories";

export const useCategories = (): UseQueryResult<type.Category[]> => {
  return useQuery(["categories"], () => api.fetchCategories(), {
    select: (res) => res.categories,
  });
};
