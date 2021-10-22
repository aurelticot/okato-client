import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { IntlErrorCode } from "@formatjs/intl";
import { defaultLocale, getMessages, getLocale } from "lib/lang";
import { useUserSetting } from "lib/hooks";
import { SettingKey, LocalizedMessages } from "lib/types";
import { sendTelemetryError } from "lib/utils";

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
const sendTelemetryErrorDebounced: typeof sendTelemetryError = debounce(
  sendTelemetryError,
  10000
);
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */

export const IntlProvider: React.FunctionComponent = (props) => {
  const [messages, setMessages] = useState<LocalizedMessages | undefined>(
    undefined
  );
  const [userLanguage] = useUserSetting(SettingKey.Language);
  const locale = getLocale(userLanguage);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await getMessages(locale);
        setMessages(messages);
      } catch (error) {
        sendTelemetryError(
          new Error("Failed to load localised messages"),
          ["i18n"],
          {
            locale,
          }
        );
      }
    };
    void loadMessages();
  }, [locale]);

  return (
    <ReactIntlProvider
      key={locale}
      locale={locale}
      defaultLocale={defaultLocale}
      messages={messages}
      onError={(error) => {
        if (error.code === IntlErrorCode.MISSING_TRANSLATION) {
          sendTelemetryErrorDebounced(error, ["i18n"], { locale });
        } else {
          sendTelemetryError(error, ["i18n"], { locale });
        }
      }}
    >
      {props.children}
    </ReactIntlProvider>
  );
};
