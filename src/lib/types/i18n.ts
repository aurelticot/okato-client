import { MessageFormatElement } from "@formatjs/icu-messageformat-parser";

export type LocalizedMessages =
  | Record<string, string>
  | Record<string, MessageFormatElement[]>;
