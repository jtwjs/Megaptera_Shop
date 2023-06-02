import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, useParams } from "react-router-dom";

import { products } from "@/fixtures";
import { withAllContexts, withRouter, regex } from "@/tests/utils";

import ProductList from "./ProductList";

const context = describe;

describe("ProductList", () => {
  it("render correctly", async () => {
    render(
      withAllContexts(withRouter(<Route path="/" element={<ProductList />} />))
    );

    await Promise.all(
      products.map(async (product) => {
        await waitFor(() =>
          expect(screen.getByText(product.name)).toBeInTheDocument()
        );
        await waitFor(() =>
          expect(screen.getByText(product.price)).toBeInTheDocument()
        );
      })
    );

    await waitFor(() => expect(screen.getAllByRole("link")).toHaveLength(2));
  });

  context("when product item is clicked", () => {
    const product = products[0];

    it("navigate to the product detail page", async () => {
      function DetailPage() {
        const params = useParams();
        return <pre>{JSON.stringify(params)}</pre>;
      }

      render(
        withAllContexts(
          withRouter(
            <>
              <Route path="/" element={<ProductList />} />
              <Route path="/:id" element={<DetailPage />} />
            </>
          )
        )
      );

      await waitFor(() => screen.getByText(product.name));
      const linkBtn = screen.getAllByRole("link")[0];

      userEvent.click(linkBtn);

      await waitFor(() =>
        expect(screen.getByText(regex(product.id))).toBeInTheDocument()
      );
    });
  });
});
