import { createTheme } from "@mui/material/styles";
import { baseOptions } from "./base.theme";

export const dark = createTheme({
  ...baseOptions,
  palette: {
    ...baseOptions.palette,
    mode: "dark",
    background: {
      default: "#303030",
      paper: "#303030",
    },
  },
});
