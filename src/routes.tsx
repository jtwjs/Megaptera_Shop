import { Layout } from "@/components/layout";
import PATH from "@/constants/path";
import * as Page from "@/pages";

const routes = [
  {
    element: <Layout />,
    children: [
      { path: PATH.ROOT, element: <Page.Home /> },
      { path: PATH.PRODUCTS, element: <Page.Products /> },
      { path: `${PATH.PRODUCTS}/:id`, element: <Page.ProductDetail /> },
      { path: PATH.CART, element: <Page.Cart /> },
    ],
  },
];

export default routes;
