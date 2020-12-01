import React from "react";
import { IntlProvider } from "react-intl";
import { MessageFormatElement } from "intl-messageformat-parser";
import { messages } from "lib/lang";
import { useUserSetting } from "lib/hooks";
import { SettingKey } from "lib/types";

const { en, fr } = messages;

const defaultLanguage = "en";

const resolveLanguageValue = (value: string | string[]): string => {
  const resolvedLanguage = Array.isArray(value) ? value[0] : value;
  return resolvedLanguage === "system"
    ? getBrowserLanguage()
    : resolvedLanguage;
};

const getBrowserLanguage = (): string => {
  const browserLanguage = navigator.language.split(/[-_]/)[0];
  switch (browserLanguage) {
    case "fr":
      return "fr";
    case "en":
      return "en";
    default:
      return defaultLanguage;
  }
};

const getLocaleMessages = (
  locale: string | string[]
): Record<string, string> | Record<string, MessageFormatElement[]> => {
  if (Array.isArray(locale)) {
    return en;
  }
  switch (locale) {
    case "fr": {
      return fr;
    }
    case "en": {
      return en;
    }
    case "system": {
      const systemLanguage = getBrowserLanguage();
      return getLocaleMessages(systemLanguage);
    }
    default: {
      return en;
    }
  }
};

export const MessagesProvider: React.FunctionComponent = (props) => {
  const browserLanguage = getBrowserLanguage();
  const [userLanguage] = useUserSetting(SettingKey.Language);
  const locale: string = resolveLanguageValue(userLanguage || browserLanguage);
  const messages = getLocaleMessages(locale);

  return (
    <IntlProvider
      key={locale}
      locale={locale}
      defaultLocale={defaultLanguage}
      messages={messages}
    >
      {props.children}
    </IntlProvider>
  );
};
