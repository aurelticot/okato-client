import { createTheme } from "@material-ui/core/styles";
import { baseOptions } from "./base.theme";

export const light = createTheme({
  ...baseOptions,
  palette: {
    ...baseOptions.palette,
    type: "light",
  },
});
