import { rest } from "msw";

import { categories } from "@/fixtures/categories";

const handlers = [
  rest.get("/categories", (req, res, ctx) => res(ctx.json({ categories }))),
];

export default handlers;
