import { dialogClasses, menuClasses } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";
import { getFluidCSSLength } from "lib/utils";

declare module "@mui/material/styles/createTheme" {
  interface Theme {
    custom: {
      palette: {
        marketStatus: {
          open: {
            main: string;
            text: string;
            contrastText: string;
          };
          close: {
            main: string;
            text: string;
            contrastText: string;
          };
          other: {
            main: string;
            text: string;
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
            text?: string;
            contrastText?: string;
          };
          close?: {
            main?: string;
            text?: string;
            contrastText?: string;
          };
          other?: {
            main?: string;
            text?: string;
            contrastText?: string;
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
    mixins: {
      fluidLength: getFluidCSSLength,
    },
  },
  palette: {
    primary: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#616161",
      light: "#9e9e9e",
      dark: "#424242",
      contrastText: "rgba(0, 0, 0, 0.80)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        #root {
          height: 100vh;
          width: 100vw;
        }
      `,
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          [`& .${dialogClasses.paper}`]: {
            backgroundImage: "none",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          [`& .${menuClasses.paper}`]: {
            backgroundImage: "none",
          },
        },
      },
    },
  },
};
