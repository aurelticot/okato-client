import merge from "lodash.merge";
import { createTheme } from "@mui/material/styles";
import { baseOptions } from "./base.theme";

export const dark = createTheme(
  merge({}, baseOptions, {
    palette: {
      mode: "dark",
      background: {
        default: "#303030",
        paper: "#303030",
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
        main: "#50b995",
        light: "#84ecc6",
        dark: "#0f8867",
        contrastText: "rgba(0, 0, 0, 0.80)",
      },
      warning: {
        main: "#f5a228",
        light: "#ffd35c",
        dark: "#bd7300",
        contrastText: "rgba(0, 0, 0, 0.80)",
      },
      error: {
        main: "#f46b6a",
        light: "#ff9d98",
        dark: "#bc393f",
        contrastText: "rgba(0, 0, 0, 0.80)",
      },
    },
    custom: {
      palette: {
        marketStatus: {
          open: {
            main: "#50b995",
            text: "#50b995",
            contrastText: "rgba(0, 0, 0, 0.80)",
          },
          close: {
            main: "#f46b6a",
            text: "#f76c6b",
            contrastText: "rgba(0, 0, 0, 0.80)",
          },
          other: {
            main: "#f5a228",
            text: "#ffad35",
            contrastText: "rgba(0, 0, 0, 0.80)",
          },
        },
      },
    },
  })
);
