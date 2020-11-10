import { createMuiTheme } from "@material-ui/core/styles";
import { baseOptions } from "./base.theme";

export const black = createMuiTheme({
  ...baseOptions,
  palette: {
    ...baseOptions.palette,
    type: "dark",
    background: {
      default: "#000000",
    },
  },
});
