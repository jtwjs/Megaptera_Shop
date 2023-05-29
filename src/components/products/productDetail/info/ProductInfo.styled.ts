import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const Category = styled.dl`
  display: flex;
  align-self: flex-end;
  font-size: 1.6rem;
  font-weight: 500;
`;

export const Title = styled.h2`
  font-size: 2rem;
`;

export const Desc = styled.p`
  font-size: 1.4rem;
  white-space: pre-wrap;
`;

export const Price = styled.span`
  ${({ theme }) => css`
    font-size: 3.2rem;
    font-weight: 500;
    color: ${theme.colors.primary};
  `}
`;
