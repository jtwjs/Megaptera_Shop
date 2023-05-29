import { HTMLAttributes } from "react";

import * as S from "./Button.styled";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit";
  label: string;
}

export default function Button({
  type = "button",
  label,
  ...other
}: ButtonProps) {
  return (
    <S.Button type={type} {...other}>
      {label}
    </S.Button>
  );
}
