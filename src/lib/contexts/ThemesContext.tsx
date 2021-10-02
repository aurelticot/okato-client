import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  ThemeProvider,
  StyledEngineProvider,
  Theme,
} from "@mui/material/styles";
import { getTheme } from "lib/themes";
import { useUserSetting } from "lib/hooks";
import { SettingKey } from "lib/types";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const useSystemTheme = (): string => {
  const systemDarkThemeMatcher = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );
  const [systemTheme, setSystemTheme] = useState(
    systemDarkThemeMatcher.matches ? "dark" : "light"
  );
  useEffect(() => {
    const setter = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    systemDarkThemeMatcher.addListener(setter);
    return () => {
      systemDarkThemeMatcher.removeListener(setter);
    };
  });
  return systemTheme;
};

const resolveTheme = (
  systemTheme: string,
  userTheme: string | string[]
): string => {
  return !userTheme || userTheme === "system" || Array.isArray(userTheme)
    ? systemTheme
    : userTheme;
};

export const ThemesProvider: React.FunctionComponent = (props) => {
  const systemTheme = useSystemTheme();
  const [userTheme] = useUserSetting(SettingKey.Theme);

  const [appliedTheme, setAppliedTheme] = useState<Theme>(
    getTheme(resolveTheme(systemTheme, userTheme))
  );
  useEffect(() => {
    setAppliedTheme(getTheme(resolveTheme(systemTheme, userTheme)));
  }, [systemTheme, userTheme]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appliedTheme}>
        <Helmet>
          <meta
            name="theme-color"
            content={appliedTheme.palette.background.default}
          />
        </Helmet>
        {props.children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
