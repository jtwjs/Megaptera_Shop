import { LineItemTable } from "@/components/common";
import { useFetchCartList } from "@/services/useCart";
import { numberFormat } from "@/utils/format";

import * as S from "./CartView.styled";

export default function CartView() {
  const { data } = useFetchCartList();

  if (!data) {
    return null;
  }

  if (!data?.lineItems.length) {
    return <p>장바구니가 비었습니다</p>;
  }

  return (
    <S.CartView>
      <LineItemTable caption="장바구니" lineItems={data.lineItems} />
      <S.TotalPrice>
        <dt>합계:</dt>
        <dd>{numberFormat(data.totalPrice)}원</dd>
      </S.TotalPrice>
    </S.CartView>
  );
}
