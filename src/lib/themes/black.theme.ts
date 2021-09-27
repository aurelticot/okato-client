import { createTheme } from "@material-ui/core/styles";
import { baseOptions } from "./base.theme";

export const black = createTheme({
  ...baseOptions,
  palette: {
    ...baseOptions.palette,
    type: "dark",
    background: {
      default: "#000000",
    },
  },
});
