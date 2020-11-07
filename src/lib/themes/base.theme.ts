import { ThemeOptions } from "@material-ui/core/styles";
import { getFluidCSSLength } from "../utils";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    custom: {
      fluidLength: (minREMValue: number) => string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom?: {
      fluidLength: (minREMValue: number) => string;
    };
  }
}

export const baseOptions: ThemeOptions = {
  custom: {
    fluidLength: getFluidCSSLength,
  },
};
