import React from "react";
import { GraphqlProvider } from "./GraphqlContext";
import { UserSettingsProvider } from "./UserSettingsContext";
import { IntlProvider } from "./IntlContext";
import { ThemesProvider } from "./ThemesContext";
import { FeedbackProvider } from "./FeedbackContext";

export const AppContextProvider: React.FunctionComponent = (props) => {
  return (
    <GraphqlProvider>
      <UserSettingsProvider>
        <IntlProvider>
          <ThemesProvider>
            <FeedbackProvider>{props.children}</FeedbackProvider>
          </ThemesProvider>
        </IntlProvider>
      </UserSettingsProvider>
    </GraphqlProvider>
  );
};
