import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route } from "react-router-dom";

import VALID_MSG from "@/constants/validMsg";
import { withAllContexts, withRouter } from "@/tests/utils";

import SignupForm from "./SignupForm";

const context = describe;

describe("SignupForm", () => {
  function renderSignupForm() {
    return render(
      withAllContexts(withRouter(<Route path="/" element={<SignupForm />} />))
    );
  }

  it("render correctly", () => {
    renderSignupForm();

    expect(screen.getByRole("textbox", { name: "E-mail" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Password Confirm")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "회원가입" }));
  });

  context("when email value is invalid", () => {
    it(`display error message "${VALID_MSG.EMAIL}"`, async () => {
      renderSignupForm();

      const emailInput = screen.getByRole("textbox", { name: "E-mail" });
      await userEvent.type(emailInput, "xxxxxxx");

      expect(emailInput).toHaveValue("xxxxxxx");
      expect(screen.getByText(VALID_MSG.EMAIL)).toBeInTheDocument();
    });

    it("submit button is disabled", async () => {
      renderSignupForm();

      const emailInput = screen.getByRole("textbox", { name: "E-mail" });
      await userEvent.type(emailInput, "xxxxxxx");

      expect(screen.getByRole("button", { name: "회원가입" })).toBeDisabled();
    });
  });

  context("when name value is invalid", () => {
    it(`display error message "${VALID_MSG.NAME}"`, async () => {
      renderSignupForm();

      const nameInput = screen.getByRole("textbox", { name: "Name" });
      await userEvent.type(nameInput, "xxxxxxx");

      expect(nameInput).toHaveValue("xxxxxxx");
      expect(screen.getByText(VALID_MSG.NAME)).toBeInTheDocument();
    });

    it("submit button is disabled", async () => {
      renderSignupForm();

      const nameInput = screen.getByRole("textbox", { name: "Name" });
      await userEvent.type(nameInput, "xxxxxxx");

      expect(screen.getByRole("button", { name: "회원가입" })).toBeDisabled();
    });
  });

  context("when password value is invalid", () => {
    it(`display error message "${VALID_MSG.PASSWORD}"`, async () => {
      renderSignupForm();

      const passwordInput = screen.getByLabelText("Password");
      await userEvent.type(passwordInput, "123123");

      expect(passwordInput).toHaveValue("123123");
      expect(screen.getByText(VALID_MSG.PASSWORD)).toBeInTheDocument();
    });

    it("submit button is disabled", async () => {
      renderSignupForm();

      const passwordInput = screen.getByLabelText("Password");
      await userEvent.type(passwordInput, "123123");

      expect(screen.getByRole("button", { name: "회원가입" })).toBeDisabled();
    });
  });

  context("when password confirm value is invalid", () => {
    it(`display error message "${VALID_MSG.PASSWORD_C}"`, async () => {
      renderSignupForm();
      await userEvent.type(screen.getByLabelText("Password"), "password");

      const passwordConfirmInput = screen.getByLabelText("Password Confirm");
      await userEvent.type(passwordConfirmInput, "pass");

      expect(passwordConfirmInput).toHaveValue("pass");
      expect(screen.getByText(VALID_MSG.PASSWORD_C)).toBeInTheDocument();
    });

    it("submit button is disabled", async () => {
      renderSignupForm();

      await userEvent.type(screen.getByLabelText("Password"), "password");
      await userEvent.type(screen.getByLabelText("Password Confirm"), "pass");

      expect(screen.getByRole("button", { name: "회원가입" })).toBeDisabled();
    });
  });

  context("when the form is empty", () => {
    it("submit button is disabled", async () => {
      renderSignupForm();

      expect(screen.getByRole("button", { name: "회원가입" })).toBeDisabled();
    });
  });
});
