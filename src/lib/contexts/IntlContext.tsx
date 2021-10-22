import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { MessageFormatElement } from "@formatjs/icu-messageformat-parser";
import { defaultLanguage, messages } from "lib/lang";
import { useUserSetting } from "lib/hooks";
import { SettingKey } from "lib/types";
import { sendTelemetryError } from "lib/utils";

const { en, fr } = messages;

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

export const IntlProvider: React.FunctionComponent = (props) => {
  const browserLanguage = getBrowserLanguage();
  const [userLanguage] = useUserSetting(SettingKey.Language);
  const locale: string = resolveLanguageValue(userLanguage || browserLanguage);
  const messages = getLocaleMessages(locale);

  return (
    <ReactIntlProvider
      key={locale}
      locale={locale}
      defaultLocale={defaultLanguage}
      messages={messages}
      onError={(error) => sendTelemetryError(error)}
    >
      {props.children}
    </ReactIntlProvider>
  );
};
