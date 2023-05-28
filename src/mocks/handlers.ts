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
];

export default handlers;
