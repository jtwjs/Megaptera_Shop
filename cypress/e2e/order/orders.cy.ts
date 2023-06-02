/// <reference types="cypress" />

// 로그인 한 사용자만 접근이 가능하다.
// 주문 일자, 주문 금액, 주문 상품들을 확인할 수 있다.
// 각 주문 내역을 클릭하면 주문 상세 페이지로 이동한다.

describe("Order List", () => {
  context("with not logged in", () => {
    it("cant not access the order page", () => {
      cy.visit("/orders");
      cy.url().should("not.include", "/orders");
    });
  });

  context("with logged in", () => {
    beforeEach(() => {
      cy.sessionLogin("tester@example.com", "password");
      cy.visit("/orders");
    });

    it("can access the order page", () => {
      cy.findByRole("heading", { level: 1, name: "주문 목록" }).should("exist");
      cy.url().should("include", "/orders");
    });

    context("when order item is clicked", () => {
      it("navigate detail page", () => {
        cy.findByRole("link", { name: /CBCL 하트자수맨투맨/ }).click();

        cy.findByText("주문 상세").should("exist");
      });
    });
  });
});
