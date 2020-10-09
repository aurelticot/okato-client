import React, { PropsWithChildren, useState, useEffect, useMemo } from "react";
import { config } from "../config";
import { UserSettings } from "../lib/types";

const { defaultUserSettings, settings } = config;

const userSettingsLocalStorageKey = "userSettings";

const storedUserSettings: UserSettings = localStorage
  ? JSON.parse(localStorage.getItem(userSettingsLocalStorageKey) as string)
  : null;

const initialUserSettings = storedUserSettings
  ? Object.assign(
      {},
      ...Object.entries(storedUserSettings).map(
        ([settingKey, userSettingValue]) => {
          const settingDefinition = settings[settingKey];
          if (!settingDefinition) {
            return { [settingKey]: userSettingValue };
          }
          const correctValue =
            settingDefinition.values.filter(
              (value) => value.key === userSettingValue
            ).length > 0;
          return {
            [settingKey]: correctValue
              ? userSettingValue
              : defaultUserSettings[settingKey],
          };
        }
      )
    )
  : defaultUserSettings;

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
