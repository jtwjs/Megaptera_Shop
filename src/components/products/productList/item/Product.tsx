import { Product } from "@/types/product";

import * as S from "./Product.styled";

interface ProductProps {
  product: Product;
}

export default function Product({ product }: ProductProps) {
  return (
    <S.Product>
      <S.Thumbnail src={product.thumbnail.url} alt="" />
      <S.InfoWrapper>
        <div>
          <dt>상품명</dt>
          <dd>{product.name}</dd>
        </div>
        <div>
          <dt>가격</dt>
          <dd>{product.price}</dd>
        </div>
      </S.InfoWrapper>
    </S.Product>
  );
}
