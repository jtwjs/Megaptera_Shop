import { useQuery, UseQueryResult } from "@tanstack/react-query";

import * as api from "@/apis/product";
import * as type from "@/types/product";

export const productKeys = {
  all: ["product"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: type.ProductApiRequest) =>
    [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

export const useProducts = (
  categoryId?: string
): UseQueryResult<type.Product[]> => {
  return useQuery(
    productKeys.list({ categoryId }),
    () => api.fetchProducts({ categoryId }),
    {
      select: (res) => res.products,
    }
  );
};
