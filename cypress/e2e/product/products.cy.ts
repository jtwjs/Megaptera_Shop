/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

// 카테고리를 선택하지 않으면 전체 상품이 노출된다.
// 카테고리 별로 상품 목록이 보여져야 한다.
// 각 상품은 상품명과 가격이 노출된다.
// 상품을 클릭하면 상품 상세 페이지로 넘어간다.

describe("Product List", () => {
  beforeEach(() => {
    cy.visit("");
  });

  context("when product link btn is clicked", () => {
    it("display products from all categories", () => {
      cy.findByRole("link", { name: "Products" }).click();

      cy.findByText(/CBCL 하트자수맨투맨/).should("exist");
      cy.findByText(/밴딩스커트/).should("exist");
      cy.findByText(/CBCL EARRING Silver/).should("exist");
    });
  });

  context("when category btn is clicked", () => {
    it("display product from  categories", () => {
      cy.findByRole("link", { name: "top" }).click();

      cy.findByText(/밴딩스커트/).should("not.exist");
      cy.findByText(/CBCL 하트자수맨투맨/).should("exist");

      cy.findByRole("link", { name: "acc" }).click();

      cy.findByText(/CBCL 하트자수맨투맨/).should("not.exist");
      cy.findByText(/CBCL EARRING Silver/).should("exist");
      cy.findByText(/62000/).should("exist");
    });
  });

  context("when product is clicked", () => {
    it("navigate product detail page", () => {
      cy.findByRole("link", { name: "Products" }).click();

      cy.findByRole("link", { name: /CBCL 하트자수맨투맨/ }).click();

      cy.findByText("상품 상세 페이지").should("exist");
    });
  });
});
