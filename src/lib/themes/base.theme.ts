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
    palette: {
      marketStatus: {
        open: {
          main: "#4caf50",
          text: "#098a0e",
          contrastText: "rgba(0, 0, 0, 0.87)",
        },
        close: {
          main: "#e62112",
          text: "#e62112",
          contrastText: "#ffffff",
        },
        other: {
          main: "#ff9800",
          text: "#ff9800",
          contrastText: "rgba(0, 0, 0, 0.87)",
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
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  },
  components: {
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
