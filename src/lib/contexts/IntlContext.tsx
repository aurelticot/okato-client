import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { IntlErrorCode, OnErrorFn } from "@formatjs/intl";
import { defaultLocale, getMessages, getLocale } from "lib/lang";
import { useUserSetting } from "lib/hooks";
import { SettingKey, LocalizedMessages } from "lib/types";
import { sendTelemetryError, getLogger } from "lib/utils";
const logger = getLogger("i18n");

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
const sendTelemetryErrorDebounced: typeof sendTelemetryError = debounce(
  sendTelemetryError,
  10000
);
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */

export const IntlProvider: React.FunctionComponent = (props) => {
  const firstRender = useRef(true);
  const [messages, setMessages] = useState<LocalizedMessages | undefined>(
    undefined
  );
  const [userLanguage] = useUserSetting(SettingKey.Language);
  const locale = getLocale(userLanguage);

  useEffect(() => {
    logger.info(`Session locale set`, { locale });
    const loadMessages = async () => {
      try {
        const messages = await getMessages(locale);
        setMessages(messages);
        firstRender.current = false;
      } catch (error) {
        logger.error("Failed to load localised messages", { error, locale });
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

  const handleError = useCallback<OnErrorFn>(
    (error) => {
      if (error.code === IntlErrorCode.MISSING_TRANSLATION) {
        if (firstRender.current) {
          return;
        }
        sendTelemetryErrorDebounced(
          new Error(`Missing translation`),
          ["i18n"],
          {
            locale,
          }
        );
      } else {
        logger.error(error.message, { errorCode: error.code, locale });
        sendTelemetryError(error, ["i18n"], { locale });
      }
    },
    [locale]
  );

  return (
    <ReactIntlProvider
      key={locale}
      locale={locale}
      defaultLocale={defaultLocale}
      messages={messages}
      onError={handleError}
    >
      {props.children}
    </ReactIntlProvider>
  );
};
