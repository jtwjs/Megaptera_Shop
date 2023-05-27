import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Header = styled.header`
  margin-bottom: 2rem;
  border-bottom: 1px solid gray;

  h1 {
    font-size: 4rem;
  }
`;

export const Container = styled.div`
  ${({ theme }) => css`
    ${theme.container}
  `}
`;

export const Nav = styled.nav`
  ${({ theme }) => css`
    font-size: 2rem;

    & > div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    ul {
      display: flex;
    }

    li {
      margin-right: 2rem;
    }

    .active {
      color: ${theme.colors.primary};
    }
  `}
`;
