import { useRef } from "react";

import { TextInput, Button } from "@/components/common";
import VALID_MSG from "@/constants/validMsg";
import useLoginFormStore from "@/hooks/useLoginFormStore";
import { useLogin } from "@/services/useAuth";

import * as S from "./LoginForm.styled";

export default function LoginForm() {
  const errorId = useRef("login-error");

  const { mutate: loginMutate } = useLogin();

  const {
    email,
    password,
    error,
    setError,
    handleChangeEmail,
    handleChangePassword,
  } = useLoginFormStore();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reqData = {
      email,
      password,
    };

    loginMutate(reqData, { onError: () => setError(VALID_MSG.LOGIN) });
  };

  const loginDisabled = Boolean(error) || !email || !password;

  return (
    <S.LoginForm onSubmit={handleLogin}>
      <S.LeftContainer>
        <TextInput
          id="email"
          label="E-mail"
          placeholder="tester@example.com"
          value={email}
          aria-errormessage={errorId.current}
          onChange={handleChangeEmail}
        />
        <TextInput
          type="password"
          id="password"
          label="Password"
          placeholder="password"
          value={password}
          aria-errormessage={errorId.current}
          onChange={handleChangePassword}
        />
      </S.LeftContainer>
      <S.RightContainer>
        <Button type="submit" label="로그인" disabled={loginDisabled} />
        {error && <S.ErrorMsg id={errorId.current}>{error}</S.ErrorMsg>}
      </S.RightContainer>
    </S.LoginForm>
  );
}
