import { render, screen, waitFor } from "@testing-library/react";
import { Route } from "react-router-dom";

import { categories } from "@/fixtures";
import { useAuth, type AuthContextValue } from "@/libs/AuthProvider";
import { withAllContexts, withRouter } from "@/tests/utils";

import Header from "./Header";

jest.mock("@/libs/AuthProvider");

let isLoggedIn = false;

const context = describe;

describe("Header", () => {
  function renderHeader() {
    return render(
      withAllContexts(withRouter(<Route path="/" element={<Header />} />))
    );
  }

  beforeEach(() => {
    jest.mocked(useAuth).mockImplementation(
      () =>
        ({
          isLoggedIn,
        } as unknown as AuthContextValue)
    );
  });

  it("render correctly", () => {
    renderHeader();

    expect(
      screen.getByRole("heading", { level: 1, name: "Shop" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
  });

  it("render categories", async () => {
    renderHeader();

    await Promise.all(
      categories.map(async (ctg) => {
        await waitFor(() =>
          expect(
            screen.getByRole("link", { name: ctg.name })
          ).toBeInTheDocument()
        );
      })
    );
  });

  context("when the current user isn't logged in", () => {
    it("renders “Login” link", () => {
      renderHeader();

      expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
    });
  });

  context("when the current user is logged in", () => {
    beforeEach(() => {
      isLoggedIn = true;
    });

    it("renders 'Cart' link", () => {
      renderHeader();

      expect(screen.getByRole("link", { name: "Cart" })).toBeInTheDocument();
    });

    it("renders 'Order' link", () => {
      renderHeader();

      expect(screen.getByRole("link", { name: "Order" })).toBeInTheDocument();
    });

    it("renders 'Logout' Button", () => {
      renderHeader();

      expect(
        screen.getByRole("button", { name: "Logout" })
      ).toBeInTheDocument();
    });
  });
});
