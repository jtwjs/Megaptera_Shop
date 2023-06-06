/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "cypress";
require("dotenv").config();

export default defineConfig({
  projectId: "efmgmm",
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:8081",
    env: {
      backdoor_url: `${process.env.REACT_APP_API_URL}/backdoor/setup-database`,
    },
  },
});
1;
