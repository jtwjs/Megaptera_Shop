import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppProvider from "@/libs/AppProvider";
import routes from "@/routes";

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
