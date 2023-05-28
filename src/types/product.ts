import type { Category } from "./categories";

export type Image = {
  url: string;
};

export interface Product {
  id: string;
  category: Category;
  thumbnail: Image;
  name: string;
  price: number;
}

export interface ProductApiRequest {
  categoryId?: string;
}

export interface ProductsApiResponse {
  products: Product[];
}

export type ProductOptionItem = {
  id: string;
  name: string;
};

export interface ProductOption {
  id: string;
  name: string;
  items: ProductOptionItem[];
}

export interface ProductDetail {
  id: string;
  category: Category;
  images: Image[];
  name: string;
  price: number;
  options: ProductOption[];
  description: string;
}

export interface ProductDetailApiRequest {
  productId: string;
}
