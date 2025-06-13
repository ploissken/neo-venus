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
import { UserProvider } from "@/context/UserContext";
import { ChartListProvider } from "@/context/ChartListContext";

type ProviderProps = PropsWithChildren & {
  locale: string;
  messages: Record<string, unknown>;
};

export default function Providers({
  locale,
  messages,
  children,
}: ProviderProps) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={timeZone}
      >
        <AppRouterCacheProvider>
          <SnackbarProvider>
            <UserProvider>
              <ChartListProvider>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  {children}
                </ThemeProvider>
              </ChartListProvider>
            </UserProvider>
          </SnackbarProvider>
        </AppRouterCacheProvider>
      </NextIntlClientProvider>
    </LocalizationProvider>
  );
}
