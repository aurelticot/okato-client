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
