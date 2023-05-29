import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useProductFormStore from "@/hooks/useProductFormStore";
import { useProductDetail } from "@/services/useProduct";

import AddToCartForm from "./addToCartForm/AddToCartForm";
import ProductImages from "./images/ProductImages";
import ProductInfo from "./info/ProductInfo";
import * as S from "./ProductDetail.styled";

export default function ProductDetail() {
  const params = useParams();

  const { clear } = useProductFormStore();

  const {
    data: product,
    isSuccess,
    isError,
  } = useProductDetail(String(params.id));

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  if (isError) {
    return <p>해당 상품을 찾을 수 없습니다.</p>;
  }

  if (!isSuccess) {
    return null;
  }

  return (
    <S.ProductDetail>
      <ProductImages images={product.images} />
      <S.DetailBox>
        <ProductInfo
          category={product.category.name}
          name={product.name}
          description={product.description}
        />
        <AddToCartForm product={product} />
      </S.DetailBox>
    </S.ProductDetail>
  );
}
