/// <reference types="cypress" />

// 이메일, 이름, 패스워드를 입력하여 회원가입을 한다.
// 필드 값이 유효성에 어긋날시 에러 메시지가 노출된다.
// 유효성에 어긋나거나 값이 채워지지 않은 경우 회원가입 버튼은 Disabled 상태가 된다.
// 회원가입에 성공하면 회원가입 성공 페이지로 이동된다.
// 회원가입에 성공시 로그인 상태가 된다.

describe("Signup", () => {
  beforeEach(() => {
    cy.backdoor();
    cy.visit("/signup");
  });

  context("when form values are invalid", () => {
    it("unable to signup", () => {
      cy.findByRole("textbox", { name: "E-mail" }).type("invalid email");
      cy.findByText("이메일 형식이 올바르지 않습니다.").should("exist");

      cy.findByRole("textbox", { name: "Name" }).type("invalid name");
      cy.findByText("이름 형식이 올바르지 않습니다.").should("exist");

      cy.findByLabelText("Password").type("invalid password1@");
      cy.findByText("비밀번호 형식이 올바르지 않습니다.").should("exist");

      cy.findByLabelText("Password Confirm").type("invalid password");
      cy.findByText("비밀번호가 일치하지 않습니다.").should("exist");

      cy.findByRole("button", { name: "회원가입" }).should("be.disabled");
    });
  });

  context("when signup succeed ", () => {
    beforeEach(() => {
      cy.findByRole("textbox", { name: "E-mail" }).type("tester2@example.com");
      cy.findByRole("textbox", { name: "Name" }).type("테스터");
      cy.findByLabelText("Password").type("password");
      cy.findByLabelText("Password Confirm").type("password");
      cy.findByRole("button", { name: "회원가입" }).click();
    });
    it("redirected signup complete page", () => {
      cy.findByText(/Signup Complete/).should("exist");
      cy.url().should("include", "/signupComplete");
    });

    it("will be logged in status", () => {
      cy.findByRole("link", { name: "Login" }).should("not.exist");
      cy.findByRole("link", { name: "Cart" }).should("exist");
      cy.findByRole("button", { name: "Logout" }).should("exist");
    });
  });
});
