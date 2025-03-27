"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#a25cff",
    },
    secondary: {
      main: "#2dc104",
    },
  },
});

export default theme;
