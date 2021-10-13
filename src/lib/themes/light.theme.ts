import merge from "lodash.merge";
import { createTheme } from "@mui/material/styles";
import { baseOptions } from "./base.theme";

export const light = createTheme(
  merge({}, baseOptions, {
    palette: {
      mode: "light",
      background: {
        default: "#f7f2e9",
        paper: "#f7f2e9",
      },
      text: {
        primary: "rgba(0, 0, 0, 0.80)",
      },
    },
    custom: {
      palette: {
        marketStatus: {
          open: {
            main: "#50b995",
            text: "#267e60",
            contrastText: "rgba(0, 0, 0, 0.80)",
          },
          close: {
            main: "#f46b6a",
            text: "#c04746",
            contrastText: "rgba(0, 0, 0, 0.80)",
          },
          other: {
            main: "#f5a228",
            text: "#966318",
            contrastText: "rgba(0, 0, 0, 0.80)",
          },
        },
      },
    },
  })
);
