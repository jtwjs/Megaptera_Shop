/// <reference types="cypress" />

// 상품 이름, 이미지, 옵션, 설명이 노출된다.
// 장바구니에 상품을 담을 수 있는 버튼을 제공한다.
// 사용자는 상품 상세페이지에서 상품 옵션과 수량을 선택하여 장바구니에 담을 수 있다.
// 장바구니에 담기 버튼을 클릭하면 선택한 상품의 옵션, 수량 값이 장바구니에 추가된다.
// 장바구니에 담을 상품의 옵션과 수량을 변경할 수 있다.
// 상품 수량의 기본값은 1이다.
// 수량은 1 ~ 10 범위 내에서 선택이 가능하다.
// 수량이 변경될 때 마다 상품 가격도 변경된다.
// 장바구니 담기가 성공하면 '장바구니에 담았습니다' 텍스트가 노출된다.

describe("Product Detail", () => {
  beforeEach(() => {
    cy.sessionLogin("tester@example.com", "password");
    cy.visit("/products");
    cy.findByRole("link", { name: /CBCL 하트자수맨투맨/ }).click();
  });

  it("display product detail", () => {
    cy.findByText(/CBCL 하트자수맨투맨/).should("exist");
    cy.findByText(/편하게 입을 수 있는 맨투맨/).should("exist");
    cy.findByRole("img").should("exist");
    cy.findByRole("button", { name: "장바구니 담기" }).should("exist");
  });

  context("when change the quantity of a product", () => {
    it('default quantity is "1"', () => {
      cy.findByRole("textbox").should("have.value", "1");
    });

    it('changeable minimum qunatity is "1"', () => {
      cy.findByRole("textbox").should("have.value", "1");

      cy.findByRole("button", { name: "decrease" }).click();
      cy.findByRole("button", { name: "decrease" }).click();

      cy.findByRole("textbox").should("have.value", "1");
    });

    it('changeable maximum quantity is "10"', () => {
      Array.from({ length: 12 }).forEach(() => {
        cy.findByRole("button", { name: "increase" }).click();
      });

      cy.findByRole("textbox").should("have.value", "10");
    });

    it("the price changes as well", () => {
      cy.findByText(/128,000/).should("exist");

      cy.findByRole("button", { name: "increase" }).click();

      cy.findByText(/128,000/).should("not.exist");
      cy.findByText(/256,000/).should("exist");
    });
  });

  context("when change option", () => {
    it("display selected option", () => {
      cy.findByRole("combobox", { name: "컬러" }).click();
      cy.findByRole("option", { name: "grey" }).click();

      cy.findByText(/grey/).should("exist");
    });
  });

  describe("add to cart", () => {
    context("when none of the options are selected", () => {
      it('alert will pop up with the message "옵션을 선택해주세요"', () => {
        cy.findByRole("button", { name: "장바구니 담기" }).click();

        cy.on("window:alert", (txt) => {
          expect(txt).to.contains("옵션을 선택해주세요");
        });
      });
    });

    context("when product to cart is succeed", () => {
      it('display "장바구니에 담았습니다', () => {
        cy.findByRole("combobox", { name: "컬러" }).click();
        cy.findByRole("option", { name: "grey" }).click();
        cy.findByRole("combobox", { name: "사이즈" }).click();
        cy.findByRole("option", { name: "ONE" }).click();

        cy.findByRole("button", { name: "장바구니 담기" }).click();

        cy.findByText(/장바구니에 담았습니다/).should("exist");
      });
    });
  });

  context("when product no found", () => {
    it('display "해당 상품을 찾을 수 없습니다."', () => {
      cy.visit("http://localhost:8081/products/xxx");

      cy.findByText(/해당 상품을 찾을 수 없습니다./).should("exist");
    });
  });
});
