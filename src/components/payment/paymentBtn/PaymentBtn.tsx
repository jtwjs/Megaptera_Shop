import { Button } from "@/components/common";
import usePayment from "@/hooks/usePayment";
import { Cart } from "@/types/cart";

import * as S from "./PaymentBtn.styled";

interface PaymentBtnProps {
  cart: Cart;
}

export default function PaymentBtn({ cart }: PaymentBtnProps) {
  const { isValid, error, handlePayment } = usePayment(cart);

  return (
    <S.PaymentBtn>
      <Button label="결제" disabled={!isValid()} onClick={handlePayment} />
      {error && <p>{error}</p>}
    </S.PaymentBtn>
  );
}
