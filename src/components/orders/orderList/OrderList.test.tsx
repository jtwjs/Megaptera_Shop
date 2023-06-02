import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, useParams } from "react-router-dom";

import { orders } from "@/fixtures";
import { withAllContexts, withRouter, regex } from "@/tests/utils";

import OrderList from "./OrderList";

const context = describe;

describe("OrderList", () => {
  it("render correctly", async () => {
    render(
      withAllContexts(withRouter(<Route path="/" element={<OrderList />} />))
    );

    await Promise.all(
      orders.map(async (order) => {
        await waitFor(() =>
          expect(screen.getByText(regex(order.id))).toBeInTheDocument()
        );
        await waitFor(() =>
          expect(screen.getByText(regex(order.title))).toBeInTheDocument()
        );
      })
    );
  });

  context("when order item is clicked", () => {
    const [order] = orders;

    it("navigate to the order detail page", async () => {
      function DetailPage() {
        const params = useParams();
        return <pre>{JSON.stringify(params)}</pre>;
      }

      render(
        withAllContexts(
          withRouter(
            <>
              <Route path="/" element={<OrderList />} />
              <Route path="/:id" element={<DetailPage />} />
            </>
          )
        )
      );

      await waitFor(() => screen.getByText(regex(order.title)));
      const linkBtn = screen.getAllByRole("link")[0];

      userEvent.click(linkBtn);

      await waitFor(() =>
        expect(screen.getByText(regex(order.id))).toBeInTheDocument()
      );
    });
  });
});
