import React from "react";
import { GraphqlProvider } from "./GraphqlContext";
import { UserSettingsProvider } from "./UserSettingsContext";
import { MessagesProvider } from "./MessagesContext";
import { ThemesProvider } from "./ThemesContext";
import { FeedbackProvider } from "./FeedbackContext";

export const AppContextProvider: React.FunctionComponent = (props) => {
  return (
    <GraphqlProvider>
      <UserSettingsProvider>
        <MessagesProvider>
          <ThemesProvider>
            <FeedbackProvider>{props.children}</FeedbackProvider>
          </ThemesProvider>
        </MessagesProvider>
      </UserSettingsProvider>
    </GraphqlProvider>
  );
};
