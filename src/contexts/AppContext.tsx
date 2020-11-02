import React, { PropsWithChildren } from "react";
import { TimeProvider } from "./TimeProvider";
import { FeaturesProvider } from "./FeaturesProvider";
import { GraphqlProvider } from "./GraphqlProvider";
import { UserSettingsProvider } from "./UserSettingsProvider";
import { MessagesProvider } from "./MessagesProvider";
import { ThemesProvider } from "./ThemesProvider";

export default function AppContext(props: PropsWithChildren<{}>) {
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
}
