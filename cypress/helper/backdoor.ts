const BACKDOOR_BASE_URL = "https://shop-demo-api-01.fly.dev/backdoor";

const setupDatabase = () => {
  cy.request(`${BACKDOOR_BASE_URL}/setup-database`);
};

export default setupDatabase;
