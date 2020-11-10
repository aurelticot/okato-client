import React from "react";
import { TimeProvider } from "./TimeContext";
import { FeaturesProvider } from "./FeaturesContext";
import { GraphqlProvider } from "./GraphqlContext";
import { UserSettingsProvider } from "./UserSettingsContext";
import { MessagesProvider } from "./MessagesContext";
import { ThemesProvider } from "./ThemesContext";

export const AppContextProvider: React.FunctionComponent<{}> = (props) => {
  return (
    <TimeProvider>
      <GraphqlProvider>
        <FeaturesProvider>
          <UserSettingsProvider>
            <MessagesProvider>
              <ThemesProvider>{props.children}</ThemesProvider>
            </MessagesProvider>
          </UserSettingsProvider>
        </FeaturesProvider>
      </GraphqlProvider>
    </TimeProvider>
  );
};
