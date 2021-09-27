import { createTheme } from "@material-ui/core/styles";
import { baseOptions } from "./base.theme";

export const dark = createTheme({
  ...baseOptions,
  palette: {
    ...baseOptions.palette,
    type: "dark",
  },
});
