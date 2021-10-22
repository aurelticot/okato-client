import { defineMessage } from "react-intl";
import { SettingValue, LocalizedMessages } from "lib/types";

export const getLocale = (languageUserSetting?: string): string => {
  return languageUserSetting === undefined || languageUserSetting === "system"
    ? navigator.language
    : languageUserSetting;
};

export const defaultLocale = "en";

const supportedLocales = [
  {
    key: "en",
    labelMessage: defineMessage({
      id: "settings.language.value.en.label",
      defaultMessage: "English",
      description: "Label of the option 'en' for the Setting Language",
    }),
  },
  {
    key: "fr",
    labelMessage: defineMessage({
      id: "settings.language.value.fr.label",
      defaultMessage: "Français",
      description: "Label of the option 'fr' for the Setting Language",
    }),
  },
];

export const supportedLanguageSettingsValues: SettingValue[] =
  supportedLocales.map((language) => ({
    key: language.key,
    labelMessage: language.labelMessage,
  }));

const loadMessagesData = async (
  locale: string
): Promise<LocalizedMessages | undefined> => {
  switch (locale) {
    case "fr":
      return import("./fr.json") as unknown as Promise<LocalizedMessages>;
    case "en":
      return import("./en.json") as unknown as Promise<LocalizedMessages>;
    default:
      return Promise.resolve(undefined);
  }
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
