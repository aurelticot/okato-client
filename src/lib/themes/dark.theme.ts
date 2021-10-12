import { createTheme } from "@mui/material/styles";
import { baseOptions } from "./base.theme";

export const dark = createTheme({
  ...baseOptions,
  palette: {
    ...baseOptions.palette,
    mode: "dark",
    background: {
      default: "#303030",
      paper: "#424242",
    },
  },
  custom: {
    ...baseOptions?.custom,
    palette: {
      ...baseOptions?.custom?.palette,
      marketStatus: {
        ...baseOptions?.custom?.palette?.marketStatus,
        open: {
          ...baseOptions?.custom?.palette?.marketStatus?.open,
          main: "#53da58",
          text: "#53da58",
          contrastText: "rgba(0, 0, 0, 0.87)",
        },
        close: {
          ...baseOptions?.custom?.palette?.marketStatus?.close,
          main: "#ff665c",
          text: "#ff665c",
          contrastText: "rgba(0, 0, 0, 0.87)",
        },
      },
    },
  },
});
