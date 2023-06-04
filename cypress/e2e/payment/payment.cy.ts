/// <reference types="cypress" />

describe("Payment", () => {
  beforeEach(() => {
    cy.backdoor();
    cy.login();
  });

  const getIframeBody = () => {
    return cy.enter("#address-search-container iframe").then((getBody) => {
      getBody()
        .find("iframe")
        .its("0.contentDocument.body")
        .should("not.be.empty");
    });
  };

  it("kakaopay module opens as correctly", () => {
    cy.visit("");
    cy.findByRole("link", { name: "Products" }).click();
    cy.findByRole("link", { name: "acc" }).click();
    cy.findByRole("link", {
      name: /CBCL EARRING Silver 상품 페이지 이동/,
    }).click();
    cy.findByRole("button", { name: "장바구니 담기" }).click();
    cy.findByText(/장바구니에 담았습니다/).should("exist");
    cy.findByRole("link", { name: "Cart" }).click();
    cy.findByRole("link", { name: "주문하기" }).click();

    cy.findByRole("textbox", { name: "이름" }).type("정태웅");
    cy.findByRole("button", { name: "우편번호 검색" }).click();

    cy.get('[title="우편번호서비스 레이어 프레임"]').should("be.visible");

    getIframeBody().within(() => {
      cy.get("#region_name").type("판교 {enter}", { force: true });
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100);

    getIframeBody().within(() => {
      cy.get(".txt_addr").eq(0).click();
    });

    cy.findByRole("textbox", { name: "상세 주소" }).type("501호");
    cy.findByRole("textbox", { name: "전화번호" }).type("01025919503");

    cy.findByRole("button", { name: "결제" }).click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100);

    cy.get("iframe.imp-frame-kakaopay").should("exist");
  });
});
