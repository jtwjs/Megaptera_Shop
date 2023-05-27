import { Outlet } from "react-router-dom";

import { Header } from "./header";
import * as S from "./Layout.styled";

export default function Layout() {
  return (
    <>
      <Header />
      <S.Main>
        <Outlet />
      </S.Main>
    </>
  );
}
