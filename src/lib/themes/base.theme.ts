import { ThemeOptions } from "@material-ui/core/styles";
import { getFluidTextValues } from "../utils";
import { FluidTextValues } from "../types";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    custom: {
      getFluidTextValues: (minREMValue: number) => FluidTextValues;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom?: {
      getFluidTextValues: (minREMValue: number) => FluidTextValues;
    };
  }
}

export const baseOptions: ThemeOptions = {
  custom: {
    getFluidTextValues,
  },
};
