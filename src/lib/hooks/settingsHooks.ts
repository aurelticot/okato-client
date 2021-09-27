import { useContext } from "react";
import { UserSettingsContext } from "lib/contexts";
import { SettingKey, Setting as SettingDefinition } from "lib/types";
import { config } from "config";

const { settings, defaultUserSettings } = config;

type UserSettingsHookType<T> = [T, (value: T) => void, SettingDefinition, T];

export const useUserSetting = <T extends string | string[] = string>(
  key: SettingKey
): UserSettingsHookType<T> => {
  const { userSettings, setUserSetting } = useContext(UserSettingsContext);
  const definition = settings[key];
  const defaultValue = defaultUserSettings[key] as T;
  const userSetting = userSettings[key] as T;

  function setter(value: T): void {
    setUserSetting(key, value);
  }

  return [
    userSetting ? userSetting : defaultValue,
    setter,
    definition,
    defaultValue,
  ];
};
