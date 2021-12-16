import React, { useState, useEffect, useMemo } from "react";
import { config } from "config";
import { UserSettings } from "lib/types";
import { recordTelemetryBreadcrumb, getLogger } from "lib/utils";
const logger = getLogger("UserSettings");

const { defaultUserSettings, settings } = config;

const userSettingsLocalStorageKey = "userSettings";

const storedUserSettings: UserSettings | null = localStorage
  ? (JSON.parse(
      localStorage.getItem(userSettingsLocalStorageKey) as string
    ) as UserSettings)
  : null;

const initialUserSettings: UserSettings = storedUserSettings
  ? (Object.assign(
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
    ) as UserSettings)
  : defaultUserSettings;

export const UserSettingsContext = React.createContext({
  userSettings: initialUserSettings,
  setUserSetting: (_key: string, _value: string | string[]): void => {},
});

export const UserSettingsProvider: React.FunctionComponent = (props) => {
  const [userSettings, setUserSettings] =
    useState<UserSettings>(initialUserSettings);

  useEffect(() => {
    logger.info(`User Settings set`, userSettings);
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
      recordTelemetryBreadcrumb("info", "Changed User Setting", "", {
        setting: key,
        newValue: value,
      });
      logger.info("User Settings changed", {
        setting: key,
        newValue: value,
      });
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
