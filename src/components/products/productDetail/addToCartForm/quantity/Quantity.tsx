import { Button } from "@/components/common";
import useProductFormStore from "@/hooks/useProductFormStore";

import * as S from "./Quantity.styled";

export default function Quantity() {
  const { quantity, changeQuantity } = useProductFormStore();

  const handleDecreaseQuantity = () => {
    // changeQuantity(quantity - 1);
    changeQuantity(quantity - 1);
  };

  const handleIncreaseQuantity = () => {
    changeQuantity(quantity + 1);
  };

  return (
    <S.Quantity>
      <Button
        label="-"
        aria-label="decrease"
        onClick={handleDecreaseQuantity}
      />
      <input readOnly value={quantity} />
      <Button
        label="+"
        aria-label="increase"
        onClick={handleIncreaseQuantity}
      />
    </S.Quantity>
  );
}
