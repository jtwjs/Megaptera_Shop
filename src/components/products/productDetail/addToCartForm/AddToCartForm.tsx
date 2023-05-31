import { Selector, Button } from "@/components/common";
import useProductFormStore from "@/hooks/useProductFormStore";
import { useAuth } from "@/libs/AuthProvider";
import { useAddToCart } from "@/services/useCart";
import { ProductDetail } from "@/types/product";
import { numberFormat } from "@/utils/format";

import * as S from "./AddToCartForm.styled";
import Quantity from "./quantity/Quantity";

interface AddToCartFormProps {
  product: ProductDetail;
}

export default function AddToCartForm({ product }: AddToCartFormProps) {
  const {
    selectedOptionItems,
    quantity,
    totalPrice,
    getSelectedOptionItem,
    changeOptionItem,
    clear,
  } = useProductFormStore();

  const { isLoggedIn } = useAuth();

  const { mutate: addToCartMutate, isSuccess } = useAddToCart({
    onSuccess: () => clear(),
  });

  const handleSelectOption = (id: string) => (itemId: string) => {
    changeOptionItem({ id, itemId });
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedOptionItems.length !== product.options.length) {
      alert("옵션을 선택해주세요");
      return;
    }
    const reqData = {
      productId: product.id,
      options: selectedOptionItems,
      quantity,
    };
    addToCartMutate(reqData);
  };

  return (
    <S.AddToCartForm onSubmit={handleAddToCart}>
      <S.SelectContainer>
        {product.options.map((option) => (
          <Selector
            key={option.id}
            id={option.id}
            label={option.name}
            placeholder={option.name}
            options={option.items}
            selectedOption={getSelectedOptionItem(option)}
            onValueChange={handleSelectOption(option.id)}
          />
        ))}
      </S.SelectContainer>
      <Quantity />
      <S.Price>{numberFormat(totalPrice(product.price))}원</S.Price>
      {isSuccess ? (
        <S.DoneMessage>장바구니에 담았습니다</S.DoneMessage>
      ) : isLoggedIn ? (
        <Button type="submit" label="장바구니 담기" />
      ) : (
        <S.GuideMsg>주문하려면 로그인하세요</S.GuideMsg>
      )}
    </S.AddToCartForm>
  );
}
