import styled from "@emotion/styled";

export const Product = styled.article`
  border-radius: 8px;
  padding: 12px;
  overflow: hidden;
`;

export const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
`;

export const InfoWrapper = styled.dl`
  padding: 6px;
  font-size: 1.4rem;

  & > div {
    display: flex;
    justify-content: space-between;

    &:not(:last-of-type) {
      margin-bottom: 4px;
    }

    & > dd {
      font-weight: 700;
    }
  }
`;
