import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

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

export const useFetchProducts = (
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

export const useFetchProductDetail = (
  productId: string
): UseQueryResult<type.ProductDetail> => {
  const navigate = useNavigate();

  return useQuery(
    productKeys.detail(productId),
    () => api.fetchProductDetail({ productId }),
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
