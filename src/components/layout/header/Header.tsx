import { NavLink, Link } from "react-router-dom";

import { Button } from "@/components/common";
import PATH from "@/constants/path";
import { useAuth } from "@/libs/AuthProvider";
import { useLogout } from "@/services/useAuth";
import { useCategories } from "@/services/useCategories";

import * as S from "./Header.styled";

export default function Header() {
  const { isLoggedIn } = useAuth();
  const { data: categories = [] } = useCategories();
  const { mutate: logoutMutate } = useLogout();

  const handleLogout = () => {
    logoutMutate();
  };

  return (
    <S.Header>
      <S.Container>
        <h1>Shop</h1>
        <S.Nav>
          <div>
            <NavLink to={PATH.ROOT}>Home</NavLink>
            <NavLink to={PATH.PRODUCTS}>Products</NavLink>
            {isLoggedIn ? (
              <>
                <NavLink to={PATH.CART}>Cart</NavLink>
                <NavLink to={PATH.ORDERS}>Order</NavLink>
                <Button label="Logout" onClick={handleLogout} />
              </>
            ) : (
              <NavLink to={PATH.LOGIN}>Login</NavLink>
            )}
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
