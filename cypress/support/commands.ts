/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import "@testing-library/cypress/add-commands";
import "cypress-iframe";

Cypress.Commands.add("backdoor", () => {
  cy.request(Cypress.env("backdoor_url"));
});

Cypress.Commands.add("login", () => {
  cy.visit("/login");
  cy.findByRole("textbox", { name: "E-mail" }).type("tester@example.com");
  cy.findByLabelText("Password").type("password");
  cy.findByRole("button", { name: "로그인" }).click();
  cy.findByRole("button", { name: "Logout" }).should("exist");
});

Cypress.Commands.add("sessionLogin", (id: string, pw: string) => {
  cy.session(
    [id, pw],
    () => {
      cy.visit("/login");
      cy.findByRole("textbox", { name: "E-mail" }).type(id);
      cy.findByLabelText("Password").type(pw);
      cy.findByRole("button", { name: "로그인" }).click();
      cy.findByRole("button", { name: "Logout" }).should("exist");
    },
    {
      validate: () => {
        cy.getCookie("megap-user").should("exist");
      },
    }
  );
});

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
