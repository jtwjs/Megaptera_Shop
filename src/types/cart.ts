import type { Product } from "./product";

export type CartItemOption = {
  id: string;
  itemId: string;
};

export interface AddCartApiRequest {
  productId: string;
  options: CartItemOption[];
  quantity: number;
}

export type OrderOptionItem = {
  name: string;
};

export type OrderOption = {
  name: string;
  item: OrderOptionItem;
};

export interface CartItem {
  id: string;
  product: Omit<Product, "category" | "price">;
  options: OrderOption[];
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  lineItems: CartItem[];
  totalPrice: number;
}
