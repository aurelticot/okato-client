import merge from "lodash.merge";
import { createTheme, alpha } from "@mui/material/styles";
import { baseOptions } from "./base.theme";

export const black = createTheme(
  merge({}, baseOptions, {
    ...baseOptions,
    palette: {
      mode: "dark",
      background: {
        default: "#000000",
        paper: "#000000",
      },
      text: {
        primary: "rgba(255, 255, 255, 0.80)",
      },
      primary: {
        main: "#2196f3",
        light: "#64b5f6",
        dark: "#1976d2",
        contrastText: "rgba(255, 255, 255, 0.80)",
      },
      info: {
        main: "#2196f3",
        light: "#64b5f6",
        dark: "#1976d2",
        contrastText: "rgba(255, 255, 255, 0.80)",
      },
      success: {
        main: "#53da58",
        light: "#8bff88",
        dark: "#00a727",
        contrastText: "rgba(0, 0, 0, 0.80)",
      },
      warning: {
        main: "#ff9800",
        light: "#ffc947",
        dark: "#c66900",
        contrastText: "rgba(0, 0, 0, 0.80)",
      },
      error: {
        main: "#ff665c",
        light: "#ff9889",
        dark: "#c63232",
        contrastText: "rgba(0, 0, 0, 0.80)",
      },
    },
    custom: {
      palette: {
        marketStatus: {
          open: {
            main: "#53da58",
            text: "#53da58",
            contrastText: "rgba(0, 0, 0, 0.80)",
          },
          close: {
            main: "#ff665c",
            text: "#ff665c",
            contrastText: "rgba(0, 0, 0, 0.80)",
          },
          other: {
            main: "#ff9800",
            text: "#ffad35",
            contrastText: "rgba(0, 0, 0, 0.80)",
          },
        },
      },
    },
    components: {
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: alpha("#FFFFFF", 0.1),
          },
        },
      },
    },
  })
);
