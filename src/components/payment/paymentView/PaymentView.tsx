import { LineItemTable } from "@/components/common";
import { useFetchCartList } from "@/services/useCart";
import { numberFormat } from "@/utils/format";

import PaymentForm from "../form/PaymentForm";
import PaymentBtn from "../paymentBtn/PaymentBtn";

import * as S from "./PaymentView.styled";

export default function PaymentView() {
  const { data } = useFetchCartList();

  if (!data) {
    return null;
  }

  return (
    <S.PaymentView>
      <LineItemTable caption="결제 목록" lineItems={data.lineItems} />
      <S.TotalPrice>
        <dt>합계:</dt>
        <dd>{numberFormat(data.totalPrice)}원</dd>
      </S.TotalPrice>
      <PaymentForm />
      <PaymentBtn cart={data} />
    </S.PaymentView>
  );
}
