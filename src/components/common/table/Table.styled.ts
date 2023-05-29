import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Table = styled.table`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.secondary};
    background-color: ${theme.colors.secondary};

    & > thead,
    & > tbody {
      background-color: white;
      th,
      td {
        vertical-align: middle;
        text-align: center;
        font-size: 1.6rem;
      }
    }

    & > thead {
      height: 30px;
      font-size: 1.6rem;
    }
  `}
`;
