import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "product-01",
    category: {
      id: "category-01",
      name: "Top",
    },
    thumbnail: { url: "http://example.com/01.jpg" },
    name: "Product #1",
    price: 128_000,
  },
  {
    id: "product-02",
    category: {
      id: "category-02",
      name: "Color",
    },
    thumbnail: { url: "http://example.com/01.jpg" },
    name: "Product #2",
    price: 135_000,
  },
];
