import { createMuiTheme } from "@material-ui/core/styles";
import { baseOptions } from "./base.theme";

export const light = createMuiTheme({
  ...baseOptions,
  palette: {
    ...baseOptions.palette,
    type: "light",
  },
});
