import { Order, OrderDetailApiResponse } from "@/types/order";

export const orders: Order[] = [
  {
    id: "0BV000ODR0001",
    title: "Product #1 외 1",
    status: "paid",
    totalPrice: 653_000,
    orderedAt: "2023-01-01 00:00:00",
  },
  {
    id: "0BV000ODR0002",
    title: "Product #2",
    status: "paid",
    totalPrice: 135_000,
    orderedAt: "2023-01-01 00:00:00",
  },
];

export const orderDetails: OrderDetailApiResponse[] = orders.map((order) => ({
  ...order,
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
}));
