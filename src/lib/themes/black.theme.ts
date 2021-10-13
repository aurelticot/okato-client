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
