import { Link } from "react-router-dom";

import { useFetchOrders } from "@/services/useOrder";

import Order from "./item/Order";
import * as S from "./OrderList.styled";

export default function OrderList() {
  const { data: orders = [] } = useFetchOrders();

  return (
    <S.OrderList>
      {orders.map((order) => (
        <li key={order.id}>
          <Link to={order.id} aria-label={`${order.title} 상세 페이지 이동`}>
            <Order order={order} />
          </Link>
        </li>
      ))}
    </S.OrderList>
  );
}
