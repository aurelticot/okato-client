import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export const dark = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
    },
  })
);
