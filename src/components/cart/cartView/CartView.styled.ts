import styled from "@emotion/styled";

export const CartView = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const Product = styled.div`
  display: flex;

  & > img {
    width: 100px;
    aspect-ratio: 1/1;
  }
`;

export const ProductInfo = styled.dl`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 4px;
  padding: 4px;

  & > div {
    display: flex;
  }
`;

export const TotalPrice = styled.dl`
  display: flex;
  column-gap: 4px;
  font-size: 2rem;
  font-weight: 600;
`;
