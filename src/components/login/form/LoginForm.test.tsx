import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route } from "react-router-dom";

import VALID_MSG from "@/constants/validMsg";
import { withAllContexts, withRouter } from "@/tests/utils";

import LoginForm from "./LoginForm";

const context = describe;

describe("LoginForm", () => {
  function renderLoginForm() {
    return render(
      withAllContexts(withRouter(<Route path="/" element={<LoginForm />} />))
    );
  }

  it("render correctly", () => {
    renderLoginForm();

    expect(screen.getByRole("textbox", { name: "E-mail" })).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "로그인" }));
  });

  context("when email value is invalid", () => {
    it(`display error message "${VALID_MSG.EMAIL}"`, async () => {
      renderLoginForm();

      const emailInput = screen.getByRole("textbox", { name: "E-mail" });
      await userEvent.type(emailInput, "xxxxxxx");

      expect(emailInput).toHaveValue("xxxxxxx");
      expect(screen.getByText(VALID_MSG.EMAIL)).toBeInTheDocument();
    });

    it("submit button is disabled", async () => {
      renderLoginForm();

      const emailInput = screen.getByRole("textbox", { name: "E-mail" });
      await userEvent.type(emailInput, "xxxxxxx");

      expect(screen.getByRole("button", { name: "로그인" })).toBeDisabled();
    });
  });

  context("when password value is invalid", () => {
    it(`display error message "${VALID_MSG.PASSWORD}"`, async () => {
      renderLoginForm();

      const passwordInput = screen.getByLabelText("Password");
      await userEvent.type(passwordInput, "123123");

      expect(passwordInput).toHaveValue("123123");
      expect(screen.getByText(VALID_MSG.PASSWORD)).toBeInTheDocument();
    });

    it("submit button is disabled", async () => {
      renderLoginForm();

      const passwordInput = screen.getByLabelText("Password");
      await userEvent.type(passwordInput, "123123");

      expect(screen.getByRole("button", { name: "로그인" })).toBeDisabled();
    });
  });

  context("when the form is empty", () => {
    it("submit button is disabled", async () => {
      renderLoginForm();

      expect(screen.getByRole("button", { name: "로그인" })).toBeDisabled();
    });
  });
});
