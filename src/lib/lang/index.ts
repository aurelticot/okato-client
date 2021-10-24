import { SettingValue, LocalizedMessages } from "lib/types";
import { supportedLocales, defaultLocale } from "./locales";
export { supportedLocales, defaultLocale } from "./locales";

export const getLocale = (languageUserSetting?: string): string => {
  return languageUserSetting === undefined || languageUserSetting === "system"
    ? navigator.language
    : languageUserSetting;
};

export const supportedLanguageSettingsValues: SettingValue[] =
  supportedLocales.map((language) => ({
    key: language.key,
    labelMessage: language.label,
  }));

const loadMessagesData = async (
  locale: string
): Promise<LocalizedMessages | undefined> => {
  const foundLocale = supportedLocales.find(
    (supportedLocale) => supportedLocale.key === locale
  );

  if (foundLocale) {
    return import(
      /* webpackPrefetch: true */ `./${foundLocale.messagesFileName}`
    ) as Promise<LocalizedMessages>;
  }
  return Promise.resolve(undefined);
};

export const getMessages = async (
  locale: string
): Promise<LocalizedMessages> => {
  let messages = await loadMessagesData(locale);
  if (!messages) {
    messages = await loadMessagesData(locale.split(/[-_]/)[0]);
  }
  if (!messages) {
    messages = (await loadMessagesData(defaultLocale)) as LocalizedMessages;
  }
  return messages;
};
