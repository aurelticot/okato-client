import { createTheme, alpha } from "@mui/material/styles";
import { baseOptions } from "./base.theme";

export const black = createTheme({
  ...baseOptions,
  palette: {
    ...baseOptions.palette,
    mode: "dark",
    background: {
      default: "#000000",
      paper: "#000000",
    },
  },
  components: {
    ...baseOptions.components,
    MuiBackdrop: {
      ...baseOptions.components?.MuiBackdrop,
      styleOverrides: {
        ...baseOptions.components?.MuiBackdrop?.styleOverrides,
        root: {
          backgroundColor: alpha("#FFFFFF", 0.1),
        },
      },
    },
  },
});
