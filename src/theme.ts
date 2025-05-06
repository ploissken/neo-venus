"use client";

import { createTheme } from "@mui/material";

//https:github.com/mui/material-ui/issues/21757#issuecomment-778308637

const colorTheme = createTheme({
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
    background: {
      paper: "#222222",
    },
  },
});

const theme = createTheme({
  ...colorTheme,
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
          color: colorTheme.palette.primary.main,
          textDecoration: "none",
          "&:hover": {
            color: colorTheme.palette.primary.light,
          },
          transition: "all 0.3s ease",
        },
      },
    },
  },
});

export default theme;
