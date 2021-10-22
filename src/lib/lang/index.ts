import { MessageFormatElement } from "@formatjs/icu-messageformat-parser";
import { defineMessage } from "react-intl";
import { SettingValue } from "lib/types";
import en from "./en.json";
import fr from "./fr.json";

export const defaultLanguage = "en";

export const messages = {
  en: en as Record<string, string> | Record<string, MessageFormatElement[]>,
  fr: fr as Record<string, string> | Record<string, MessageFormatElement[]>,
};

export const supportedLanguageSettingsValues: SettingValue[] = [
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
