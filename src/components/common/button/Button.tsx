import { HTMLAttributes } from "react";

import * as S from "./Button.styled";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit";
  label: string;
  disabled?: boolean;
}

export default function Button({
  type = "button",
  label,
  disabled = false,
  ...other
}: ButtonProps) {
  return (
    <S.Button type={type} disabled={disabled} {...other}>
      {label}
    </S.Button>
  );
}
