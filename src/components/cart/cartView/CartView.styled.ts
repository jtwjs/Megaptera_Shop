import styled from "@emotion/styled";

export const CartView = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  & > a {
    font-size: 2rem;
  }
`;

export const TotalPrice = styled.dl`
  display: flex;
  column-gap: 4px;
  font-size: 2rem;
  font-weight: 600;
`;
