export type CartItemOption = {
  id: string;
  itemId: string;
};

export interface AddCartApiRequest {
  productId: string;
  options: CartItemOption[];
  quantity: number;
}
