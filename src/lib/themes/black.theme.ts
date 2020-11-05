import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export const black = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
      background: {
        default: "#000000",
      },
    },
  })
);
