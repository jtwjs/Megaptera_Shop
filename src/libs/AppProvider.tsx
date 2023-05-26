import { ThemeProvider } from "@emotion/react";
import type { PropsWithChildren } from "react";

import { GlobalStyles, theme } from "@/styles";

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
