import { ThemeOptions } from "@material-ui/core/styles";
import { getFluidCSSLength } from "lib/utils";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    custom: {
      palette: {
        marketStatus: {
          open: {
            main: string;
            light: string;
            dark: string;
            contrastText: string;
          };
          close: {
            main: string;
            light: string;
            dark: string;
            contrastText: string;
          };
          extended: {
            main: string;
            light: string;
            dark: string;
            contrastText: string;
          };
        };
      };
      mixins: {
        fluidLength: (minREMValue: number) => string;
      };
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom?: {
      palette?: {
        marketStatus?: {
          open?: {
            main?: string;
            light?: string;
            dark?: string;
            contrastText: string;
          };
          close?: {
            main?: string;
            light?: string;
            dark?: string;
            contrastText: string;
          };
          extended?: {
            main?: string;
            light?: string;
            dark?: string;
            contrastText: string;
          };
        };
      };
      mixins?: {
        fluidLength?: (minREMValue: number) => string;
      };
    };
  }
}

export const baseOptions: ThemeOptions = {
  custom: {
    palette: {
      marketStatus: {
        open: {
          main: "#4caf50",
          light: "#81c784",
          dark: "#388e3c",
          contrastText: "#rgba(0, 0, 0, 0.87)",
        },
        close: {
          main: "#f44336",
          light: "#e57373",
          dark: "#d32f2f",
          contrastText: "#fff",
        },
        extended: {
          main: "#ff9800",
          light: "#ffb74d",
          dark: "#f57c00",
          contrastText: "##rgba(0, 0, 0, 0.87)",
        },
      },
    },
    mixins: {
      fluidLength: getFluidCSSLength,
    },
  },
  palette: {
    primary: {
      light: "#64b5f6",
      main: "#2196f3",
      dark: "#1976d2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#616161",
      light: "#9e9e9e",
      dark: "#424242",
      contrastText: "#rgba(0, 0, 0, 0.87)",
    },
  },
};
