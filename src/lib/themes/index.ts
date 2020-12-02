import { Theme } from "@material-ui/core/styles";
import { black } from "./black.theme";
import { dark } from "./dark.theme";
import { light } from "./light.theme";

export const themes = {
  black,
  dark,
  light,
};

export const getDarkTheme = () => {
  return themes.dark;
};

export const getLightTheme = () => {
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
    default:
      return themes.light;
  }
};
