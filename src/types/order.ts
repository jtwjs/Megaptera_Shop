import type { LineItem } from "./cart";

export type OrderStatus = "paid" | "";

export interface Order {
  id: string;
  title: string;
  totalPrice: number;
  status: OrderStatus;
  orderedAt: string;
}

export interface OrdersApiResponse {
  orders: Order[];
}

export interface OrderDetailApiRequest {
  orderId: string;
}

export interface OrderDetailApiResponse {
  id: string;
  title: string;
  lineItems: LineItem[];
  totalPrice: number;
  status: OrderStatus;
  orderedAt: string;
}

export interface Receiver {
  name: string;
  address1: string;
  address2: string;
  postalCode: string;
  phoneNumber: string;
}

export interface Payment {
  merchantId: string;
  transactionId: string;
}

export interface CreateOrderApiRequest {
  receiver: Receiver;
  payment: Payment;
}
