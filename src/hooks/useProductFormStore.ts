import { container } from "tsyringe";

import { ProductFormStore } from "@/stores";

import useObjectStore from "./useObjectStore";

export default function useProductFormStore() {
  const store = container.resolve(ProductFormStore);

  return useObjectStore(store);
}
