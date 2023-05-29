import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Selector = styled.div`
  position: relative;
  min-width: 100%;
`;

export const TriggerBtn = styled.button`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    border: 1px solid ${theme.colors.secondary};
    background-color: white;
  `}
`;

export const ListBox = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: calc(100% + 4px);
    width: 100%;
    max-height: 224px;
    border: 1px solid ${theme.colors.secondary};
    overflow: auto;
    z-index: 10;
  `}
`;

export const Option = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 44px;
    padding: 0 8px;
    background-color: white;

    @media (hover: hover) {
      &:hover {
        color: white;
        background-color: ${theme.colors.primary};
      }
    }
  `}
`;
