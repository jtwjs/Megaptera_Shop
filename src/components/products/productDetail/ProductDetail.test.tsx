import { render, screen, waitFor } from "@testing-library/react";
import { Route } from "react-router-dom";

import { productDetails } from "@/fixtures";
import { withAllContexts, withRouter, regex } from "@/tests/utils";
import { numberFormat } from "@/utils/format";

import ProductDetail from "./ProductDetail";

const context = describe;

describe("ProductDetail", () => {
  const detail = productDetails[0];

  function renderProductDetail(productId: string) {
    return render(
      withAllContexts(
        withRouter(
          <Route path="/:id" element={<ProductDetail />} />,
          `/${productId}`
        )
      )
    );
  }

  context("with an valid product id", () => {
    it("render correctly", async () => {
      renderProductDetail(detail.id);

      await waitFor(() =>
        expect(
          screen.getByRole("heading", { name: detail.name })
        ).toBeInTheDocument()
      );

      expect(
        screen.getByText(`${numberFormat(detail.price)}원`)
      ).toBeInTheDocument();

      const line = detail.description.split("\n");

      line.forEach((str) => {
        expect(screen.getByText(regex(str))).toBeInTheDocument();
      });

      detail.images.forEach((img) => {
        expect(screen.getByRole("img")).toHaveAttribute("src", img.url);
      });
    });
  });

  context("with an invalid product id", () => {
    it("display text '해당 상품을 찾을 수 없습니다.'", async () => {
      renderProductDetail("invalid");

      await waitFor(() =>
        expect(
          screen.getByText(/해당 상품을 찾을 수 없습니다./)
        ).toBeInTheDocument()
      );
    });
  });
});
