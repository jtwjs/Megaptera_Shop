import { Cart } from "@/types/cart";

export const cart: Cart = {
  lineItems: [
    {
      id: "line-item-01",
      product: {
        id: "product-01",
        name: "맨투맨",
        thumbnail: { url: "http://example.com/01.jpg" },
      },
      options: [{ name: "컬러", item: { name: "black" } }],
      unitPrice: 10_000,
      quantity: 1,
      totalPrice: 10_000,
    },
  ],
  totalPrice: 10_000,
};

export const emptyCart: Cart = {
  lineItems: [],
  totalPrice: 0,
};
