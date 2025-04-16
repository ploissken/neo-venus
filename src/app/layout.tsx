"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "../theme";
import Navbar from "../components/navbar/Navbar";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout(props: any) {
  const { children } = props;
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <main>
                <Navbar />
                {children}
              </main>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
