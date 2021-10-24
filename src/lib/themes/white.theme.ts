import merge from "lodash.merge";
import { createTheme } from "@mui/material/styles";
import { baseOptions } from "./base.theme";

export const white = createTheme(
  merge({}, baseOptions, {
    palette: {
      mode: "light",
      background: {
        default: "#ffffff",
        paper: "#ffffff",
      },
      text: {
        primary: "rgba(0, 0, 0, 0.80)",
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
        main: "#098a0e",
        light: "#51bb43",
        dark: "#005b00",
        contrastText: "rgba(255, 255, 255, 0.80)",
      },
      warning: {
        main: "#ff9800",
        light: "#ffc947",
        dark: "#c66900",
        contrastText: "rgba(0, 0, 0, 0.80)",
      },
      error: {
        main: "#e62112",
        light: "#ff603f",
        dark: "#ab0000",
        contrastText: "rgba(255, 255, 255, 0.80)",
      },
    },
    custom: {
      palette: {
        marketStatus: {
          open: {
            main: "#098a0e",
            text: "#098a0e",
            contrastText: "rgba(255, 255, 255, 0.80)",
          },
          close: {
            main: "#e62112",
            text: "#e62112",
            contrastText: "rgba(255, 255, 255, 0.80)",
          },
          other: {
            main: "#ff9800",
            text: "#aa6500",
            contrastText: "rgba(0, 0, 0, 0.80)",
          },
        },
      },
    },
  })
);
