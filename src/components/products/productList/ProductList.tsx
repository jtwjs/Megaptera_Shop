import { Link, useSearchParams } from "react-router-dom";

import { useFetchProducts } from "@/services/useProduct";

import Product from "./item/Product";
import * as S from "./ProductList.styled";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const { data: products = [] } = useFetchProducts(categoryId ?? "");

  return (
    <S.ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <Link to={product.id}>
            <Product product={product} />
          </Link>
        </li>
      ))}
    </S.ProductList>
  );
}
