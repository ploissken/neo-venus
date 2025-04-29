"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "../theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { PropsWithChildren } from "react";
import { SnackbarProvider } from "@/context/SnackbarContext";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </LocalizationProvider>
  );
}
