import { render, screen } from "@testing-library/react";

import { products } from "@/fixtures";
import { withAllContexts } from "@/tests/utils";

import Product from "./Product";

describe("Product", () => {
  const product = products[0];
  it("render correctly", () => {
    render(withAllContexts(<Product product={product} />));

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      product.thumbnail.url
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.price)).toBeInTheDocument();
  });
});
