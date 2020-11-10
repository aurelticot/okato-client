import { createMuiTheme } from "@material-ui/core/styles";
import { baseOptions } from "./base.theme";

export const dark = createMuiTheme({
  ...baseOptions,
  palette: {
    ...baseOptions.palette,
    type: "dark",
  },
});
