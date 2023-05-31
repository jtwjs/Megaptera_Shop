import styled from "@emotion/styled";

export const LoginForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  margin-bottom: 8px;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const ErrorMsg = styled.p`
  font-size: 1.4rem;
  color: red;
`;
