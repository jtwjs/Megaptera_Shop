import React from "react";
import ReactDOM from "react-dom/client";

import "reflect-metadata";

import App from "./App";

function main() {
  const container = document.getElementById("root");

  window.IMP.init(process.env.PORTONE_IMP);

  if (!container) {
    return;
  }

  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

main();
