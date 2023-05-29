import type { UseQueryResult } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { Route } from "react-router-dom";

import { cart, emptyCart } from "@/fixtures/cart";
import { useFetchCartList } from "@/services/useCart";
import { withAllContexts, withRouter } from "@/tests/utils";
import type { Cart } from "@/types/cart";

import CartView from "./CartView";

const context = describe;

jest.mock("@/services/useCart");

describe("CartView", () => {
  function renderCartView() {
    return render(
      withAllContexts(withRouter(<Route path="/" element={<CartView />} />))
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context("when the cart is empty", () => {
    it('render text "장바구니가 비었습니다"', () => {
      jest
        .mocked(useFetchCartList)
        .mockImplementation(
          () => ({ data: emptyCart } as UseQueryResult<Cart>)
        );

      renderCartView();

      expect(screen.getByText(/장바구니가 비었습니다/)).toBeInTheDocument();
    });
  });

  context("when the cart is not empty", () => {
    it("render items", async () => {
      jest
        .mocked(useFetchCartList)
        .mockImplementation(() => ({ data: cart } as UseQueryResult<Cart>));

      renderCartView();

      await Promise.all(
        cart.lineItems.map(async (item) => {
          await waitFor(() =>
            expect(screen.getByText(item.product.name)).toBeInTheDocument()
          );
          await waitFor(() =>
            expect(screen.getByText(item.quantity)).toBeInTheDocument()
          );
        })
      );
    });
  });
});
