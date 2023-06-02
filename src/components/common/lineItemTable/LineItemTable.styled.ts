import styled from "@emotion/styled";

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
