import { render, screen, waitFor } from "@testing-library/react";
import { Route } from "react-router-dom";

import { categories } from "@/fixtures";
import { withAllContexts, withRouter } from "@/tests/utils";

import Header from "./Header";

describe("Header", () => {
  function renderHeader() {
    return render(
      withAllContexts(withRouter(<Route path="/" element={<Header />} />))
    );
  }

  it("render correctly", () => {
    renderHeader();

    expect(
      screen.getByRole("heading", { level: 1, name: "Shop" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cart" })).toBeInTheDocument();
  });

  it("render categories", async () => {
    renderHeader();

    await Promise.all(
      categories.map(async (ctg) => {
        await waitFor(() => screen.getByRole("link", { name: ctg.name }));
      })
    );
  });
});
