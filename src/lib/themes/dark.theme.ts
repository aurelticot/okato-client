import merge from "lodash.merge";
import { createTheme } from "@mui/material/styles";
import { baseOptions } from "./base.theme";

export const dark = createTheme(
  merge({}, baseOptions, {
    palette: {
      mode: "dark",
      background: {
        default: "#303030",
        paper: "#424242",
      },
      text: {
        primary: "rgba(255, 255, 255, 0.80)",
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
