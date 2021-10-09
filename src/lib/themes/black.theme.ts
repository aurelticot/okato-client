import { createTheme } from "@mui/material/styles";
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
});
