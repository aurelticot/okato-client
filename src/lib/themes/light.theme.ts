import merge from "lodash.merge";
import { createTheme } from "@mui/material/styles";
import { baseOptions } from "./base.theme";

export const light = createTheme(
  merge({}, baseOptions, {
    palette: {
      mode: "light",
    },
    custom: {
      palette: {
        marketStatus: {
          open: {
            main: "#098a0e",
            text: "#098a0e",
            contrastText: "rgba(0, 0, 0, 0.87)",
          },
          close: {
            main: "#e62112",
            text: "#e62112",
            contrastText: "#ffffff",
          },
        },
      },
    },
  })
);
