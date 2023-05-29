import * as S from "./ProductInfo.styled";

interface ProductInfoProps {
  category: string;
  name: string;
  description: string;
}

export default function ProductInfo({
  category,
  name,
  description,
}: ProductInfoProps) {
  return (
    <S.ProductInfo>
      <S.Category>
        <dt>Category: </dt>
        <dd>{category}</dd>
      </S.Category>
      <S.Title>{name}</S.Title>
      <S.Desc>{description}</S.Desc>
    </S.ProductInfo>
  );
}
