import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Button = styled.button`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    border: 1px solid ${theme.colors.primary};
    padding: 0 4px;
    font-size: 2rem;
    color: ${theme.colors.primary};
    cursor: pointer;

    &:disabled {
      color: white;
      border-color: ${theme.colors.secondary};
      background-color: ${theme.colors.secondary};
    }
  `}
`;
