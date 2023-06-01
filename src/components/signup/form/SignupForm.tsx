import { useRef, useEffect } from "react";

import { TextInput, Button } from "@/components/common";
import VALID_MSG from "@/constants/validMsg";
import useSignupFormStore from "@/hooks/useSignupFormStore";
import { useSignup } from "@/services/useAuth";

import * as S from "./SignupForm.styled";

export default function SignupForm() {
  const errorId = useRef("signup-error");

  const { mutate: signupMutate } = useSignup();

  const {
    email,
    name,
    password,
    passwordConfirm,
    error,
    setError,
    reset,
    handleChangeEmail,
    handleChangeName,
    handleChangePassword,
    handleChangePasswordConfirm,
  } = useSignupFormStore();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reqData = {
      email,
      name,
      password,
    };

    signupMutate(reqData, {
      onError: (error) => {
        const status = error.response?.status;

        if (status === 400) {
          setError(VALID_MSG.SIGNUP_ALERADY);
        }

        if (status === 422) {
          setError(VALID_MSG.SIGNUP_INVALID);
        }
      },
    });
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const signupDisabled =
    Boolean(error) || !email || !name || !password || !passwordConfirm;

  return (
    <S.SignupForm onSubmit={handleLogin}>
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
          id="name"
          label="Name"
          placeholder="홍길동"
          value={name}
          aria-errormessage={errorId.current}
          onChange={handleChangeName}
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
        <TextInput
          id="password-confirm"
          label="Password Confirm"
          placeholder="password confirm"
          value={passwordConfirm}
          aria-errormessage={errorId.current}
          onChange={handleChangePasswordConfirm}
        />
      </S.LeftContainer>
      <S.RightContainer>
        <Button type="submit" label="회원가입" disabled={signupDisabled} />
        {error && <S.ErrorMsg id={errorId.current}>{error}</S.ErrorMsg>}
      </S.RightContainer>
    </S.SignupForm>
  );
}
