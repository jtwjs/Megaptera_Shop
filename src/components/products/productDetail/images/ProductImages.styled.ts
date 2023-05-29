import styled from "@emotion/styled";

export const ProductImages = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 4px;
  width: 100%;

  & > img {
    width: 100%;
    aspect-ratio: 1/1;
  }
`;
