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
    },
    custom: {
      palette: {
        marketStatus: {
          open: {
            main: "#53da58",
            text: "#53da58",
            contrastText: "rgba(0, 0, 0, 0.87)",
          },
          close: {
            main: "#ff665c",
            text: "#ff665c",
            contrastText: "rgba(0, 0, 0, 0.87)",
          },
        },
      },
    },
  })
);
