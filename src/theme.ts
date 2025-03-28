"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
        a: {
          textDecoration: "none",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#e1abff",
    },
    secondary: {
      main: "#8ff378",
    },
    error: {
      main: "#ef8f3a",
    },
    warning: {
      main: "#f9ff23",
    },
    info: {
      main: "#c160f7",
    },
    success: {
      main: "#bf52f3",
    },
  },
});

export default theme;
