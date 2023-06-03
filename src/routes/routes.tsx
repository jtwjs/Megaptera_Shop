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
      { path: PATH.SIGNUP_COMPLETE, element: <Page.SignupComplete /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: PATH.CART, element: <Page.Cart /> },
          { path: PATH.ORDERS, element: <Page.Orders /> },
          { path: `${PATH.ORDERS}/:id`, element: <Page.OrderDetail /> },
          { path: PATH.PAYMENT, element: <Page.Payment /> },
          { path: PATH.PAYMENT_COMPLETE, element: <Page.PaymentComplete /> },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: PATH.LOGIN, element: <Page.Login /> },
          { path: PATH.SIGNUP, element: <Page.Signup /> },
        ],
      },
    ],
  },
];

export default routes;
