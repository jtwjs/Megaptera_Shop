import { Order } from "@/types/order";
import { numberFormat } from "@/utils/format";

import * as S from "./Order.styled";

interface OrderProps {
  order: Order;
}

export default function Order({ order }: OrderProps) {
  return (
    <S.Order>
      <div>주문 일시: {order.orderedAt}</div>
      <div>주문 코드: {order.id}</div>
      <div>상품: {order.title}</div>
      <div>결제 금액: {numberFormat(order.totalPrice)}원</div>
    </S.Order>
  );
}
