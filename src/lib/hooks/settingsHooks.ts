import { useContext } from "react";
import { UserSettingsContext } from "../../contexts/UserSettingsProvider";
import { SettingKey, Setting as SettingDefinition } from "../types";
import { config } from "../../config";

const { settings, defaultUserSettings } = config;

export const useUserSetting = <T extends string | string[] = string>(
  key: SettingKey
) => {
  const { userSettings, setUserSetting } = useContext(UserSettingsContext);
  const definition = settings[key];
  const defaultValue = defaultUserSettings[key] as T;
  const userSetting = userSettings[key] as T;

  function setter(value: T): void {
    setUserSetting(key, value);
  }

  const returnedObject: [T, (value: T) => void, SettingDefinition, T] = [
    userSetting ? userSetting : defaultValue,
    setter,
    definition,
    defaultValue,
  ];
  return returnedObject;
};
