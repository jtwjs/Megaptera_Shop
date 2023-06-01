/// <reference types="cypress" />

// 이메일과 패스워드를 입력하여 로그인을 한다.
// 이메일 및 패스워드 값이 유효성에 어긋날시 에러 메시지가 노출된다.
// 유효성에 어긋나거나 값이 채워지지 않은 경우 로그인 버튼은 Disabled 상태가 된다.
// 헤더에 로그인 페이지로 이동되는 링크가 제공된다.
// 로그인된 사용자는 헤더에 로그인 링크가 사라지고 장바구니 링크와 로그아웃 버튼이 제공된다.
// 로그인에 성공하면 이전 페이지로 이동한다.

describe("Login", () => {
  beforeEach(() => {
    cy.visit("");
  });

  context("when email and password values are invalid", () => {
    it("unable to login", () => {
      cy.findByRole("link", { name: "Login" }).should("exist").click();

      cy.findByRole("textbox", { name: "E-mail" }).type("invalid email");
      cy.findByText("이메일 형식이 올바르지 않습니다.").should("exist");

      cy.findByLabelText("Password").type("invalid password1@");
      cy.findByText("비밀번호 형식이 올바르지 않습니다.").should("exist");

      cy.findByRole("button", { name: "로그인" }).should("be.disabled");
    });
  });

  context("when logged in", () => {
    it("login link disappears and is replaced by cart link and logout button", () => {
      cy.login();
      cy.visit("");
      cy.findByRole("link", { name: "Login" }).should("not.exist");
      cy.findByRole("link", { name: "Cart" }).should("exist");
      cy.findByRole("button", { name: "Logout" }).should("exist");
    });

    it("redirected back to the previous page", () => {
      cy.visit("products/0BV000PRO0001");

      cy.findByRole("link", { name: "Login" }).should("exist").click();
      cy.findByRole("textbox", { name: "E-mail" }).type("tester@example.com");
      cy.findByLabelText("Password").type("password");
      cy.findByRole("button", { name: "로그인" }).click();

      cy.url().should("include", "/products/0BV000PRO0001");
    });
  });
});
