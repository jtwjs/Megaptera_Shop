import { rest } from "msw";

import * as fixtures from "@/fixtures";

const handlers = [
  rest.get("/categories", (req, res, ctx) =>
    res(ctx.json({ categories: fixtures.categories }))
  ),
  rest.get("/products", (req, res, ctx) => {
    const categoryId = req.url.searchParams.get("categoryId");

    if (categoryId) {
      return res(
        ctx.json({
          products: fixtures.products.filter(
            (product) => product.category.id === (categoryId as string)
          ),
        })
      );
    }
    return res(ctx.json({ products: fixtures.products }));
  }),
  rest.get("/products/:id", (req, res, ctx) => {
    const product = fixtures.productDetails.find(
      (product) => product.id === req.params.id
    );

    if (!product) {
      return res(ctx.status(404));
    }
    return res(ctx.json(product));
  }),
  rest.get("/cart", (req, res, ctx) => res(ctx.json(fixtures.cart))),
  rest.post("/cart/line-items", (req, res, ctx) => res(ctx.status(201))),
];

export default handlers;
