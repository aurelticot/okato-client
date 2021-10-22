import React, { useEffect, useState } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { defaultLocale, getMessages, getLocale } from "lib/lang";
import { useUserSetting } from "lib/hooks";
import { SettingKey, LocalizedMessages } from "lib/types";
import { sendTelemetryError } from "lib/utils";

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
        sendTelemetryError(new Error("Failed to load localised messages"), [], {
          locale,
        });
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
    >
      {props.children}
    </ReactIntlProvider>
  );
};
