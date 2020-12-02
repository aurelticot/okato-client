import { MessageFormatElement } from "intl-messageformat-parser";
import en from "./en.json";
import fr from "./fr.json";

export const messages = {
  en: en as Record<string, string> | Record<string, MessageFormatElement[]>,
  fr: fr as Record<string, string> | Record<string, MessageFormatElement[]>,
};
