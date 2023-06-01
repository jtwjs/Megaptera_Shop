/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    backdoor(): Chainable<any>;
    login(): Chainable<any>;
    sessionLogin(id: string, pw: string): Chainable<any>;
  }
}
