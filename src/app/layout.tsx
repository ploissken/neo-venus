"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import Navbar from "./components/Navbar";

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
