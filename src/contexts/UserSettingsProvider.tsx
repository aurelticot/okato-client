import React, { PropsWithChildren, useState, useEffect, useMemo } from "react";
import { config } from "../config";
import { UserSettings } from "../lib/types";

const { defaultUserSettings } = config;

const userSettingsLocalStorageKey = "userSettings";

const initialUserSettings: UserSettings =
  (localStorage
    ? JSON.parse(localStorage.getItem(userSettingsLocalStorageKey) as string)
    : defaultUserSettings) || defaultUserSettings;

export const UserSettingsContext = React.createContext({
  userSettings: initialUserSettings,
  setUserSetting: (_key: string, _value: string | string[]): void => {},
});

export const UserSettingsProvider = (props: PropsWithChildren<{}>) => {
  const [userSettings, setUserSettings] = useState<UserSettings>(
    initialUserSettings
  );

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    localStorage.setItem(
      userSettingsLocalStorageKey,
      JSON.stringify(userSettings)
    );
  }, [userSettings]);

  const contextValue = useMemo(() => {
    const setter = (key: string, value: string | string[]) => {
      setUserSettings({ ...userSettings, [key]: value });
    };
    return {
      userSettings,
      setUserSetting: setter,
    };
  }, [userSettings]);

  return (
    <UserSettingsContext.Provider value={contextValue}>
      {props.children}
    </UserSettingsContext.Provider>
  );
};
