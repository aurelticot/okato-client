import { createTheme } from "@mui/material/styles";
import { baseOptions } from "./base.theme";

export const light = createTheme({
  ...baseOptions,
  palette: {
    ...baseOptions.palette,
    mode: "light",
  },
  custom: {
    ...baseOptions?.custom,
    palette: {
      ...baseOptions?.custom?.palette,
      marketStatus: {
        ...baseOptions?.custom?.palette?.marketStatus,
        open: {
          ...baseOptions?.custom?.palette?.marketStatus?.open,
          main: "#098a0e",
        },
        close: {
          ...baseOptions?.custom?.palette?.marketStatus?.close,
          main: "#e62112",
        },
      },
    },
  },
});
