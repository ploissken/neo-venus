"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "../theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { PropsWithChildren } from "react";
import { NextIntlClientProvider } from "next-intl";
import { SnackbarProvider } from "@/context/SnackbarContext";

type ProviderProps = PropsWithChildren & {
  locale: string;
  messages: Record<string, unknown>;
};

export default function Providers({
  locale,
  messages,
  children,
}: ProviderProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider>{children}</SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </NextIntlClientProvider>
    </LocalizationProvider>
  );
}
