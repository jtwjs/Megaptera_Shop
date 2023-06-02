import { render, screen, waitFor } from "@testing-library/react";
import { Route } from "react-router-dom";

import { orderDetails } from "@/fixtures";
import { withAllContexts, withRouter, regex } from "@/tests/utils";
import { numberFormat } from "@/utils/format";

import OrderDetail from "./OrderDetail";

const context = describe;

describe("OrderDetail", () => {
  const [detail] = orderDetails;

  function renderProductDetail(orderId: string) {
    return render(
      withAllContexts(
        withRouter(
          <Route path="/:id" element={<OrderDetail />} />,
          `/${orderId}`
        )
      )
    );
  }

  context("with an valid order id", () => {
    it("render correctly", async () => {
      renderProductDetail(detail.id);

      await waitFor(() =>
        expect(screen.getByText(regex(detail.id))).toBeInTheDocument()
      );

      expect(
        screen.getByText(regex(numberFormat(detail.totalPrice)))
      ).toBeInTheDocument();
    });
  });

  context("with an invalid order id", () => {
    it("display text '해당 주문을 찾을 수 없습니다.'", async () => {
      renderProductDetail("invalid");

      await waitFor(() =>
        expect(
          screen.getByText(/해당 주문을 찾을 수 없습니다./)
        ).toBeInTheDocument()
      );
    });
  });
});
