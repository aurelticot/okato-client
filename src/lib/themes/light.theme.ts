import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export const light = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "light",
    },
  })
);
