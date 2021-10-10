import { createTheme } from "@mui/material/styles";
import { baseOptions } from "./base.theme";

export const light = createTheme({
  ...baseOptions,
  palette: {
    ...baseOptions.palette,
    mode: "light",
  },
});
