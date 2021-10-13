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
            contrastText: "rgba(255, 255, 255, 0.80)",
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
