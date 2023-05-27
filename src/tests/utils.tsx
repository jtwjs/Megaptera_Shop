import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes } from "react-router-dom";

import { theme } from "@/styles";

export const withRouter = (
  routes: React.ReactElement,
  initialEntries = "/"
) => (
  <MemoryRouter initialEntries={[initialEntries]}>
    <Routes>{routes}</Routes>
  </MemoryRouter>
);

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

export const withAllContexts = (children: React.ReactElement) => {
  const testClient = createTestQueryClient();

  return (
    <QueryClientProvider client={testClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};
