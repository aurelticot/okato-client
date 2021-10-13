import { Theme } from "@mui/material/styles";
import { black } from "./black.theme";
import { dark } from "./dark.theme";
import { light } from "./light.theme";
import { white } from "./white.theme";

export const themes = {
  black,
  dark,
  light,
  white,
};

export const getDarkTheme = (): Theme => {
  return themes.dark;
};

export const getLightTheme = (): Theme => {
  return themes.light;
};

export const getTheme = (theme: string): Theme => {
  switch (theme) {
    case "light":
      return themes.light;
    case "black":
      return themes.black;
    case "dark":
      return themes.dark;
    case "white":
      return themes.white;
    default:
      return themes.light;
  }
};
