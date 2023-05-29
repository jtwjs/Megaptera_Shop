import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Quantity = styled.div`
  ${({ theme }) => css`
    display: flex;

    & > input {
      width: 100%;
      border: 1px solid ${theme.colors.secondary};
      font-size: 1.6rem;
      text-align: center;
    }
  `}
`;
