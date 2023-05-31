import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const TextInput = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    & > input {
      width: 20rem;
      border: 1px solid ${theme.colors.secondary};
      border-radius: 4px;
      padding: 0.4rem;
      background-color: white;
      font-size: 1.6rem;
    }
  `}
`;

export const Label = styled.label`
  width: 10rem;
  margin-right: 8px;
  font-size: 2rem;
  font-weight: 600;
`;
