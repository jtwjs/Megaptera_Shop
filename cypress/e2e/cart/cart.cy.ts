/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";
import backdoor from "../../helper/backdoor";

// 헤더 부분에 장바구니 페이지로 이동되는 링크가 제공된다.
// 사용자가 장바구니에 담은 상품들을 볼 수 있다.
// 장바구니가 비어있는 경우 '장바구니가 비었습니다' 텍스트가 노출된다.
// 각 상품 별로 리스팅된다.
// 상품의 옵션이 다른 경우 별도로 리스팅된다.
// 상품별로 이름, 옵션, 가격, 수량, 총 가격이 표시된다.
// 장바구니에 담긴 상품의 총 합계 금액이 표시된다.

describe("Cart List", () => {
  beforeEach(() => {
    backdoor();
    cy.visit("products/0BV000PRO0001");
  });

  context("when add product to cart", () => {
    it("product appears on the cart page", () => {
      cy.findByRole("combobox", { name: "컬러" }).click();
      cy.findByRole("option", { name: "grey" }).click();
      cy.findByRole("combobox", { name: "사이즈" }).click();
      cy.findByRole("option", { name: "ONE" }).click();

      cy.findByRole("button", { name: "장바구니 담기" }).click();
      cy.findByText(/장바구니에 담았습니다/).should("exist");

      cy.findByRole("link", { name: "Cart" }).click();

      cy.findByText(/CBCL 하트자수맨투맨/).should("exist");
      cy.findAllByRole("row").should("have.length", 1);
    });

    context("when the product has different options", () => {
      it("added to the cart separately", () => {
        cy.findByRole("combobox", { name: "컬러" }).click();
        cy.findByRole("option", { name: "grey" }).click();
        cy.findByRole("combobox", { name: "사이즈" }).click();
        cy.findByRole("option", { name: "ONE" }).click();

        cy.findByRole("button", { name: "장바구니 담기" }).click();
        cy.findByText(/장바구니에 담았습니다/).should("exist");

        cy.findByRole("link", { name: "Cart" }).click();

        cy.findAllByRole("row").should("have.length", 1);

        cy.visit("/products");
        cy.findByRole("link", { name: /CBCL 하트자수맨투맨/ }).click();

        cy.findByRole("combobox", { name: "컬러" }).click();
        cy.findByRole("option", { name: "blue" }).click();
        cy.findByRole("combobox", { name: "사이즈" }).click();
        cy.findByRole("option", { name: "ONE" }).click();
        cy.findByText(/장바구니에 담았습니다/).should("exist");

        cy.findByRole("link", { name: "Cart" }).click();

        cy.findByText(/256,000원/).should("exist");
        cy.findAllByRole("row").should("have.length", 2);
      });
    });

    context("when empty cart", () => {
      it('display "장바구니가 비었습니다', () => {
        cy.visit("/cart");

        cy.findByText(/장바구니가 비었습니다/).should("exist");
      });
    });
  });
});
