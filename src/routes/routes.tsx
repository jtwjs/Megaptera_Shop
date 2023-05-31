import { Layout } from "@/components/layout";
import PATH from "@/constants/path";
import AuthProvider from "@/libs/AuthProvider";
import * as Page from "@/pages";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const routes = [
  {
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      { path: PATH.ROOT, element: <Page.Home /> },
      { path: PATH.PRODUCTS, element: <Page.Products /> },
      { path: `${PATH.PRODUCTS}/:id`, element: <Page.ProductDetail /> },
      {
        element: <PrivateRoute />,
        children: [{ path: PATH.CART, element: <Page.Cart /> }],
      },
      {
        element: <PublicRoute />,
        children: [{ path: PATH.LOGIN, element: <Page.Login /> }],
      },
    ],
  },
];

export default routes;
