import { NavLink, Link } from "react-router-dom";

import PATH from "@/constants/path";
import { useCategories } from "@/services/useCategories";

import * as S from "./Header.styled";

export default function Header() {
  const { data: categories = [] } = useCategories();

  return (
    <S.Header>
      <S.Container>
        <h1>Shop</h1>
        <S.Nav>
          <div>
            <NavLink to={PATH.PRODUCTS}>Products</NavLink>
            <NavLink to={PATH.CART}>Cart</NavLink>
          </div>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={{
                    pathname: PATH.PRODUCTS,
                    search: `?categoryId=${category.id}`,
                  }}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </S.Nav>
      </S.Container>
    </S.Header>
  );
}
