import { render, screen } from "@testing-library/react";
import { Route } from "react-router-dom";

import { withAllContexts, withRouter } from "@/tests/utils";

import PaymentForm from "./PaymentForm";

describe("PaymentForm", () => {
  it("render correctly", () => {
    render(
      withAllContexts(withRouter(<Route path="/" element={<PaymentForm />} />))
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "받는 사람" })
    ).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: "이름" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "우편번호" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "우편번호 검색" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "주소" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "상세 주소" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "전화번호" })
    ).toBeInTheDocument();
  });
});
