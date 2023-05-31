import { useRef, HTMLAttributes } from "react";

import * as S from "./TextInput.styled";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  type?: "text" | "password";
  id: string;
  label?: string;
  placeholder: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type = "text",
  id,
  label,
  placeholder,
  error,
  value,
  onChange,
  ...other
}: InputProps) {
  const inputId = useRef(`input-${id}`);
  return (
    <S.TextInput>
      {label && <S.Label htmlFor={inputId.current}>{label}</S.Label>}
      <input
        type={type}
        id={inputId.current}
        aria-invalid={error ? "true" : "false"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...other}
      />
    </S.TextInput>
  );
}
