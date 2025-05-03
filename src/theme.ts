"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
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
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#e1abff",
          textDecoration: "none",
          "&:hover": {
            color: "#8ff378",
          },
          transition: "all 0.3s ease",
        },
      },
    },
  },
});

export default theme;
