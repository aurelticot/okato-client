import React from "react";
import { TimeProvider } from "./TimeContext";
import { GraphqlProvider } from "./GraphqlContext";
import { UserSettingsProvider } from "./UserSettingsContext";
import { MessagesProvider } from "./MessagesContext";
import { ThemesProvider } from "./ThemesContext";

export const AppContextProvider: React.FunctionComponent = (props) => {
  return (
    <TimeProvider>
      <GraphqlProvider>
        <UserSettingsProvider>
          <MessagesProvider>
            <ThemesProvider>{props.children}</ThemesProvider>
          </MessagesProvider>
        </UserSettingsProvider>
      </GraphqlProvider>
    </TimeProvider>
  );
};
