import { useParams } from "react-router-dom";

import { LineItemTable } from "@/components/common";
import { useFetchOrderDetail } from "@/services/useOrder";
import { numberFormat } from "@/utils/format";

import * as S from "./OrderDetail.styled";

export default function OrderDetail() {
  const params = useParams();

  const {
    data: order,
    isSuccess,
    isError,
  } = useFetchOrderDetail(String(params.id));

  if (isError) {
    return <p>해당 주문을 찾을 수 없습니다.</p>;
  }

  if (!isSuccess) {
    return null;
  }

  return (
    <S.OrderDetail>
      <dl>
        <div>
          <dt>주문 일시</dt>
          <dd>{order.orderedAt}</dd>
        </div>
        <div>
          <dt>주문 코드</dt>
          <dd>{order.id}</dd>
        </div>
        <div>
          <dt>총 합계</dt>
          <dd>{numberFormat(order.totalPrice)}원</dd>
        </div>
      </dl>
      <LineItemTable caption="주문" lineItems={order.lineItems} />
    </S.OrderDetail>
  );
}
