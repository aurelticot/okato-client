import React, { PropsWithChildren } from "react";
import { FeaturesProvider } from "./FeaturesProvider";
import { UserSettingsProvider } from "./UserSettingsProvider";
import { MessagesProvider } from "./MessagesProvider";
import { ThemesProvider } from "./ThemesProvider";

export default function AppContext(props: PropsWithChildren<{}>) {
  return (
    <FeaturesProvider>
      <UserSettingsProvider>
        <MessagesProvider>
          <ThemesProvider>{props.children}</ThemesProvider>
        </MessagesProvider>
      </UserSettingsProvider>
    </FeaturesProvider>
  );
}
