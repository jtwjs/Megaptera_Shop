import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Main = styled.main`
  ${({ theme }) => css`
    ${theme.container}
  `}
`;
