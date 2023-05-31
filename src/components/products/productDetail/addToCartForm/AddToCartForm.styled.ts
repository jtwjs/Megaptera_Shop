import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const AddToCartForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const SelectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 8px;
`;

export const DoneMessage = styled.p`
  font-size: 2rem;
`;

export const Price = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  text-align: right;
`;

export const GuideMsg = styled.p`
  ${({ theme }) => css`
    font-size: 1.4rem;
    color: ${theme.colors.primary};
  `}
`;
