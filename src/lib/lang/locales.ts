import { SupportedLocales } from "lib/types";

export const defaultLocale = "en";

export const supportedLocales: SupportedLocales[] = [
  {
    key: "en",
    label: "English",
    messagesFileName: "en.json",
  },
  {
    key: "fr",
    label: "Français",
    messagesFileName: "fr.json",
  },
];
