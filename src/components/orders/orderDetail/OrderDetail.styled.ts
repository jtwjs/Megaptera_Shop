import styled from "@emotion/styled";

export const OrderDetail = styled.div`
  dl > div {
    display: flex;
    flex-wrap: wrap;
    line-height: 1.7;
  }

  dt {
    width: 8rem;
  }

  dd {
    width: calc(100% - 8rem);
  }
`;
