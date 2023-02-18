import React, { useCallback, useEffect, useRef, useState } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { IntlErrorCode, OnErrorFn } from "@formatjs/intl";
import { defaultLocale, getMessages, getLocale } from "lib/lang";
import { useUserSetting } from "lib/hooks";
import { SettingKey, LocalizedMessages } from "lib/types";

export const IntlProvider: React.FunctionComponent = (props) => {
  const firstRender = useRef(true);
  const [messages, setMessages] = useState<LocalizedMessages | undefined>(
    undefined
  );
  const [userLanguage] = useUserSetting(SettingKey.Language);
  const locale = getLocale(userLanguage);

  useEffect(() => {
    const loadMessages = async () => {
      const messages = await getMessages(locale);
      setMessages(messages);
      firstRender.current = false;
    };
    void loadMessages();
  }, [locale]);

  const handleError = useCallback<OnErrorFn>((error) => {
    if (error.code === IntlErrorCode.MISSING_TRANSLATION) {
      if (firstRender.current) {
        return;
      }
    }
  }, []);

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
